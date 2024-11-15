import axios from "axios"

const instance = axios.create({
  baseURL: "https://booknest-back.onrender.com/",
  
});

export default instance;  