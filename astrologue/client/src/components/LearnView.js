import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { astroSVGs } from '../svgs'

const LearnView = () => {
    let [details, setDetails] = useState('')

    const handleDetailSelect = (subject) => {
        // setDetails(getDetails(subject))
    }

    return (
        <div className='lv-container'>
            <div className='lv-symbols-container'>
                <div style={{borderBottom: '1px dotted white', fontWeight: 600}}>Zodiacal Signs</div>
                {Object.keys(astroSVGs.signs).map(sign => (
                    <div className='lv-symbol'>
                        <span>{astroSVGs.signs[sign]} {sign}</span>
                    </div>
                ))
                }
            </div>
            <div className='lv-symbols-container'>
                <div style={{borderBottom: '1px dotted white', fontWeight: 600}}>Celestial Bodies</div>
                {Object.keys(astroSVGs.planets).map(planet => (
                    <div className='lv-symbol'>
                        <span>{astroSVGs.planets[planet]} {planet}</span>
                    </div>
                ))
                }
            </div>
            <div className='lv-details-container'>
                {details}
            </div>
        </div>
    )
}

const LearnViewContainer = () => {
    // dispatch = useDispatch();
    // getDetails = (subject) => dispatch(astroActions.getDetails(subject))

    return <LearnView />
}

export default LearnViewContainer
