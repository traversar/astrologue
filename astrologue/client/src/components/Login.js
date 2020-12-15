import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as authActions from '../actions/authentication';

const Login = ({
    submitLogin,
    setCloseCondition
}) => {
    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
        submitLogin(username, password);
        setCloseCondition(false);
    }

    const handleDemoUser = () => {
        submitLogin('Demo', 'password');
        setCloseCondition(false);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='login-container'>
                <label>
                    <input name="email" type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <label>
                    <input name="password" type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <input type="submit" value="Login" />
                <div style={{margin: '5px 0', textAlign: 'center', cursor: 'pointer'}}>
                    <span
                        style={{fontFamily: 'helvetica',color: 'rgb(192, 176, 211)'}}
                        onClick={handleDemoUser}>
                            Login Demo User
                    </span>
                </div>
            </div>
        </form>
    )
}

const LoginContainer = ({setCloseCondition}) => {
    const dispatch = useDispatch();
    const submitLogin = (username, password) => dispatch(authActions.login(username, password));

    return <Login submitLogin={submitLogin} setCloseCondition={setCloseCondition} />
}

export default LoginContainer
