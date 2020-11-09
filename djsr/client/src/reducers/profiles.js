import { profileConstants } from '../constants/profiles';

export function profiles(state = {}, action) {
    switch (action.type) {
        case profileConstants.LOAD_PROFILES:
            // let profilesObject;
            // action.profiles.forEach((profile) => {
            //     profilesObject[profile.id] = profile;
            // });
            return {
                ...state,
                profiles: action.profiles,
                selectedProfile: action.profiles[0]
            }
        case profileConstants.SELECT_PROFILE:
            let selectedProfile;
            state.profiles.forEach(profile => { if(profile.id === action.profileId) { selectedProfile = profile } })
            return {
                ...state,
                selectedProfile
            }
        case profileConstants.LOAD_CHART_DATA:
            return {
                ...state,
                chartData: action.chartData
            }
        default:
            return state;
    }
}
