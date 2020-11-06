import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as profileActions from '../actions/profiles'

const ProfileView = ({
    createProfile
}) => {
    let [name, setName] = useState('');
    let [birthDate, setBirthDate] = useState('');
    let [birthTime, setBirthTime] = useState('');
    let [birthLocation, setBirthLocation] = useState('');

    const handleAddProfile = () => {
        let addProfileContainer = document.getElementById('add-profile-container')
        addProfileContainer.classList.contains('hidden') ? addProfileContainer.classList.remove('hidden') : addProfileContainer.classList.add('hidden');
    }

    const addProfile = (e) => {
        e.preventDefault();
        createProfile(name, birthDate, birthTime, birthLocation);
        return null;
    }

    return (
        <div>
            <div onClick={handleAddProfile} className='pv-addprofile-btn boxed'>
                <div>+</div>
                <div>Add Profile</div>
            </div>
            <div id='add-profile-container' className='hidden'>
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

    return <ProfileView createProfile={createProfile} />
}

export default ProfileViewContainer
