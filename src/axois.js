import axios from 'axios';

const uRL = axios.create({
    baseURL: 'https://api.github.com/'
});

export default uRL;
