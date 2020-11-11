import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../actions/authentication';
import * as profileActions from '../actions/profiles';
import { Horoscope, Origin } from 'circular-natal-horoscope-js';


const NatalView = ({
    selectedProfile,
    renderChart,
    chartData,
    horoscopeData
}) => {
    let [chartOverview, setChartOverview] = useState('{}');

    useEffect(() => {

        if(selectedProfile) {
            renderChart(selectedProfile)
        }

    }, [selectedProfile])


    useEffect(() => {

        if(chartData) {
            let chartDiv = document.getElementById('chart')
            chartDiv.innerHTML = '';
            var chart = new astrology.Chart('chart', 550, 550).radix(chartData)
        } else {
            console.log('No chart data')
        }

    }, [chartData])

    useEffect(() => {

        if(horoscopeData) {
            renderHoroscopeData(horoscopeData);
        } else {
            console.log('No horoscope data')
        }

    }, [horoscopeData])


    const renderHoroscopeData = horoscopeData => {
        let _chartOverview = {};
        let celestialBodies = horoscopeData.CelestialBodies.all;

        for(let i = 0; i < celestialBodies.length; i++){
            _chartOverview[celestialBodies[i].label] = { house: [celestialBodies[i].House.label], sign: [celestialBodies[i].Sign.label] }
        }
        delete _chartOverview['Sirius'];

        setChartOverview(_chartOverview);
    }


    return (
        <div className='nv-container'>
            <div className='nv-details-container boxed'>
                {chartOverview &&
                    Object.keys(chartOverview).map(planet => (
                        <div>
                            {planet} in {chartOverview[planet].sign} in the {chartOverview[planet].house} house
                        </div>
                    ))
                }
            </div>
            <div id='chart'></div>
        </div>
    )
}

const NatalViewContainer = () => {
    const dispatch = useDispatch();
    let renderChart = (profile) => dispatch(profileActions.renderChart(profile));
    let selectedProfile = useSelector(state => state.entities.profiles.selectedProfile);
    let chartData = useSelector(state => state.entities.profiles.chartData);
    let horoscopeData = useSelector(state => state.entities.profiles.horoscopeData);

    return <NatalView chartData={chartData} horoscopeData={horoscopeData} selectedProfile={selectedProfile} renderChart={renderChart} />
}

export default NatalViewContainer
