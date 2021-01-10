import { astroConstants } from "../constants/astro";
import axiosInstance from '../axiosApi';

export const getDetails = () => async(dispatch, getState) => {
    let response = await axiosInstance.get(
        '/astro/',
    )

    if(response.status === 200) {
        let data = response.data
        dispatch(setDetails(data))
    } else {
        console.log('Failed to fetch astro details.')
    }

    function setDetails(data) { return { type: astroConstants.SET_DETAILS, data} }
}
