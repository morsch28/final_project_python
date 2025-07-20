import { createContext, useContext, useEffect, useState } from "react";
import userServices from "../services/userServices";

const authContext = createContext();
authContext.displayName = "Auth";

 export default function AuthProvider({ children }) {
  
  const [user,setUser] = useState(null)
  const [isLoading,setIsLoading] = useState(true)
  

  useEffect(()=>{
   const loadUser =  async() =>{
    try {
      const _user = await userServices.getUserFromToken()
      setUser(_user)
    } catch (error) {
      console.log("Error loading user",error);  
    } finally{
      setIsLoading(false)
    }
    
   }
   loadUser()
  },[])
  
  const login = async(credential) => {
    try {
      const response = await userServices.login(credential)
      const userFromToken = await userServices.getUserFromToken()
      setUser(userFromToken)
      return response 
    } catch (error) {
      console.log(error);
      
    }
  }
  
  const logout = () =>{
    userServices.logout()
    setUser(null)
  }
  

  return <authContext.Provider value={{user,login,logout,isLoading}}>{children}</authContext.Provider>;
}

export function useAuth() {
  return useContext(authContext);
}


