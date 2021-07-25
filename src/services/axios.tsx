import axios from 'axios';

const defaultOptions = {
    baseURL : `${process.env.REACT_APP_API_URL}/api`,
    headers : {
        'Content-Type': 'application/json'
    }
};

const makeAuthHeader = (token: string) => `Token ${token}`;

let api = axios.create(defaultOptions);

const getToken = () => {
    return process.env.REACT_APP_TMP_TOKEN
}

api.interceptors.request.use(function (config) {
    let token = getToken();
    if (token){
        config.headers.Authorization =  makeAuthHeader(token);
    }
    return config;
});

export {api, makeAuthHeader};
