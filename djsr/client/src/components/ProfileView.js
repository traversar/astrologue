import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as profileActions from '../actions/profiles'
import ProfileButton from './ProfileButton'

const ProfileView = ({
    createProfile,
    profiles,
}) => {

    let [name, setName] = useState('');
    let [birthDate, setBirthDate] = useState('');
    let [birthTime, setBirthTime] = useState('');
    let [birthLocation, setBirthLocation] = useState('');

    const handleAddProfile = () => {
        let addProfileContainer = document.querySelector('.add-profile-container')
        addProfileContainer.classList.contains('add-profile-container-hidden') ? addProfileContainer.classList.remove('add-profile-container-hidden') : addProfileContainer.classList.add('add-profile-container-hidden');
    }

    const addProfile = (e) => {
        e.preventDefault();
        createProfile(name, birthDate, birthTime, birthLocation);
        return null;
    }


    return (
        <div>
            <div className='pv-profile-links'>
                <div onClick={handleAddProfile} className='pv-addprofile-btn boxed'>
                    <div>+</div>
                    <div>Add Profile</div>
                </div>
                <div className='pv-profile-links-scrolldiv'>
                {Array.isArray(profiles) &&
                    profiles.map(profile => (
                        <ProfileButton key={profile.id} profile={profile} />
                    ))
                }
                </div>
            </div>
            <div className='add-profile-container add-profile-container-hidden'>
                <form onSubmit={addProfile}>
                    <div className='pv-addprofile-form'>
                        <label>
                            <input name="name" type="text" placeholder='Name/Alias' value={name} onChange={(e) => setName(e.target.value)} />
                        </label>
                        <label>
                            <input name="birthdate" type="date" placeholder='Birthdate' value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
                        </label>
                        <label>
                            <input name="birthtime" type="time" placeholder='Birthtime' value={birthTime} onChange={(e) => setBirthTime(e.target.value)} />
                        </label>
                        <label>
                            <input name="birthLocation" type="text" placeholder='Birth Location' value={birthLocation} onChange={(e) => setBirthLocation(e.target.value)} />
                        </label>
                        <input type="submit" value="Create" />
                    </div>
                </form>
            </div>
        </div>
    )
}

const ProfileViewContainer = () => {
    const dispatch = useDispatch();
    let createProfile = (name, birthDate, birthTime, birthLocation) => dispatch(profileActions.createProfile(name, birthDate, birthTime, birthLocation));
    let profiles = useSelector(state => state.entities.profiles.profiles)
    // let selectedProfile = useSelector(state => state.entities.profiles.selectedProfile)

    return <ProfileView createProfile={createProfile} profiles={profiles} />
}

export default ProfileViewContainer
