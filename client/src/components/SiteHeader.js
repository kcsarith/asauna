import React from 'react';
import { useSelector, useDispatch } from 'react-redux'


import { AppBar, CssBaseline, Button, Link, Typography, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import LoginModal from './LoginModal';
import { login } from '../store/auth'

const useStyles = makeStyles((theme) => ({
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    },
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    toolbarTitle: {
        flexGrow: 1,
    },
    link: {
        margin: theme.spacing(1, 1.5),
    },
    heroContent: {
        padding: theme.spacing(8, 0, 6),
    },
    logoFont: {
        "font-family": '"UD Digi Kyokasho NP-B", Times, serif',
        "text-transform": 'lowercase',
        "font-weight": "bold",
        "font-size": "30px"
    }
}));

export default () => {
    const classes = useStyles();

    const isLoggedIn = useSelector(state => state.auth.id)

    const dispatch = useDispatch();
    const handleClick = async function () {
        dispatch(login('demo@example.com', 'password'))
    }

    return (
        <Toolbar className={classes.toolbar} component="header" variant="dense">
            <CssBaseline />
            <nav>

                <Link variant="button" color="textPrimary" href="/" className={`${classes.logoFont}`}>
                    {/* <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}> */}
                        asauna
                    {/* </Typography> */}
                </Link>
                <Link variant="button" color="textPrimary" href="" className={classes.link}>
                    Why Asauna?
            </Link>
                <Link variant="button" color="textPrimary" href="" className={classes.link}>
                    Resources
            </Link>
                <Link variant="button" color="textPrimary" href="/pricing" className={classes.link}>
                    Pricing
            </Link>
            </nav>
            <nav>
                <Link variant="button" color="textPrimary" href="#" className={classes.link}>
                    Contact Sales
            </Link>

                {
                    !!isLoggedIn ?
                        <Button href="/workspace" variant="contained" color="primary" className={classes.link}>Go to Asauna</Button> :
                        <>
                            <LoginModal />
                            <Button className={classes.link} onClick={handleClick}>Demo User</Button>

                            <Button href="/create-account" variant="contained" color="primary" className={classes.link}>Try for free</Button>
                        </>
                }
            </nav>
        </Toolbar >
    )
}
