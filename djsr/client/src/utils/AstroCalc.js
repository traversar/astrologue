
export const renderHoroscopeData = horoscopeData => {
    let _chartOverview = {
        positions: {},
        aspects: {}
    };
    let celestialBodies = horoscopeData.CelestialBodies.all;
    let aspects = horoscopeData.Aspects.all

    for(let i = 0; i < celestialBodies.length; i++){
        _chartOverview.positions[celestialBodies[i].label] = { house: [celestialBodies[i].House.label], sign: [celestialBodies[i].Sign.label], degree: celestialBodies[i].ChartPosition.Ecliptic.DecimalDegrees }
    }
    delete _chartOverview.positions['Sirius'];

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

export function calComp(chart1, chart2){
    console.log('1')

    let chart1keys = Object.keys(chart1);
    let chart2keys = Object.keys(chart2);
    let aspects = {};
    chart1keys.forEach(planet => {
        aspects[planet] = {}
    })

    for(let i = 0; i < chart1keys.length; i++) {
        for(let j = 0; j < chart2keys.length; j++) {
            console.log('2')
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

// subtract smaller from greater
// for conjunction check if result is between 355 and 5
// for opposition check if result % 180 is between 0 and 5 or 175 and 180
// for square check if result % 90 is between 0 and 5 or 85 and 90
// for trine check if result % 120 is between 0 and 5 of 115 and 120


// //check sun for purpose/goals/attention
//     sun
//     moon
//     mercury
//     venus
//     mars

// //check moon for emotional understanding
//     sun
//     moon
//     mercury
//     venus
//     mars


// //check mercury for communication
//     sun
//     moon
//     mercury
//     venus
//     mars


// //check venus for pleasure & fun
//     sun
//     moon
//     mercury
//     venus
//     mars


// //check mars for attraction/desire
//     sun
//     moon
//     mercury
//     venus
//     mars
