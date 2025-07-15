import SignUp from "../pages/SignUp";
import httpService from "./httpServices";
import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "token"

function createUser(user){
    return httpService.post("/register",user)
}

async function login(credential){
    try {
        const response = await httpService.post("/token/",credential)
        setToken(response.data)
        return response
    } catch (error) {
        console.log(error);     
    }
}

function setToken(token){
    localStorage.setItem(TOKEN_KEY,token)
    refreshToken()
}
function refreshToken(){
    httpService.setDefaultHeader("x-auth-token/",getJwt())
}

function getJwt(){
    return localStorage.getItem(TOKEN_KEY)
}

function logout(){
    localStorage.removeItem(TOKEN_KEY)
}

async function getUserFromToken(){
    try {
        const token = getJwt()
        return jwtDecode(token)
    } catch (error) {
        console.log(error);
        
    }   
}

const userServices = {
    getUserFromToken,
    login,
    createUser,
    logout,
    refreshToken
}

export default userServices