import axios from 'axios';
import { apiBaseUrl } from '../urlConfig';

const axiosInstance = axios.create({
    baseURL: apiBaseUrl

    // headers: {
    //     Authorization: ''
    // }
});

export default axiosInstance;