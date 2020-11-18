import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as profileActions from '../actions/profiles';

const ProfileForm = ({
    handleSubmit,
    profile,
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

    console.log('profile.name: ', profile.name)
    console.log('profile.birthDate: ', profile.birthDate)

    return (
        <div className='pf-container'>
            <form onSubmit={handleSubmit === 'edit' ? handleEditProfile : handleAddProfile}>
                <div className='pf-inputs-container'>
                    <label>
                        <input name="name" value={profile.name} type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
                    </label>
                    <label>
                        <input name="birthdate" value={profile.birthDate} type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
                    </label>
                    <label>
                        <input name="birthtime" value={profile.birthTime} type="time" value={birthTime} onChange={(e) => setBirthTime(e.target.value)} />
                    </label>
                    <label>
                        <input name="birthLocation" value={profile.birthLocation} type="text" value={birthLocation} onChange={(e) => setBirthLocation(e.target.value)} />
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
    setCloseCondition,
    profile
}) => {
    const dispatch = useDispatch();
    let createProfile = (name, birthDate, birthTime, birthLocation) => dispatch(profileActions.createProfile(name, birthDate, birthTime, birthLocation));
    let editProfile = (profileId, name, birthDate, birthTime, birthLocation) => dispatch(profileActions.editProfile(profileId, name, birthDate, birthTime, birthLocation));

    return <ProfileForm
        profile={profile}
        profileId={profileId}
        handleSubmit={handleSubmit}
        createProfile={createProfile}
        editProfile={editProfile}
        setCloseCondition={setCloseCondition}
    />
}

export default ProfileFormContainer
