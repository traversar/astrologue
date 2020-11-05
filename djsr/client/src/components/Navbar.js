import React from 'react';
import { Link } from 'react-router-dom';
import LoginSignup from './LoginSignup'

const Navbar = () => {
    let loginSignup = '';

    const handleLoginSignup = () => {
        let authContainer = document.getElementById('auth-container')
        authContainer.classList.contains('hidden') ? authContainer.classList.remove('hidden') : authContainer.classList.add('hidden');
        loginSignup = loginSignup === 'login' ? false : true;
    }

    return (
        <>
            <div className='nb-links-container'>
                <div>
                    <Link to='/chart/'>Chart</Link>
                    <Link to='/transits/'>Transits</Link>
                    <Link to='/compatibility/'>Compatibility</Link>
                    <Link to='/learn/'>Learn</Link>
                </div>
                <div>
                    <button onClick={handleLoginSignup}>Account (Not signed in)</button>
                    <div id='auth-container' className='nb-loginsignup-container hidden'>
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

    return <Navbar />
}

export default NavbarContainer
