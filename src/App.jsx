// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Use BrowserRouter as Router
import HomePage from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import CreateProductPage from "./pages/CreateProductPage";
import ManageProductsPage from "./pages/ManageProductPage";
import UpdateProductPage from "./pages/UpdateProductPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Add route for the root "/" */}
        <Route path="/" element={<LoginPage />} />{" "}
        {/* Redirects to LoginPage for now */}
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateProductPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manage"
          element={
            <ProtectedRoute>
              <ManageProductsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update/:id"
          element={
            <ProtectedRoute>
              <UpdateProductPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
