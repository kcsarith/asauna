import Cookies from 'js-cookie'

// This file includes the actions and reducer.
export const CREATE_USER = 'CREATE_USER';
export const DELETE_USER = 'DELETE_USER';

export const createUser = (user) => {
    return {
        type: CREATE_USER,
        user
    }
}

export const deleteUser = () => {
    return {
        type: DELETE_USER,
    }
}


export const signup = (username, email, password) => {

    return async dispatch => {
        const res = await fetch('/api/users', {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "XSRF-TOKEN": Cookies.get("XSRF-TOKEN")
            },
            body: JSON.stringify({ username, email, password })
        });
        res.data = await res.json();
        const user = res.data.user;
        if (!res.ok) console.log(res.data.error.errors);
        if (res.ok) {
            dispatch(createUser(user));
        }
        debugger
        return res;
    }
}

export default function signupReducer(state = {}, action) {
    switch (action.type) {
        case CREATE_USER:
            return action.user;
        case DELETE_USER:
            return {};
        default:
            return state;
    }
}
