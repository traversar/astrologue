import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as astroActions from '../actions/astro';
import { astroSVGs } from '../svgs'

const LearnView = ({
    astroData,
    getDetails
}) => {
    let [details, setDetails] = useState('')

    useEffect(() => {
        getDetails()
    }, [])

    const handleSignSelect = (sign) => {
        console.log('astroData ', astroData)
        console.log('astroData -> ', sign, astroData.signs[sign])
        setDetails(astroData.signs[sign])
    }

    const handleBodySelect = (body) => {
        console.log(astroData.bodies[body])
        setDetails(astroData.bodies[body])
    }

    return (
        <div className='lv-container'>
            <div className='lv-symbols-container'>
                <div style={{borderBottom: '1px dotted white', fontWeight: 600}}>Zodiacal Signs</div>
                {Object.keys(astroSVGs.signs).map(sign => (
                    <div className='lv-symbol'>
                        <span className='lv-details' onClick={() => handleSignSelect(sign)}>{astroSVGs.signs[sign]} {sign}</span>
                    </div>
                ))
                }
            </div>
            <div className='lv-symbols-container'>
                <div style={{borderBottom: '1px dotted white', fontWeight: 600}}>Celestial Bodies</div>
                {Object.keys(astroSVGs.planets).map(planet => (
                    <div className='lv-symbol'>
                        <span className='lv-details' onClick={() => handleBodySelect(planet)}>{astroSVGs.planets[planet]} {planet}</span>
                    </div>
                ))
                }
            </div>
            <div className='lv-details-container'>
                {details.mode &&
                    <>
                        <h1>{details.name}</h1>
                        <h2>{details.summary}</h2>
                        <h3>{details.mode} {details.element}</h3>
                        <h3>Ruled by {details.ruler}</h3>
                        <h4>{details.description}</h4>
                    </>
                }
                {details.domicile &&
                    <>
                        <h1>{details.name}</h1>
                        <h3>Ruler of {details.domicile}</h3>
                        <h3>Exalted in {details.exaltation}</h3>
                        <h4>{details.description}</h4>
                    </>
                }
            </div>
        </div>
    )
}

const LearnViewContainer = () => {
    const dispatch = useDispatch();
    const getDetails = () => dispatch(astroActions.getDetails());
    const astroData = useSelector(state => state.entities.astro);

    return <LearnView getDetails={getDetails} astroData={astroData} />
}

export default LearnViewContainer
