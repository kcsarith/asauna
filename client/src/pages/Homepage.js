import React from 'react'
import LogoutButton from '../components/LogoutButton';
import { useSelector } from 'react-redux';
import { CardMedia, Container, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, } from '@material-ui/core';
import MissionStatement from '../components/homepage/Section1MissionStatement';
function Homepage() {
    const username = useSelector(state => state.auth.username)
    return (
        <>
            <MissionStatement />
            <Container maxWidth="lg" >
                hello {username}
                <LogoutButton />
                <CardMedia
                    component="video"
                    image="https://d1gwm4cf8hecp4.cloudfront.net/videos/homepage/list-grid/home-list-EN.mp4"
                    muted
                    loop
                    autoPlay
                />
            </Container>
        </>
    )
}

export default Homepage;
