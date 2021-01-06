import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as profileActions from '../actions/profiles';

const ProfileForm = ({
    handleSubmit,
    profile,
    createProfile,
    editProfile,
    deleteProfile,
    profileId,
    setCloseCondition
}) => {

    let [name, setName] = useState(profile.name || '');
    let [birthDate, setBirthDate] = useState(profile.birthDate || '');
    let [birthTime, setBirthTime] = useState(profile.birthTime || '');
    let [birthCity, setBirthCity] = useState(profile.birthCity || '');
    let [birthState, setBirthState] = useState(profile.birthState || '');
    let [birthCountry, setBirthCountry] = useState(profile.birthCountry || '');

    const handleEditProfile = (e) => {
        e.preventDefault();
        if(profileId && name && birthDate && birthTime && birthState && birthCountry)
            editProfile(profileId, name, birthDate, birthTime, birthCity, birthState, birthCountry, profile);
        setCloseCondition(false);
    }

    const handleAddProfile = (e) => {
        e.preventDefault();
        createProfile(name, birthDate, birthTime, birthCity, birthState, birthCountry);
        setCloseCondition(false);
    }

    const handleDeleteProfile = (profileId) => {
        deleteProfile(profileId)
        setCloseCondition(false);
    }

    return (
        <div className='pf-container'>
            <form onSubmit={handleSubmit === 'edit' ? handleEditProfile : handleAddProfile}>
                <div className='pf-inputs-container'>
                    <label style={{fontFamily: 'helvetica', fontWeight: '500', color: 'rgb(219, 205, 246)', marginBottom: '5px', textAlign: 'center', fontWeight: 600}}>
                        Enter Birth Information
                    </label>
                    <label>
                        <input name="name" type="text" placeholder='Name/Alias*' value={name} onChange={(e) => setName(e.target.value)}></input>
                    </label>
                    <label>
                        <input name="birthdate" type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
                    </label>
                    <label>
                        <input name="birthtime" type="time" value={birthTime} onChange={(e) => setBirthTime(e.target.value)} />
                    </label>
                    <label>
                        <input name="birthCity" type="text" placeholder='City/Town' value={birthCity} onChange={(e) => setBirthCity(e.target.value)} />
                    </label>
                    <label>
                        <input name="birthState" type="text" placeholder='State/Province*' value={birthState} onChange={(e) => setBirthState(e.target.value)} />
                    </label>
                    <label>
                        <input name="birthCountry" type="text" placeholder='Country*' value={birthCountry} onChange={(e) => setBirthCountry(e.target.value)} />
                    </label>
                    <input type="submit" value={handleSubmit === 'edit' ? 'Save' : 'Create'} />
                    {handleSubmit === "edit" &&
                        <input type="button" value="Delete" style={{backgroundColor: '#ffbdbd'}} onClick={() => handleDeleteProfile(profile.id)} />
                    }
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
    let createProfile = (name, birthDate, birthTime, birthCity, birthState, birthCountry) => dispatch(profileActions.createProfile(name, birthDate, birthTime, birthCity, birthState, birthCountry));
    let editProfile = (profileId, name, birthDate, birthTime, birthCity, birthState, birthCountry, profile) => dispatch(profileActions.editProfile(profileId, name, birthDate, birthTime, birthCity, birthState, birthCountry, profile));
    let deleteProfile = (profileId) => dispatch(profileActions.deleteProfile(profileId));

    return <ProfileForm
        profile={profile}
        profileId={profileId}
        handleSubmit={handleSubmit}
        createProfile={createProfile}
        editProfile={editProfile}
        deleteProfile={deleteProfile}
        setCloseCondition={setCloseCondition}
    />
}

export default ProfileFormContainer
