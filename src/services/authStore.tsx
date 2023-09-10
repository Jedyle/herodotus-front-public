import { createStore, combineReducers } from 'redux';

// NOTE : if more change need, this store should be refactored and divided between auth and lessons stuff

// action types

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const authReducer = (state: any = { token: null, username: null }, action: any) => {
    switch (action.type) {
        case LOGIN:
            return Object.assign({}, state, {
                token: action.token,
                username: action.username
            });
        case LOGOUT:
            return Object.assign({}, state, {
                token: null,
                username: null
            });
        default:
            return state;
    }
}

export const ADD_LESSON = "ADD_LESSON";
export const RESET_LESSON = "RESET_LESSON";

export const lessonReducer = (state: any = { lesson: null }, action: any) => {
    switch (action.type) {
        case ADD_LESSON:
            return Object.assign({}, state, {
                lesson: action.lesson
            })
        case RESET_LESSON:
            return Object.assign({}, state, {
                lesson: null
            });
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    auth: authReducer,
    lesson: lessonReducer
})

export const store = createStore(rootReducer);

// actions

export function storeLogin(token: string, username: string) {
    store.dispatch({
        type: LOGIN,
        token: token,
        username: username
    })
};

export function storeLogout() {
    store.dispatch({
        type: LOGOUT
    })
}

export function storeAddLesson(lesson: any) {
    store.dispatch({
        type: ADD_LESSON,
        lesson: lesson
    })
}

export function storeResetLesson() {
    store.dispatch({
        type: RESET_LESSON
    })
}
