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
                <div>
                    {signup ? <Signup /> : <Login />}
                </div>
                <div>
                    <button onClick={createAccount}>{signup ? 'Login' : 'Create an account' }</button>
                </div>
            </div>
        </>
    )
}

export default LoginSignup;
