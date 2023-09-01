import axios from "axios";

const apiUlr = process.env.REACT_APP_API_BASE_URL
console.log(apiUlr)
const api = axios.create({baseURL: apiUlr})

export default api