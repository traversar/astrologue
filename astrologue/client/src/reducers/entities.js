import { combineReducers } from 'redux';
import { profiles } from './profiles';
import { astro } from './astro';

const entitiesReducer = combineReducers({
    profiles,
    astro
})

export default entitiesReducer;
