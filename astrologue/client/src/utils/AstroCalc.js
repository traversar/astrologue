
// Assembles relevant horoscope data into an object
export const renderHoroscopeData = horoscopeData => {
    let _chartOverview = {
        positions: {},
        aspects: {}
    };
    let celestialBodies = horoscopeData.CelestialBodies.all;
    let aspects = horoscopeData.Aspects.all

    // Assemble placement of each celestial body by house,
    // zodiacal sign, and mathematical degree
    for(let i = 0; i < celestialBodies.length; i++){
        _chartOverview.positions[celestialBodies[i].label] = { house: [celestialBodies[i].House.label], sign: [celestialBodies[i].Sign.label], degree: celestialBodies[i].ChartPosition.Ecliptic.DecimalDegrees }
    }
    delete _chartOverview.positions['Sirius'];

    // Find ten most relevant aspects by size of orbs (smallest)
    // orbs are the degree to which the aspect is imperfect
    // 93 degrees is a square aspect (90 degrees) with a 3 degree orb
    let maxOrb = Number(aspects[0].orb)
    for(let i = 0; i < aspects.length; i++){
        if(Object.keys(_chartOverview.aspects).length < 10){
            _chartOverview.aspects[aspects[i].orb] = aspects[i]
            if(aspects[i].orb > maxOrb) maxOrb = aspects[i].orb
        } else {
            if(aspects[i].orb < maxOrb) {
                delete _chartOverview.aspects[maxOrb]
                let orbs = Object.keys(_chartOverview.aspects).map(orb => Number(orb))
                maxOrb = Math.max(...orbs);
                _chartOverview.aspects[aspects[i].orb] = aspects[i]
            }
        }
    }
    return _chartOverview
}


// Calculates the relevant celestial angles ("aspects")
// between planetary bodies in two charts, returns as an object
export function calComp(chart1, chart2){

    let chart1keys = Object.keys(chart1);
    let chart2keys = Object.keys(chart2);
    let aspects = {};
    chart1keys.forEach(planet => {
        aspects[planet] = {}
    })

    // Search for each of the four major planetary aspects between
    // each celestial body
    for(let i = 0; i < chart1keys.length; i++) {
        for(let j = 0; j < chart2keys.length; j++) {
            let planetChart1 = chart1[chart1keys[i]].degree
            let planetChart2 = chart2[chart2keys[j]].degree
            let diff = Math.max(planetChart1, planetChart2) - Math.min(planetChart1, planetChart2)
            if(diff > 355 || diff < 5) {
                aspects[chart1keys[i]][chart2keys[j]] = 'conjunction'
                continue
            }
            if( (0 < diff % 180 && diff % 180 < 5) || (175 < diff % 180 && diff % 180 < 180) ) {
                aspects[chart1keys[i]][chart2keys[j]] = 'opposition'
                continue
            }
            if( (0 < diff % 90 && diff % 90 < 5) || (85 < diff % 90 && diff % 90 < 90) ) {
                aspects[chart1keys[i]][chart2keys[j]] = 'square'
                continue
            }
            if( (0 < diff % 120 && diff % 120 < 5) || (115 < diff % 120 && diff % 120 < 120) ) {
                aspects[chart1keys[i]][chart2keys[j]] = 'trine'
                continue
            }
        }
    }
    return aspects
}
