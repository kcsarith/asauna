import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Menu, MenuItem, Grid, Button, IconButton, Typography, Link } from '@material-ui/core';

import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'


import { logout } from '../../store/auth';
const useStyles = makeStyles((theme) => ({
    toolbar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbarTitle: {
        flex: 1,
    },
    toolbarSecondary: {
        justifyContent: 'space-between',
        overflowX: 'auto',
    },
    toolbarLink: {
        padding: theme.spacing(1),
        flexShrink: 0,
    },
    alignRight: {
        textAlign: 'right !important'
    }
}));

export default function WsHomeAppbar() {
    const classes = useStyles();
    const authInfo = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const history = useHistory();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async (e) => {
        e.preventDefault();
        await dispatch(logout());
        history.push('/')
    }
    return (
        <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
        ><Grid item xs={12} sm={6} align="left">
                <Typography
                    component="h2"
                    variant="h5"
                    color="inherit"
                    noWrap
                    className={classes.toolbarTitle}
                >
                    Home
                </Typography>
            </Grid>
            <Grid item xs={12} sm={6} align="right">
                <div>
                    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                        <Avatar>
                            {authInfo.username && <>
                                {authInfo.username[0]}
                                {authInfo.username[1]}</>}
                        </Avatar>
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </div>
            </Grid>
        </Grid>
    );
}
