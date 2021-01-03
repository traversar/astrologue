import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DropInComponent from '../utils/DropInComponent';
import ProfileButton from './ProfileButton';
import ProfileForm from './ProfileForm';

const ProfileView = ({
    profiles
}) => {
    let [showAddProfile, setShowAddProfile] = useState(false)

    const handleAddProfile = () => {
        setShowAddProfile(!showAddProfile)
    }


    return (
        <div>
            <div className='pv-profile-links'>
                <div onClick={handleAddProfile} className='pv-addprofile-btn boxed'>
                    <div>
                        <div style={{fontSize: '2em'}}>+</div>
                        <div>Add Profile</div>
                    </div>
                </div>
                <div className='pv-profile-links-scrolldiv'>
                {Array.isArray(profiles) &&
                    profiles.map(profile => (
                        <ProfileButton key={profile.id} profile={profile} />
                    ))
                }
                </div>
            </div>
            {showAddProfile &&
                    <DropInComponent
                        id="dic-1"
                        dropIn={ProfileForm}
                        setCloseCondition={setShowAddProfile}
                        handleSubmit={'add'}
                        profile={{}}
                    />
            }
        </div>
    )
}

const ProfileViewContainer = () => {
    const dispatch = useDispatch();
    let profiles = useSelector(state => state.entities.profiles.profiles)

    return <ProfileView profiles={profiles} />
}

export default ProfileViewContainer
