import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOwners, toggleUserStatus, verifyOwner } from "../../store/slices/ownersSlice";
import {
  selectOwners,
  selectOwnersLoading,
  selectOwnersError,
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

export const OwnersTable = () => {
  const dispatch = useDispatch();
  const owners = useSelector(selectOwners);
  const loading = useSelector(selectOwnersLoading);
  const error = useSelector(selectOwnersError);

  useEffect(() => {
    dispatch(getOwners());
  }, [dispatch]);

  const handleToggleStatus = (id, active) => {
    dispatch(toggleUserStatus({ id, active }));
    dispatch(getOwners());
  };

  const handleVerify = (id, verified) => {
    dispatch(verifyOwner({ id, verified }));
    dispatch(getOwners());
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error}</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Owners
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Verified</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {owners.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.active ? "Active" : "Inactive"}</TableCell>
                <TableCell>{user.verified ? "Verified" : "Unverified"}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleToggleStatus(user.id, user.active)}
                  >
                    {user.active ? "Deactivate" : "Activate"}
                  </Button>
                  {!user.verified && 
                    <Button onClick={() => handleVerify(user.id, user.verified)}>
                      Verify
                    </Button>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
