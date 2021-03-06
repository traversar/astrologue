import { profileConstants } from '../constants/profiles';

export function profiles(state = {}, action) {
    switch (action.type) {
        case profileConstants.LOAD_PROFILES:
            return {
                ...state,
                profiles: action.profiles.reverse(),
                selectedProfile: action.profiles[0],
                selectedProfileOther: null
            }
        case profileConstants.ADD_PROFILE:
            if(action.profile.id === null) {
                action.profile.id = state.profiles.length + 1
            }
            let profiles = [action.profile, ...state.profiles]
            return {
                ...state,
                profiles,
                selectedProfile: action.profile
            }
        case profileConstants.EDIT_PROFILE:
            let editedProfiles = state.profiles.map(profile => {
                if(profile.id === action.profile.id) {
                    profile = action.profile
                }
                return profile
            })
            return {
                ...state,
                profiles: editedProfiles
            }
        case profileConstants.REMOVE_PROFILE:
            let removedProfiles = state.profiles.reduce((profiles, profile) => {
                if(profile.id !== action.profileId) {
                    profiles.push(profile)
                }
                return profiles
            }, [])
            return {
                ...state,
                profiles: removedProfiles
            }
        case profileConstants.SELECT_PROFILE:
            let selectedProfile;
            state.profiles.forEach(profile => { if(profile.id === action.profileId) { selectedProfile = profile } });
            return {
                ...state,
                selectedProfile
            }
        case profileConstants.LOAD_CHART_DATA:
            return {
                ...state,
                chartData: action.chartData,
                horoscopeData: action.horoscope
            }
        case profileConstants.ALLOW_SELECT_OTHER:
            return {
                ...state,
                selectOtherOn: true
            }
        case profileConstants.DISALLOW_SELECT_OTHER:
            return {
                ...state,
                selectOtherOn: false
            }
        case profileConstants.SELECT_PROFILE_OTHER:
            let selectedProfileOther;
            state.profiles.forEach(profile => { if(profile.id === action.profileId) { selectedProfileOther = profile} });
            return {
                ...state,
                selectedProfileOther
            }
        case profileConstants.LOAD_CHART_DATA_OTHER:
            return {
                ...state,
                chartDataOther: action.chartData,
                horoscopeDataOther: action.horoscope
            }
        default:
            return state;
    }
}
