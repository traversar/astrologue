import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as authActions from '../actions/authentication';

const Signup = ({
    submitSignup,
    setCloseCondition
}) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault()
        if (password === confirmPassword) {
            submitSignup(username, email, password);
            setCloseCondition(false);
        } else {
            let loginSignupErrors = document.getElementById('login-signup-errors');
            loginSignupErrors.innerHTML = "Passwords don't match";
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='signup-container'>
                <label>
                    <input name="username" type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <label>
                    <input name="email" type="text" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label>
                    <input name="password" type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <label>
                    <input name="confirm-password" type="password" placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </label>
                <input type="submit" value="Register" />
            </div>
        </form>
    )
}

const SignupContainer = ({setCloseCondition}) => {
    const dispatch = useDispatch();
    const submitSignup = (username, email, password) => dispatch(authActions.signup(username, email, password));

    return <Signup submitSignup={submitSignup} setCloseCondition={setCloseCondition} />
}

export default SignupContainer
