import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import LoginSignup from './LoginSignup'

const Navbar = ({
    loggedIn,
    logout
}) => {
    let loginSignup = '';

    const handleLoginSignup = () => {
        let authContainer = document.getElementById('auth-container')
        authContainer.classList.contains('nb-loginsignup-container-hidden') ? authContainer.classList.remove('nb-loginsignup-container-hidden') : authContainer.classList.add('nb-loginsignup-container-hidden');
        loginSignup = loginSignup === 'login' ? false : true;
    }

    return (
        <>
            <div className='app-header-container'>
                <h1>Astrologue</h1>
            </div>
            <div className='nb-links-container'>
                <div>
                    <Link to='/chart/'>Chart</Link>
                    <Link to='/transits/'>Transits</Link>
                    <Link to='/compatibility/'>Compatibility</Link>
                    <Link to='/learn/'>Learn</Link>
                </div>
                <div className='nb-auth-container'>
                    {loggedIn ?
                    <div className='nb-auth-button' onClick={logout}>Logout</div>
                    :
                    <div className='nb-auth-button' onClick={handleLoginSignup}>Login/Signup</div>
                    }
                    <div id='auth-container' className='nb-loginsignup-container nb-loginsignup-container-hidden'>
                        <LoginSignup />
                    </div>
                </div>
            </div>
            {/* <div id='auth-container' className='nb-loginsignup-container hidden'>
                <LoginSignup />
            </div> */}
        </>
    )
}

const NavbarContainer = () => {
    const dispatch = useDispatch();
    let loggedIn = useSelector(state => state.authentication.loggedIn);
    let logout = () => dispatch(authenticationActions.logout());

    return <Navbar loggedIn={loggedIn} logout={logout} />
}

export default NavbarContainer
