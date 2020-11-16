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
    let [view, setView] = useState('positions');

    useEffect(() => {
        selectOther(false);
    }, [])

    useEffect(() => {
        if(selectedProfile) {
            renderChart(selectedProfile)
        }

    }, [selectedProfile])


    useEffect(() => {

        let settings = {
            ASPECTS: {
                "conjunction":{"degree":0, "orbit":10, "color":"transparent"},
                "square":{"degree":90, "orbit":8, "color":"#FF4500"},
                "trine":{"degree":120, "orbit":8, "color":"#27AE60"},
                "opposition":{"degree":180, "orbit":10, "color":"#27AE60"}
                }
        }

        if(chartData) {
            let chartDiv = document.getElementById('chart')
            chartDiv.innerHTML = '';
            var chart = new astrology.Chart('chart', 550, 550, settings).radix(chartData)
            chart.aspects()
        } else {
            console.log('No chart data')
        }

    }, [chartData])

    useEffect(() => {

        if(horoscopeData) {
            console.log('horoscopeData: ', horoscopeData)
            renderHoroscopeData(horoscopeData);
        } else {
            console.log('No horoscope data')
        }

    }, [horoscopeData])


    const renderHoroscopeData = horoscopeData => {
        let _chartOverview = {
            positions: {},
            aspects: {}
        };
        let celestialBodies = horoscopeData.CelestialBodies.all;
        let aspects = horoscopeData.Aspects.all

        for(let i = 0; i < celestialBodies.length; i++){
            _chartOverview.positions[celestialBodies[i].label] = { house: [celestialBodies[i].House.label], sign: [celestialBodies[i].Sign.label], degree: celestialBodies[i].ChartPosition.Ecliptic.DecimalDegrees }
        }
        delete _chartOverview.positions['Sirius'];

        let maxOrb = Number(aspects[0].orb)
        for(let i = 0; i < aspects.length; i++){
            if(Object.keys(_chartOverview.aspects).length < 10){
                _chartOverview.aspects[aspects[i].orb] = aspects[i]
                if(aspects[i].orb > maxOrb) maxOrb = aspects[i].orb
            } else {
                if(aspects[i].orb < maxOrb) {
                    delete _chartOverview.aspects[maxOrb]
                    let orbs = Object.keys(_chartOverview.aspects).map(orb => Number(orb))
                    maxOrb = Math.max(...orbs);
                    _chartOverview.aspects[aspects[i].orb] = aspects[i]
                }
            }
        }

        console.log('_chartOverview: ', _chartOverview)
        setChartOverview(_chartOverview);
    }


    return (
        <div className='nv-container'>
            <div className='nv-details-container boxed'>
                <div style={{textAlign: "center", cursor: "pointer"}}>
                    <span style={ view === 'positions' ? {textDecoration: "underline"} : {}} onClick={() => setView('positions')}>Positions</span>{" | "}
                    <span style={ view === 'aspects' ? {textDecoration: "underline"} : {}} onClick={() => setView('aspects')}>Aspects</span>
                </div>
                <div>
                    {chartOverview.positions && (
                        view === 'positions' ?
                            Object.keys(chartOverview.positions).map(planet => (
                                <div id={`${planet}-position`}>
                                    {astroSVGs['planets'][planet]} in {astroSVGs['signs'][chartOverview.positions[planet].sign]} in the {chartOverview.positions[planet].house} house
                                </div>
                            ))
                        :
                            Object.keys(chartOverview.aspects).map(aspect => (
                                <div id={aspect}>
                                    {astroSVGs['planets'][chartOverview.aspects[aspect].point1Label]} {chartOverview.aspects[aspect].aspectKey}{astroSVGs['planets'][chartOverview.aspects[aspect].point2Label]} +{chartOverview.aspects[aspect].orb}
                                </div>
                            ))
                    )}
                </div>
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
