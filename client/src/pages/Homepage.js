import React from 'react'
import LogoutButton from '../components/LogoutButton';
import { useSelector } from 'react-redux';
function Homepage() {
    const username = useSelector(state => state.auth.username)
    return (
        <>
            hello {username}
            <LogoutButton />
        </>
    )
}

export default Homepage;
