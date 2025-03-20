import PriceInput from "../../components/input/PriceInput";
import { Box, TextField, MenuItem, FormControlLabel, Switch } from "@mui/material";


const Filters = ({ filters, onFilterChange, showFavorites, onToggleFavorites }) => {
  return (
    <Box sx={{ display: "flex", gap: 1 }}>
    <TextField
      select
      size="sm"
      sx={{ width: "10rem" }}
      label="Property Status"
      value={filters.propertyStatus || ""}
      onChange={(e) => onFilterChange("propertyStatus", e.target.value)}
    >
      {["Available", "Sold", "Pending", "Contingent", "Unverified"].map((status) => (
        <MenuItem key={status} value={status}>
          {status}
        </MenuItem>
      ))}
    </TextField>

    <TextField
      select
      sx={{ width: "10rem" }}
      label="Listing Type"
      value={filters.listingType}
      onChange={(e) => onFilterChange("listingType", e.target.value)}
    >
      {["for_rent", "for_sale"].map((type) => (
        <MenuItem key={type} value={type}>
          {type.toUpperCase()}
        </MenuItem>
      ))}
    </TextField>

    <TextField
      select
      sx={{ width: "10rem" }}
      label="Property Type"
      value={filters.propertyType}
      onChange={(e) => onFilterChange("propertyType", e.target.value)}
    >
      {["house", "condo", "apartment", "land", "multi_Family", "town_House"].map((type) => (
        <MenuItem key={type} value={type}>
          {type}
        </MenuItem>
      ))}
    </TextField>

    <PriceInput 
      label="Min Price" 
      value={filters.minPrice} 
      onChange={(e) => onFilterChange("minPrice", e.target.value)} />
    <PriceInput 
      label="Max Price" 
      value={filters.maxPrice} 
      onChange={(e) => onFilterChange("maxPrice", e.target.value)} />

    <FormControlLabel
        control={
          <Switch
            checked={showFavorites}
            onChange={(e) => onToggleFavorites(e.target.checked)}
            color="primary"
          />
        }
        label="Show Favorites"
      />
  </Box>
  );
};

export default Filters;
