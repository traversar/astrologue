import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../actions/authentication';
import * as profileActions from '../actions/profiles';
import { Horoscope, Origin } from 'circular-natal-horoscope-js';


const CompatibilityView = ({
    renderChart,
    selectedProfile,
    selectedProfileOther,
    chartData,
    chartDataOther,
    horoscopeData,
    horoscopeDataOther
}) => {
    let [chartOverview, setChartOverview] = useState('{}');

    useEffect(() => {

        if(selectedProfile) {
            renderChart(selectedProfile)
        }
        if(selectedProfileOther) {
            renderChart(selectedProfileOther, other=true)
        }

    }, [selectedProfile, selectedProfileOther])


    useEffect(() => {

        if(chartData && chartDataOther) {
            let chartDiv = document.getElementById('chart')
            chartDiv.innerHTML = '';
            var chart = new astrology.Chart('chart', 550, 550).radix(chartData)
            var other = chart.transit(chartDataOther)
        } else {
            console.log('No chart data')
        }

    }, [chartData, chartDataOther])

    useEffect(() => {

        if(horoscopeData) {
            renderHoroscopeData(horoscopeData);
        } else {
            console.log('No horoscope data')
        }

    }, [horoscopeData, horoscopeDataOther])


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

const CompatibilityViewContainer = () => {
    const dispatch = useDispatch();
    let renderChart = (profile) => dispatch(profileActions.renderChart(profile));
    let selectedProfile = useSelector(state => state.entities.profiles.selectedProfile);
    let chartData = useSelector(state => state.entities.profiles.chartData);
    let horoscopeData = useSelector(state => state.entities.profiles.horoscopeData);
    let selectedProfileOther = useSelector(state => state.entities.profiles.selectedProfileOther);
    let chartDataOther = useSelector(state => state.entities.profiles.chartDataOther);
    let horoscopeDataOther = useSelector(state => state.entities.profiles.horoscopeDataOther);

    return <CompatibilityView
        chartData={chartData}
        chartDataOther={chartDataOther}
        horoscopeData={horoscopeData}
        horoscopeDataOther={horoscopeDataOther}
        selectedProfile={selectedProfile}
        selectedProfileOther={selectedProfileOther}
        renderChart={renderChart} />
}

export default CompatibilityViewContainer
