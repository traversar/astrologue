import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../actions/authentication';
import * as profileActions from '../actions/profiles'


const NatalView = ({
    chartTest
}) => {

    chartTest()

    return (
        null
    )
}

const NatalViewContainer = () => {
    const dispatch = useDispatch();
    let chartTest = () => dispatch(profileActions.chartTest());


    return <NatalView chartTest={chartTest} />
}

export default NatalViewContainer
