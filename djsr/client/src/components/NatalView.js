import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../actions/authentication';
import * as profileActions from '../actions/profiles';
import { Horoscope, Origin } from 'circular-natal-horoscope-js';


const NatalView = ({
    selectedProfile,
    renderChart,
    chartTest,
    getLongLat,
    chartData
}) => {

    // const renderChartData = (profileData) => {
    //     console.log('Selected Profile (origin): ', profileData.profile_object);
    //     let { birthDate, birthTime, birthLocation } = profileData;
    //     let [ year, month, date ] = birthDate.split('-');
    //     let [ hour, minute ] = birthTime.split(':');
    //     let [ city, stateProvince, country ] = birthLocation.split(' ').map(ele => ele.trim().replaceAll(',',''));
    //     console.log('here 1 city state country: ', city, state, country)
    //     let latAndLong = getLongLat(city, stateProvince, country);
    //     console.log('here 2')
    //     console.log('latAndLong: ', latAndLong);
    //     let [ latitude, longitude ] = latAndLong;
    //     console.log('here 3')


    //     console.log(
    //         'year: ', year,
    //         'month: ', month,
    //         'date: ', date,
    //         'hour: ', hour,
    //         'minute: ', minute,
    //         'state: ', stateProvince,
    //         'country: ', country,
    //         'lat: ', latitude,
    //         'long: ', longitude,
    //     )

    //     const profile = new Origin({
    //         year,
    //         month,
    //         date,
    //         hour,
    //         minute,
    //         latitude,
    //         longitude
    //     });

    //     let horoscope = new Horoscope({
    //         origin: profile,
    //         houseSystem: "whole-sign",
    //         zodiac: "tropical",
    //         aspectPoints: ["bodies", "points", "angles"],
    //         aspectWithPoints: ["bodies", "points", "angles"],
    //         aspectTypes: ["major", "minor"],
    //         customOrbs: {},
    //         language: 'en',
    //     });

    //     // let horoscope = renderChart(JSON.parse(profile.profile_object));

    //     let planets = {}
    //     let celestialBodies = horoscope.CelestialBodies.all;
    //     for(let i = 0; i < celestialBodies.length; i++){
    //         planets[celestialBodies[i].label] = [celestialBodies[i].ChartPosition.Ecliptic.DecimalDegrees]
    //     }

    //     return {
    //         planets,
    //         cusps: [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330]
    //     }
    // }

    useEffect(() => {

        if(selectedProfile) {
            console.log('before render chart')
            renderChart(selectedProfile)
            console.log('after render chart')

        }
        // let data = {
    //         "planets":{"Moon":[0], "Sun":[180]},
    //         "cusps":[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330]
    //     }

    }, [selectedProfile])

    useEffect(() => {

        if(chartData) {
            console.log('before chartData passed to chart')
            var chart = new astrology.Chart('chart', 550, 550).radix(chartData)
            console.log('after chartData passed to chart')
        } else {
            console.log('No chart data')
        }
    }, [chartData])

    chartTest()

    return (
        <div className='nv-container'>
            <div className='nv-details-container boxed'>

            </div>
            <div id='chart'></div>
        </div>
    )
}

const NatalViewContainer = () => {
    const dispatch = useDispatch();
    let chartTest = () => dispatch(profileActions.chartTest());
    let renderChart = (origin) => dispatch(profileActions.renderChart(origin));
    let selectedProfile = useSelector(state => state.entities.profiles.selectedProfile);
    let getLongLat = (city, stateProvince, country) => dispatch(profileActions.getLongLat(city, stateProvince, country));
    let chartData = useSelector(state => state.entities.profiles.chartData);

    return <NatalView chartData={chartData} chartTest={chartTest} selectedProfile={selectedProfile} renderChart={renderChart} getLongLat={getLongLat} />
}

export default NatalViewContainer
