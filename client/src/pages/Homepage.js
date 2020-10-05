import React from 'react'
import MissionStatement from '../components/homepage/Section1MissionStatement';

import { Container } from '@material-ui/core';
function Homepage() {
    return (
        <>
            <MissionStatement />
            <Container>
                <video autoPlay loop={true} muted >
                    <source src="https://destructables-storage-dev.s3-us-west-1.amazonaws.com/home-list-EN.mp4" type="video/mp4" />
                </video>
            </Container>
        </>
    )
}

export default Homepage;
