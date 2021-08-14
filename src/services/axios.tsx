import { useEffect } from "react"
import { useHistory } from "react-router-dom"
import axios from 'axios';

import { getAuthData } from './auth';

const defaultOptions = {
    baseURL : `${process.env.REACT_APP_API_URL}`,
    headers : {
        'Content-Type': 'application/json'
    }
};

const makeAuthHeader = (token: string) => `Token ${token}`;

let api = axios.create(defaultOptions);

const setupInterceptors = (history: any) => {
  api.interceptors.request.use(async function (config) {
    let authData = await getAuthData();
    if (authData && authData.token){
      config.headers.Authorization =  makeAuthHeader(authData.token);
    }
    return config;
  });

  api.interceptors.response.use(response => (response), error => {
    if (error.response.status == 403){
      history.replace({
	pathname: "/login",
	search: `?redirect=${history.location.pathname}`
      });
    }
    // every api call need to implement a 'catch'
    return Promise.reject(error);
  });
}

const InjectAxiosInterceptors: React.FC = () => {
  // a component that render nothings, but initializes axios in order to redirect to login page if no token is present
  const history = useHistory()

  useEffect(() => {
    setupInterceptors(history)
  }, [history])

  // not rendering anything
  return null
}

export {api, makeAuthHeader, InjectAxiosInterceptors};
