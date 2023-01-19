import axios from 'axios';

const API = axios.create({
    baseURL: "https://my-json-server.typicode.com/henriquehanthequeste/poc-semiarido",
});

export default API;