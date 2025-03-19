import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCustomers,
  toggleUserStatus,
} from "../../store/reducers/admin/customersSlice";
import {
  selectCustomers,
  selectCustomersLoading,
  selectCustomersError,
} from "../../store/selectors/adminSelectors";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from "@mui/material";

export const UsersTable = () => {
  const dispatch = useDispatch();
  const customers = useSelector(selectCustomers);
  const loading = useSelector(selectCustomersLoading);
  const error = useSelector(selectCustomersError);

  useEffect(() => {
    dispatch(getCustomers());
  }, [dispatch]);

  const handleToggleStatus = (id, active) => {
    dispatch(toggleUserStatus({ id, active }));
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error}</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Customers
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.active ? "Active" : "Inactive"}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleToggleStatus(user.id, user.active)}
                  >
                    {user.active ? "Deactivate" : "Activate"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
