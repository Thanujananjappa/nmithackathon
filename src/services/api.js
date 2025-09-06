// client/src/services/api.js
import axios from "axios";

const API_BASE_URL = "http://localhost:3001/api";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Request interceptor to add auth token + set correct Content-Type
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // If sending FormData, let browser set boundary
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// ----------------- Auth API -----------------
export const authAPI = {
  register: (userData) => api.post("/auth/register", userData),
  login: (credentials) => api.post("/auth/login", credentials),
};

// ----------------- User API -----------------
export const userAPI = {
  getProfile: () => api.get("/users/me"),
  updateProfile: (userData) => api.put("/users/me", userData),
};

// ----------------- Product API -----------------
export const productAPI = {
  getProducts: ({ page = 1, limit = 10, category, keyword } = {}) =>
    api.get("/products", {
      params: { page, limit, category, keyword },
    }),
  getProduct: (id) => api.get(`/products/${id}`),

  // FIX: accept optional config (needed for multipart/form-data)
  createProduct: (productData, config = {}) =>
    api.post("/products", productData, config),
  updateProduct: (id, productData, config = {}) =>
    api.put(`/products/${id}`, productData, config),
  deleteProduct: (id) => api.delete(`/products/${id}`),
};

// ----------------- Cart API -----------------
export const cartAPI = {
  getCart: () => api.get("/cart"),
  addToCart: (productId) => api.post("/cart", { productId }),
  removeFromCart: (cartId) => api.delete(`/cart/${cartId}`),
};

// ----------------- Purchase API -----------------
export const purchaseAPI = {
  getPurchases: () => api.get("/purchases"),
  checkout: () => api.post("/purchases"),
};

// ----------------- Upload API -----------------
export const uploadAPI = {
  uploadImage: (file) => {
    const formData = new FormData();
    formData.append("image", file);
    return api.post("/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};

export default api;
