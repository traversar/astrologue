import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as profileActions from '../actions/profiles';
import ProfileForm from './ProfileForm'
import DropInComponent from '../utils/DropInComponent'

const ProfileButton = ({
    profile,
    selectProfile,
    selectedProfile,
    selectedProfileOther,
    selectOtherOn
}) => {
    let [selectSwitch, setSelectSwitch] = useState(true);
    let [editProfile, setEditProfile] = useState('');

    const handleProfileSelect = (profileId) => {
        if(selectOtherOn) {
            selectProfile(profileId, selectSwitch);
            setSelectSwitch(!selectSwitch);
        } else {
            selectProfile(profileId);
        }
    }

    const handleProfileEdit = (profileId) => {
        if(!editProfile){
            setEditProfile(profileId)
        } else {
            setEditProfile('')
        }
    }

    let elementColors = {
        0: 'pb-container-air',
        1: 'pb-container-water',
        2: 'pb-container-fire',
        3: 'pb-container-earth',
    }

    return (
        <>
            <div
                onClick={() =>  profile.id === selectedProfile.id || (selectOtherOn  && selectedProfileOther && selectedProfileOther.id === profile.id) ? handleProfileEdit(profile.id) : handleProfileSelect(profile.id)}
                // className={ profile.id === selectedProfile.id || (selectedProfileOther && selectedProfileOther.id === profile.id) ? 'pb-container boxed-selected ' + elementColors[profile.id % 4] : 'pb-container boxed ' + elementColors[profile.id % 4]}>
                className={ profile.id === selectedProfile.id
                    ?
                        'pb-container boxed-selected ' + elementColors[profile.id % 4]
                    :
                        (selectedProfileOther && selectedProfileOther.id === profile.id)
                    ?
                        'pb-container boxed-selected-other ' + elementColors[profile.id % 4]
                    :
                        'pb-container boxed ' + elementColors[profile.id % 4]}>
                        <div>{profile.name}</div>
                        <div style={{fontSize: '.8em', borderTop: '1px dotted white'}}>{profile.birthDate}</div>
                        <div style={{fontSize: '.8em', borderTop: '1px dotted white'}}>{profile.birthCity} {profile.birthState}, {profile.birthCountry}</div>
            </div>
            {editProfile &&
                <DropInComponent
                    id="dic-1"
                    dropIn={ProfileForm}
                    setCloseCondition={setEditProfile}
                    handleSubmit={'edit'}
                    profileId={editProfile}
                    profile={profile}
                />
            }
        </>
    )
}

const ProfileButtonContainer = ({profile}) => {
    const dispatch = useDispatch();
    const selectProfile = (profileId, other) => dispatch(profileActions.selectProfile(profileId, other));
    // const editProfile = (profileId, name, birthDate, birthTime, birthLocation) => dispatch(profileActions.selectProfile(profileId, name, birthDate, birthTime, birthLocation));
    let selectedProfile = useSelector(state => state.entities.profiles.selectedProfile)
    let selectedProfileOther = useSelector(state => state.entities.profiles.selectedProfileOther)
    let selectOtherOn = useSelector(state => state.entities.profiles.selectOtherOn)

    return <ProfileButton
        profile={profile}
        // editProfile={editProfile}
        selectOtherOn={selectOtherOn}
        selectProfile={selectProfile}
        selectedProfile={selectedProfile}
        selectedProfileOther={selectedProfileOther}
    />
}

export default ProfileButtonContainer
