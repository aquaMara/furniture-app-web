import axios from 'axios';
const BASE_URL = 'http://87.249.49.149/';
// const BASE_URL = 'https://littlebrushedbook36.conveyor.cloud/';

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' }
});