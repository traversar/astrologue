import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import LoginSignup from './LoginSignup'
import * as authActions from '../actions/authentication';
import DropInComponent from '../utils/DropInComponent';

const Navbar = ({
    authenticated,
    logout
}) => {
    let [showPanel, setShowPanel] = useState(false);

    const handleLoginSignup = () => {
        setShowPanel(!showPanel);
    }

    return (
        <>
            <div className='nb-links-container'>
                <div className='app-header-container'>
                    <h1>Astrologue</h1>
                </div>
                <div className='nb-links'>
                    <Link to='/'>Natal</Link>
                    <Link to='/transits/'>Transits</Link>
                    <Link to='/compatibility/'>Compatibility</Link>
                    <Link to='/learn/'>Learn</Link>
                </div>
                <div className='nb-auth-container'>
                    {authenticated.loggedIn ?
                    <div id='nb-auth-button' className='nb-auth-button' onClick={logout}>({authenticated.username}) Logout</div>
                    :
                    <div id='nb-auth-button' className='nb-auth-button' onClick={handleLoginSignup}>Login/Signup</div>
                    }
                </div>
            </div>
            {showPanel &&
                <DropInComponent id="login-signup-panel" dropIn={LoginSignup} setCloseCondition={setShowPanel} />
            }
        </>
    )
}

const NavbarContainer = () => {
    const dispatch = useDispatch();
    let authenticated = useSelector(state => state.authentication);
    let logout = () => dispatch(authActions.logout());

    return <Navbar authenticated={authenticated} logout={logout} />
}

export default NavbarContainer
