import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchAllProperties } from "../api/properties";

const PropertiesContext = createContext();

export const PropertiesProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("location") || "");
  const [filters, setFilters] = useState({
    propertyStatus: searchParams.get("propertyStatus") || "",
    listingType: searchParams.get("listingType") || "",
    propertyType: searchParams.get("propertyType") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
  });

  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);

  const fetchProperties = useCallback(async () => {
    try {
      const queryParams = {};
      if (filters.propertyStatus) queryParams.propertyStatus = filters.propertyStatus;
      if (filters.listingType) queryParams.listingType = filters.listingType;
      if (filters.propertyType) queryParams.propertyType = filters.propertyType;
      if (filters.minPrice) queryParams.minPrice = filters.minPrice;
      if (filters.maxPrice) queryParams.maxPrice = filters.maxPrice;
      if (searchTerm) queryParams.location = searchTerm;

      const res = await fetchAllProperties(queryParams);
      const backendProperties = res.data || [];

      setProperties(backendProperties);
      filterProperties(backendProperties);
    } catch (err) {
      console.error(err || "Error fetching properties");
    }
  }, [filters, searchTerm]);

  useEffect(() => {
    fetchProperties();
  }, [filters]);

  const filterProperties = (data = properties) => {
    let filtered = [...data];

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(({ address }) =>
        address &&
        (
          address.street?.toLowerCase().includes(searchLower) ||
          address.city?.toLowerCase().includes(searchLower) ||
          address.state?.toLowerCase().includes(searchLower) ||
          address.zip?.toLowerCase().includes(searchLower) ||
          address.country?.toLowerCase().includes(searchLower)
        )
      );
    }

    if (filters.listingType) {
      filtered = filtered.filter(({ listingType }) => listingType.toLowerCase() === filters.listingType.toLowerCase());
    }

    if (filters.propertyStatus) {
      filtered = filtered.filter(({ propertyStatus }) => propertyStatus.toLowerCase() === filters.propertyStatus.toLowerCase());
    }

    if (filters.propertyType) {
      filtered = filtered.filter(({ propertyType }) => propertyType.toLowerCase() === filters.propertyType.toLowerCase());
    }

    filtered = filtered.filter(({ price }) => {
      const minPrice = filters.minPrice ? parseInt(filters.minPrice) : 0;
      const maxPrice = filters.maxPrice ? parseInt(filters.maxPrice) : Infinity;
      return price >= minPrice && price <= maxPrice;
    });

    setFilteredProperties(filtered);
  };

  const applyFilters = () => {
    const newSearchParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) newSearchParams.set(key, value);
    });
    if (searchTerm) newSearchParams.set("location", searchTerm);
    setSearchParams(newSearchParams);

    fetchProperties();
  };

  const clearFilters = () => {
    setFilters({
      propertyStatus: "",
      listingType: "",
      propertyType: "",
      minPrice: "",
      maxPrice: "",
    });

    setSearchParams(new URLSearchParams());
    fetchProperties();
  };

  const handleFilterChange = (name, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const filterVerifiedOwnersProperties = filteredProperties.filter(p => p.owner.verified === true && p.owner.enabled === true)
  return (
    <PropertiesContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        filters,
        setFilters,
        properties,
        filteredProperties: filterVerifiedOwnersProperties,
        applyFilters,
        clearFilters,
        handleFilterChange
      }}
    >
      {children}
    </PropertiesContext.Provider>
  );
};

export const useProperties = () => useContext(PropertiesContext);
