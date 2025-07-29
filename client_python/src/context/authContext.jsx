import { createContext, useContext, useEffect, useState } from "react";
import userServices from "../services/userServices";

const authContext = createContext();
authContext.displayName = "Auth";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoggedInOnce, setHasLoggedInOnce] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const _user = userServices.getUserFromToken();
        setUser(_user);
      } catch (error) {
        console.log("Error loading user", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, []);

  const login = async (credential) => {
    try {
      const response = await userServices.login(credential);
      if (response.status == 200) {
        const userFromToken = userServices.getUserFromToken();
        setUser(userFromToken);
        setHasLoggedInOnce(true);
        return { status: true };
      } else {
        return { status: false, message: "Failed loggedIn" };
      }
    } catch (error) {
      return { status: false, message: error.message };
    }
  };

  const createUser = async (user) => {
    try {
      setIsLoading(true);
      const response = await userServices.createUser(user);
      if (response.status == 201) {
        await login({ username: user.username, password: user.password });
        return { status: true };
      } else {
        return { status: false, message: "Create user failed" };
      }
    } catch (error) {
      return { status: false, message: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    userServices.logout();
    setUser(null);
  };

  const getUserById = async () => {
    try {
      const fullUserDetails = await userServices.getUserById(user.user_id);
      return fullUserDetails.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <authContext.Provider
      value={{
        user,
        login,
        logout,
        isLoading,
        getUserById,
        hasLoggedInOnce,
        createUser,
      }}
    >
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  return useContext(authContext);
}
