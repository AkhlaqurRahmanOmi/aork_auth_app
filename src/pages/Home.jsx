import React from "react";
import { Link } from "react-router-dom";
import { Container, Typography, Box, Button } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ListAltIcon from "@mui/icons-material/ListAlt";

const HomePage = () => {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh", // Full screen height
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to the Product Management App
        </Typography>

        <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
          <Button
            component={Link}
            to="/create"
            variant="contained"
            color="primary"
            size="large"
            startIcon={<AddBoxIcon />}
          >
            Create Product
          </Button>

          <Button
            component={Link}
            to="/manage"
            variant="contained"
            color="secondary"
            size="large"
            startIcon={<ListAltIcon />}
          >
            Manage Products
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;
