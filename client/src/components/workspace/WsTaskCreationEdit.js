import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux'

import { Route, useHistory, useParams, useLocation } from 'react-router-dom';
import { Avatar, Button, Grid, Snackbar, TextareaAutosize, Divider } from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import BookIcon from '@material-ui/icons/Book';
import MuiAlert from '@material-ui/lab/Alert';

import { makeStyles } from '@material-ui/core/styles';

import { getOneTask, patchTaskName, patchTaskDescription, patchTaskStatus, deleteTask } from '../../store/task'
import { getTaskComments, addComment } from '../../store/comment'

import Comment from '../../components/workspace/TaskComment'
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        minHeight: '100vh',
        marginBottom: 0,
        backgroundColor: 'black'
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    checkIncomplete: {
        backgroundColor: '#FF0000 !important',
        color: 'red'
    },
    checkComplete: {
        backgroundColor: '#DD0000 !important',
        color: 'green !important'
    },

    whiteBg: {
        backgroundColor: '#FFFFFF',
        padding: '50px',
    },
    descriptionTextArea: {
        minWidth: '400px',
        minHeight: '80px',
        border: 'none',
        '&:hover': {
            border: '1px solid #000000'
        },
    },
    commentTextArea: {
        minWidth: '90%',
        minHeight: '50px',
        resize: 'none',
    },
    titleTextArea: {
        minWidth: '100%',
        fontSize: 25,
        resize: 'none',
        border: 'none',
        padding: '20px',
        '&:hover': {
            border: '1px solid #000000'
        },
    },
    avatarSm: {
        height: '24px',
        width: '24px',
        fontSize: '12px',
        backgroundColor: '#444444'
    }
}));


export default function WsTaskCreationEdit({
    currentTaskLo,
    myTasks, setMyTasks,
    taskName, setTaskName,
    taskDescription, setTaskDescription,
    taskDueDate, setTaskDueDate,
    taskStatus, setTaskStatus,
    taskAssignedToId, setTaskAssignedToId,
    taskProjectId, setTaskProjectId,
    taskPriority, setTaskPriority,
    taskParentTaskId, setTaskParentTaskId,
}) {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const authInfo = useSelector(state => state.auth)
    const taskInfo = useSelector(state => state.tasks)
    const dispatch = useDispatch();
    let { taskId } = useParams();
    // currentTaskToEdit = taskInfo[taskId]
    taskId = parseInt(taskId, 10)
    const [taskComment, setTaskComment] = useState('');
    const [assigner, setAssigner] = useState('');
    const [taskCommentState, setTaskCommentState] = useState();
    // const [snackBarOpen, setSnackBarOpen] = useState(false);

    // const handleSnackBarClose = (event, reason) => {
    //     if (reason === 'clickaway') {
    //         return;
    //     }

    //     setSnackBarOpen(false);
    // };

    useEffect(() => {
        async function fetchData() {
            // You can await here
            const { task } = await dispatch(getOneTask(taskId));
            const comments = await dispatch(getTaskComments(taskId));
            console.log(task)
            await setAssigner(task.Assigner)
            await setTaskName(task.name);
            await setTaskDescription(task.Description);
            await setTaskDueDate(task.dueDate);
            await setTaskStatus(task.status);
            await setTaskAssignedToId(task.assignedToId);
            await setTaskProjectId(task.projectId);
            await setTaskPriority(task.priority);
            await setTaskParentTaskId(task.parentTaskId);
            await setTaskCommentState(comments)
            console.log(comments)
        }
        fetchData()
        console.log(taskCommentState)
    }, [taskId]); // Or [] if effect doesn't need props or state


    const handleNameOnChange = e => {
        let value = e.target.value;
        setTaskName(value);
        let prev = [...myTasks];
        const currentTask = { ...prev[currentTaskLo] }
        currentTask.name = value;
        prev.splice(currentTaskLo, 1, currentTask);
        console.log(prev)
        setMyTasks(prev);

        async function fetchData() {
            const res = await dispatch(patchTaskName(taskId, e.target.value));
        }

        if (taskName) {
            fetchData();
        }
    }

    const handleDescriptionOnChange = e => {
        setTaskDescription(e.target.value);
        async function fetchData() {
            const res = await dispatch(patchTaskDescription(taskId, e.target.value));
        }
        if (taskDescription) {
            fetchData();
        }
    }


    const handleCommentOnChange = e => {
        setTaskComment(e.target.value);
    }


    const handleMarkComplete = () => {
        let prev = [...myTasks];
        console.log(prev)
        async function fetchData() {
            // You can await here
            if (taskStatus !== 'Completed') {
                setTaskStatus('Completed');
                prev[currentTaskLo].status = 'Completed';
                setMyTasks(prev);
                await dispatch(patchTaskStatus(taskId, 'Completed'))
            }
            else {
                setTaskStatus('Todo');
                prev[currentTaskLo].status = 'Todo';
                setMyTasks(prev);
                await dispatch(patchTaskStatus(taskId, 'Todo'))
            }
            // taskInfo[sideBarTaskId].name = e.target.value
            // console.log(res);

        }

        if (taskStatus) {
            fetchData();
            // setSnackBarOpen(true);
        }
    }

    const handleDeleteTask = (e) => {
        async function fetchData() {
            alert('DELETED A TASK')
            // You can await here
            const res = await dispatch(deleteTask(taskId));
            // taskInfo[sideBarTaskId].name = e.target.value
            console.log(res);
            console.log(res)
        }
        fetchData();
        // history.push('/workspace/1/my-tasks')
    }
    const handleAddComment = () => {
        console.log(authInfo.id)
        console.log(taskId)
        console.log(taskComment)
        const ownerId = authInfo.id;
        const message = taskComment;
        async function fetchData() {
            const res = await dispatch(addComment(ownerId, taskId, message));
            if (res) {
                setTaskComment('');
                let { comment, user } = res;
                console.log(comment)
                console.log(user.fulfillmentValue)
                comment.User = user.fulfillmentValue;
                setTaskCommentState([...taskCommentState, comment])
            }
        }
        fetchData();
    }
    return (
        <Grid item sm={5}>
            <Grid
                container
                direction="row"
                justify="space-between"
                spacing={3, 3}
                className={classes.whiteBg} >
                {taskStatus !== 'Completed' ?
                    <Grid item sm={6} align="left"><Button variant="contained" onClick={handleMarkComplete} color="primary">Mark Complete</Button></Grid> :
                    <Grid item sm={6} align="left"><Button variant="contained" onClick={handleMarkComplete} color="secondary">Mark Incomplete</Button></Grid>}
                <Grid item sm={6} align="right"><a color="primary" href="/workspace/1/my-tasks" id="delete-task-x" onClick={handleDeleteTask}><CloseIcon /></a></Grid>
                <Grid item sm={12} align="left"><TextareaAutosize resize='none' className={classes.titleTextArea} onChange={handleNameOnChange} value={taskName} variant="outlined" /></Grid>
                <Grid item sm={3} align="left">Assignee</Grid>
                <Grid item sm={9} align="left"><Avatar>df</Avatar></Grid>
                <Grid item sm={3} align="left">Due date</Grid>
                <Grid item sm={9} align="left">{taskDueDate}</Grid>
                <Grid item sm={3} align="left">Projects</Grid>
                <Grid item sm={9} align="left">Private</Grid>
                <Grid item sm={3} align="left">Priority</Grid>
                <Grid item sm={9} align="left" >{taskPriority}</Grid>
                <Grid item sm={3} align="left">Description</Grid>
                <Grid item sm={9} align="left"><TextareaAutosize onChange={handleDescriptionOnChange} className={classes.descriptionTextArea} value={taskDescription} placeholder="Description" /> </Grid>

                <Grid item sm={1} align="left"><Avatar className={classes.avatarSm}>{assigner && <>{assigner.username[0]}{assigner.username[1]}</>}</Avatar></Grid>
                <Grid item sm={11} align="left">{assigner && assigner.username} assigned this task</Grid>
                <Grid item sm={12} align="center" component={Divider} />
                {taskCommentState && taskCommentState.map((ele, index) =>
                    <Grid item sm={12} >
                        {<Comment comment={ele} />}
                    </Grid>
                )}
                <Grid item sm={1} align="left"><Avatar className={classes.avatarSm}>
                    {authInfo.username && <>
                        {authInfo.username[0]}
                        {authInfo.username[1]}
                    </>}
                </Avatar></Grid>
                <Grid item sm={11} align="left"><TextareaAutosize onChange={handleCommentOnChange} className={classes.commentTextArea} value={taskComment} placeholder="Type Comment here" /> </Grid>
                <Grid item sm={11} align="right"><Button variant="contained" color="primary" onClick={handleAddComment}>Comment</Button></Grid>

                <Grid item sm={12} align="center" component={Divider} />
            </Grid>
            {/* <Snackbar open={snackBarOpen} autoHideDuration={6000} onClose={handleSnackBarClose}>
                {taskStatus === 'Incomplete' ?
                    <Alert onClose={handleSnackBarClose} severity="success">Task Complete!</Alert> :
                    <Alert onClose={handleSnackBarClose} severity="warning">Task Marked Incomplete</Alert>
                }
            </Snackbar> */}

        </Grid >
    )
}
