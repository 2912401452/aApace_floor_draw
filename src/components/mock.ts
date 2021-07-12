import { style } from 'd3'
import { IFloorBaseData, ITableData, IRoomData, IGeoJSON, IBuildRect, IIcondata, ITextData } from './IInterface'
/**
 * 基础楼层的数据（包括楼和孔洞）
 */
export let floorBaseData: IFloorBaseData = {
    shape: [
        [100, 100], 
        [340, 100],
        [340, 200],
        [300, 200],
        [300, 380],
        [100, 380],
    ],
    holes: [
        [
            [120, 120],
            [160, 120],
            [160, 180],
            [120, 180]
        ],
        [
            [120, 220],
            [140, 220],
            [140, 240],
            [120, 240]
        ]
    ]
}

/**
 * 基础座位的数据
 */
export let tableData: ITableData[] = [
    {
        user: '315103',
        tableid: '6-6-201',
        shape: [
            [170, 160],
            [180, 160],
            [180, 170],
            [170, 170]
        ]
    },
    {
        user: '315104',
        tableid: '6-6-204',
        shape: [
            [190, 160],
            [200, 160],
            [200, 170],
            [190, 170]
        ]
    },
    {
        user: '315105',
        tableid: '6-6-205',
        shape: [
            [215, 155],
            [225, 166],
            [215, 175],
            [205, 165]
        ]
    }
]

/**
 * 测试房间的数据
 */
export let roomData: IRoomData[] = [
    {
        roomid: '6-6-102C',
        roomName: '6-6-102C',
        roomNameStyle: {
            fontSize: 24,
            color: "#fff",
            fontWeight: 900
        },
        center: [220, 220],
        shape: [
            [200, 200],
            [240, 200],
            [240, 240],
            [200, 240]
        ]
    },
    {
        roomid: '6-6-103C',
        roomName: '6-6-103C',
        center: [270, 220],
        shape: [
            [250, 200],
            [290, 200],
            [290, 240],
            [250, 240]
        ]
    },
    {
        roomid: '6-6-104C',
        roomName: '6-6-104C',
        center: [230, 320],
        shape: [
            [200, 300],
            [240, 300],
            [240, 310],
            [220, 310],
            [220, 320],
            [240, 340],
            [200, 340]
        ]
    }
]

/**
 * 测试图标数据
 */
export let iconData: IIcondata[] = [
    {
        iconId: 'icon1',
        iconType: 'icon1',
        src: 'https://gw.alipayobjects.com/mdn/rms_5e897d/afts/img/A*N4QDTr9Et0YAAAAAAAAAAAAAARQnAQ',
        center: [300, 300]
    },
    {
        iconId: 'icon2',
        iconType: 'icon2',
        src: 'https://gw.alipayobjects.com/mdn/rms_5e897d/afts/img/A*ecagRq-0kFkAAAAAAAAAAAAAARQnAQ',
        center: [330, 300]
    },
    {
        iconId: 'icon3',
        iconType: 'icon3',
        src: 'https://gw.alipayobjects.com/mdn/rms_5e897d/afts/img/A*UeDPSYpsrJEAAAAAAAAAAAAAARQnAQ',
        center: [360, 300]
    }
]

export let textData: ITextData[] = [
    {
        text: '1楼',
        center: [100, 100],
        style: {
            fontSize: 28,
            fontWeight: 600
        }
    }
]

export let build1: IGeoJSON  = {
    "type": "Feature",
    "properties": {
      "name": "1号楼"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [120.10459, 30.262685],
          [120.103775, 30.261981],
          [120.103973, 30.261805],
          [120.104338, 30.262111],
          [120.104295, 30.262148],
          [120.104746, 30.262537],
          [120.10459, 30.262685]
        ]
      ]
    }
  }
export let build1Rect: IBuildRect = {
    minLng: 120.10361271591185,
    maxLng: 120.1049972653197,
    minLat: 30.26170009899040,
    maxLat: 30.26279102073103
}


  export let build2: IGeoJSON = {
    "type": "Feature",
    "properties": {
      "name": "2号楼"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [120.10433916002512, 30.262110527666945],
          [120.10355025529863, 30.261449975867208],
          [120.10346174240111, 30.261531060939376],
          [120.10323040187357, 30.261333560753652],
          [120.10347783565521, 30.261101309293934],
          [120.10449573397638, 30.261971235877194],
          [120.10433916002512, 30.262110527666945]
        ]
      ]
    }
  }

export let build3: IGeoJSON = {
    "type": "Feature",
    "properties": {
      "name": "3号楼"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [120.104045, 30.261071],
          [120.103096, 30.260261],
          [120.103257, 30.260108],
          [120.104196, 30.260923],
          [120.104045, 30.261071]
        ]
      ]
    }
  }

export let build4: IGeoJSON =  {
    "type": "Feature",
    "properties": {
      "name": "4号楼"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [120.10449573397638, 30.26196891917216],
          [120.10420303791761, 30.261719583473372],
          [120.10429456830026, 30.2616225711547],
          [120.10423555970192, 30.261509052140678],
          [120.10452634624481, 30.26124821305986],
          [120.10464984442712, 30.26129118092893],
          [120.10470751192094, 30.261253054698894],
          [120.105018094182, 30.261517739824978],
          [120.10496512055396, 30.2615646533068],
          [120.10494902729988, 30.26166195527174],
          [120.10484978556632, 30.261798641202507],
          [120.10467946529388, 30.261893626228805],
          [120.10458659380673, 30.261891599110292],
          [120.10449573397638, 30.26196891917216]
        ]
      ]
    }
  }

  export let build5: IGeoJSON = {
    "type": "Feature",
    "properties": {
      "name": "5号楼"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [120.105211, 30.261509],
          [120.104337, 30.260758],
          [120.104493, 30.260605],
          [120.105362, 30.26136],
          [120.105211, 30.261509]
        ]
      ]
    }
  }

export let build6: IGeoJSON = {
    "type": "Feature",
    "properties": {
      "name": "6号楼"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [120.10366592556238, 30.2600619628032],
          [120.10382182896139, 30.259917455412584],
          [120.10458994656803, 30.260577727928453],
          [120.10452758520842, 30.260635067174274],
          [120.10449305176734, 30.2606055287791],
          [120.10439004456158, 30.26070572761299],
          [120.10366592556238, 30.2600619628032]
        ]
      ]
    }
  }

  export let build7: IGeoJSON = {
    "type": "Feature",
    "properties": {
      "name": "7号楼"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [120.105715, 30.261271],
          [120.104841, 30.260521],
          [120.105001, 30.260368],
          [120.10586, 30.261118],
          [120.105715, 30.261271]
        ]
      ]
    }
  }

export let build8: IGeoJSON = {
    "type": "Feature",
    "properties": {
      "name": "8号楼"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [120.106219, 30.26103],
          [120.105516, 30.260433],
          [120.105672, 30.26027],
          [120.10638, 30.260873],
          [120.106219, 30.26103]
        ]
      ]
    }
  }

  export let build9: IGeoJSON = {
    "type": "Feature",
    "properties": {
      "name": "9号楼"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [120.106847, 30.260901],
          [120.105956, 30.260136],
          [120.106117, 30.259978],
          [120.107013, 30.260743],
          [120.106847, 30.260901]
        ]
      ]
    }
  }

export let build10: IGeoJSON = {
    "type": "Feature",
    "properties": {
      "name": "10号楼"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [120.106464, 30.259958],
          [120.106105, 30.259648],
          [120.106255, 30.259495],
          [120.106309, 30.259532],
          [120.106427, 30.259421],
          [120.106743, 30.259685],
          [120.106464, 30.259958]
        ]
      ]
    }
  }
