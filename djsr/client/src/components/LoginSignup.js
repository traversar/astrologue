import React, { useState } from 'react';
import Login from './Login'
import Signup from './Signup'

const LoginSignup = () => {
    let [signup, setSignup] = useState(false);

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
