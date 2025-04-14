import React from "react";
import {
  Container,
  Typography,
  TextField,
  Box,
  Grid,
  Paper,
} from "@mui/material";
import { useSelector } from "react-redux";

export default function MyProfilePage() {
  const currentUser = useSelector((state) => state.auth.currentUser);

  if (!currentUser) return null;

  const {
    name,
    username,
    email,
    phone,
    website,
    address,
    company,
  } = currentUser;

  return (
    <Container maxWidth="" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          My Profile
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <TextField label="Name" fullWidth value={name} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Username" fullWidth value={username} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Email" fullWidth value={email} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Phone" fullWidth value={phone} />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Website" fullWidth value={website} />
          </Grid>
        </Grid>  
        <Typography variant="h6" sx={{ mt: 3, mb:1 }}>
            Address
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <TextField label="Street" fullWidth value={address?.street || ""} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Suite" fullWidth value={address?.suite || ""} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="City" fullWidth value={address?.city || ""} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Zipcode" fullWidth value={address?.zipcode || ""} />
          </Grid>
        </Grid>  
          <Typography variant="h6" sx={{ mt: 3, mb:1 }}>
              Company
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
                <TextField label="Company Name" fullWidth value={company?.name || ""} />
            </Grid>
            <Grid item xs={12}>
                <TextField
                label="Catch Phrase"
                fullWidth
                value={company?.catchPhrase || ""}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField label="BS" fullWidth value={company?.bs || ""} />
            </Grid>
          </Grid>
      </Paper>
    </Container>
  );
}
