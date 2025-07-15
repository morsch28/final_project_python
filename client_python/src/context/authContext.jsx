import { createContext, useContext, useEffect, useState } from "react";
import userServices from "../services/userServices";

const authContext = createContext();
authContext.displayName = "Auth";

function AuthProvider({ children }) {
  
  const [user,setUser] = useState(null)

  useEffect(()=>{
   const loadUser =  async() =>{
    const _user = await userServices.getUserFromToken()
    setUser(_user)
   }
   loadUser()
  })
  
  const login = async() => {
    try {
      const response = await userServices.login()
      setUser(userServices.getUserFromToken())
      return response 
    } catch (error) {
      console.log(error);
      
    }
  }
  
  const logout = () =>{
    userServices.logout()
    setUser(userServices.getUserFromToken)
  }
  

  return <authContext.Provider value={{user,login,logout}}>{children}</authContext.Provider>;
}

export function useAuth() {
  return useContext(authContext);
}

export default AuthProvider;
