import React, { useEffect, useState } from 'react';
import Login from './Login'
import Signup from './Signup'

const LoginSignup = ({
    setCloseCondition
}) => {
    let [signup, setSignup] = useState(false);

    const createAccount = () => {
        signup = setSignup(!signup);
    }



    return (
        <>
            <div>
                <div id='login-signup-errors'></div>
                <div>
                    {signup ? <Signup setCloseCondition={setCloseCondition} /> : <Login setCloseCondition={setCloseCondition} />}
                </div>
                <div className='ls-toggle-link'>
                    <div onClick={createAccount}>{signup ? 'OR Login' : 'OR Register' }</div>
                </div>
            </div>
        </>
    )
}

export default LoginSignup;
