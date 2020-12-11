import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';

import Homepage from './Homepage';
import SignupForm from '../components/SignupForm';
import WsDrawer from '../components/workspace/WsDrawer';
import WsBoard from './WorkspaceProject';
import WorkspaceHome from './WorkspaceHome'
import WorkspaceMyTasks from './WorkspaceMyTasks'
import NotFound from './NotFound';
import SiteFooter from '../components/SiteFooter'

import SiteHeader from '../components/SiteHeader'
export default function Pages() {
    return (
        <>
            <Switch>
                <Route exact path="/" render={() => <><SiteHeader /><Homepage />
                    <SiteFooter /></>} />
                <Route exact path="/create-account" render={() =>
                    <>
                        <SiteHeader /><SignupForm /><SiteFooter />
                    </>} />
                <Route path="/workspace/:workspaceId" component={WsDrawer} />
                <Route path="/workspace" component={WsDrawer} />
                {/* <Route exact path="/workspace/:workspaceId/my-tasks/:id" component={WorkspaceMyTasks} /> */}
                <Route path="*" render={() =>
                    <>
                        <SiteHeader /><NotFound /><SiteFooter />
                    </>} />
            </Switch>
        </>
    )
}
