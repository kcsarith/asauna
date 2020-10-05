// This file includes the actions and reducer.
import Cookies from 'js-cookie'

export const SET_ALL_COLUMN_TODOS = 'SET_ALL_COLUMN_TODOS';
export const SET_CURRENT_COLUMN_TODO = 'SET_CURRENT_COLUMN_TODO';
export const CREATE_COLUMN_TODO = 'CREATE_SET_COLUMN_TODO';
export const DELETE_COLUMN_TODO = 'DELETE_COLUMN_TODO';
export const SWAP_COLUMN_TODOS = 'SWAP_COLUMN_TODOS';

export const setAllColumnTodos = (columnTodos) => {
    return {
        type: SET_ALL_COLUMN_TODOS,
        columnTodos
    }
}

export const setCurrentColumnTodos = (columnTodo) => {
    return {
        type: SET_CURRENT_COLUMN_TODO,
        columnTodo
    }
}

export const createColumnTodo = (columnTodo) => {
    return {
        type: CREATE_COLUMN_TODO,
        columnTodo
    }
}

export const swapTasks = (listOrder1, listOrder2) => {
    return {
        type: SWAP_COLUMN_TODOS,
        listOrder1,
        listOrder2
    }
}

export const getAllColumnTodos = () => {
    return async dispatch => {
        const res = await fetch(`/api/column-todos`, {
            headers: {
                "XSRF-TOKEN": Cookies.get("XSRF-TOKEN")
            },
        });
        const data = res.data = await res.json();
        const columnTodos = data.columnTodos;
        if (res.ok) {
            // dispatch(setAllColumnTodos(columnTodos));
        }
        return res;
    }
}

export const createNewColumnTodo = (name, description, ownerId, projectId) => {

    return async dispatch => {
        const res = await fetch('/api/column-todos', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "XSRF-TOKEN": Cookies.get("XSRF-TOKEN")
            },
            body: JSON.stringify({ name, description, ownerId, projectId })
        });
        res.data = await res.json();
        const columnTodo = res.data.ColumnTodo;
        if (res.ok) {

        }
        return res;
    }
}

export default function todoColumnReducer(state = {}, action) {
    switch (action.type) {
        case SET_ALL_COLUMN_TODOS:
            return action.columnTodos;
        case SET_CURRENT_COLUMN_TODO:
            return action.columnTodo;
        case SWAP_COLUMN_TODOS:
            return { listOrder1: action.listOrder1, listOrder2: action.listOrder2 };
        default:
            return state;
    }
}
