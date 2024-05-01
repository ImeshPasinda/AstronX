import { useEffect, useState } from 'react';
import CryptoJS from "crypto-js";

export default function useUserAuthInfo() {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const encryptedUData = localStorage.getItem('uData');
        if (encryptedUData) {
          const decryptedUData = CryptoJS.AES.decrypt(encryptedUData, process.env.REACT_APP_ENCRYPTION_SECRET).toString(CryptoJS.enc.Utf8);
          const userData = JSON.parse(decryptedUData);
          setUserDetails(userData);
        } else {
          console.error('No user data found in local storage.');
        }
      } catch (error) {
        console.error('Error decrypting or parsing user data:', error);
      }
    };

    fetchUserDetails();
  }, []);

  return userDetails;
};
