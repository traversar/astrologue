import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';

const App = () => {
    return (
        <>
            <main>
                <div className='app-container'>
                    <h1>Astrologue</h1>
                    <div className='app-content-container'>
                        <Switch>
                            <Route exact path={'/login/'} component={Login} />
                            <Route exact path={'/signup/'} component={Signup} />
                            <Route path={'/'} render={() => <h1>Home again</h1>} />
                        </Switch>
                    </div>
                </div>
            </main>
        </>
    )
}

export default App
