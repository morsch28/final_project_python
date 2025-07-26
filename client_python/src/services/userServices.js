import SignUp from "../pages/SignUp";
import httpService from "./httpServices";
import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "token"

function createUser(user){
    return httpService.post("auth/register/",user)
}

async function login(credential){
    try {
        const response = await httpService.post("auth/login/",credential)
        setToken(response.data.jwt)
        return response
    } catch (error) {
        console.error(error)
    }
}

function setToken(token){
    localStorage.setItem(TOKEN_KEY,token)
    refreshToken()
}

function refreshToken(){
    httpService.setDefaultHeader("Authorization", `Bearer ${getJwt()}`);
}

function getJwt(){
    return localStorage.getItem(TOKEN_KEY)
}

function logout(){
    localStorage.removeItem(TOKEN_KEY)
}

function getUserFromToken(){
    try {
        const token = getJwt()
        if (!token || typeof token !== "string") {
            return null;
        }
        return jwtDecode(token)
    } catch (error) {
        console.error(error)
        
    }   
}

async function getUserById(id) {
  try {
    const response = await httpService.get(`/userProfiles/${id}/`);
    return response
  } catch (error) {
    console.error("Error fetching user by ID:", error);
  }
}

const userServices = {
    getUserFromToken,
    login,
    createUser,
    logout,
    refreshToken,
    setToken,
    getJwt,
    getUserById

}

export default userServices