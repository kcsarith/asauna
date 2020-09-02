// This file includes the actions and reducer.

import Cookies from 'js-cookie'

export const SET_USER = 'SET_USER';
export const REMOVE_USER = 'REMOVE_USER';

export const setUser = (user) => {
    return {
        type: SET_USER,
        user
    }
}

export const removeUser = () => {
    return {
        type: REMOVE_USER,
    }
}


export const login = (username, password, rememberMe) => {
    return async dispatch => {
        const res = await fetch('./api/session', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "XSRF-TOKEN": Cookies.get("XSRF-TOKEN")
            },
            body: JSON.stringify({ username, password, rememberMe })
        });
        res.data = await res.json();
        const user = res.data.user;
        if (res.ok) {
            dispatch(setUser(user));
        }
        return res;
    }
}

export const logout = () => async dispatch => {
    const res = await fetch('/api/session', {
        method: "delete",
        headers: {
            "XSRF-TOKEN": Cookies.get("XSRF-TOKEN")
        }
    });
    if (res.ok) {
        dispatch(removeUser());
    }
}
function loadUser() {
    const authToken = Cookies.get("token");
    const rememberMe = Cookies.get("rememberMe")
    if (authToken && rememberMe === 'true') {
        try {
            const payload = authToken.split(".")[1];
            const decodedPayload = atob(payload);
            const payloadObj = JSON.parse(decodedPayload);
            const { data } = payloadObj;
            return data;
        } catch (e) {
            Cookies.remove("token");
            Cookies.remove("rememberMe")
        }
    }
    return {};
}


export default function authReducer(state = loadUser(), action) {
    switch (action.type) {
        case SET_USER:
            return action.user;
        case REMOVE_USER:
            return {};
        default:
            return state;
    }
}
