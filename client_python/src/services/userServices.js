import httpService from "./httpServices";
import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "token";

function createUser(user) {
  return httpService.post("auth/register/", user);
}

async function login(credential) {
  const response = await httpService.post("auth/login/", credential);
  setToken(response.data.jwt);
  return response;
}

function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
  setAuthHeader();
}

function setAuthHeader() {
  httpService.setDefaultHeader("Authorization", `Bearer ${getJwt()}`);
}

function getJwt() {
  return localStorage.getItem(TOKEN_KEY);
}

function logout() {
  localStorage.removeItem(TOKEN_KEY);
}

function getUserFromToken() {
  const token = getJwt();
  if (!token || typeof token !== "string") {
    return null;
  }
  return jwtDecode(token);
}

async function getUserById(id) {
  const response = await httpService.get(`/userProfiles/${id}/`);
  return response;
}

const userServices = {
  getUserFromToken,
  login,
  createUser,
  logout,
  setAuthHeader,
  setToken,
  getJwt,
  getUserById,
};

export default userServices;
