import React, { useState } from "react";
import Swal from "sweetalert2";
import { TextField, Button, Container, Typography, Box } from "@mui/material";

const CreateProductPage = () => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("https://hotel.aotrek.net/api/auth/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, title, description }),
      });

      // Check if the response is OK (status in the range 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Try to parse the JSON response
      const data = await response.json();

      // Handle success
      Swal.fire("Success", "Product created successfully", "success");
      setName("");
      setTitle("");
      setDescription("");
    } catch (error) {
      // Handle errors
      Swal.fire("Error", `An error occurred: ${error.message}`, "error");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Create Product
      </Typography>
      <Box
        component="form"
        onSubmit={handleCreateProduct}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant="outlined"
          required
        />
        <TextField
          label="Product Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          variant="outlined"
          required
        />
        <TextField
          label="Product Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          variant="outlined"
          multiline
          rows={4}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Create Product
        </Button>
      </Box>
    </Container>
  );
};

export default CreateProductPage;
