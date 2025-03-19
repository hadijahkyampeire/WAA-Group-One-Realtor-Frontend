import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.request.use(
  (config) => {
      const token = localStorage.getItem('token');
      if (token) {
          config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
  },
  (error) => Promise.reject(error)
);

export const getFileUrl = (fileUrl) => {
  if(fileUrl!==undefined){
    const baseUrl="https://pms-bucket-temp.s3.us-east-1.amazonaws.com/";
    return baseUrl + fileUrl;
  }
  return undefined;
};
