import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux'

import { Route, useParams } from 'react-router-dom';
import { Avatar, Button, Grid, Divider, TextField, TextareaAutosize } from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';

import { makeStyles } from '@material-ui/core/styles';

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
        backgroundColor: '#FFFFFF'
    },
    descriptionTextArea: {
        minWidth: '400px',
        minHeight: '80px'
    },
    titleTextArea: {
        minWidth: '600px',
        fontSize: 25,
        resize: 'none'
    },
}));

export default function WsTaskCreationEdit({ taskInfo }) {
    const classes = useStyles();

    const authInfo = useSelector(state => state.auth)
    const dispatch = useDispatch();
    let { taskId } = useParams();
    taskId = parseInt(taskId, 10)
    const [currentTask, setCurrentTask] = useState(taskInfo.find(ele => { return ele.listOrder === taskId }));
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [assigner, setAssigner] = useState('');

    const [currentTaskId, setCurrentTaskId] = useState();

    useEffect(() => {
        setCurrentTaskId(taskId);
        if (Object.keys(taskInfo).length) {
            setCurrentTask(taskInfo.find(ele => { return ele.listOrder === taskId }))
            setTaskTitle(currentTask.name);
            setTaskDescription(currentTask.description);
            if (currentTask.Assigner) {
                setAssigner(currentTask.Assigner)
            }
        }
    }, [taskId]); // Or [] if effect doesn't need props or state

    if (!Object.keys(taskInfo).length) return <></>;
    return (
        <Grid item sm={5}>
            <Grid
                container
                direction="row"
                justify="space-between"
                spacing={3, 3}
                className={classes.whiteBg} >
                <Grid item sm={6} align="left"><Button variant="contained" color="primary">Mark Complete</Button></Grid>
                <Grid item sm={6} align="right"><Button color="primary"><CloseIcon /></Button></Grid>
                <Grid item sm={12} align="left"><TextareaAutosize resize='none' className={classes.titleTextArea} onChange={(e) => setTaskTitle(e.target.value)} value={taskTitle} variant="outlined" /></Grid>
                <Grid item sm={3} align="left">Assignee</Grid>
                <Grid item sm={9} align="left"><Avatar>
                    {assigner && <>
                        {assigner.username[0]}
                        {assigner.username[1]}
                    </>}
                </Avatar></Grid>
                <Grid item sm={3} align="left">Due date</Grid>
                <Grid item sm={9} align="left">09/20/2020</Grid>
                <Grid item sm={3} align="left">Projects</Grid>
                <Grid item sm={9} align="left">Project 1</Grid>
                <Grid item sm={12} align="left">{}assigned this task </Grid>
                <Grid item sm={3} align="left">Description</Grid>
                <Grid item sm={9} align="left"><TextareaAutosize onChange={(e) => setTaskDescription(e.target.value)} className={classes.descriptionTextArea} value={taskDescription} placeholder="Description" /> </Grid>
            </Grid>
        </Grid>
    )
}
