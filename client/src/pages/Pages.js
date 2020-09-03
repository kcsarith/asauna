import React from 'react'
import { Route, Switch } from 'react-router-dom';

import Homepage from './Homepage';
import SignupForm from '../components/SignupForm';
import Pricing from './Pricing';
import Workspace from './Workspace'

import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'
export default function Pages() {
    return (
        <>
            <Switch>
                
                <Route exact path="/" render={() => <><SiteHeader /><Homepage /><SiteFooter /></>} />
                <Route exact path="/create-account" component={SignupForm} />
                <Route exact path="/pricing" render={() => <><SiteHeader /><Pricing /><SiteFooter /></>} />
                <Route exact path="/workspace" component={Workspace} />
            </Switch>
        </>
    )
}
