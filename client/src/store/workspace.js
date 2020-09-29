// This file includes the actions and reducer.
import Cookies from 'js-cookie'

export const SET_ALL_WORKSPACES = 'SET_ALL_WORKSPACES';
export const SET_CURRENT_WORKSPACE = 'SET_CURRENT_WORKSPACE';
export const CREATE_WORKSPACE = 'CREATE_WORKSPACE';
export const DELETE_WORKSPACE = 'DELETE_WORKSPACE';

export const setAllWorkspaces = (workspaces) => {
    return {
        type: SET_ALL_WORKSPACES,
        workspaces
    }
}

export const setCurrentWorkspace = (currentWorkspaces) => {
    return {
        type: SET_CURRENT_WORKSPACE,
        currentWorkspaces
    }
}

export const createWorkspace = (workspace) => {
    return {
        type: CREATE_WORKSPACE,
        workspace
    }
}

export const getAllWorkspaces = () => {
    return async dispatch => {
        const res = await fetch(`/api/workspaces`, {
            headers: {
                "XSRF-TOKEN": Cookies.get("XSRF-TOKEN")
            },
        });
        res.data = await res.json();
        const workspaces = res.data.workspaces;
        if (res.ok) {
            dispatch(setAllWorkspaces(workspaces));
        }
        return res;
    }
}

export const getOneWorkspace = (workspaceId) => {
    return async dispatch => {
        const res = await fetch(`/api/workspace/${workspaceId}`, {
            headers: {
                "XSRF-TOKEN": Cookies.get("XSRF-TOKEN")
            },
        });
        res.data = await res.json();
        const workspace = res.data.workspace;
        if (res.ok) {
            dispatch(setAllWorkspaces(workspace));
        }
        return res;
    }
}

export const createNewWorkspace = (name, ownerId) => {

    return async dispatch => {
        const res = await fetch('/api/workspaces', {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "XSRF-TOKEN": Cookies.get("XSRF-TOKEN")
            },
            body: JSON.stringify({ name, ownerId })
        });
        res.data = await res.json();
        const workspace = res.data.Workspace;
        if (res.ok) {
            dispatch(createWorkspace(workspace));
        }
        return res;
    }
}

export default function workspaceReducer(state = {}, action) {
    switch (action.type) {
        case SET_ALL_WORKSPACES:
            return action.workspaces;
        case SET_CURRENT_WORKSPACE:
            return action.currentWorkspace;
        default:
            return state;
    }
}
