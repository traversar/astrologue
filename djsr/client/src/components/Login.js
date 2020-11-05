import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as authActions from '../actions/authentication';

const Login = ({
    submitLogin
}) => {
    let [email, setEmail] = useState('');
    let handleEmail = value => setEmail(value);
    let [password, setPassword] = useState('');
    let handlePassword = value => setPassword(value);

    const handleSubmit = event => {
        event.preventDefault();
        submitLogin(email, password);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='login-container'>
                <label>
                    <input name="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label>
                    <input name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <input type="submit" value="Login" />
            </div>
        </form>
    )
}

const LoginContainer = () => {
    const dispatch = useDispatch();
    const submitLogin = (email, password) => dispatch(authActions.login(email, password));

    return <Login submitLogin={submitLogin} />
}

export default LoginContainer
