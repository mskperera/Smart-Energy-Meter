import axios from "axios";
import customAxios from "../utils/axios";
const API = process.env.NEXT_PUBLIC_API_KEY;



export const login = async formData => {

  try{
  const res = await customAxios.post(`/auth/login`, formData);
  localStorage.setItem('token', res.data.token);
  localStorage.setItem('refreshToken', res.data.refreshToken);
  localStorage.setItem('userData', JSON.stringify(res.data.user));
  return res;
  }catch(err){
    throw err;
  }
};

export const refreshAccessToken = async (data) => {
  try{
    console.log('refreshAccessToken');
  const refreshToken=localStorage.getItem('refreshToken');


  return await customAxios
      .post(`/auth/refresh-access-token`, data, {
        headers: {
          'Content-Type': 'application/json',
          "authrefresh":`Bearer ${refreshToken}`
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  } catch (err) {
    return err;
  }

}


export const getUser=()=>{
const user=localStorage.getItem('userData');
const obj = JSON.parse(user);
return obj;
}

// Logout function
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userData');
};


export const decodeToken = token => {
 
  const payloadBase64 = token.split('.')[1];
  const payloadJson = atob(payloadBase64);
  const payload = JSON.parse(payloadJson);
  console.log('Decoded Payload:', payload);
  return payload;

};