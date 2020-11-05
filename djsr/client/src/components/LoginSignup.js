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
                <div>
                    <a onClick={createAccount}>{signup ? 'I already have an account' : 'Create an account' }</a>
                </div>
            </div>
        </>
    )
}

export default LoginSignup;
