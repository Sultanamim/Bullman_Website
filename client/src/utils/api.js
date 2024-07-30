import axios from "axios";

const AUTH_URL = "http://localhost:3001/auth";
const ODOO_URL = "http://localhost:3001/odoo";

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
