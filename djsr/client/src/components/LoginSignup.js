import React, { useEffect, useState } from 'react';
import Login from './Login'
import Signup from './Signup'

const LoginSignup = () => {
    let [signup, setSignup] = useState(false);

    // useEffect(() => {
    //     window.addEventListener('click', e => {
    //         if(e.target.id !== ('auth-container' || 'nb-auth-button') ) {
    //             let authContainer = document.getElementById('auth-container');
    //             if(!authContainer.classList.contains('nb-loginsignup-container-hidden')) {
    //                 authContainer.classList.add('nb-loginsignup-container-hidden')
    //             }
    //         }
    //     })

    //     return () => window.removeEventListener('click');
    // })

    const createAccount = () => {
        signup = setSignup(!signup);
    }

    return (
        <>
            <div>
                <div id='login-signup-errors'></div>
                <div>
                    {signup ? <Signup /> : <Login />}
                </div>
                <div className='ls-toggle-link'>
                    <div onClick={createAccount}>{signup ? 'OR Login' : 'OR Register' }</div>
                </div>
            </div>
        </>
    )
}

export default LoginSignup;
