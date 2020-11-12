import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as profileActions from '../actions/profiles';

const ProfileButton = ({
    location,
    profile,
    selectProfile,
    selectedProfile,
    selectedProfileOther,
    selectOtherOn
}) => {
    let [selectSwitch, setSelectSwitch] = useState(true);

    const handleProfileSelect = (profileId) => {
        if(selectOtherOn) {
            selectProfile(profileId, selectSwitch);
            setSelectSwitch(!selectSwitch);
        } else {
            selectProfile(profileId);
        }
    }

    let elementColors = {
        0: 'pb-container-air',
        1: 'pb-container-water',
        2: 'pb-container-fire',
        3: 'pb-container-earth',
    }

    return (
        <div
            onClick={() => handleProfileSelect(profile.id)}
            className={ profile.id === selectedProfile.id || (selectedProfileOther && selectedProfileOther.id === profile.id) ? 'pb-container boxed-selected ' + elementColors[profile.id % 4] : 'pb-container boxed ' + elementColors[profile.id % 4]}>
                <div>{profile.name}</div>
                <div>{profile.birthDate}</div>
                <div>{profile.birthLocation}</div>
        </div>
    )
}

const ProfileButtonContainer = ({profile}) => {
    const dispatch = useDispatch();
    const selectProfile = (profileId, other) => dispatch(profileActions.selectProfile(profileId, other));
    let selectedProfile = useSelector(state => state.entities.profiles.selectedProfile)
    let selectedProfileOther = useSelector(state => state.entities.profiles.selectedProfileOther)
    let selectOtherOn = useSelector(state => state.entities.profiles.selectOtherOn)

    return <ProfileButton
        profile={profile}
        selectOtherOn={selectOtherOn}
        selectProfile={selectProfile}
        selectedProfile={selectedProfile}
        selectedProfileOther={selectedProfileOther}
    />
}

export default ProfileButtonContainer
