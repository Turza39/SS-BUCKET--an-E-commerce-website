import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Reset.css";
import Toast from "./Toast";

const Reset = () => {
  const [toast, setToast] = useState({ message: "", type: "" });
  const showToast = (message, type) => {
    setToast({ message, type });
  };
  const closeToast = () => {
    setToast({ message: "", type: "" });
  };

  const [admin, setAdmin] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    email: "",
    bankAccountNo: "",
    password: "",
    currentPassword: "",
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await axios.get('http://localhost:4000/getadmin');
        setAdmin(response.data.admin);
        if (response.data.admin) {
          setFormData({
            name: response.data.admin.name,
            image: response.data.admin.image,
            email: response.data.admin.email,
            bankAccountNo: response.data.admin.bankAccountNo,
            password: "",
            currentPassword: "",
          });
          setPreviewImage(response.data.admin.image);
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setAdmin(null);
        } else {
          setMessage("Error fetching admin information.");
        }
      }
    };
    fetchAdmin();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
        setFormData((prevData) => ({
          ...prevData,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (admin) {
        const updateAdmin = {
          name: formData.name,
          image: formData.image,
          email: formData.email,
          bankAccountNo: formData.bankAccountNo,
          password: formData.password,
          currentPassword: formData.currentPassword,
        };

        const response = await axios.post(`http://localhost:4000/addadmin`, updateAdmin);
        showToast(response.data.message, "success");
        setAdmin(response.data.admin);

        setFormData((prevData) => ({
          ...prevData,
          password: "",
          currentPassword: "",
        }));
      } else {
        const newAdmin = {
          name: formData.name,
          image: formData.image,
          email: formData.email,
          bankAccountNo: formData.bankAccountNo,
          password: formData.password,
        };

        const response = await axios.post(`http://localhost:4000/addadmin`, newAdmin);
        showToast(response.data.message, "success.");
        setAdmin(response.data.admin);

        setFormData((prevData) => ({
          ...prevData,
          password: "",
        }));
      }
    } catch (error) {
      showToast(error.response?.data?.message || "An error occurred.", "error");
    }
  };


  return (
    <div className="admin-container">
      <Toast message={toast.message} type={toast.type} onClose={closeToast} />
      <h1 className="admin-title">
        {admin ? "Update Admin Profile" : "Create Admin Profile"}
      </h1>
      {message && <p className="admin-message">{message}</p>}

      <div className="image-preview-container">
        <img
          src={previewImage || "https://via.placeholder.com/150"}
          alt="Preview"
          className="image-preview"
        />
      </div>

      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Upload Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Bank Account No:</label>
          <input
            type="text"
            name="bankAccountNo"
            value={formData.bankAccountNo}
            onChange={handleInputChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            {admin ? "New Password:" : "Create Password:"}
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required={!admin}
            className="form-input"
          />
        </div>

        {admin && (
          <div className="form-group">
            <label className="form-label">Current Password:</label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleInputChange}
              placeholder="Enter current password to update"
              required
              className="form-input"
            />
          </div>
        )}

        <button type="submit" className="form-button">
          {admin ? "Update Admin" : "Create Admin"}
        </button>
      </form>
    </div>
  );
};

export default Reset;
