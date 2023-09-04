import React, { useState, useEffect } from "react";
import "./vendor.css";
import axios from "axios";

function App() {
  
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productList, setProductList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [productImage, setProductImage] = useState(null);

  const [vendorName, setVendorName] = useState("");
  const [vendorEmail, setVendorEmail] = useState("");
  const [vendorPassword, setVendorPassword] = useState("");
  


  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("price", productPrice);
    formData.append("description", productDescription);
    formData.append("image", productImage);

    if (editIndex === null) {
      // Create a new product object
      const newProduct = {
        name: productName,
        price: productPrice,
        image: productImage,
        description: productDescription,
      };
      try {
        const response = await axios.post("http://localhost:3000/addProduct", newProduct);
        console.log(response.data); // Successful product addition message
        // Clear form fields as needed
      } catch (error) {
        console.error(error);
        // Handle product addition error
      }

      // Add the new product to the product list
      setProductList([...productList, newProduct]);
    } else {
      // Edit the existing product
      const updatedProductList = [...productList];
      updatedProductList[editIndex] = {
        name: productName,
        price: productPrice,
        image: productImage,
        description: productDescription,
      };
      setProductList(updatedProductList);
      setEditIndex(null); // Reset edit mode
    }

    // Clear form fields
    setProductName("");
    setProductPrice("");
    setProductImage("");
    setProductDescription("");
  };

  // Function to handle edit button click
  const handleEditClick = (index) => {
    const productToEdit = productList[index];
    setProductName(productToEdit.name);
    setProductPrice(productToEdit.price);
    setProductImage(productToEdit.image);
    setProductDescription(productToEdit.description);
    setEditIndex(index);
  };

  // Function to handle delete button click
  const handleDeleteClick = (index) => {
    const updatedProductList = [...productList];
    updatedProductList.splice(index, 1); // Remove the product at the specified index
    setProductList(updatedProductList);
  };

  // Function to handle cancel button click
  const handleCancelClick = () => {
    setProductName("");
    setProductPrice("");
    setProductImage("");
    setProductDescription("");
    setEditIndex(null);
  };
   // Function to handle vendor registration form submission
  const handleVendorRegistration = async (e) => {
    e.preventDefault();
  
    const newVendor = {
      name: vendorName,
      email: vendorEmail,
      password: vendorPassword,
    };
  
    try {
      const response = await axios.post("http://localhost:3000/registerVendor", newVendor);
      // const response = await axios.post("/registerVendor", newVendor);
      console.log(response.data); // Successful registration message
      // Clear form fields or redirect as needed
      setVendorName("");
      setVendorEmail("");
      setVendorPassword("");
    } catch (error) {
      console.error(error);
      // Handle registration error (e.g., display an error message to the user)
    }
    setVendorName("");
    setVendorEmail("");
    setVendorPassword("");
  };
  


  useEffect(() => {
    // You can fetch initial data here if needed using getData()
  }, []);

  return (
    <div className="container">
       <h1>Vendor Registration</h1>
      <form onSubmit={handleVendorRegistration}>
        <label htmlFor="vendorName">Vendor Name:</label>
        <input
          type="text"
          id="vendorName"
          value={vendorName}
          onChange={(e) => setVendorName(e.target.value)}
          required
        />
        <br />

        <label htmlFor="vendorEmail">Email:</label>
        <input
          type="email"
          id="vendorEmail"
          value={vendorEmail}
          onChange={(e) => setVendorEmail(e.target.value)}
          required
        />
        <br />

        <label htmlFor="vendorPassword">Password:</label>
        <input
          type="password"
          id="vendorPassword"
          value={vendorPassword}
          onChange={(e) => setVendorPassword(e.target.value)}
          required
        />
        <br />

        <button type="submit">Register Vendor</button>
      </form>
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="productName">Product Name:</label>
        <input
          type="text"
          id="productName"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
        <br />

        <label htmlFor="productPrice">Price:</label>
        <input
          type="number"
          id="productPrice"
          step="0.01"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          required
        />
        <br />
        <label htmlFor="productImage">Product Image:</label>
        <input type="file"
        id="productImage"
        accept="image/*" // Allow only image files
        onChange={(e) => setProductImage(e.target.files[0])}
        required
        />
        <br />
        {productImage && (
            <img  
            src={URL.createObjectURL(productImage)}
            alt="Product Preview"
            width="150"
            height="150"
            />
            )}

        <label htmlFor="productDescription">Description:</label>
        <textarea
          id="productDescription"
          rows="4"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          required
        />
        <br />

        {editIndex === null ? (
          <button type="submit">Add Product</button>
        ) : (
          <>
            <button type="submit">Save Changes</button>
            <button type="button" onClick={handleCancelClick}>
              Cancel
            </button>
          </>
        )}
      </form>

      <h2>Product List</h2>
      <ul>
        {productList.map((product, index) => (
          <li key={index}>
            <img
            src={product.image} // Display the product image
            alt= {`Product ${index}`}
            
            />
            <strong>{product.name}</strong> - ${product.price}
            <br />
            {product.description}
            <br />
            

            <button
              className="edit-button" // Add a class for styling
              onClick={() => handleEditClick(index)}
            >
              Edit Product
            </button>
            <button
              className="delete-button" // Add a class for styling
              onClick={() => handleDeleteClick(index)}
            >
              Delete Product
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
