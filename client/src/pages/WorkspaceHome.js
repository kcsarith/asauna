import React from 'react';

import { Grid, Divider,  Container } from '@material-ui/core';

export default function WorkspaceHome() {

    return (
        <Container maxWidth="sm">
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
                spacing={5}
            >
                <Grid item sm={6} align="left"><h2>Tasks Due Soon</h2></Grid>
                <Grid item sm={6} align="right"><h2>See all my tasks</h2></Grid>
                <Divider />

                <Grid item sm={12} align="center">No tasks due in the next five days</Grid>
                <Divider />

                <Grid item sm={12} align="left"><h2>Recent Projects</h2></Grid>
                <Divider />
            </Grid>
        </Container>
    );
}
