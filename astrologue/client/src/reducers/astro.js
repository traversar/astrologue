import { astroConstants } from '../constants/astro'

export function astro(state = {}, action) {
    switch (action.type) {
        case astroConstants.SET_DETAILS:
            let bodies = action.data.bodies.reduce((bodies, body) => {
                bodies[body.name] = {
                    name: body.name,
                    domicile: body.domicile,
                    exaltation: body.exaltation,
                    description: body.description
                }
                return bodies
            }, {})
            let signs = action.data.signs.reduce((signs, sign) => {
                signs[sign.name] = {
                    name: sign.name,
                    mode: sign.mode,
                    element: sign.element,
                    ruler: sign.ruler,
                    summary: sign.summary,
                    description: sign.description
                }
                return signs
            }, {})
            return {
                bodies,
                signs
            }
        default:
            return state;
    }
}
