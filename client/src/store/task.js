// This file includes the actions and reducer.
import Cookies from 'js-cookie'

export const SET_ALL_TASKS = 'SET_ALL_TASKS';
export const SET_CURRENT_TASK = 'SET_CURRENT_TASK';
export const CREATE_TASK = 'CREATE_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const SWAP_TASKS = 'SWAP_TASKS';

export const setAllTasks = (allTasks) => {
    return {
        type: SET_ALL_TASKS,
        allTasks
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

export const swapTasks = (listOrder1, listOrder2) => {
    return {
        type: SWAP_TASKS,
        listOrder1,
        listOrder2
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

export const patchTaskListOrder = (sourceIndex, destinationIndex) => {
    return async (dispatch) => {
        const res = await fetch(`/api/tasks/patch_list-order`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
            },
            body: JSON.stringify({ sourceIndex, destinationIndex })
        });
        if (res.ok) {
        }
        return res;
    }
}

export const patchTaskListOrderColumns = (source, destination) => {
    return async (dispatch) => {
        const res = await fetch(`/api/tasks/patch_list-order-columns`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
            },
            body: JSON.stringify({ source, destination })
        });
        if (res.ok) {
        }
        return res;
    }
}

export const patchTaskName = (taskId, newName) => {
    return async (dispatch) => {
        const res = await fetch(`/api/tasks/patch_name`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
            },
            body: JSON.stringify({ taskId, newName })
        });
        if (res.ok) {
        }
        return res;
    }
}

export const patchTaskDescription = (taskId, newDescription) => {
    return async (dispatch) => {
        const res = await fetch(`/api/tasks/patch_description`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
            },
            body: JSON.stringify({ taskId, newDescription })
        });
        if (res.ok) {
        }
        return res;
    }
}

export const patchTaskStatus = (taskId, newStatus) => {
    return async (dispatch) => {
        const res = await fetch(`/api/tasks/patch_status`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
            },
            body: JSON.stringify({ taskId, newStatus })
        });
        if (res.ok) {
        }
        return res;
    }
}

export const deleteTask = (taskId) => {
    return async (dispatch) => {
        const res = await fetch(`/api/tasks/${taskId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
            },
            body: JSON.stringify({ taskId })
        });
        if (res.ok) {
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
            ;
        }
        return { task };
    }
}

export const createNewTask = (name, description, ownerId, projectId) => {

    return async dispatch => {
        const res = await fetch('/api/tasks', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "XSRF-TOKEN": Cookies.get("XSRF-TOKEN")
            },
            body: JSON.stringify({ name, description, ownerId, projectId })
        });
        res.data = await res.json();
        const task = res.data.Task;
        if (res.ok) {
        }
        return res;
    }
}

export default function taskReducer(state = {}, action) {
    switch (action.type) {
        case SET_ALL_TASKS:
            return action.allTasks;
        case SET_CURRENT_TASK:
            return action.currentTask;
        case SWAP_TASKS:
            return { listOrder1: action.listOrder1, listOrder2: action.listOrder2 };
        default:
            return state;
    }
}
