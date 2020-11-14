import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as profileActions from '../actions/profiles';

const ProfileForm = ({
    handleSubmit,
    createProfile,
    editProfile,
    profileId,
    setCloseCondition
}) => {

    let [name, setName] = useState('');
    let [birthDate, setBirthDate] = useState('');
    let [birthTime, setBirthTime] = useState('');
    let [birthLocation, setBirthLocation] = useState('');

    const handleEditProfile = (e) => {
        e.preventDefault();
        if(profileId && name && birthDate && birthTime && birthLocation)
            editProfile(profileId, name, birthDate, birthTime, birthLocation);
        setCloseCondition(false);
    }

    const handleAddProfile = (e) => {
        e.preventDefault();
        createProfile(name, birthDate, birthTime, birthLocation);
        setCloseCondition(false);
    }

    return (
        <div className='profile-form-container profile-form-container-hidden'>
            <form onSubmit={handleSubmit === 'edit' ? handleEditProfile : handleAddProfile}>
                <div className='pf-inputs-container'>
                    <label>
                        <div name="name" type="text" placeholder='Name/Alias' value={name} onChange={(e) => setName(e.target.value)}></div>
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
                    <input type="submit" value={handleSubmit === 'edit' ? 'Save' : 'Create'} />
                </div>
            </form>
        </div>
    )
}

const ProfileFormContainer = ({
    profileId,
    handleSubmit,
    setCloseCondition
}) => {
    const dispatch = useDispatch();
    let createProfile = (name, birthDate, birthTime, birthLocation) => dispatch(profileActions.createProfile(name, birthDate, birthTime, birthLocation));
    let editProfile = (profileId, name, birthDate, birthTime, birthLocation) => dispatch(profileActions.editProfile(profileId, name, birthDate, birthTime, birthLocation));

    return <ProfileForm
        profileId={profileId}
        handleSubmit={handleSubmit}
        createProfile={createProfile}
        editProfile={editProfile}
        setCloseCondition={setCloseCondition}
    />
}

export default ProfileFormContainer
