import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const ManageProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch("https://hotel.aotrek.net/api/auth/manage", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setProducts(data.products);
    };

    fetchProducts();
  }, []);

  const handleDeleteProduct = async (id) => {
    const token = localStorage.getItem("token");

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this product!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const response = await fetch(
        `https://hotel.aotrek.net/api/auth/delete/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.ok) {
        Swal.fire("Deleted!", "Product has been deleted.", "success");
        setProducts(products.filter((product) => product.id !== id));
      } else {
        Swal.fire("Error", "Failed to delete product", "error");
      }
    }
  };

  return (
    <div>
      <h2>Manage Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - {product.title}
            <Link to={`/update/${product.id}`}>Edit</Link>
            <button onClick={() => handleDeleteProduct(product.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageProductsPage;
