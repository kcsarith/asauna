import React from 'react';

import { useSelector } from 'react-redux'
import { Link, Route, Switch, useParams } from 'react-router-dom';
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

import WorkspaceMyTasks from '../../pages/WorkspaceMyTasks'
import WorkspaceHome from '../../pages/WorkspaceHome'
import WsHomeAppbar from './WsHomeAppbar'
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
export default function WsDrawer() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const { workspaceId } = useParams();
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
                    <ListItem button key='Home' component={Link} to={`/workspace/${workspaceId}`} >
                        <ListItemIcon><HomeOutlinedIcon className={classes.icon} /></ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                    <ListItem button key='My Tasks' component={Link} to={`/workspace/${workspaceId}/my-tasks`}>
                        <ListItemIcon><AssignmentTurnedInOutlinedIcon className={classes.icon} /></ListItemIcon>
                        <ListItemText primary="My Tasks" />
                    </ListItem>
                </List>
                <Divider className={classes.lighten} />
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
                    </Toolbar>
                </AppBar>
                <div className={classes.drawerHeader} />
                <Route exact path="/workspace/:workspaceId" component={WorkspaceHome} />
                <Route path="/workspace/:workspaceId/my-tasks" component={WorkspaceMyTasks} />
            </main>
        </div >
    );
}
