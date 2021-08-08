import axios from 'axios';
import { Storage } from '@capacitor/storage';
import { store, LOGIN } from './authStore';

const AUTHDATA_KEY = "authData";

interface AuthData {
  token: string
  username: string
}

const setAuthData = async (authData: AuthData) => {
  await Storage.set({
    key: AUTHDATA_KEY,
    value: JSON.stringify(authData)
  });
}

const getAuthData = async () => {
  const { value } = await Storage.get({key: AUTHDATA_KEY});
  return value ? JSON.parse(value) : null;
} 

let authApi = axios.create({
  baseURL : `${process.env.REACT_APP_API_URL}/rest-auth`,
  headers : {
    'Content-Type': 'application/json'
  }
})

async function login(username: string, password: string){
    let loginPromise = authApi.post('/login/', {
        username: username,
        password: password
    });

    let userDataPromise = loginPromise.then((loginResponse) => {
        return authApi.request(
          {
                url: '/user/',
                headers: {
                    Authorization: `Token ${loginResponse.data.key}`
                }
            });
    });

  return Promise.all([loginPromise, userDataPromise]).then((responses) => {
    let [loginResponse, userResponse] = responses;
    store.dispatch({
      type: LOGIN,
      token: loginResponse.data.key,
      username: userResponse.data.username
    })
    setAuthData({
      token: loginResponse.data.key,
      username: userResponse.data.username
    })
  });
};

export { setAuthData, getAuthData, login }
