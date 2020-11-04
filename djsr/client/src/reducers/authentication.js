import { authConstants } from '../constants/authentication';

export function authentication(state = {}, action) {
    switch (action.type) {
        case authConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true
            }
        case authConstants.LOGIN_FAILURE:
            return {
                loggedIn: false,
                loginFailed: true
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
