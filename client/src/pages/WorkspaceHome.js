import React from 'react';
import { Link } from 'react-router-dom'

import { Grid, Divider, Container } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles'
import BookTwoToneIcon from '@material-ui/icons/BookTwoTone';
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

    const classes = useStyles();
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

                    <Grid item sm={12} align="center">No tasks due in the next five days</Grid>
                    <Divider />

                    <Grid item sm={12} align="left"><h2>Recent Projects</h2></Grid>
                    < Grid container align="center">
                        <Grid item sm={12} align="center">
                            <Link button to='/workspace/1/project'>
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
