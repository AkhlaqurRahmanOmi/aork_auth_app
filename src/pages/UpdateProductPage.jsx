// src/pages/UpdateProductPage.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  Box,
} from "@mui/material";

const UpdateProductPage = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://hotel.aotrek.net/api/auth/manage/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      setName(data.name);
      setTitle(data.title);
      setDescription(data.description);
    };

    fetchProduct();
  }, [id]);

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const response = await fetch(
      `https://hotel.aotrek.net/api/auth/update/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, title, description }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      Swal.fire("Success", "Product updated successfully", "success");
    } else {
      Swal.fire("Error", "Failed to update product", "error");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h5" component="h1" align="center" gutterBottom>
          Update Product
        </Typography>
        <form onSubmit={handleUpdateProduct}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            sx={{ gap: 2 }}
          >
            <TextField
              variant="outlined"
              fullWidth
              label="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextField
              variant="outlined"
              fullWidth
              label="Product Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <TextField
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              label="Product Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Update Product
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default UpdateProductPage;