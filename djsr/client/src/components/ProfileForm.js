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

    let [name, setName] = useState(profile.name);
    let [birthDate, setBirthDate] = useState(profile.birthDate);
    let [birthTime, setBirthTime] = useState(profile.birthTime);
    let [birthLocation, setBirthLocation] = useState(profile.birthLocation);

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
        <div className='pf-container'>
            <form onSubmit={handleSubmit === 'edit' ? handleEditProfile : handleAddProfile}>
                <div className='pf-inputs-container'>
                    <label>
                        <input name="name" type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
                    </label>
                    <label>
                        <input name="birthdate" type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
                    </label>
                    <label>
                        <input name="birthtime" type="time" value={birthTime} onChange={(e) => setBirthTime(e.target.value)} />
                    </label>
                    <label>
                        <input name="birthLocation" type="text" value={birthLocation} onChange={(e) => setBirthLocation(e.target.value)} />
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
