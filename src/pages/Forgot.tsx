// src/components/ForgotPassword.js

import React, { useState } from "react";
//import { forgotPassword } from "../services/authService";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
  };

  return (
    <div className="flex justify-center items-center py-20  bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-grey-800 text-center">Forgot password</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {message && <p className="text-green-500 text-sm mb-4">{message}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full py-3 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 transition"
          >
            reset password
          </button>
        </form>
        <p className="mt-4 text-center">
          <a href="/login" className="text-blue-500 hover:underline">
            go to signin
          </a>
        </p>
      </div>
    </div>
  );
};

export default Forgot;
