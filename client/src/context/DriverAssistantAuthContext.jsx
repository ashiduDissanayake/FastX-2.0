import { createContext, useState, useContext, useEffect } from "react";

const DriverAssistantAuthContext = createContext(null);

export const DriverAssistantAuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true); // To prevent rendering until auth status is checked

  // Check if the user is authenticated by calling the backend
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:8080/driverassistant/check-auth", {
          method: "GET",
          credentials: "include", // Make sure cookies are included in the request
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        if (data.isAuthenticated) {
          setAuth(true);
        } else {
          setAuth(false);
        }
      } catch (err) {
        console.error("Error checking authentication:", err);
        setAuth(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = () => {
    setAuth(true);
  };

  const logout = async () => {
    try {

      // Send local cart to server to save in the database
      await fetch("http://localhost:8080/driverassistant/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include"
      });

      // Log the user out
      setAuth(false);
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };

  return (
    <DriverAssistantAuthContext.Provider value={{ auth, login, logout, loading }}>
      {children}
    </DriverAssistantAuthContext.Provider>
  );
};

export const useAuth = () => useContext(DriverAssistantAuthContext);