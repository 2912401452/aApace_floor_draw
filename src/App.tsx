import React from 'react';
import './App.css';
import {
  ICanvasSize,
  IFloorBaseData,
  IBuildRect,
  ITableData,
  IRoomData
} from './components/IInterface'
import Plane from './components/index'
import { geoJSON2Floor } from './components/utils'
import { build1, floorBaseData, tableData, roomData, iconData, textData } from './components/mock'

function App() {
  let canvasSize: ICanvasSize = {
    width: 800,
    height: 600
  }
  let buildRect: IBuildRect = {
    minLng: 120.10361271591185,
    maxLng: 120.1049972653197,
    minLat: 30.26170009899040,
    maxLat: 30.26279102073103
}
  let floorData: IFloorBaseData  = geoJSON2Floor(build1, canvasSize, buildRect)
  return (
    <div className="App">
        <Plane options={{
            width: 800,
            height: 600,
            iconSize: 40,
            // drawRoomName: false,
            // floorBaseData: floorBaseData,
            floorBaseData: floorData,
            tableData: tableData,
            roomData: roomData,
            iconData: iconData,
            textData: textData,
            style: {
              tableFill: '#ff0'
            }
          }}/>
    </div>
  );
}

export default App;
