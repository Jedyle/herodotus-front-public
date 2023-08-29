import axios from 'axios';

import { getAuthData } from './auth';

const defaultOptions = {
    baseURL : `${import.meta.env.VITE_APP_API_URL}`,
    headers : {
        'Content-Type': 'application/json'
    }
};

const makeAuthHeader = (token: string) => `Token ${token}`;

let api = axios.create(defaultOptions);

api.interceptors.request.use(async function (config) {
  let authData = await getAuthData();
  if (authData && authData.token){
    config.headers.Authorization =  makeAuthHeader(authData.token);
  }
  return config;
});

export {api, makeAuthHeader };
