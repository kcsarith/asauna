
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

export default function commentReducer(state = {}, action) {
    switch (action.type) {
        case SET_TASK_COMMENTS:
            return action.allComments;
        default:
            return state;
    }
}
