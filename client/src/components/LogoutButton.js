import React from 'react';
import { useDispatch } from 'react-redux'
import { logout } from '../store/auth';
import { Button } from '@material-ui/core';
function LogoutButton() {
  const dispatch = useDispatch();
  const handleLogout = async (e) => {
    e.preventDefault();
    await dispatch(logout());
  }
  return (
    <Button onClick={handleLogout}>
      Logout
    </Button>
  );
}

export default LogoutButton;
