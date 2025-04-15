import React from "react";
import { Box, Container, Typography, Link } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 2,
        borderTop: "1px solid rgba(255,255,255,0.1)",
        backgroundColor: "rgba(255, 255, 255, 0.02)",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: { xs: "column", sm: "row" },
          textAlign: { xs: "center", sm: "left" },
          gap: 1,
        }}
      >
        <Typography variant="body2" color="textSecondary">
          Developed by{" "}
          <Link
            href="https://vivekamola.in"
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
            color="#448aff"
          >
            <u>Vivek Amola</u>
          </Link>
        </Typography>

        <Typography variant="body2" color="textSecondary">
          API from{" "}
          <Link
            href="https://jsonplaceholder.typicode.com"
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
            color="#448aff"
          >
            <u>JSONPlaceholder</u>
          </Link>
        </Typography>
      </Container>
    </Box>
  );
}
