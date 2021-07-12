
export type Point =  [number, number];
export type Color = [number, number, number, number];
export type Polygon = Point[];
export type IHole = Point[]
export type IShape = Point[]
export interface IOptions {
    width: number;
    height: number;
    iconSize?: number;
    drawRoomName?: boolean;
    floorBaseData?: IFloorBaseData;
    tableData?: ITableData[];
    roomData?: IRoomData[];
    iconData?: IIcondata[];
    textData?: ITextData[];
    style?: IStyle;
}

export interface IPlaneProps {
    options: IOptions
}

export interface IGeoJSON {
    type: string;
    properties: any,
    geometry: {
      type: string;
      coordinates: Point[][]
    }
}

export interface ICanvasSize {
    width: number;
    height: number;
}

export interface IBuildRect {
    minLng: number;
    maxLng: number; 
    minLat: number;
    maxLat: number;
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

/**
 * 房间数据接口
 */
export interface IRoomData {
    roomid: string;
    roomName: string;
    roomNameStyle?: ITextStyle;
    shape: IShape;
    center: Point;
}

/**
 * 图标数据接口
 */
export interface IIcondata {
    iconId: string;
    iconType: string;
    src: string;
    center: Point;
}

export interface ITextStyle {
    fontFamily?: string;
    fontSize?: number;
    fontWeight?: number|string;
    color?: string;
}

export interface ITextData {
    text: string;
    center: Point;
    style?: ITextStyle;
}

export interface IStyle {
    floorFill?: string;
    floorStroke?: string;
    
    tableFill?: string;
    tableStroke?: string;
    selectTableFill?: string;
    selectTableStroke?: string;

    roomFill?: string;
    roomStroke?: string;
    selectRoomFill?: string;
    selectRoomStroke?: string;
}

export interface IColors {
    floorFill: string;
    floorStroke: string;
    
    tableFill: string;
    tableStroke: string;
    selectTableFill: string;
    selectTableStroke: string;

    roomFill: string;
    roomStroke: string;
    selectRoomFill: string;
    selectRoomStroke: string;
}