import React, { useEffect, useState } from 'react';
import './Transactions.css'; // Ensure this file exists and is styled appropriately
import axios from 'axios';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/getTransactions');
        if (response.data.success) {
          setTransactions(response.data.data);
        } else {
          console.error('Failed to fetch transactions:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div>
      <h2>Transactions</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Receiver Account No.</th>
            <th>Sender Account No.</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={transaction._id}>
              <td>{index + 1}</td>
              <td>{transaction.receiverAccountNumber}</td>
              <td>{transaction.accountNumber}</td>
              <td>${transaction.transactionAmount}</td>
              <td>{new Date(transaction.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;