import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';

import { Button, TextField, Modal, DialogTitle, Avatar, Link, Typography, FormControlLabel, Checkbox, Grid, Container } from '@material-ui/core';
import { LockOutlined as LockOutlinedIcon, FullscreenExit } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';


import { login } from '../store/auth';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    minHeight: '500px',
    // marginTop: theme.spacing(1),
  },
  submit: {
    // margin: theme.spacing(3, 0, 2),
  },
}));

export default function LoginModal() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const isLoggedIn = useSelector(state => state.auth.id)
  const dispatch = useDispatch();
  const classes = useStyles();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(login(username, password, rememberMe));
    const message = res.data.message;
    if (!res.ok) setErrorMessages([message])
  }

  return (
    <>
      <Link variant="button" color="textPrimary" onClick={handleClickOpen}>
        Login
      </Link>
      <Modal open={open} onClose={handleClose} >
        <Container maxWidth="sm" pt={5} className={classes.paper}>
          <DialogTitle id="form-dialog-title">
            <Avatar className={classes.avatar}><LockOutlinedIcon /></Avatar>

            <span component="h1" variant="h5">Sign in</span>
          </DialogTitle>
          <div >
            <form className={classes.form} onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value={rememberMe} color="primary" onChange={(e) => setRememberMe(e.target.checked)} />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Login
          </Button>
              <Grid container>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
            {(errorMessages.length > 0) ? <ul> {errorMessages.map((errorMessage, index) => <li key={index}>{errorMessage}</li>)}</ul> : <></>}
          </div>
          {!!isLoggedIn && <Redirect to="/" />}
        </Container>
      </Modal>
    </>
  );
}
