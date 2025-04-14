import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsersStart,
  loginStart,
} from "../Reducers/auth.reducer";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const dispatch = useDispatch();
  const { loading, error, currentUser } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


const navigate = useNavigate();

useEffect(() => {
    if (currentUser) {
      navigate("/posts");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    dispatch(fetchUsersStart());
  }, [dispatch]);

  const handleLogin = () => {
    if (!email || !password) return;
    dispatch(loginStart({ email, password }));
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Typography variant="h4" gutterBottom>
        Demo Login
      </Typography>

      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <Alert severity="error">{error}</Alert>}
        <Button
          variant="contained"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </Box>
    </Container>
  );
}
