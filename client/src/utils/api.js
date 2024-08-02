// utils/api.js (frontend)
import axios from "axios";

const AUTH_URL = "http://localhost:3001/auth";
const ODOO_URL = "http://localhost:3001/odoo";
const CART_URL = "http://localhost:3001/cart";

// Register user
export const registerUser = async (userData) => {
  const response = await axios.post(
    `${AUTH_URL}/register`,
    JSON.stringify(userData),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Login user
export const loginUser = async (userData) => {
  const response = await axios.post(
    `${AUTH_URL}/login`,
    JSON.stringify(userData),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Get user cart items
export const fetchUserCart = async (token) => {
  // console.log(token);
  const response = await axios.get(CART_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Update user cart items
export const updateUserCart = async (token, cartItems) => {
  console.log(cartItems);
  const response = await axios.post(CART_URL, JSON.stringify(cartItems), {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Remove user cart item by unique key
export const removeUserCartItem = async (token, uniqueKey) => {
  const response = await axios.delete(`${CART_URL}/${uniqueKey}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

//Odoo Api
export const fetchFromBackend = async (endpoint) => {
  try {
    const response = await fetch(`${ODOO_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
