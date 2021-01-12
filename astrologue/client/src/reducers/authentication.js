import { authConstants } from '../constants/authentication';

export function authentication(state = {loggedIn: false}, action) {
    switch (action.type) {
        case authConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                username: action.username
            }
        case authConstants.LOGIN_FAILURE:
            return {
                loggedIn: false,
                loginFailed: true
            }
        case authConstants.LOGOUT:
            return {
                loggedIn: false,
            }
        case authConstants.REGISTER_SUCCESS:
            return {
                loggedIn: false,
                registered: true
            }
        case authConstants.REGISTER_FAILURE:
            return {
                loggedIn: false,
                registered: false
            }
        default:
            return state;
    }
}
