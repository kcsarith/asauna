import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/auth';

function LogoutButton() {
  const isLoggedIn = useSelector(state => state.auth.id)
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(logout());
    return <Redirect to="login" />
  }
  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Logout</button>
      {/* {!isLoggedIn && <Redirect to="login" />} */}
    </form>
  );
}

export default LogoutButton;
