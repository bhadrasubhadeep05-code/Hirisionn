import React, { useState, useEffect, useCallback } from "react";
import AppContext from "./AppContext";
import { getUser } from "../services/user.api";

const AppProvider = ({ children }) => {
  // Production uses HTTP-only cookie auth; localStorage fallback is only for localhost/dev testing.
  const [token, setToken] = useState(
    import.meta.env.PROD ? "" : localStorage.getItem("token") || ""
  );
  const [ProfileComplete, setProfileComplete] = useState(false);
  const [formContext, setFormContext] = useState(true);
  const [user, setUser]= useState({})
  const [loading, setLoading] = useState(true);
  const [isPageLoading, setIsPageLoading] = useState(false);
  // Fetch user data - can be called on app load and after login/register
  const fetchUser = useCallback(async (authToken = token) => {
    // const effectiveToken = authToken || token || localStorage.getItem("token") || "";

    // if (!effectiveToken && !import.meta.env.PROD) {
    //   console.log("Token Missing")
    //   setLoading(false);
    //   return;
    // }
    
    try {
      setLoading(true);
      // Production uses HTTP-only cookie auth and does not need a token header.
      // In localhost/dev mode, use the localStorage fallback.
      // if (effectiveToken) {
      //   localStorage.setItem("token", effectiveToken);
      // }
      
      const userData = await getUser();
      const userPayload = userData?.user;

      if (!userPayload) {
        throw new Error("No user payload returned from getUser");
      }

      setUser(userPayload);
      setProfileComplete(userPayload.isProfileComplete || false);
      setFormContext(userPayload.isProfileComplete)
    } catch (error) {
      console.error("Failed to fetch user:", error);
      // Clear invalid token
      // setToken("");
      // if (!import.meta.env.PROD) {
      //   localStorage.removeItem("token");
      // }
      setUser({});
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Run getUser automatically when app loads
  useEffect(() => {
    const loadUser = async () => {
      await fetchUser();
    };
    loadUser();
  }, [fetchUser]);

  // Update localStorage when token changes
  useEffect(() => {
    // Production stores auth in an HTTP-only cookie.
    // Uncomment the localStorage sync below only for localhost/dev testing.
    // if (token) {
    //   localStorage.setItem("token", token);
    // } else {
    //   localStorage.removeItem("token");
    // }
  }, [token]);

  // Loading bar control functions
  const startLoading = useCallback(() => {
    setIsPageLoading(true);
  }, []);

  const stopLoading = useCallback(() => {
    setIsPageLoading(false);
  }, []);



  return (
    <AppContext.Provider value={{ 
      setToken, 
      token, 
      ProfileComplete, 
      setProfileComplete, 
      user, 
      setUser,
      loading,
      fetchUser,
      isPageLoading,
      startLoading,
      stopLoading,
      formContext
    }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;