import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';
import NatalView from './NatalView'
import CompatibilityView from './CompatibilityView'
import LearnView from './LearnView'
import TransitsView from './TransitsView'
import ProfileView from './ProfileView'
import * as profileActions from '../actions/profiles';
import * as authActions from '../actions/authentication';
import './App.css'

const App = ({
    loadProfiles,
    loggedIn,
    refreshLogin
}) => {

    useEffect(() => {

        // if(!loggedIn) {
        //     refreshLogin()
        // }

        loadProfiles()

    }, [loggedIn]);

    return (
        <>
        <main>
            <BrowserRouter>
                <div className='app-container boxed'>
                    <div className='app-nav-container'>
                        <Navbar />
                    </div>
                    <div className='app-profile-container boxed'>
                        <ProfileView />
                    </div>
                    <div className='app-content-container'>
                        <Switch>
                            <Route exact path='/' component={NatalView}></Route>
                            <Route exact path='/transits/' component={TransitsView}></Route>
                            <Route exact path='/compatibility/' component={CompatibilityView}></Route>
                            <Route exact path='/learn/' component={LearnView}></Route>
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        </main>
        </>
    )
}

const AppContainer = () => {
    const dispatch = useDispatch();
    const loadProfiles = () => dispatch(profileActions.loadProfiles())
    const refreshLogin = () => dispatch(authActions.refreshLogin())
    let loggedIn = useSelector(state => state.authentication.loggedIn);


    return <App loggedIn={loggedIn} loadProfiles={loadProfiles} refreshLogin={refreshLogin} />
}

export default AppContainer
