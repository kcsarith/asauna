// This file includes the actions and reducer.
import Cookies from 'js-cookie'

export const SET_ALL_TASKS = 'SET_ALL_TASKS';
export const SET_CURRENT_TASK = 'SET_CURRENT_TASK';
export const CREATE_TASK = 'CREATE_TASK';
export const DELETE_TASK = 'DELETE_TASK';

export const setAllTasks = (tasks) => {
    return {
        type: SET_ALL_TASKS,
        tasks
    }
}

export const setCurrentTask = (currentTask) => {
    return {
        type: SET_CURRENT_TASK,
        currentTask
    }
}

export const createTask = (task) => {
    return {
        type: CREATE_TASK,
        task
    }
}

export const getAllTasks = () => {
    return async dispatch => {
        const res = await fetch(`/api/tasks`, {
            headers: {
                "XSRF-TOKEN": Cookies.get("XSRF-TOKEN")
            },
        });
        res.data = await res.json();
        const tasks = res.data.tasks;
        if (res.ok) {
            dispatch(setAllTasks(tasks));
        }
        return res;
    }
}

export const getOneTask = (id) => {
    return async dispatch => {
        const res = await fetch(`/api/tasks/${id}`, {
            headers: {
                "XSRF-TOKEN": Cookies.get("XSRF-TOKEN")
            },
        });
        res.data = await res.json();
        const task = res.data.task;
        if (res.ok) {
            dispatch(setAllTasks(task));
        }
        return res;
    }
}

export const createNewTask = (ownerId, workspaceId) => {

    return async dispatch => {
        const res = await fetch('/api/tasks', {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "XSRF-TOKEN": Cookies.get("XSRF-TOKEN")
            },
            body: JSON.stringify({ ownerId, workspaceId })
        });
        res.data = await res.json();
        const task = res.data.Task;
        if (res.ok) {
            dispatch(createTask(task));
        }
        return res;
    }
}

export default function taskReducer(state = {}, action) {
    switch (action.type) {
        case SET_ALL_TASKS:
            return action.tasks;
        case SET_CURRENT_TASK:
            return action.currentTask;
        default:
            return state;
    }
}
