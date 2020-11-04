import { profileConstants } from '../constants/profiles';

export function profiles(state = {}, action) {
    switch (action.type) {
        case profileConstants.LOAD_PROFILE:
            return {
                ...state,
                current: action.profile
            }
        case profileConstants.LOAD_OTHER_PROFILE:
            return {
                ...state,
                other: action.profile
            }
        default:
            return state;
    }
}
