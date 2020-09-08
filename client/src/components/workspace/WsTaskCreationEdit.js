import React from 'react';

import { Button, Grid, TextField } from '@material-ui/core';
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
}));

export default function WsTaskCreationEdit() {
    const classes = useStyles();
    return (
        <Grid
            container
            direction="row"
            justify="space-between"
            spacing={3, 3}
            className={classes.whiteBg} >
            <Grid item sm={6} align="left"><Button variant="contained" color="primary">Mark Complete</Button></Grid>
            <Grid item sm={6} align="right"><Button color="primary"><CloseIcon /></Button></Grid>
            <Grid item sm={12} align="left"><TextField fullWidth variant="outlined" defaultValue="Hello world" /></Grid>
            <Grid item sm={3} align="left">Assignee</Grid>
            <Grid item sm={9} align="left">Avatar</Grid>
            <Grid item sm={3} align="left">Due date</Grid>
            <Grid item sm={9} align="left">09/20/2020</Grid>
            <Grid item sm={3} align="left">Projects</Grid>
            <Grid item sm={9} align="left">Project 1</Grid>
            <Grid item sm={3} align="left">Description</Grid>
            <Grid item sm={9} align="left"><textarea className={classes.descriptionTextArea} placeholder="Description" /></Grid>
        </Grid>
    )
}
