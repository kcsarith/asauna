import React from 'react'
import { Route, Switch } from 'react-router-dom';
import Homepage from './Homepage';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

export default function Pages() {
    return (
        <>
            <Switch>
                <Route exact path="/" component={Homepage} />
                <Route exact path="/login" component={LoginForm} />
                <Route exact path="/create-account" component={SignupForm} />
            </Switch>
        </>
    )
}
