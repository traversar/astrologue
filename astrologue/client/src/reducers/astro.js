import { astroConstants } from '../constants/astro'

export function astro(state = {}, action) {
    switch (action.type) {
        case astroConstants.SET_DETAILS:
            return {
                ...action.data
            }
        default:
            return state;
    }
}
