import React from 'react';

import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import clsx from 'clsx';


import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Drawer, AppBar, Toolbar, List, Grid, Divider, IconButton, ListItem, Container } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';

import WsHomeAppbar from '../components/workspace/WsHomeAppbar'
const drawerWidth = 180;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
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
    }
}));
export default function WorkspaceHome() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const authInfo = useSelector(state => state.auth)

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

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
                    <ListItem button key='Home' component={Link} to="/workspace" >
                        <ListItemIcon><HomeOutlinedIcon className={classes.icon} /></ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                    <ListItem button key='My Tasks' component={Link} to="/workspace/my-tasks">
                        <ListItemIcon><AssignmentTurnedInOutlinedIcon className={classes.icon} /></ListItemIcon>
                        <ListItemText primary="My Tasks" />
                    </ListItem>
                </List>
                <Divider className={classes.lighten} />
                <List>

                    <ListItem href="/workspace/my-tasks" button key='Home'>
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
                        <WsHomeAppbar />
                    </Toolbar>
                </AppBar>
                <div className={classes.drawerHeader} />
                <Container maxWidth="sm">
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                        spacing={5}
                    >
                        <Grid item sm={6} align="left">Tasks Due Soon</Grid>
                        <Grid item sm={6} align="right">See all my tasks</Grid>
                        <Divider />

                        <Grid item sm={12} align="center">No tasks due in the next five days</Grid>
                        <Divider />

                        <Grid item sm={12} align="left">Recent Projects</Grid>
                        <Divider />
                    </Grid>
                </Container>
            </main>
        </div>
    );
}
