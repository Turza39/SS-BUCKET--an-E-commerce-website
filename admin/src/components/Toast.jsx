import React, { useState } from "react";
import "./Toast.css"; 
const Toast = ({ message, type, onClose }) => {
    if (!message) return null;
    setTimeout(onClose, 2000);
    return (
        <div className={`toast toast-${type}`}>
            {message}
        </div>
    );
};

export default Toast;
