import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';

import Homepage from './Homepage';
import SignupForm from '../components/SignupForm';
import WsDrawer from '../components/workspace/WsDrawer';
import WorkspaceHome from './WorkspaceHome'
import WorkspaceMyTasks from './WorkspaceMyTasks'
import NotFound from './NotFound';

import SiteHeader from '../components/SiteHeader'
export default function Pages() {
    return (
        <>
            <Switch>
                <Route exact path="/" render={() => <><SiteHeader /><Homepage /></>} />
                <Route exact path="/create-account" component={SignupForm} />
                <Route exact path="/workspace" render={() =>
                    <>
                        <WsDrawer />
                        <Route path="/workspace/:workspaceId" component={WorkspaceMyTasks} />
                    </>} />
                <Route exact path="/workspace/:workspaceId/my-tasks" component={WorkspaceMyTasks} />
                <Route exact path="/workspace/:workspaceId/my-tasks/:id" component={WorkspaceMyTasks} />
                <Route exact path="*" render={() =>
                    <>
                        <SiteHeader /><NotFound />
                    </>} />
            </Switch>
        </>
    )
}
