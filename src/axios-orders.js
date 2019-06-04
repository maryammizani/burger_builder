import axios from 'axios';
import URL from './key';

const instance = axios.create({
    baseURL: URL
});

export default instance;