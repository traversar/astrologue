import { authConstants } from "../constants/authentication";
import axiosInstance from '../axiosApi';
import jwt from 'jwt-decode';

export const setLoggedInTrue = () => async (dispatch, getState) => {
    console.log('setloggedintrue')
    dispatch(() => { type: authConstants.LOGIN_SUCCESS })
    return 'yes'
}

export const login = (username, password) => async (dispatch, getState) => {

    const response = await axiosInstance.post(
        '/token/obtain/',
        { username, password }
    )

    if (response.status === 200) {

        axiosInstance.defaults.headers['Authorization'] = "JWT " + (await response).data.access;
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);

        let username = jwt(response.data.access).username

        dispatch(success(username))
    } else {
        dispatch(failure())
    }

    function success(username) { return { type: authConstants.LOGIN_SUCCESS, username } }
    function failure() { return { type: authConstants.LOGIN_FAILURE } }
}

export const logout = () => async (dispatch, getState) => {
    const response = await axiosInstance.post('/blacklist/', {
        "refresh_token": localStorage.getItem("refresh_token")
    });
    console.log(response);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    axiosInstance.defaults.headers['Authorization'] = null;

    if(response.status === 205) {
        dispatch(success())
    }

    function success() { return { type: authConstants.LOGOUT } }
};


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

export const refreshLogin = () => async (dispatch, getState) => {
    const refreshToken = localStorage.getItem('refresh_token');

    if (refreshToken){
        const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

        // exp date in token is expressed in seconds, while now() returns milliseconds:
        const now = Math.ceil(Date.now() / 1000);
        console.log(tokenParts.exp);

        if (tokenParts.exp > now) {
            let response = await axiosInstance.post('/token/refresh/', {refresh: refreshToken})

            if(response.status === 200) {
                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh);
                axiosInstance.defaults.headers['Authorization'] = "JWT " + response.data.access;

                dispatch(success())
            }

        }
    }

    function success() { return { type: authConstants.LOGIN_SUCCESS } }
}
