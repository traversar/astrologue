import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as profileActions from '../actions/profiles';
import { calComp, renderHoroscopeData } from '../utils/AstroCalc'
import { astroSVGs } from '../svgs';


const CompatibilityView = ({
    renderChart,
    selectOther,
    selectedProfile,
    selectedProfileOther,
    chartData,
    chartDataOther,
    horoscopeData,
    horoscopeDataOther
}) => {
    let [compOverview, setCompOverview] = useState({});

    useEffect(() => {
        selectOther(true);
    }, [])

    useEffect(() => {
        if(selectedProfile) {
            renderChart(selectedProfile)
        }
    }, [selectedProfile])

    useEffect(() => {
        if(selectedProfileOther) {
            renderChart(selectedProfileOther, true)
        }
    }, [selectedProfileOther])

    useEffect(() => {

        if(chartData && chartDataOther) {

            let chartDiv = document.getElementById('chart')
            chartDiv.innerHTML = '';
            var chart = new astrology.Chart('chart', 550, 550).radix(chartData)
            var synastry = chart.transit(chartDataOther)
            synastry.aspects()
        } else {
            // chartDiv.innerHTML = 'Select a second profile to calculate compatibility.';
            console.log('No chart data')
        }

    }, [chartData, chartDataOther])

    useEffect(() => {

        if(horoscopeData && horoscopeDataOther) {
            let renderedHoroscopeData = renderHoroscopeData(horoscopeData);
            console.log('renderedHoroscopeData', renderedHoroscopeData);

            let renderedHoroscopeDataOther = renderHoroscopeData(horoscopeDataOther)
            console.log('renderHoroscopeDataOther', renderedHoroscopeDataOther);

            console.log('horoscopeData ', horoscopeData)
            console.log('horoscopeDataOther ', horoscopeDataOther)

            // console.log('chartDataOther: ', chartOverview)
            // console.log('chartData: ', chartOverviewOther)

            let _compOverview = calComp(renderedHoroscopeData.positions, renderedHoroscopeDataOther.positions);

            setCompOverview(_compOverview);

            console.log(_compOverview)

        } else {
            console.log('No horoscope data');
        }

    }, [horoscopeData, horoscopeDataOther])

    let planetTerms = {
        Sun: 'Vision',
        Moon: 'Emotion',
        Mercury: 'Communication',
        Venus: 'Pleasure/Taste',
        Mars: 'Drive/Attraction',
        Jupiter: 'Belief',
        Saturn: 'Discipline',
        Uranus: 'Eccentricity',
        Neptune: 'Spirituality',
        Pluto: 'Power',
        Chiron: 'Sensitivity'
    }


    return (
        <div className='cv-container'>
            <div className='cv-details-container boxed'>
                <div className='cv-details-scroll-container'>
                    {compOverview &&
                        Object.keys(compOverview).map(planet => (
                            <div className='cv-aspect-link'>
                                <div className='cv-aspect-header'>{astroSVGs['planets'][planet]} {planetTerms[planet]}</div>
                                <div>
                                {Object.keys(compOverview[planet]).length > 0 ?
                                    Object.keys(compOverview[planet]).map(planets => (
                                        <div className='cv-aspect-detail'>{compOverview[planet][planets]} {astroSVGs['planets'][planets]}</div>
                                    ))
                                :
                                    <div className='cv-aspect-detail' style={{paddingTop: '10px'}}>No aspects</div>
                                }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div id='chart' className='boxed'></div>
        </div>
    )
}

const CompatibilityViewContainer = () => {
    const dispatch = useDispatch();
    let renderChart = (profile, other) => dispatch(profileActions.renderChart(profile, other));
    let selectOther = (status) => dispatch(profileActions.selectOther(status));
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
        renderChart={renderChart}
        selectOther={selectOther} />
}

export default CompatibilityViewContainer
