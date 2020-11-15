import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as profileActions from '../actions/profiles';
import { astroSVGs } from '../svgs'

const NatalView = ({
    selectedProfile,
    renderChart,
    chartData,
    horoscopeData,
    selectOther
}) => {
    let [chartOverview, setChartOverview] = useState('{}');

    useEffect(() => {
        selectOther(false)
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
                            {astroSVGs['planets'][planet]} in {astroSVGs['signs'][chartOverview[planet].sign]} in the {chartOverview[planet].house} house
                        </div>
                    ))
                }
            </div>
            <div id='chart' className='boxed'></div>
        </div>
    )
}

const NatalViewContainer = () => {
    const dispatch = useDispatch();
    let selectOther = (status) => dispatch(profileActions.selectOther(status));
    let renderChart = (profile) => dispatch(profileActions.renderChart(profile));
    let selectedProfile = useSelector(state => state.entities.profiles.selectedProfile);
    let chartData = useSelector(state => state.entities.profiles.chartData);
    let horoscopeData = useSelector(state => state.entities.profiles.horoscopeData);

    return <NatalView selectOther={selectOther} chartData={chartData} horoscopeData={horoscopeData} selectedProfile={selectedProfile} renderChart={renderChart} />
}

export default NatalViewContainer
