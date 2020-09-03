import React from 'react'
import { CardMedia, Container } from '@material-ui/core';
import MissionStatement from '../components/homepage/Section1MissionStatement';
function Homepage() {
    return (
        <>
            <MissionStatement />
            <Container maxWidth="lg" >
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
