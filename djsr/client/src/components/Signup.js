import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as authActions from '../actions/authentication';

const Signup = ({
    submitSignup
}) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault()
        submitSignup(username, email, password);
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    Username
                    <input name="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <label>
                    Email
                    <input name="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label>
                    Password
                    <input name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <input type="submit" value="Login" />
            </form>
        </>
    )
}

const SignupContainer = () => {
    const dispatch = useDispatch();
    const submitSignup = (username, email, password) => dispatch(authActions.signup(username, email, password));

    return <Signup submitSignup={submitSignup} />
}

export default SignupContainer
