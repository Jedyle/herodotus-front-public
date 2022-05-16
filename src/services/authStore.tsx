import { createStore } from 'redux';

// action types

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

// actions

export const login = (token: string, username: string) => ({
  type: LOGIN,
  token: token,
  username: username
});

export const logout = () => (
  {
    type: LOGOUT
  }
)

export const authReducer = (state: any = {token: null, username: null}, action: any) => {
  switch(action.type){
    case LOGIN:
      return Object.assign({}, state, {
	token: action.token,
	username: action.username
      });
    case LOGOUT:
      return {
	token: null,
	username: null
      };
    default:
      return state || {};
  }
}

export const store = createStore(authReducer);
