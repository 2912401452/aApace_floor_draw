import React from 'react'
import {
    IPlaneProps,
    IFloorBaseData,
    Point,
    ITableData,
    IRoomData
} from './IInterface'
import { isPointInFloor, isOnTable, isOnRoom } from './utils'
import { floorBaseData, tableData, roomData } from './mock'

class Plane extends React.Component<IPlaneProps> {
    private canvas!: HTMLCanvasElement;
    private ctx!: CanvasRenderingContext2D;
    private width: number;
    private height: number;
    private top: number;
    private left: number;
    private isFloorSelect: boolean = false;
    private selectedTableId: string|null = null;
    private selectedRoomId: string|null = null;

    private selectColors = {
        floorFill: '#ff0',
        floorStroke: '#f00',
        tableFill: '#f00',
        tableStroke: '#000',
        roomFill: '#00f',
        roomStroke: '#fff'
    }

    constructor(props: IPlaneProps) {
        super(props)
        this.width = 100;
        this.height = 100;
        this.top = 0;
        this.left = 0;
        this.handleClick = this.handleClick.bind(this)
        this.handleMouseMove = this.handleMouseMove.bind(this)
    }

    componentDidMount() {
        this.initProperties()
        
        this.draw()

        this.canvas.addEventListener('click', this.handleClick, false)
        this.canvas.addEventListener('mousemove', this.handleMouseMove, false)
    }

    componentWillUnmount() {
        this.canvas.removeEventListener('click', this.handleClick)
        this.canvas.removeEventListener('mousemove', this.handleMouseMove)
    }

    initProperties() {
        let { width, height } = this.props
        this.width = width 
        this.height = height
        this.ctx = this.setCanvas(width, height)
        let { top, left } = this.canvas.getBoundingClientRect()
        this.top = top
        this.left = left
    }

    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height)
        this.drawFloorBase(this.ctx, floorBaseData, '#00f', '#0ff')
        this.drawTables(this.ctx, tableData, '#f00', '#0f0')
        this.drawRooms(this.ctx, roomData, '#f00', '#f00')
    }

    handleClick(e: MouseEvent) {
        let {clientX, clientY} = e
        let x = clientX - this.left
        let y = clientY - this.top

        // let b = isPointInFloor([x, y], floorBaseData)
        // console.log(b)

        // console.log(isOnTable([x, y], tableData))
    }

    handleMouseMove(e: MouseEvent) {
        let {clientX, clientY} = e
        let x = clientX - this.left
        let y = clientY - this.top

        let testTableResult = isOnTable([x, y], tableData)
        if(testTableResult) {
            this.selectedTableId = testTableResult.tableid
        } else {
            this.selectedTableId = null
        }

        let testRoomResult = isOnRoom([x, y], roomData)
        if(testRoomResult) {
            this.selectedRoomId = testRoomResult.roomid
        } else {
            this.selectedRoomId = null
        }

        this.draw()
    }

    // 绘制楼层 - 不需要被选中
    drawFloorBase(ctx: CanvasRenderingContext2D, floorBaseData: IFloorBaseData, strokeStyle: string, fillStyle: string) {
        let { shape, holes } = floorBaseData

        ctx.strokeStyle = strokeStyle
        ctx.fillStyle = fillStyle

        // draw line
        ctx.beginPath()
        shape.map((s: Point): void => {
            ctx.lineTo(...s)
        })
        ctx.lineTo(...shape[0])
        ctx.closePath()
        ctx.fill()
        ctx.stroke()

        // draw holes
        holes.map(hole => {
            ctx.beginPath()
            ctx.save()

            hole.map((h: Point) => {
                ctx.lineTo(...h)
            })
            ctx.lineTo(...hole[0])

            ctx.clip()
            ctx.clearRect(0, 0, this.width, this.height)
            
            ctx.closePath()
            ctx.restore()
            ctx.stroke()
        })
    }

    // 绘制座位 - 需要被选中
    drawTables(ctx: CanvasRenderingContext2D, tableData: ITableData[], strokeStyle: string, fillStyle: string) {
        tableData.map((td: ITableData) => {
            let { shape, tableid } = td
      
            ctx.strokeStyle = this.selectedTableId===tableid?this.selectColors.tableStroke:strokeStyle
            ctx.fillStyle = this.selectedTableId===tableid?this.selectColors.tableFill:fillStyle
            // draw line
            ctx.beginPath()
            shape.map((s: Point): void => {
                ctx.lineTo(...s)
            })
            ctx.lineTo(...shape[0])
            ctx.closePath()
            ctx.fill()
            ctx.stroke()
        })
    }

    drawRooms(ctx: CanvasRenderingContext2D, roomData: IRoomData[], strokeStyle: string, fillStyle: string) {
        roomData.map((rd: IRoomData) => {
            let { shape, roomid } = rd

            ctx.strokeStyle = this.selectedRoomId===roomid?this.selectColors.roomStroke:strokeStyle
            ctx.fillStyle = this.selectedRoomId===roomid?this.selectColors.roomFill:fillStyle
            // draw line
            ctx.beginPath()
            shape.map((s: Point): void => {
                ctx.lineTo(...s)
            })
            ctx.lineTo(...shape[0])
            ctx.closePath()
            ctx.fill()
            ctx.stroke()
        })
    }

    drawBalcany() {
        
    }

    setCanvas(width: number, height: number): CanvasRenderingContext2D {
        this.canvas.style.width = width + 'px'
        this.canvas.style.height = height + 'px'
        this.canvas.width = width
        this.canvas.height = height
        return this.canvas.getContext('2d') as CanvasRenderingContext2D
    }

    render() {
        return <canvas ref={el=>this.canvas = el as HTMLCanvasElement}></canvas>
    }
}

export default Plane