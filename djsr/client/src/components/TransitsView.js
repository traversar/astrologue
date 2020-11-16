import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as profileActions from '../actions/profiles';


const TransitsView = ({
    renderChart,
    selectOther,
    selectedProfile,
    chartData,
    chartDataOther,
    horoscopeData,
    horoscopeDataOther,
    renderChartForNow
}) => {
    let [chartOverview, setChartOverview] = useState('{}');

    useEffect(() => {
        selectOther(false);
    }, [])

    useEffect(() => {

        if(selectedProfile) {
            renderChart(selectedProfile)
            renderChartForNow(selectedProfile)
        }

    }, [selectedProfile])

    useEffect(() => {

        if(chartData && chartDataOther) {
            let chartDiv = document.getElementById('chart')
            chartDiv.innerHTML = '';
            var chart = new astrology.Chart('chart', 550, 550).radix(chartData)
            var transits = chart.transit(chartDataOther)
            transits.aspects()
        } else {
            console.log('No chart data')
        }

    }, [chartData, chartDataOther])

    useEffect(() => {

        if(horoscopeData) {
            console.log('horoscopeData: ', horoscopeData)
            console.log('horoscopeDataOther: ', horoscopeDataOther)
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
            <div id='chart' className='boxed'></div>
        </div>
    )
}

const TransitsViewContainer = () => {
    const dispatch = useDispatch();
    let renderChart = (profile, other) => dispatch(profileActions.renderChart(profile, other));
    let renderChartForNow = (profile) => dispatch(profileActions.renderChartForNow(profile));
    let selectOther = (status) => dispatch(profileActions.selectOther(status));
    let selectedProfile = useSelector(state => state.entities.profiles.selectedProfile);
    let chartData = useSelector(state => state.entities.profiles.chartData);
    let horoscopeData = useSelector(state => state.entities.profiles.horoscopeData);
    let chartDataOther = useSelector(state => state.entities.profiles.chartDataOther);
    let horoscopeDataOther = useSelector(state => state.entities.profiles.horoscopeDataOther);

    return <TransitsView
        chartData={chartData}
        chartDataOther={chartDataOther}
        horoscopeData={horoscopeData}
        horoscopeDataOther={horoscopeDataOther}
        selectedProfile={selectedProfile}
        renderChart={renderChart}
        renderChartForNow={renderChartForNow}
        selectOther={selectOther} />
}

export default TransitsViewContainer
