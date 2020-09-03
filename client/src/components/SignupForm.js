import React, { useState } from 'react';
import { signup } from '../store/signup';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Material UI
import { Avatar, Button, Container, TextField, Link, Grid, Box, Typography, } from '@material-ui/core';
import { LockOutlined as LockOutlinedIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';



import '../styles/login-modal.css'

const useStyles = makeStyles((theme) => ({
    paper: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
        paddingLeft: theme.spacing(4),
        paddingRogjt: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    footer: {
        padding: theme.spacing(3, 2),
        marginTop: 'auto',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
    },
    signupBackground: {

        padding: theme.spacing(3, 2),
        height: '100vh',
        backgroundColor: 'grey',
    },
    contents: {
        backgroundColor: 'white'
    },
    profileImage: {
        height: '128px !important',
        width: '128px !important',
        margin: '1em',
        fontSize: '20px'
    }
}));

export default function SignUp() {
    const classes = useStyles();

    const dispatch = useDispatch();
    let history = useHistory();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userErrorMessage, setUserErrorMessage] = useState(' ');
    const [emailErrorMessage, setEmailErrorMessage] = useState(' ');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState(' ');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await dispatch(signup(username, email, password));
        if (res.data.error) {
            const errors = res.data.error.errors;
            const userExistsErrorIndex = errors.indexOf('username: already exists');
            const emailExistsErrorIndex = errors.indexOf('email: already exists');
            const emailValidErrorIndex = errors.indexOf('email: must be a valid email');
            const passwordErrorsIndex = errors.indexOf('password: must be 8 or more characters');
            setUserErrorMessage((userExistsErrorIndex > -1) ? 'Username already exists' : ' ');
            if (emailExistsErrorIndex > -1) {
                setEmailErrorMessage((emailExistsErrorIndex > -1) ? 'Email already exists' : ' ');
            }
            else if (emailValidErrorIndex > -1) {
                setEmailErrorMessage((emailValidErrorIndex > -1) ? 'Must be a valid email' : ' ');
            }

            setPasswordErrorMessage((passwordErrorsIndex > -1) ? 'password must be 8 or more characters' : ' ');
        }
        if (res.ok) {
            history.push("/workspace");
        }
    }
    return (
        <div className={classes.signupBackground}>
            <Container maxWidth="sm">
                <LockOutlinedIcon />
                <h2>Asauna</h2>
            </Container>
            <Container className={classes.contents} maxWidth="sm">
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Please start by completing your profile
        </Typography>
                    <Grid container justify="center">
                        <Grid item><span>Already have an account? </span>
                            <Link href="/" variant="body2">
                                Go back to the homepage
              </Link>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={8}>
                            <form className={classes.form} onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12}>
                                        <label>Username</label>
                                        <TextField
                                            error={userErrorMessage !== ' '}
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="username"
                                            name="username"
                                            autoComplete="username"
                                            placeholder="Demo-lition"
                                            helperText={userErrorMessage}
                                            onChange={(e) => { setUserErrorMessage(' '); return setUsername(e.target.value) }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <label>Email</label>
                                        <TextField
                                            error={emailErrorMessage !== ' '}
                                            variant="outlined"
                                            required
                                            fullWidth
                                            type="email"
                                            id="email"
                                            name="email"
                                            autoComplete="email"
                                            placeholder="demo@example.com"
                                            helperText={emailErrorMessage}
                                            onChange={(e) => { setEmailErrorMessage(' '); setEmail(e.target.value) }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <label>Password</label>
                                        <TextField
                                            error={passwordErrorMessage !== ' '}
                                            variant="outlined"
                                            required
                                            fullWidth
                                            name="password"
                                            type="password"
                                            id="password"
                                            placeholder=""
                                            helperText={passwordErrorMessage}
                                            onChange={(e) => { setPasswordErrorMessage(' '); setPassword(e.target.value) }}
                                        />
                                    </Grid>
                                </Grid>

                                <Button
                                    disabled={username === '' && email === '' && password === ''}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Continue
          </Button>

                            </form>

                        </Grid>

                        <Grid item xs={12} sm={4} >
                            <Avatar className={classes.profileImage}></Avatar>
                        </Grid>
                    </Grid>

                </div>
                <Box mt={5}>
                </Box>
            </Container>
        </div >
    );
}
