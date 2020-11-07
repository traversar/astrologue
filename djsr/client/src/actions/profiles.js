import { profileConstants } from '../constants/profiles';
import axiosInstance from '../axiosApi';
import { Origin, Horoscope } from 'circular-natal-horoscope-js';

export const chartTest = () => async(dispatch, getState) => {
    const origin = new Origin({
        year: 1992,
        month: 9,
        date: 5,
        hour: 8,
        minute: 43,
        latitude: 39.299236,
        longitude: -76.609383
    });

    const horoscope = new Horoscope({
        origin: origin,
        houseSystem: "whole-sign",
        zodiac: "tropical",
        aspectPoints: ["bodies", "points", "angles"],
        aspectWithPoints: ["bodies", "points", "angles"],
        aspectTypes: ["major", "minor"],
        customOrbs: {},
        language: 'en',
    })

    console.log(horoscope.Ascendant)
    console.log(horoscope.Aspects)
    console.log(horoscope.CelestialBodies)
}

export const loadProfiles = () => async (dispatch, getState) => {

    let response = await axiosInstance.get(
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
    let [year, month, date] = birthDate.split('-');
    let [hour, minute] = birthTime.split(':');
    let [stateProvince, country] = birthLocation.split(',').map(ele => ele.trim())
    let [latitude, longitude] = getLongLat(stateProvince, country);

    // console.log(
    //     'year: ', year,
    //     'month: ', month,
    //     'date: ', date,
    //     'hour: ', hour,
    //     'minute: ', minute,
    //     'state: ', stateProvince,
    //     'country: ', country,
    //     'latLong: ', latLong,
    // )

    const profile = new Origin({
        year,
        month,
        date,
        hour,
        minute,
        latitude,
        longitude
    });

    const response = await axiosInstance.post(
        '/profiles/',
        {
            method: 'POST',
            body: JSON.stringify({name, birthDate, birthTime, birthLocation, profile})
        }
        )

        if (response.status === 200) {
            dispatch(success())
            console.log('Successfully created profile');
        } else {
            console.log('Failed to create profile');
        }

        function success() { return { type: profileConstants.LOAD_PROFILES } }
}

export const getLongLat = (stateProvince, country) => async(dispatch, getState) => {
    const response = await axiosInstance.post(
        '/address/',
        {
            method: 'POST',
            body: JSON.stringify([stateProvince, country])
        }
    )
    if (response.status === 200) {
        return await response.json()
    } else {
        console.log('Error getting Long/Lat from address')
    }
}
