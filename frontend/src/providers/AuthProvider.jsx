import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuth } from "@clerk/clerk-react";
import { createContext, useEffect } from "react";

const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const { getToken } = useAuth();

  useEffect(() => {
    const interceptor = axiosInstance.interceptors.request.use(
      async (config) => {
        try {
          const token = await getToken();
          if (token) config.headers.Authorization = `Bearer ${token}`;
        } catch (error) {
          if (
            error.message?.includes("auth") ||
            error.message?.include("token")
          ) {
            toast.error("Authentication issue. Refresh the page");
          }
          console.log("Error getting token: ", error);
        }
        return config;
      },
      (error) => {
        console.error("Axios request error: ", error);
        return Promise.reject(error);
      }
    );

    return () => axiosInstance.interceptors.request.eject(interceptor);
  }, [getToken]);

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}
