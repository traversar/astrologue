import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as astroActions from '../actions/astro';
import { astroSVGs } from '../svgs'

const LearnView = ({
    learnDetails,
    getDetails
}) => {
    let [details, setDetails] = useState('')

    useEffect(() => {
        getDetails()
    }, [])

    const handleDetailSelect = (subject) => {
        setDetails(learnDetails[subject])
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
    const dispatch = useDispatch();
    const getDetails = (subject) => dispatch(astroActions.getDetails(subject))
    const learnDetails = useSelector(state => state.entities.astro.learnDetails)

    return <LearnView getDetails={getDetails} learnDetails={learnDetails} />
}

export default LearnViewContainer
