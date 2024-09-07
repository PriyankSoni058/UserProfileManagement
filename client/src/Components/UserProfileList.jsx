import React, { useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserProfiles } from "../lib/features/userProfile/userProfileActions";

const UserProfileList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userProfiles = useSelector((state) => state.userProfile.items) || {};

  useEffect(() => {
    dispatch(getAllUserProfiles());
  }, [dispatch]);

  const handleEditProfile = (userId) => {
    navigate(`/user-profile-form/${userId}`);
  };

  const profiles = Array.isArray(userProfiles) ? userProfiles : [];

  return (
    <Container maxWidth="lg" style={{ marginTop: "10vh" }}>
      <Typography variant="h4" gutterBottom>
        User Profiles Management
      </Typography>
      <Button
        variant="contained"
        color="primary"
        style={{ marginBottom: "1rem", float: "right" }}
        onClick={() => navigate("/user-profile-form")}
      >
        Add Profile
      </Button>
      <TableContainer component={Paper} sx={{ border: "1px solid #ddd" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {profiles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography variant="h6" color="textSecondary">
                    No profiles available
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              profiles.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.userName}</TableCell>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEditProfile(user._id)}
                    >
                      Update Profile
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default UserProfileList;
