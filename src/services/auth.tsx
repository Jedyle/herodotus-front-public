import axios from 'axios';
import { Preferences } from '@capacitor/preferences';
import { storeLogin, storeLogout } from './authStore';

const AUTHDATA_KEY = "authData";

interface AuthData {
    token: string
    username: string
}

const setAuthData = async (authData: AuthData) => {
    await Preferences.set({
        key: AUTHDATA_KEY,
        value: JSON.stringify(authData)
    });
}

const getAuthData = async () => {
    const { value } = await Preferences.get({ key: AUTHDATA_KEY });
    return value ? JSON.parse(value) : null;
}

let authApi = axios.create({
    baseURL: `${import.meta.env.VITE_APP_API_URL}/rest-auth`,
    headers: {
        'Content-Type': 'application/json'
    }
})

async function postRegisterActions() {
    // actions that must be made after registration
    // 1. saving potential temporary data after an anonymous user logged in

}

// :poop: register is identical to login, because we don't need to confirm the email yet (so that registration is faster)
async function register(email: string, username: string, password1: string, password2: string) {
    let registerPromise = authApi.post('/registration/', {
        email: email,
        username: username,
        password1: password1,
        password2: password2
    });

    let userDataPromise = registerPromise.then((response) => {
        return authApi.request(
            {
                url: '/user/',
                headers: {
                    Authorization: `Token ${response.data.key}`
                }
            });
    });

    return Promise.all([registerPromise, userDataPromise]).then((responses) => {
        let [loginResponse, userResponse] = responses;
        storeLogin(loginResponse.data.key, userResponse.data.username)
        setAuthData({
            token: loginResponse.data.key,
            username: userResponse.data.username
        })
    });
}

async function login(username: string, password: string) {
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
        storeLogin(loginResponse.data.key, userResponse.data.username)
        setAuthData({
            token: loginResponse.data.key,
            username: userResponse.data.username
        })
    });
};

async function logout() {
    storeLogout()
    setAuthData({
        token: null,
        username: null
    })
}

export { setAuthData, getAuthData, register, login, logout }
