import { ITableData, Point, IHole, IFloorBaseData, IRoomData } from './IInterface'
import { isPointInPolygon } from './math'

/**
 * 判断点是否在楼梯内部
 * @param point 
 * @param floorBaseData 
 * @returns 
 */
function isPointInFloor(point: Point, floorBaseData: IFloorBaseData): boolean {
    let { shape, holes } = floorBaseData
    for(let i = 0; i < holes.length;i++) {
        let hole: IHole = holes[i]
        if(isPointInPolygon(point, hole)) {
            return false
        }
    }
    if(isPointInPolygon(point, shape)) {
        return true
    } else {
        return false
    }
}

function isOnTable(point: Point, tables: ITableData[]): ITableData|null {
    for(let i = 0; i < tables.length; i++) {
        let table = tables[i]
        let { shape } = table
        if(isPointInPolygon(point, shape)) {
            return table
        }
    }
    return null
}

function isOnRoom(point: Point, rooms: IRoomData[]): IRoomData|null {
    for(let i = 0; i < rooms.length; i++) {
        let table = rooms[i]
        let { shape } = table
        if(isPointInPolygon(point, shape)) {
            return table
        }
    }
    return null
}

function getDrawTableData(data: ITableData[]): boolean {
    return false
}

export {
    getDrawTableData,
    isPointInFloor,
    isOnTable,
    isOnRoom
}