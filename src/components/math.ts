import {
    Polygon,
    Point
} from './IInterface'
import turf from 'turf'
import booleanPointInPolygon from '@turf/boolean-point-in-polygon'


function isPointInRect(point: Point): boolean {
    return false
}

function isPointInPolygon(point: Point, polygon: Polygon): boolean {
    
    var pt = turf.point(point);
    var poly = turf.polygon([[...polygon, polygon[0]]]);
    
    // return false
    return booleanPointInPolygon(pt, poly);
}

export {
    isPointInRect,
    isPointInPolygon
}
