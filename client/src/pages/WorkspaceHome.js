import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { Grid, Divider, Container, InputBase } from '@material-ui/core';

import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import AppsIcon from '@material-ui/icons/Apps';

import { makeStyles } from '@material-ui/core/styles'
import BookTwoToneIcon from '@material-ui/icons/BookTwoTone';

import { getAllTasks } from '../store/task'
const useStyles = makeStyles((theme) => ({
    whiteBg: {
        backgroundColor: '#FFFFFF'
    },
    largeBook: {
        width: '20%',
        height: '20%'
    }
}));

export default function WorkspaceHome() {

    const dispatch = useDispatch();
    const classes = useStyles();

    const [tasksDueState, setTasksDueState] = useState([]);

    useEffect(() => {
        async function fetchData() {
            // You can await here
            const res = await dispatch(getAllTasks());
            // setMyTasks(res.data.tasks);
            let tasks = res.data.tasks;
            const incompleteTasks = tasks.filter(ele => ele.status == 'Incomplete')
            await setTasksDueState(incompleteTasks);
            console.log(incompleteTasks)
        }
        fetchData();
    }, []); // Or [] if effect doesn't need props or state

    const handleMyTaskClick = (e, p) => {
        console.log(e)
        console.log(p)
    }
    return (
        <>
            <Container maxWidth="sm" className={classes.whiteBg}>
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                    spacing={5}
                >
                    <Grid item sm={6} align="left"><h2>Tasks Due Soon</h2></Grid>
                    <Grid item sm={6} align="right"><h2>See all my tasks</h2></Grid>
                    <Divider />

                    <Grid item sm={12} align="center">
                        {tasksDueState.length > 0 && tasksDueState.map((task, index) => {
                            return (
                                <Grid container key={index}>
                                    <Grid item sm={12}><Divider className={classes.darken} /></Grid>
                                    <Grid item sm={1} component={AppsIcon} />
                                    <Grid item sm={7} component={InputBase} id={`my-task_${task.id}`} className={`my-task-lo_${task.listOrder}`} value={task.name} fullWidth onClick={handleMyTaskClick} align="left" >{task.name}</Grid>
                                    <Grid item sm={2} align="right">{task.dueDate.slice(0, 10)}</Grid>
                                </Grid>
                            )
                        })}
                    </Grid>
                    <Divider />

                    <Grid item sm={12} align="left"><h2>Recent Projects</h2></Grid>
                    < Grid container align="center">
                        <Grid item sm={12} align="center">
                            <Link to='/workspace/1/project'>
                                <BookTwoToneIcon className={classes.largeBook} />
                                <p>Project 1</p>
                            </Link>
                        </ Grid>
                    </ Grid>
                    <Divider />
                </Grid>
            </Container>
        </>
    );
}
