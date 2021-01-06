import { profileConstants } from '../constants/profiles';
import { authConstants } from "../constants/authentication";
import axiosInstance from '../axiosApi';
import { Origin, Horoscope } from 'circular-natal-horoscope-js';

// customOrbs = {
//     conjunction: 8,
//     opposition: 8,
//     trine: 8,
//     square: 5,
//     sextile: 6,
//     quincunx: 5,
//     quintile: 1,
//     septile: 1,
//     "semi-square": 1,
//     "semi-sextile": 1,
// }

export const renderChartForNow = (profileData) => async(dispatch, getState) => {
    let { latitude, longitude } = profileData;
    let cD = new Date();
    let [ year, month, date, hour, minute ] = [
        cD.getFullYear(),
        cD.getMonth(),
        cD.getDate(),
        cD.getHours(),
        cD.getMinutes()-10
    ]

    console.log(year, month, date, hour, minute)

    const profile = new Origin({
        year,
        month,
        date,
        hour,
        minute,
        latitude,
        longitude
    });

    let horoscope = new Horoscope({
        origin: profile,
        houseSystem: "whole-sign",
        zodiac: "tropical",
        aspectPoints: ["sun", "moon", "mercury", "venus", "mars", "jupiter", "saturn", "uranus", "neptune", "pluto"],
        aspectWithPoints: ["sun", "moon", "mercury", "venus", "mars", "jupiter", "saturn", "uranus", "neptune", "pluto", "chiron", "ascendant", "midheaven", "northnode"],
        aspectTypes: ["major", "minor"],
        customOrbs: {},
        language: 'en',
    });

    let planets = {}
    let celestialBodies = horoscope.CelestialBodies.all;

    for(let i = 0; i < celestialBodies.length; i++){
        planets[celestialBodies[i].label] = [celestialBodies[i].ChartPosition.Ecliptic.DecimalDegrees]
    }
    delete planets['Sirius'];

    let cusps = [horoscope.Ascendant.ChartPosition.Ecliptic.DecimalDegrees]
    for(let i = 1; i < 12; i++) {
        cusps.push((cusps[i-1] + 30) % 360)
    }

    let chartData = {
        planets,
        cusps
    }

    dispatch(chartDataOtherAction())
    function chartDataOtherAction () { return { type: profileConstants.LOAD_CHART_DATA_OTHER, chartData, horoscope } }
}

export const renderChart = (profileData, other=false) => async(dispatch, getState) => {
    let { birthDate, birthTime, birthLocation, latitude, longitude } = profileData;
    let [ year, month, date ] = birthDate.split('-');
    [year, month, date] = [Number(year), Number(month)-1, Number(date)];
    let [ hour, minute ] = birthTime.split(':');
    [hour, minute] = [Number(hour), Number(minute)]

    const profile = new Origin({
        year,
        month,
        date,
        hour,
        minute,
        latitude,
        longitude
    });

    let horoscope = new Horoscope({
        origin: profile,
        houseSystem: "whole-sign",
        zodiac: "tropical",
        aspectPoints: ["sun", "moon", "mercury", "venus", "mars", "jupiter", "saturn", "uranus", "neptune", "pluto"],
        aspectWithPoints: ["sun", "moon", "mercury", "venus", "mars", "jupiter", "saturn", "uranus", "neptune", "pluto", "chiron", "ascendant", "midheaven", "northnode"],
        aspectTypes: ["major", "minor"],
        customOrbs: {},
        language: 'en',
    });


    let planets = {}
    let celestialBodies = horoscope.CelestialBodies.all;

    for(let i = 0; i < celestialBodies.length; i++){
        planets[celestialBodies[i].label] = [celestialBodies[i].ChartPosition.Ecliptic.DecimalDegrees]
    }
    delete planets['Sirius'];

    let cusps = [horoscope.Ascendant.ChartPosition.Ecliptic.DecimalDegrees]
    for(let i = 1; i < 12; i++) {
        cusps.push((cusps[i-1] + 30) % 360)
    }

    let chartData = {
        planets,
        cusps
    }

    if(!other) {
        dispatch(chartDataAction());
    } else {
        dispatch(chartDataOtherAction());
    }

    function chartDataAction () { return { type: profileConstants.LOAD_CHART_DATA, chartData, horoscope } }
    function chartDataOtherAction () { return { type: profileConstants.LOAD_CHART_DATA_OTHER, chartData, horoscope } }
}


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
        aspectPoints: ["sun", "moon", "mercury", "venus", "mars", "jupiter", "saturn", "uranus", "neptune", "pluto"],
        aspectWithPoints: ["sun", "moon", "mercury", "venus", "mars", "jupiter", "saturn", "uranus", "neptune", "pluto", "chiron", "ascendant", "midheaven", "northnode"],
        aspectTypes: ["major", "minor"],
        customOrbs: {},
        language: 'en',
    })

    console.log(horoscope)

}

export const loadProfiles = () => async (dispatch, getState) => {

    let response = await axiosInstance.get(
        '/profiles/',
    )

    if (response.status === 200) {
        let data = response.data
        dispatch(success(data))
        if(response.data[0].owner) {
            dispatch(loggedIn(response.data[0].owner))
        }
    } else {
        console.log('Failed to load profiles')
    }

    function loggedIn(username) { return { type: authConstants.LOGIN_SUCCESS, username } }
    function success(data) { return { type: profileConstants.LOAD_PROFILES, profiles: data } }
}

export const selectProfile = (profileId, other=false) => async (dispatch, getState) => {
    if(!other) {
        dispatch({ type: profileConstants.SELECT_PROFILE, profileId})
    } else {
        dispatch({ type: profileConstants.SELECT_PROFILE_OTHER, profileId})
    }
}

export const createProfile = (name, birthDate, birthTime, birthCity, birthState, birthCountry) => async(dispatch, getState) => {
    let latAndLong = await dispatch(getLongLat(birthCity, birthState, birthCountry));
    let [latitude, longitude] = latAndLong
    let newProfile = {name, birthDate, birthTime, birthCity, birthState, birthCountry, latitude, longitude}

    if(getState().authentication.loggedIn) {
        const response = await axiosInstance.post(
            '/profiles/',
            {
                method: 'POST',
                body: JSON.stringify(newProfile)
            }
        )

        if (response.status === 200) {
            dispatch(addProfile(newProfile))
            // dispatch(loadProfiles())
            console.log('Successfully created profile');
        } else {
            console.log('Failed to create profile');
        }
    } else {
        newProfile.id = null
        dispatch(addProfile(newProfile))
    }

    function addProfile(profile) { return { type: profileConstants.ADD_PROFILE, profile }}
}

export const editProfile = (profileId, name, birthDate, birthTime, birthCity, birthState, birthCountry, profile) => async (dispatch, getState) => {
    let [latitude, longitude] = [null, null]
    let latAndLong = null

    // If location changed, fetch new coordinates, else use existing
    if(birthCity !== profile.birthCity || birthState !== profile.birthState || birthCountry !== profile.birthCountry) {
        latAndLong = await dispatch(getLongLat(birthCity, birthState, birthCountry));
        [latitude, longitude] = latAndLong;
    } else {
        [latitude, longitude] = [profile.latitude, profile.longitude];
    }

    // If logged in make PATCH request and update state, else only update state
    if(getState().authentication.loggedIn) {
        const response = await axiosInstance.patch(
            '/profiles/',
            {
                method: 'PATCH',
                body: JSON.stringify({profileId, name, birthDate, birthTime, birthCity, birthState, birthCountry, latitude, longitude})
            }
        )

        if (response.status === 200) {
            console.log('Successfully edited profile');
            dispatch(editProfile({id: profileId, name, birthDate, birthTime, birthCity, birthState, birthCountry, latitude, longitude}));
        } else {
            console.log('Failed to edit profile');
        }
    } else {
        dispatch(editProfile({id: profileId, name, birthDate, birthTime, birthCity, birthState, birthCountry, latitude, longitude}))
    }

    function editProfile(profile) { return { type: profileConstants.EDIT_PROFILE, profile} }
}

export const deleteProfile = (profileId) => async(dispatch, getState) => {
    if(getState().authentication.loggedIn) {
        const response = await axiosInstance.delete(
            '/profiles/',
            {
                method: 'DELETE',
                body: profileId
            }
        )

        if(response.status === 200) {
            dispatch(removeProfile(profileId))
        } else {
            console.log('Could not delete')
        }
    } else {
        dispatch(removeProfile(profileId))
    }

    function removeProfile(profileId) { return { type: profileConstants.REMOVE_PROFILE, profileId} }
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
        console.log(response.data)
        return response.data
    } else {
        console.log('Error getting Long/Lat from address')
    }
}

export const selectOther = (status) => async(dispatch, getState) => {
    if(status) {
        dispatch(allowSelectOther())
    } else {
        dispatch(disallowSelectOther())
        let otherSelected = document.querySelector('.boxed-selected-other');
        otherSelected.classList.add('boxed');
        otherSelected.classList.remove('boxed-selected-other');
    }

    function allowSelectOther() { return { type: profileConstants.ALLOW_SELECT_OTHER } }
    function disallowSelectOther() { return { type: profileConstants.DISALLOW_SELECT_OTHER } }
}
