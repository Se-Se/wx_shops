// 引用百度地图微信小程序JSAPI模块 
import { BMapWX } from '../../libs/bmap.js';

Page({
  data: {
    markers: [],
    latitude: '',
    longitude: '',
    placeData: {}
  },
  makertap(ev) {
    console.log(123,ev)
    var id = ev.detail.markerId;
    this.showSearchInfo(this.data.markers, id);
    this.changeMarkerColor(this.data.markers, id);
  },
  getMapInfo() {
    // 新建百度地图对象 
    let BMap = new BMapWX({
      ak: 'SF16VftdXNXFuj48U6ltzmBijaRrbBky'
    });
    // 发起POI检索请求 
    BMap.regeocoding({
      // "query": '酒店',
      fail: (data)=> {
        console.log(data)
      },
      success: (data)=> {
        console.log(data)
      let  info = data.wxMarkerData;
        this.setData({
          markers: [...info]
        });
        this.setData({
          latitude: info[0].latitude
        });
        this.setData({
          longitude: info[0].longitude
        });
      },
      // 此处需要在相应路径放置图片文件 
      // iconPath: '../../assets/img/marker_red.png',
      // 此处需要在相应路径放置图片文件 
      // iconTapPath: '../../assets/img/marker_red.png'
    });
  },
  onLoad: function () {
    this.getMapInfo()
  },
  showSearchInfo(data, i){
    this.setData({
      placeData: {
        title: '名称：' + data[i].title + '\n',
        address: '地址：' + data[i].address + '\n',
        telephone: '电话：' + data[i].telephone
      }
    });
  },
  changeMarkerColor(data, i) {
    let arr = [];
    for (let j = 0; j < data.length; j++) {
      if (j == i) {
        // 此处需要在相应路径放置图片文件 
        data[j].iconPath = "../../assets/img/marker_yellow.png";
      } else {
        // 此处需要在相应路径放置图片文件 
        data[j].iconPath = undefined;
      }
      arr[j]=data[j];
    }
    this.setData({
      markers: [...arr]
    });
  }
})