import React, { useState, useEffect, useCallback } from "react";
import AppContext from "./AppContext";
import { getUser } from "../services/user.api";

const AppProvider = ({ children }) => {
  // Initialize token from localStorage on first page load (this was the missing fix!)
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [ProfileComplete, setProfileComplete] = useState(false);
  const [user, setUser]= useState({})
  const [loading, setLoading] = useState(true);

  // Fetch user data - can be called on app load and after login/register
  const fetchUser = useCallback(async (authToken = token) => {
    if (!authToken) {
      console.log("Token Missing")
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      // ✅ Fix: Set token in localStorage BEFORE making API call
      // Eliminates race condition with axios interceptor
      localStorage.setItem("token", authToken);
      
      const userData = await getUser();
      setUser(userData);
      setProfileComplete(userData.isProfileComplete  || false);
    } catch (error) {
      console.error("Failed to fetch user:", error);
      // Clear invalid token
      setToken("");
      localStorage.removeItem("token");
      setUser({});
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Run getUser automatically when app loads
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // Update localStorage when token changes
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);



  return (
    <AppContext.Provider value={{ 
      setToken, 
      token, 
      ProfileComplete, 
      setProfileComplete, 
      user, 
      setUser,
      loading,
      fetchUser 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;