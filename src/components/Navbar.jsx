import React from "react";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../Reducers/auth.reducer";

export default function Navbar() {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          sx={{ cursor: "pointer" }}
          onClick={() => navigate(currentUser ? "/posts" : "/")}
        >
          Redux CRUD App
        </Typography>

        {currentUser && (
          <Box display="flex" gap={2}>
            <Button color="inherit" onClick={() => alert("My Post page not implemented")}>
              My Posts
            </Button>
            <Button color="inherit" onClick={() => alert("Profile page not implemented")}>
              My Profile
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
