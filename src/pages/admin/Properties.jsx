import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProperties } from "../../store/reducers/admin/propertiesSlice";
import {
  selectProperties,
  selectPropertiesLoading,
  selectPropertiesError,
} from "../../store/selectors/propertiesSelector";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

export const PropertiesTable = () => {
  const dispatch = useDispatch();
  const properties = useSelector(selectProperties);
  const loading = useSelector(selectPropertiesLoading);
  const error = useSelector(selectPropertiesError);

  useEffect(() => {
    dispatch(getProperties());
  }, [dispatch]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error}</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Properties
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Property Type</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Area (sq ft)</TableCell>
              <TableCell>Bedrooms</TableCell>
              <TableCell>Bathrooms</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Owner</TableCell>
              <TableCell>Owner Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {properties.map((property) => (
              <TableRow key={property.id}>
                <TableCell>{property.propertyType}</TableCell>
                <TableCell>
                  {property.address.street}, {property.address.city},{" "}
                  {property.address.state} {property.address.zip},{" "}
                  {property.address.country}
                </TableCell>
                <TableCell>{property.area}</TableCell>
                <TableCell>{property.bedrooms}</TableCell>
                <TableCell>{property.bathrooms}</TableCell>
                <TableCell>${property.price.toLocaleString()}</TableCell>
                <TableCell>{property.propertyStatus}</TableCell>
                <TableCell>
                  {property.owner.firstName} {property.owner.lastName}
                </TableCell>
                <TableCell>{property.owner.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
