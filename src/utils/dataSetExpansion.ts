const dataSetSV = import("./dataSetSV")
const dataSetPaldeaEvolved = import("./dataSetPaldeaEvolved")
const dataSetObsidian = import("./dataSetObsidian")
const dataSetSV151 = import('./dataSetSV151')
const getSetParadox  = import("./dataSetParadox")
const getSetPaldeaFates = import("./dataSetPaldeaFates")
const getSetTemporalForces = import('./dataSetTemporalForces')
const getSetTwilight = import('./dataSetTwilight')
export default function  dataSetExpansion(param){
        const obj = {
            "sv1": dataSetSV,
            "sv2": dataSetPaldeaEvolved,
            "sv3": dataSetObsidian,
            "sv3pt5": dataSetSV151,
            "sv4":getSetParadox,
            "sv4pt5":getSetPaldeaFates,
            "sv5": getSetTemporalForces,
            "sv6": getSetTwilight
        }
        
    return obj[param]
}
