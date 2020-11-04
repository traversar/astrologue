import { authConstants } from "../constants/authentication";
import axiosInstance from '../axiosApi';

export const login = (email, password) => async (dispatch, getState) => {

    const response = await axiosInstance.post(
        '/token/obtain/',
        { username: email, password }
    )

    if (response.status === 200) {

        axiosInstance.defaults.headers['Authorization'] = "JWT " + (await response).data.access;
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);

        dispatch(success())
    } else {
        dispatch(failure())
    }

    function success() { return { type: authConstants.LOGIN_SUCCESS } }
    function failure() { return { type: authConstants.LOGIN_FAILURE } }
}

export const signup = (username, email, password) => async (dispatch, getState) => {
    const response = await axiosInstance.post(
        '/user/create/',
        { username, email, password }
    );

    if (response.status === 200) {
        dispatch(success())
    } else {
        dispatch(failure())
    }

    function success() { return { type: authConstants.REGISTER_SUCCESS } }
    function failure() { return { type: authConstants.REGISTER_FAILURE } }
}
