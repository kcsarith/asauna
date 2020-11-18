// This file includes the actions and reducer.
import Cookies from 'js-cookie'

export const SET_TASK_COMMENTS = 'SET_TASK_COMMENTS';

export const setTaskComments = (allComments) => {
    return {
        type: SET_TASK_COMMENTS,
        allComments
    }
}

export const getTaskComments = (taskId) => {
    return async dispatch => {
        const res = await fetch(`/api/comments/task/${taskId}`);
        res.data = await res.json();
        const comments = res.data.comments;
        if (res.ok) {
            dispatch(setTaskComments(comments));
            return comments
        }
        return res;
    }
}

export const addComment = (ownerId, taskId, message) => {
    console.log(ownerId);
    console.log(taskId);
    console.log(message)
    return async dispatch => {
        const res = await fetch(`/api/comments/task/${taskId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "XSRF-TOKEN": Cookies.get("XSRF-TOKEN")
            },
            body: JSON.stringify({ ownerId, taskId, message })
        });
        if (res.ok) {
            const data = await res.json();
            return data
        }
        return res;
    }
}

export default function commentReducer(state = {}, action) {
    switch (action.type) {
        case SET_TASK_COMMENTS:
            return action.allComments;
        default:
            return state;
    }
}
