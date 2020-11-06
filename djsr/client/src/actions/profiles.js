import { ChartFactory, Person } from 'astrologyjs'
import { profileConstants } from '../constants/profiles';
import axiosInstance from '../axiosApi';

export const loadProfiles = () => async (dispatch, getState) => {

    const response = await axiosInstance.get(
        '/profiles/',
    )

    if (response.status === 200) {
        console.log(response)
        dispatch(success())
    } else {
        console.log('Failed to load profiles')
    }

    function success() { return { type: profileConstants.LOAD_PROFILES, response } }
}

export const selectProfile = (profileId) => async (dispatch, getState) => {
    dispatch(profileConstants.SELECT_PROFILE(profileId))
}

export const createProfile = (name, birthDate, birthTime, birthLocation) => async(dispatch, getState) => {
    let profile = await Person.create(name, birthDate+'T'+birthTime)
    let chart = await ChartFactory.create(`${name}'s Natal Chart`, profile)
    const response = await axiosInstance.post(
        '/profiles/',
        {
            method: 'POST',
            body: JSON.stringify({name, birthDate, birthTime, birthLocation, profile, chart})
        }
        )

        if (response.status === 200) {
            console.log('Successfully created profile')
        } else {
            console.log('Failed to create profile');
        }

        // function success() { return { type: profileConstants.LOAD_PROFILES, response } }
}
