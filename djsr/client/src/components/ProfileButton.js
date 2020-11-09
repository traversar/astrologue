import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as profileActions from '../actions/profiles';

const ProfileButton = ({
    profile,
    selectProfile
}) => {

    const handleProfileSelect = (profileId) => {
        dispatch(selectProfile(profileId))
    }

    return (
        <div onClick={() => handleProfileSelect(profile.id)} className='pb-container boxed'>
            <div>{profile.name}</div>
            <div>{profile.birthDate}</div>
            <div>{profile.birthLocation}</div>
        </div>
    )
}

const ProfileButtonContainer = ({profile}) => {
    const dispatch = useDispatch();
    const selectProfile = (profileId) => dispatch(profileActions.selectProfile(profileId));

    return <ProfileButton profile={profile} selectProfile={selectProfile} />
}

export default ProfileButtonContainer
