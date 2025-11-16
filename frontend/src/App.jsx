//PERN/frontend/src/App.jsx
import React, { useEffect } from "react"; // Import useEffect
import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";

import { Routes, Route } from "react-router-dom";
import { useThemeStore } from "./store/useThemeStore";

import { Toaster } from "react-hot-toast";

// Assuming you have these components or context for authentication
// Replace with your actual authentication logic
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
    Loading...
  </div>
);
const useAuth = () => {
  // This is a placeholder. Replace with your actual auth hook
  const [checkingAuth, setCheckingAuth] = React.useState(true);
  React.useEffect(() => {
    // Simulate an auth check
    const timer = setTimeout(() => {
      setCheckingAuth(false);
    }, 1000); // Simulate 1 second loading
    return () => clearTimeout(timer);
  }, []);
  return { checkingAuth };
};

function App() {
  const { theme } = useThemeStore();
  const { checkingAuth } = useAuth(); // Using the placeholder auth hook

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]); // Re-run when the theme changes

  if (checkingAuth) return <LoadingSpinner />;

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-50 pt-20">
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>

        <Toaster />
      </div>
    </div>
  );
}

export default App;