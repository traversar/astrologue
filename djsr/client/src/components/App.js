import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginSignup from './LoginSignup';
import Navbar from './Navbar';
import NatalView from './NatalView'
import CompatibilityView from './CompatibilityView'
import LearnView from './LearnView'
import TransitsView from './TransitsView'
import ProfileView from './ProfileView'
import './App.css'

const App = ({
    loggedIn
}) => {
    return (
        <>
        <BrowserRouter>
            <main>
                <div className='app-container'>
                    <div className='app-header-container'>
                        <h1>Astrologue</h1>
                    </div>
                    <div className='app-body-container boxed'>
                        <div className='app-nav-container'>
                            <Navbar />
                        </div>
                        <div className='app-profile-container boxed'>
                            <ProfileView />
                        </div>
                        <div className='app-content-container boxed'>
                            <Switch>
                                <Route exact path={'/'} component={NatalView} />
                                <Route exact path={'/transits/'} component={TransitsView} />
                                <Route exact path={'/compatiblity/'} component={CompatibilityView} />
                                <Route exact path={'/learn/'} component={LearnView} />
                            </Switch>
                        </div>
                    </div>
                </div>
            </main>
            </BrowserRouter>
        </>
    )
}

const AppContainer = () => {
    let loggedIn = useSelector(state => state.authentication.loggedIn );

    return <App loggedIn={loggedIn} />
}

export default AppContainer
