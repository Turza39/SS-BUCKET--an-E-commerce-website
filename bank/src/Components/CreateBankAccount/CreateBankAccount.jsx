import React, { useState } from 'react';
import './CreateBankAccount.css';

const CreateBankAccount = () => {
  const [accountInfo, setAccountInfo] = useState({
    name: '',
    email: '',
    phone: '',
    accountNo: '',
    secretKey: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Validation function
  const validate = () => {
    const newErrors = {};
    if (!accountInfo.name) newErrors.name = 'Name is required';
    if (!accountInfo.email) newErrors.email = 'Email is required';
    if (!accountInfo.phone) newErrors.phone = 'Phone number is required';
    if (!accountInfo.accountNo) newErrors.accountNo = 'Account number is required';
    if (!accountInfo.secretKey) newErrors.secretKey = 'Secret key is required';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccountInfo({ ...accountInfo, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:4000/createaccount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(accountInfo),
      });

      const data = await response.json();
      
      // Check for success or error in the response
      if (response.ok) {
        alert(data.message || 'Bank account created successfully!');
        setAccountInfo({
          name: '',
          email: '',
          phone: '',
          accountNo: '',
          secretKey: ''
        });
      } else {
        alert(`Error: ${data.message || data.errors || 'Failed to create account'}`);
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-account-container">
      <form onSubmit={handleSubmit} className="create-account-form">
        <h2>Create Bank Account</h2>

        <label>
          Name:
          <input
            type="text"
            name="name"
            value={accountInfo.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={accountInfo.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </label>

        <label>
          Phone:
          <input
            type="tel"
            name="phone"
            value={accountInfo.phone}
            onChange={handleChange}
          />
          {errors.phone && <p className="error">{errors.phone}</p>}
        </label>

        <label>
          Account Number:
          <input
            type="text"
            name="accountNo"
            value={accountInfo.accountNo}
            onChange={handleChange}
          />
          {errors.accountNo && <p className="error">{errors.accountNo}</p>}
        </label>

        <label>
          Secret Key:
          <input
            type="password"
            name="secretKey"
            value={accountInfo.secretKey}
            onChange={handleChange}
          />
          {errors.secretKey && <p className="error">{errors.secretKey}</p>}
        </label>

        <button type="submit" disabled={loading}>
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>
    </div>
  );
};

export default CreateBankAccount;