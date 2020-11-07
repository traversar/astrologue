import { profileConstants } from '../constants/profiles';

export function profiles(state = {}, action) {
    switch (action.type) {
        case profileConstants.LOAD_PROFILES:
            let selectedProfile;
            let profilesObject;
            action.profiles.forEach((profile) => {
                profilesObject[profile.id] = profile;
            });
            return {
                ...state,
                profiles: action.profiles
            }
        case profileConstants.SELECT_PROFILE:
            return {
                ...state,
                selectedProfile: action.profileId
            }
        default:
            return state;
    }
}
