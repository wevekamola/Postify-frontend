import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  FormLabel,
  FormControl,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import {
    // fetchUsersStart,
    loginStart,
  } from "../Reducers/auth.reducer";

const Background = styled("div")(() => ({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "2rem",
  background: "linear-gradient(hsl(210, 24%, 11%) 90%, hsla(210, 100%, 23%, 0.2) 100%)",
}));

const StyledCard = styled(Paper)(({ theme }) => ({
  width: "100%",
  maxWidth: 400,
  padding: theme.spacing(5),
  borderRadius: theme.spacing(2),
  backgroundColor: "rgba(5, 7, 10, 0.4)",
  border: "1px solid hsla(220, 20%, 25%, 0.6)",
  color: "#fff",
  boxShadow: "0 0 0 1px rgba(255, 255, 255, 0.05), 0 20px 25px -5px rgba(0, 0, 0, 0.2)",
}));

const CustomInput = styled(TextField)(() => ({
  "& .MuiInputBase-root": {
    backgroundColor: "#111",
    borderRadius: 10,
    border: "1px solid rgba(255, 255, 255, 0.1)",
    color: "#fff",
    padding: "6px 12px",
  },
  "& input": {
    color: "#fff",
  },
  "& label": {
    display: "none",
  },
  "& .MuiInput-underline:before, & .MuiInput-underline:after": {
    borderBottom: "none",
  },
  "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
    borderBottom: "none",
  },
}));

export default function LoginPage() {
    const dispatch = useDispatch();
    // const { loading, error } = useSelector((state) => state.auth);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    // useEffect(() => {
    //   dispatch(fetchUsersStart());
    // }, [dispatch]);
  
    const handleLogin = () => {
      if (!email || !password) return;
      dispatch(loginStart({ email, password }));
    };

  return (
    <Background>
      {/* App name and tagline */}
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
      {/* Login card */}
      <StyledCard elevation={0}>
        <Box display="flex" flexDirection="column" gap={3} mt={2}>
          {/* Email */}
          <FormControl fullWidth>
            <FormLabel sx={{ mb: 1, color: "#ccc" }}>Email</FormLabel>
            <CustomInput
              fullWidth
              placeholder="your@email.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="standard"
            />
          </FormControl>
          {/* Password */}
          <FormControl fullWidth>
            <FormLabel sx={{ mb: 1, color: "#ccc" }}>Password</FormLabel>
            <CustomInput
              fullWidth
              placeholder="••••••"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="standard"
            />
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
            // disabled={loading}
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
      </StyledCard>
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
    </Background>
  );
}
