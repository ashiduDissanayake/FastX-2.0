import { createContext, useState, useContext, useEffect } from "react";

const MainManagerAuthContext = createContext(null);

export const MainManagerAuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true); // To prevent rendering until auth status is checked

  // Check if the user is authenticated by calling the backend
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:8080/mainmanager/check-auth", {
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
      await fetch("http://localhost:8080/mainmanager/logout", {
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
    <MainManagerAuthContext.Provider value={{ auth, login, logout, loading }}>
      {children}
    </MainManagerAuthContext.Provider>
  );
};

export const useAuth = () => useContext(MainManagerAuthContext);
