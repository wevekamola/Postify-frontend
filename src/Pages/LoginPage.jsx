import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  FormLabel,
  FormControl,
  TextField,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { loginStart } from "../Reducers/auth.reducer";
import { loginCardStyle, InputStyle, loginLayoutCenter } from "../theme/customStyles";

export default function LoginPage() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) return;
    dispatch(loginStart({ email, password }));
  };

  return (
    <Box sx={loginLayoutCenter}>
      <Box textAlign="center" mb={3}>
        <Typography
          variant="h2"
          sx={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 700,
            color: "#ffffff",
            fontSize: "clamp(2rem, 10vw, 3rem)",
          }}
        >
          Postify
        </Typography>
      </Box>

      <Paper elevation={0} sx={loginCardStyle}>
        <Box display="flex" flexDirection="column" gap={3} mt={2}>
          <FormControl fullWidth>
            <FormLabel sx={{ mb: 1, color: "#ccc" }}>Email</FormLabel>
            <TextField
              fullWidth
              placeholder="your@email.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="standard"
              sx={InputStyle}
            />
          </FormControl>

          <FormControl fullWidth>
            <FormLabel sx={{ mb: 1, color: "#ccc" }}>Password</FormLabel>
            <TextField
              fullWidth
              placeholder="••••••"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="standard"
              sx={InputStyle}
            />
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              borderRadius: 2,
              py: 1.5,
            }}
          >
            Log In
          </Button>
        </Box>
      </Paper>

      <Typography
        sx={{
          mt: 3,
          color: "#aaa",
          fontSize: "16px",
          textAlign: "center",
          fontWeight: 200,
        }}
      >
        <i>Where every post finds its voice & every voice finds its audience.</i>
      </Typography>
    </Box>
  );
}
