import { ChartFactory, Person } from 'astrologyjs'
import { profileConstants } from '../constants/profiles';
import axiosInstance from '../axiosApi';

export const loadProfiles = () => async (dispatch, getState) => {

    const response = await axiosInstance.get(
        '/profiles/',
    )

    if (response.status === 200) {
        response = await response.json()
        console.log(response)
        dispatch(success(response))
    } else {
        console.log('Failed to load profiles')
    }

    function success(response) { return { type: profileConstants.LOAD_PROFILES, response } }
}

export const selectProfile = (profileId) => async (dispatch, getState) => {
    dispatch(profileConstants.SELECT_PROFILE(profileId))
}

export const createProfile = (name, birthDate, birthTime, birthLocation) => async(dispatch, getState) => {
    let dateTime = birthDate+'T'+birthTime+'Z';
    birthLocation = await dispatch(getLongLat(birthLocation));
    console.log(birthLocation)
    let profile = await Person.create(name, dateTime, birthLocation);
    let chart = await ChartFactory.create(`${name}'s Natal Chart`, profile);
    const response = await axiosInstance.post(
        '/profiles/',
        {
            method: 'POST',
            body: JSON.stringify({name, birthDate, birthTime, birthLocation, profile, chart})
        }
        )

        if (response.status === 200) {
            console.log('Successfully created profile');
        } else {
            console.log('Failed to create profile');
        }

        // function success() { return { type: profileConstants.LOAD_PROFILES, response } }
}

export const getLongLat = (address) => async(dispatch, getState) => {
    const response = await axiosInstance.post(
        '/address/',
        {
            method: 'POST',
            body: JSON.stringify(address)
        }
    )
    if (response.status === 200) {
        return await response.json()
    } else {
        console.log('Error getting Long/Lat from address')
    }
}
