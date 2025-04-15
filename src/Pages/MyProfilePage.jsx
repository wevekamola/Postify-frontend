import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Container,
  Grid,
  Box,
  Paper,
  Snackbar,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSelector } from "react-redux";

export default function MyProfilePage() {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [profile, setProfile] = useState(() => ({
    name: currentUser?.name || "",
    username: currentUser?.username || "",
    email: currentUser?.email || "",
    phone: currentUser?.phone || "",
    website: currentUser?.website || "",
    address: {
      street: currentUser?.address?.street || "",
      suite: currentUser?.address?.suite || "",
      city: currentUser?.address?.city || "",
      zipcode: currentUser?.address?.zipcode || "",
    },
    company: {
      name: currentUser?.company?.name || "",
      catchPhrase: currentUser?.company?.catchPhrase || "",
      bs: currentUser?.company?.bs || "",
    },
  }));

  const handleChange = (section, field, value) => {
    if (section === "account") {
      setProfile((prev) => ({ ...prev, [field]: value }));
    } else {
      setProfile((prev) => ({
        ...prev,
        [section]: { ...prev[section], [field]: value },
      }));
    }
  };

  const handleUpdate = () => {
    setSnackbarOpen(true);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          My Profile
        </Typography>

        {/* Account Accordion */}
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Account</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Name"
                  fullWidth
                  value={profile.name}
                  onChange={(e) => handleChange("account", "name", e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Username"
                  fullWidth
                  value={profile.username}
                  onChange={(e) => handleChange("account", "username", e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  fullWidth
                  value={profile.email}
                  onChange={(e) => handleChange("account", "email", e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Phone"
                  fullWidth
                  value={profile.phone}
                  onChange={(e) => handleChange("account", "phone", e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Website"
                  fullWidth
                  value={profile.website}
                  onChange={(e) => handleChange("account", "website", e.target.value)}
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* Address Accordion */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Address</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Street"
                  fullWidth
                  value={profile.address.street}
                  onChange={(e) => handleChange("address", "street", e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Suite"
                  fullWidth
                  value={profile.address.suite}
                  onChange={(e) => handleChange("address", "suite", e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="City"
                  fullWidth
                  value={profile.address.city}
                  onChange={(e) => handleChange("address", "city", e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Zipcode"
                  fullWidth
                  value={profile.address.zipcode}
                  onChange={(e) => handleChange("address", "zipcode", e.target.value)}
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* Company Accordion */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Company</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Company Name"
                  fullWidth
                  value={profile.company.name}
                  onChange={(e) => handleChange("company", "name", e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Catch Phrase"
                  fullWidth
                  value={profile.company.catchPhrase}
                  onChange={(e) => handleChange("company", "catchPhrase", e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="BS"
                  fullWidth
                  value={profile.company.bs}
                  onChange={(e) => handleChange("company", "bs", e.target.value)}
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* Update Button */}
        <Box textAlign="right" mt={3}>
          <Button variant="contained" onClick={handleUpdate}>
            Update Profile
          </Button>
        </Box>
      </Paper>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
          Profile updated successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
}
