import Cookies from 'js-cookie';
import CryptoJS from "crypto-js";
import { NAVIGATE_TO_HOME, NAVIGATE_TO_LOGIN } from "../constant/routeConstant";

export const decodeAuthToken = (authToken) => {
  if (!authToken) {
    return null;
  }

  const base64Url = authToken.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(atob(base64));
};

export const isUserLoggedIn = () => {
  if (localStorage.getItem('uData')) {
    const encryptedUData = localStorage.getItem('uData');
    const decryptedUData = CryptoJS.AES.decrypt(encryptedUData, process.env.REACT_APP_ENCRYPTION_SECRET).toString(CryptoJS.enc.Utf8);
    const userData = JSON.parse(decryptedUData);
    return !!userData && !!userData.userId && !!userData.username && !!userData.email;
  } else {
    return false;
  }
}

export const redirectAfterLogin = (loggedIn) => {
  if (loggedIn) {
    window.location.href = NAVIGATE_TO_HOME;
  }
};

export const maskEmail = (email) => {
  const atIndex = email.indexOf('@');
  const firstThreeLetters = email.substring(0, 3);
  const domain = email.substring(atIndex + 1);
  return `${firstThreeLetters}**@${domain}`;
};

export const handleLogout = () => {
  // Remove the authToken from cookies
  Cookies.remove('authToken');
  localStorage.clear();
  window.location.href = NAVIGATE_TO_LOGIN;
};


