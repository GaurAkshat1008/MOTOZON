import React, { useState, useEffect } from "react";
import api from "../api/axiosConfig";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    stock: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [editFile, setEditFile] = useState(null);

  const loadProducts = async () => {
    const res = await api.get("/api/products");
    setProducts(res.data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setImageFile(e.target.files[0]);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => data.append(key, formData[key]));
      if (imageFile) data.append("image", imageFile);

      const response = await api.post("/api/products", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Product added successfully:", response.data);
      setFormData({
        name: "",
        price: "",
        description: "",
        category: "",
        stock: "",
      });
      setImageFile(null);
      loadProducts();
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please check console for details.");
    }
  };

  const startEdit = (p) => {
    setEditingId(p._id);
    setEditData({
      ...p,
      price: p.price.toString(),
      stock: p.stock.toString(),
      originalImage: p.image,
    });
  };

  const handleEditChange = (e) =>
    setEditData({ ...editData, [e.target.name]: e.target.value });
  const handleEditFile = (e) => setEditFile(e.target.files[0]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = new FormData();
    ["name", "price", "description", "category", "stock"].forEach((key) =>
      data.append(key, editData[key])
    );
    if (editFile) data.append("image", editFile);
    await api.put(`/api/products/${editingId}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setEditingId(null);
    setEditFile(null);
    loadProducts();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await api.delete(`/api/products/${id}`);
      loadProducts();
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Admin Dashboard</h2>
      <form onSubmit={handleAdd} className="mb-6 p-4 border rounded space-y-2">
        <h3 className="font-semibold">Add New Product</h3>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          type="number"
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full p-2 border rounded"
        />
        <input
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          placeholder="Stock"
          type="number"
          className="w-full p-2 border rounded"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border rounded"
        />
        <input type="file" onChange={handleFileChange} className="w-full" />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Product
        </button>
      </form>
      <div className="space-y-4">
        {products.map((p) => (
          <div key={p._id} className="border p-4 rounded">
            {editingId === p._id ? (
              <form onSubmit={handleUpdate} className="space-y-2">
                <input
                  name="name"
                  value={editData.name}
                  onChange={handleEditChange}
                  className="w-full p-2 border rounded"
                />
                <input
                  name="price"
                  value={editData.price}
                  onChange={handleEditChange}
                  type="number"
                  className="w-full p-2 border rounded"
                />
                <input
                  name="category"
                  value={editData.category}
                  onChange={handleEditChange}
                  className="w-full p-2 border rounded"
                />
                <input
                  name="stock"
                  value={editData.stock}
                  onChange={handleEditChange}
                  type="number"
                  className="w-full p-2 border rounded"
                />
                <textarea
                  name="description"
                  value={editData.description}
                  onChange={handleEditChange}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="file"
                  onChange={handleEditFile}
                  className="w-full"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditingId(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </form>
            ) : (
              <div className="flex justify-between">
                <div className="flex items-center space-x-4">
                  {p.image && (
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-16 h-16 object-cover rounded"
                      onError={(e) => {
                        console.error("Image failed to load:", p.image);
                        e.target.src =
                          "https://via.placeholder.com/150?text=No+Image";
                      }}
                    />
                  )}
                  <div>
                    <h4 className="font-semibold text-lg">{p.name}</h4>
                    <p>₹{p.price}</p>
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => startEdit(p)}
                    className="text-blue-500 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
