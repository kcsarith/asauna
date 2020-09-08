import React from 'react';

import { useSelector, useDispatch } from 'react-redux'
import { Link, Router, Switch } from 'react-router-dom';
import clsx from 'clsx';


import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Drawer, Button, AppBar, Toolbar, List, Grid, Divider, IconButton, ListItem, TextField, Container } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import CloseIcon from '@material-ui/icons/Close';
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';

import WsMyTasksAppbar from '../components/workspace/WsMyTasksAppbar'
import WsTaskCreationEdit from '../components/workspace/WsTaskCreationEdit'

import { getAllTasks, setCurrentTask } from '../store/task'

import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const drawerWidth = 180;

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
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: '#222222',
        color: 'white'
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    icon: {
        color: '#DDDDDD'
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    lighten: {
        backgroundColor: '#555555'
    },
    darken: {
        backgroundColor: '#000000'
    },
    whiteBg: {
        backgroundColor: '#FFFFFF'
    },
    footer: {
        padding: theme.spacing(3, 2),
        marginTop: 'auto',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
    },
    descriptionTextArea: {
        minWidth: '400px',
        minHeight: '80px'
    },
    taskPadding: {
        // margin: '200px !important'
    },
    checkIncomplete: {
        backgroundColor: '#FF0000 !important',
        color: 'red'
    },
    checkComplete: {
        backgroundColor: '#DD0000 !important',
        color: 'green !important'
    }

}));
export default function WorkspaceMyTasks() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const authInfo = useSelector(state => state.auth)
    const taskInfo = useSelector(state => state.task)
    const dispatch = useDispatch();
    const handleDrawerOpen = () => {
        setOpen(true);
        console.log(taskInfo.length)
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleGetAllTasks = async () => {
        const res = await dispatch(getAllTasks());
    }

    const handleGetCurrentTask = async (id) => {
        const res = await dispatch(setCurrentTask(id));
    }


    return (
        <div className={classes.root}>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <><ChevronLeftIcon style={{ color: "#DDDDDD" }} /><MenuIcon style={{ color: "#DDDDDD" }} /> </> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <List>
                    <ListItem button key='Home' component={Link} to="/workspace">
                        <ListItemIcon><HomeOutlinedIcon className={classes.icon} /></ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                    <ListItem button key='My Tasks' onClick={handleGetAllTasks} component={Link} to="/workspace/my-tasks" >
                        <ListItemIcon><AssignmentTurnedInOutlinedIcon className={classes.icon} /></ListItemIcon>
                        <ListItemText primary="My Tasks" />
                    </ListItem>
                </List>
                <Divider className={classes.lighten} />
                <List>

                    <ListItem button key='Home'>
                        <ListItemIcon><HomeOutlinedIcon className={classes.icon} /></ListItemIcon>
                        <ListItemText primary="Project 1" />
                    </ListItem>
                </List>
            </Drawer>

            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon style={{ color: "#444444" }} />
                        </IconButton>
                        {/* <Typography variant="h6" noWrap>
                            {authInfo.username}'s Tasks - Workspace 1
                        </Typography> */}
                        <WsMyTasksAppbar />
                    </Toolbar>
                </AppBar>
                <div className={classes.drawerHeader} />
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="flex-start"
                    spacing={5}>
                    <Grid item sm={7} >
                        <Grid
                            container
                            direction="row"
                            justify="space-between"
                            spacing={3, 3}
                            className={classes.whiteBg} >
                            <Grid item sm={12} align="left">
                                <Button variant="contained" color="primary">+ Add Task</Button>
                            </Grid>
                            <Grid item sm={12}><Divider className={classes.darken} /></Grid>
                            <Grid item sm={6} align="left"><h2>Recently Assigned</h2></Grid>
                            <Grid item sm={6} align="right"><h2>Due Date</h2></Grid>
                            {taskInfo.length > 0 && taskInfo.map((task) =>
                                <React.Fragment key={task.id} >
                                    <Grid item sm={6} align="left" button="true" component={Link} to={`/workspace/my-tasks/${task.id}`}  ><CheckCircleOutlineIcon color={(task.status === 'Incomplete') ? "secondary" : "primary"} />{task.name}</Grid>
                                    <Grid item sm={6} align="right" button="true" component={Link} to={`/workspace/my-tasks/${task.id}`}  >{task.dueDate}</Grid>
                                    <Grid item sm={12}><Divider className={classes.darken} /></Grid>
                                </React.Fragment>
                            )}
                        </Grid>
                    </Grid>
                    {/* THIS IS THE FORM! */}
                </Grid>
            </main>
        </div>
    );
}
