import React from 'react'
import {
    IPlaneProps,
    IFloorBaseData,
    Point,
    ITableData,
    IRoomData,
    IIcondata,
    IOptions,
    IColors,
    ITextData,
    ITextStyle
} from './IInterface'
import { isPointInFloor, isOnTable, isOnRoom, isOnIcon } from './utils'
class Plane extends React.Component<IPlaneProps> {
    private canvas!: HTMLCanvasElement;
    private ctx!: CanvasRenderingContext2D;
    private width: number = 100;
    private height: number = 100;
    private top: number = 0;
    private left: number = 0;
    private canvasUeepUpdate: boolean = false;
    private selectedTableId: string|null = null;
    private selectedRoomId: string|null = null;
    private selectedIconId: string|null = null;
    private devicePixelRatio: number = window.devicePixelRatio||1;
    private iconMap: Map<string, HTMLImageElement> = new Map();
    private iconSize: number = 10; // 图标的大小
    private drawRoomName: boolean = true; // 默认绘制房间数据的名字

    private floorBaseData: IFloorBaseData|null = null;  // 楼层基础数据
    private tableData: ITableData[]|null = null;        // 楼层工位数据
    private roomData: IRoomData[]|null = null;          // 楼层房间数据
    private textData: ITextData[]|null = null;          // 楼层文本数据
    private iconData: IIcondata[]|null = null;          // 楼层图标数据

    private colors: IColors = {
        floorFill: '#ff0',
        floorStroke: '#f00',

        tableFill: '#f00',
        tableStroke: '#000',
        selectTableFill: '#f00',
        selectTableStroke: '#000',

        roomFill: '#00f',
        roomStroke: '#fff',
        selectRoomFill: '#00f',
        selectRoomStroke: '#fff'
    }

    constructor(props: IPlaneProps) {
        super(props)
        
        this.handleClick = this.handleClick.bind(this)
        this.handleMouseMove = this.handleMouseMove.bind(this)
    }

    componentDidMount() {
        this.initProperties(this.props.options)

        this.draw()

        this.canvas.addEventListener('click', this.handleClick, false)
        this.canvas.addEventListener('mousemove', this.handleMouseMove, false)
    }

    componentWillUnmount() {
        this.canvas.removeEventListener('click', this.handleClick)
        this.canvas.removeEventListener('mousemove', this.handleMouseMove)
    }

    /**
     * 
     * @param options 初始化设置参数
     */
    initProperties(options: IOptions) {
        let { 
            width = 100, height = 100, iconSize = 10, drawRoomName = true, 
            floorBaseData = null,
            tableData = null,
            roomData = null,
            textData = null,
            iconData = null,
            style = null
        } = options
        this.width = width 
        this.height = height
        this.ctx = this.setCanvas(width, height)
        this.ctx.textAlign = 'center'
        this.ctx.textBaseline = 'middle'
        let { top = 0, left = 0 } = this.canvas.getBoundingClientRect()
        this.top = top
        this.left = left
        this.iconSize = iconSize
        this.drawRoomName = drawRoomName

        this.floorBaseData = floorBaseData
        this.tableData = tableData
        this.roomData = roomData
        this.textData = textData
        this.iconData = iconData

       
        this.colors.floorFill = style?.floorFill || '#0ff'
        this.colors.floorStroke = style?.floorStroke ||  '#00f'

        this.colors.roomFill = style?.roomFill || '#f00'
        this.colors.roomStroke = style?.roomStroke || '#00f'
        this.colors.selectRoomFill = style?.selectRoomFill || '#00f'
        this.colors.selectRoomStroke = style?.selectRoomStroke || '#f00'

        this.colors.tableFill = style?.tableFill || '#0f0'
        this.colors.tableStroke = style?.tableStroke || '#f00'
        this.colors.selectTableFill = style?.selectTableFill || '#f00'
        this.colors.selectTableStroke = style?.selectTableStroke || '#0f0'
    }

    draw() {
        let { 
            floorFill,
            floorStroke,
            tableFill,
            tableStroke,
            roomFill,
            roomStroke
         } = this.colors
        this.ctx.clearRect(0, 0, this.width, this.height)
        this.floorBaseData && this.drawFloorBase(this.ctx, this.floorBaseData, floorStroke, floorFill )
        this.tableData && this.drawTables(this.ctx, this.tableData, tableStroke, tableFill)
        this.roomData && this.drawRooms(this.ctx, this.roomData, roomStroke, roomFill)
        this.textData && this.drawTexts(this.ctx, this.textData)
        this.iconData && this.drawIcons(this.ctx, this.iconData)
    }

    handleClick(e: MouseEvent) {
        let {clientX, clientY} = e
        let x = clientX - this.left
        let y = clientY - this.top
    }

    handleMouseMove(e: MouseEvent) {
        let {clientX, clientY} = e
        let x = clientX - this.left
        let y = clientY - this.top

        this.handleTableMouseMoveEvent(x, y)
        this.handleRoomMouseMoveEvent(x, y)

        this.handleIconMouseMoveEvent(x, y)

        // 判断当前画布是否需要刷新
        if(this.canvasUeepUpdate) {
            this.draw()
            this.canvasUeepUpdate = false
        }
    }

    /**
     * 处理图标的鼠标移动事件
     * @param x 
     * @param y 
     */
    handleIconMouseMoveEvent(x: number, y: number) {
        let testIconResult = this.iconData && isOnIcon([x, y], this.iconData, this.iconSize)
        if(testIconResult) {
            if(testIconResult.iconId !== this.selectedIconId) {
                if(this.selectedIconId) {
                    console.log('out', this.selectedIconId)
                }
                this.selectedIconId = testIconResult.iconId
                console.log('in testIconResult', testIconResult)
                this.canvasUeepUpdate = true
            }
        } else {
            if(this.selectedIconId) {
                console.log('out testIconResult', this.selectedIconId)
                this.selectedIconId = null
                this.canvasUeepUpdate = true
            }
        }
    }

    /**
     * 处理工位的鼠标移动事件
     * @param x 
     * @param y 
     */
    handleTableMouseMoveEvent(x: number, y: number) {
        let testTableResult = this.tableData && isOnTable([x, y], this.tableData)
        if(testTableResult) { // 进入
            if(testTableResult.tableid !== this.selectedTableId) { // 只需要一次变化就可以
                if(this.selectedTableId) {
                    console.log('out', this.selectedTableId)
                }
                // console.log('in', testTableResult.tableid)
                this.selectedTableId = testTableResult.tableid
                this.canvasUeepUpdate = true
            }
            
        } else { // 离开
            if(this.selectedTableId) {
                console.log('out', this.selectedTableId)
                this.selectedTableId = null
                this.canvasUeepUpdate = true
            }
        }
    }

    /**
     * 处理房间的鼠标移动事件
     * @param x 
     * @param y 
     */
    handleRoomMouseMoveEvent(x: number, y: number) {
        let testRoomResult = this.roomData && isOnRoom([x, y], this.roomData)
        if(testRoomResult) {
            if(testRoomResult.roomid !== this.selectedRoomId) { // 只需要一次变化就可以
                if(this.selectedRoomId) {
                    console.log('out', this.selectedRoomId)
                }
                this.selectedRoomId = testRoomResult.roomid
                this.canvasUeepUpdate = true
            }
        } else {
            if(this.selectedRoomId) {
                this.selectedRoomId = null
                this.canvasUeepUpdate = true
            }
        }
    }

    // 绘制楼层 - 不需要被选中
    drawFloorBase(ctx: CanvasRenderingContext2D, floorBaseData: IFloorBaseData, strokeStyle: string, fillStyle: string) {
        let { shape, holes } = floorBaseData

        ctx.strokeStyle = strokeStyle
        ctx.fillStyle = fillStyle

        // draw line
        ctx.beginPath()
        shape.map((s: Point): void => {
            ctx.lineTo(s[0] * this.devicePixelRatio, s[1] * this.devicePixelRatio)
        })
        ctx.lineTo(shape[0][0] * this.devicePixelRatio, shape[0][1] * this.devicePixelRatio)
        ctx.closePath()
        ctx.fill()
        ctx.stroke()

        // draw holes
        holes.map(hole => {
            ctx.beginPath()
            ctx.save()

            hole.map((h: Point) => {
                ctx.lineTo(h[0] * this.devicePixelRatio, h[1] * this.devicePixelRatio)
            })
            ctx.lineTo(hole[0][0] * this.devicePixelRatio, hole[0][1] * this.devicePixelRatio)

            ctx.clip()
            ctx.clearRect(0, 0, this.width * this.devicePixelRatio, this.height * this.devicePixelRatio)
            
            ctx.closePath()
            ctx.restore()
            ctx.stroke()
        })
    }

    // 绘制座位 - 需要被选中
    drawTables(ctx: CanvasRenderingContext2D, tableData: ITableData[], strokeStyle: string, fillStyle: string) {
        let { selectTableFill, selectTableStroke } = this.colors
        tableData.map((td: ITableData) => {
            let { shape, tableid } = td
      
            ctx.strokeStyle = this.selectedTableId===tableid?selectTableStroke:strokeStyle
            ctx.fillStyle = this.selectedTableId===tableid?selectTableFill:fillStyle
            // draw line
            ctx.beginPath()
            shape.map((s: Point): void => {
                ctx.lineTo(s[0] * this.devicePixelRatio, s[1] * this.devicePixelRatio)
            })
            ctx.lineTo(shape[0][0] * this.devicePixelRatio, shape[0][1] * this.devicePixelRatio)
            ctx.closePath()
            ctx.fill()
            ctx.stroke()
        })
    }

    // 绘制房间 - 需要被选中
    drawRooms(ctx: CanvasRenderingContext2D, roomData: IRoomData[], strokeStyle: string, fillStyle: string) {
        let { selectRoomFill, selectRoomStroke } = this.colors
        roomData.map((rd: IRoomData) => {
            let { shape, roomid, center, roomNameStyle={} } = rd
            // draw room shape
            ctx.strokeStyle = this.selectedRoomId===roomid?selectRoomStroke:strokeStyle
            ctx.fillStyle = this.selectedRoomId===roomid?selectRoomFill:fillStyle

            // draw line
            ctx.beginPath()
            shape.map((s: Point): void => {
                ctx.lineTo(s[0] * this.devicePixelRatio, s[1] * this.devicePixelRatio)
            })
            ctx.lineTo(shape[0][0] * this.devicePixelRatio, shape[0][1] * this.devicePixelRatio)
            ctx.closePath()
            ctx.fill()
            ctx.stroke()

            // draw room name
            this.drawRoomName && this.drawText(ctx, roomid, center, roomNameStyle)
            
        })
    }

    drawTexts(ctx: CanvasRenderingContext2D, textData: ITextData[]) {
        for(let i = 0;i < textData.length;i++) {
            let t = textData[i]
            let { center, text, style={} } = t
            this.drawText(ctx, text, center, style)
        }
        
    }

    // 绘制文字
    drawText(ctx: CanvasRenderingContext2D, text: string, center: Point, style: ITextStyle) {
        ctx.beginPath()
        let { fontWeight = 200, fontSize = 18, fontFamily = 'Arial', color = '#000' } = style
        ctx.font=`${fontWeight} ${fontSize}px ${fontFamily}`;
        ctx.fillStyle = color
        ctx.fillText(text, center[0] * this.devicePixelRatio, center[1] * this.devicePixelRatio);
        
        ctx.closePath()
    }

    // 绘制图标
    drawIcons(ctx: CanvasRenderingContext2D, iconData: IIcondata[]) {
        iconData.map((iconItem: IIcondata) => {
            let { iconType, src, center, iconId } = iconItem
            let offsets: Point = [0, 0]
            if(this.selectedIconId===iconId) {
                offsets[1] = -10
            }
            let cacheIconDom: HTMLImageElement|undefined = this.iconMap.get(iconType)
            if(cacheIconDom) {
                this.drawIcon(ctx, cacheIconDom, center, this.iconSize, offsets)
            } else {
                let image = new Image()
                image.src = src
                image.onload = () => {
                    this.iconMap.set(iconType, image)
                    this.drawIcon(ctx, image, center, this.iconSize, offsets)
                }
            }
        })
    }

    // 绘制具体的图标
    drawIcon(ctx: CanvasRenderingContext2D, icon: HTMLImageElement, center: Point, iconSize: number, offsets: Point = [0, 0]) {
        let x = center[0] * this.devicePixelRatio + offsets[0]
        let y = center[1] * this.devicePixelRatio + offsets[1]
        ctx.drawImage(icon, 0, 0, icon.width, icon.height, x - iconSize/2, y - iconSize/2, iconSize, iconSize)
    }

    /**
     * 初始化设置 canvas
     * @param width 
     * @param height 
     * @returns 
     */
    setCanvas(width: number, height: number): CanvasRenderingContext2D {
        this.canvas.style.width = width + 'px'
        this.canvas.style.height = height + 'px'
        this.canvas.width = width*devicePixelRatio
        this.canvas.height = height*devicePixelRatio
        return this.canvas.getContext('2d') as CanvasRenderingContext2D
    }

    render() {
        return <canvas ref={el=>this.canvas = el as HTMLCanvasElement}></canvas>
    }
}

export default Plane