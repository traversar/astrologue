import { profileConstants } from '../constants/profiles';
import axiosInstance from '../axiosApi';
import { Origin, Horoscope } from 'circular-natal-horoscope-js';


export const renderChart = (profileData) => async(dispatch, getState) => {
    let { birthDate, birthTime, birthLocation, latitude, longitude } = profileData;
    console.log('1');
    let [ year, month, date ] = birthDate.split('-');
    console.log('2');
    [year, month, date] = [Number(year), Number(month)-1, Number(date)];
    console.log('3');
    let [ hour, minute ] = birthTime.split(':');
    [hour, minute] = [Number(hour), Number(minute)]
    console.log('4');
    let [ city, stateProvince, country ] = birthLocation.split(' ').map(ele => ele.trim().replaceAll(',',''));
    // console.log('5');
    // let latAndLong = await dispatch(getLongLat(city, stateProvince, country));
    // console.log('6');
    // console.log(latAndLong)
    // let [ latitude, longitude ] = latAndLong;
    // console.log('7');


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

    let horoscope = new Horoscope({
        origin: profile,
        houseSystem: "whole-sign",
        zodiac: "tropical",
        aspectPoints: ["bodies", "points", "angles"],
        aspectWithPoints: ["bodies", "points", "angles"],
        aspectTypes: ["major", "minor"],
        customOrbs: {},
        language: 'en',
    });

    // let horoscope = renderChart(JSON.parse(profile.profile_object));

    let planets = {}
    let celestialBodies = horoscope.CelestialBodies.all;
    for(let i = 0; i < celestialBodies.length; i++){
        planets[celestialBodies[i].label] = [celestialBodies[i].ChartPosition.Ecliptic.DecimalDegrees]
    }
    console.log('Planets: ', planets)

    let chartData = {
        planets,
        cusps: [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330]
    }

    dispatch(chartDataAction(chartData));

    function chartDataAction (chartData) { return { type: profileConstants.LOAD_CHART_DATA, chartData } }
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
        aspectPoints: ["bodies", "points", "angles"],
        aspectWithPoints: ["bodies", "points", "angles"],
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
        console.log('before dispatch load profiles')
        dispatch(success(data))
        console.log('after dispatch load profiles')
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

    const response = await axiosInstance.post(
        '/profiles/',
        {
            method: 'POST',
            body: JSON.stringify({name, birthDate, birthTime, birthLocation, latitude, longitude})
        }
    )

    if (response.status === 200) {
        dispatch(loadProfiles())
        console.log('Successfully created profile');
    } else {
        console.log('Failed to create profile');
    }
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
