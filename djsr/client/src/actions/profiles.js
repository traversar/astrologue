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
        let data = response.data
        console.log(data)
        console.log('here')
        dispatch(success(data))
        console.log('here')
    } else {
        console.log('Failed to load profiles')
    }

    function success(data) { return { type: profileConstants.LOAD_PROFILES, profiles: data } }
}

export const selectProfile = (profileId) => async (dispatch, getState) => {
    dispatch(profileConstants.SELECT_PROFILE(profileId))
}

export const createProfile = (name, birthDate, birthTime, birthLocation) => async(dispatch, getState) => {
    let [year, month, date] = birthDate.split('-');
    let [hour, minute] = birthTime.split(':');
    let [city, stateProvince, country] = birthLocation.split(' ').map(ele => ele.trim().replaceAll(',',''))
    let latAndLong = await dispatch(getLongLat(city, stateProvince, country));
    let [latitude, longitude] = latAndLong

    console.log(
        'year: ', year,
        'month: ', month,
        'date: ', date,
        'hour: ', hour,
        'minute: ', minute,
        'state: ', stateProvince,
        'country: ', country,
        'lat: ', latitude,
        'long: ', longitude,
    )

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
            body: JSON.stringify({name, birthDate, birthTime, birthLocation, profile: profile})
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

export const getLongLat = (city, stateProvince, country) => async(dispatch, getState) => {
    const response = await axiosInstance.post(
        '/address/',
        {
            method: 'POST',
            body: JSON.stringify({city, stateProvince, country})
        }
    )
    if (response.status === 200) {
        return response.data
    } else {
        console.log('Error getting Long/Lat from address')
    }
}
