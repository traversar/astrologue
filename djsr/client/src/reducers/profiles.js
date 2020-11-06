import { profileConstants } from '../constants/profiles';

export function profiles(state = {}, action) {
    switch (action.type) {
        case profileConstants.LOAD_PROFILES:
            return {
                ...state,
                profiles: action.profiles
            }
        case profileConstants.SELECT_PROFILE:
            let temp = state.profiles['1'];
            state.profiles[1] = action.id;
            state.profiles[action.id] = temp;
            return {
                ...state
            }
        default:
            return state;
    }
}
