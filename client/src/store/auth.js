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


export const login = (username, password) => {
    return async dispatch => {
        const res = await fetch('./api/session', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "XSRF-TOKEN": Cookies.get("XSRF-TOKEN")
            },
            body: JSON.stringify({ username, password })
        });
        res.data = await res.json();
        if (res.ok) {
            dispatch(setUser(res.data.user));
        }
        return res;
    }
}

export const logout = () => {
    return async (dispatch) => {
        const res = await fetch('/api/users/sessions', {
            method: 'delete',
        });
        if (res.ok) dispatch(removeUser());
        res.data = await res.json();
        return res;
    }
}

window.login = login;

export default function authReducer(state = {}, action) {
    switch (action.type) {
        case SET_USER:
            return action.user;
        default:
            return state;
    }
}
