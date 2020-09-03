import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';

import { Button, TextField, Modal, Link, Typography, Grid, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


import { login } from '../store/auth';

import '../styles/login-modal.css'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(10),
    paddingBottom: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    maxWidth: '730px'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    paddingLeft: "10em",
    paddingRight: "10em"
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    padding: '12px 12px !important'
  },
  errorMessageContainer: {
    marginBottom: theme.spacing(8),
    fontWeight: 'bold',
    padding: '1em',
    color: 'black',
    backgroundColor: '#ffedef'
  }
}
));

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
  const [errorMessages, setErrorMessages] = useState([]);

  const dispatch = useDispatch();
  let history = useHistory();
  const classes = useStyles();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(login(username, password));
    const message = res.data.message;
    if (!res.ok) setErrorMessages([message])
    else {
      history.push('/workspace')
    }
  }

  return (
    <>
      <Button onClick={handleClickOpen} className={classes.modalLink}>
        Login
      </Button>
      <Modal open={open} onClose={handleClose} >
        <Container maxWidth="md" className={classes.paper}>
          <Typography variant="h3" component="h2" className={classes.paper}>Log in</Typography>
          {(errorMessages.length > 0) ? <ul className={classes.errorMessageContainer}> {errorMessages.map((errorMessage, index) => <li key={index}>{errorMessage}</li>)}</ul> : <></>}
          <Container maxWidth="md"  >
            <form className={classes.form} onSubmit={handleSubmit}>
              <label>Email/Username</label>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                placeholder="demo@example.com"
                name="email"
                autoComplete="email"
                autoFocus
                value={username}
                className='modal-form-input'
                onChange={(e) => setUsername(e.target.value)}
              />
              <label>Password</label>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                type="password"
                id="password"
                placeholder="password"
                autoComplete="current-password"
                value={password}
                className='modal-form-input'
                onChange={(e) => setPassword(e.target.value)}
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
              <Grid container justify="center">
                <Grid item className="modal-signup-link">
                  <p>Don't have an account?&nbsp;
                  <Link href="/create-account" variant="body2">Sign Up
                  </Link>
                  </p>
                </Grid>
              </Grid>
            </form>
          </Container>
        </Container>

      </Modal>
    </>
  );
}
