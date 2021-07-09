
export type Point =  [number, number];
export type Color = [number, number, number, number];
export type Polygon = Point[];
export type IHole = Point[]
export type IShape = Point[]

export interface IPlaneProps {
    width: number;
    height: number;
}

/**
 * 楼层数据接口
 */
export interface IFloorBaseData {
    shape: IShape;
    holes: IHole[];
}

/**
 * 座位数据接口
 */
export interface ITableData {
    user: string;
    tableid: string;
    shape: IShape;
}

export interface IRoomData {
    roomid: string;
    shape: IShape;
}