import React from 'react'
import { Route, Switch } from 'react-router-dom';
import Homepage from './Homepage';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import Pricing from './Pricing';
import SiteHeader from '../components/SiteHeader'

export default function Pages() {
    return (
        <>
            <SiteHeader />
            <Switch>
                <Route exact path="/" component={Homepage} />
                <Route exact path="/login" component={LoginForm} />
                <Route exact path="/create-account" component={SignupForm} />
                <Route exact path="/pricing" component={Pricing} />
            </Switch>
        </>
    )
}
