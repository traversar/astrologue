import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as profileActions from '../actions/profiles';

const ProfileButton = ({
    profile,
    selectProfile,
    selectedProfile
}) => {

    const handleProfileSelect = (profileId) => {
        console.log('dispatch selectprofile')
        selectProfile(profileId)
    }

    return (
        <div onClick={() => handleProfileSelect(profile.id)} className={profile.id === selectedProfile.id ? 'pb-container boxed-selected' : 'pb-container boxed'} >
            <div>{profile.name}</div>
            <div>{profile.birthDate}</div>
            <div>{profile.birthLocation}</div>
        </div>
    )
}

const ProfileButtonContainer = ({profile}) => {
    const dispatch = useDispatch();
    const selectProfile = (profileId) => dispatch(profileActions.selectProfile(profileId));
    let selectedProfile = useSelector(state => state.entities.profiles.selectedProfile)

    return <ProfileButton profile={profile} selectProfile={selectProfile} selectedProfile={selectedProfile} />
}

export default ProfileButtonContainer
