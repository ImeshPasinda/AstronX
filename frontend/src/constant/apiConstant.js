import { DATE, DIM, LATITUDE, LONGITUDE } from "./commonConstant";

//Frontend Url
export const origin = 'http://localhost:3000';

//baseUrl's
export const baseUrl_auth = 'http://localhost:5000';

//POST API's
export const API_POST_LOGIN = '/api/auth/login';
export const API_POST_REGISTER = '/api/auth/register';

//GET API's
export const API_GET_APOD = 'https://api.nasa.gov/planetary/apod';
export const API_GET_EMRI = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&';
export const API_GET_TES = `https://api.nasa.gov/planetary/earth/assets?lon=${LONGITUDE}&lat=${LATITUDE}&date=${DATE}&&dim=${DIM}&`;
