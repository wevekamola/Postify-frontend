import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
} from "@mui/material";
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
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        top: 0,
        zIndex: 1100,
        borderBottom: "1px solid hsla(220, 20%, 25%, 0.4)",
        backgroundColor: "hsla(210, 14%, 7%, 0.7)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        px: 2,
        py: 1,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography
          variant="h4"
          sx={{ cursor: "pointer", fontWeight: 300, color:"#448aff" }}
          onClick={() => navigate("/posts")}
        >
          Postify
        </Typography>

        {currentUser && (
          <Box display="flex" gap={2}>
            <Button color="inherit"  sx={{ cursor: "pointer", fontWeight: 300, fontSize:18 }} onClick={() => navigate("/posts")}>
              All Posts
            </Button>
            <Button color="inherit"  sx={{ cursor: "pointer", fontWeight: 300, fontSize:18 }} onClick={() => navigate("/myposts")}>
              My Posts
            </Button>
            <Button color="inherit"  sx={{ cursor: "pointer", fontWeight: 300, fontSize:18 }} onClick={() => navigate("/myprofile")}>
              My Profile
            </Button>
            <Button color="inherit"  sx={{ cursor: "pointer", fontWeight: 300, fontSize:18 }} onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
