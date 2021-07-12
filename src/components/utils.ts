import { 
    ITableData, 
    Point, 
    IHole, 
    IFloorBaseData,
    IIcondata,
    IRoomData, 
    IGeoJSON, 
    IShape, 
    ICanvasSize, 
    IBuildRect } from './IInterface'
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

/**
 * 点位是否在工位范围内
 * @param point 
 * @param tables 
 * @returns 
 */
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

/**
 * 点位是否在房间范围内
 * @param point 
 * @param rooms 
 * @returns 
 */
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

function isOnIcon(point: Point, icons: IIcondata[], iconSize: number): IIcondata|null {
    let step = iconSize/2
    for(let i = 0; i < icons.length;i++) {
        let icon = icons[i]
        let { center } = icon
        if(point[0] > center[0] - step && point[0] < center[0] + step &&
            point[1] > center[1] - step && point[1] < center[1] + step
            ) {
                return icon
        }
    }
    return null
}

function getDrawTableData(data: ITableData[]): boolean {
    return false
}

/**
 * 将 geojson 的数据转化为相对坐标的数据
 * @param geojson 
 * @param canvasSize 
 * @param buildRect 
 * @returns 
 */
function geoJSON2Floor(geojson: IGeoJSON, canvasSize: ICanvasSize, buildRect: IBuildRect) {
    let { width: canvasWidth, height: canvasHeight } = canvasSize
    let { minLng, maxLng, minLat, maxLat } = buildRect
    let lngStep = maxLng - minLng
    let latStep = maxLat - minLat

    let res: IShape = geojson.geometry.coordinates[0]?.map((point: Point) => {
        let [lng, lat] = point
        return [
            canvasWidth*((lng - minLng)/lngStep),
            canvasHeight*((lat - minLat)/latStep)
        ]
    })
    let floorData: IFloorBaseData = {
        shape: res,
        holes: []
    }
    return floorData
}

export {
    getDrawTableData,
    isPointInFloor,
    isOnTable,
    isOnRoom,
    isOnIcon,
    geoJSON2Floor
}