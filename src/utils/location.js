import { BMapWX } from '../../src/libs/bmap.js';


const ak = 'SF16VftdXNXFuj48U6ltzmBijaRrbBky'

export function getSearchMapInfo(query, radius, output, scope, filter, pageSize) {
    return new Promise((reslove, reject) => {
        wx.getLocation({
            isHighAccuracy:true,
            highAccuracyExpireTime:50000,
            type: 'wgs84',   //默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标      
            success: (res) => {
                var longitude = res.longitude.toString()
                var latitude = res.latitude.toString()
                wx.request({
                    url: `https://api.map.baidu.com/place/v2/search?query=${query}&page_size=${pageSize}&location=${latitude},${longitude}&radius=${radius}&output=${output}&ak=${ak}&scope=${scope}&filter=${filter}`,
                    data: {},
                    header: {
                        'Content-Type': 'application/json'
                    },
                    success: (res) => {
                        reslove(res)
                    },
                    fail: (res) => {
                        reject(res)
                    },
                })
            }
        })
    })
}

export function getMapLocation(output, extensionsPoi, poiTypes, town, road, radius) {
    wx.showLoading({
        title: '加载中',
    });
    return new Promise((reslove, reject) => {
        wx.getLocation({
            type: 'wgs84',   //默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标      
            success: (res) => {        // success         
                var longitude = res.longitude
                var latitude = res.latitude
                wx.request({
                    url: `https://api.map.baidu.com/reverse_geocoding/v3/?ak=${ak}&location=${latitude},${longitude}&output=${output}&extensions_poi=${extensionsPoi}&poi_types=${poiTypes}&extensions_town=${town}&extensions_road=${road}&radius=${radius}`,
                    data: {},
                    header: {
                        'Content-Type': 'application/json'
                    },
                    success: (res) => {
                        reslove(res)
                    },
                    fail: (err) => {
                        reject(err);
                    },
                })
            }
        })
    })
}

// 简版获取位置信息
export function getLocationInfo(url, output) {
    return new Promise((reslove) => {
        wx.showLoading({
            title: '加载中',
        });
        wx.getLocation({
            success: (res) => {
                //小程序的ajax请求需要在后台安全域名配置增加 开发测试中在详情里勾选-不校验合法域名即可
                wx.request({
                    url,
                    data: {
                        ak: ak,
                        location: `${res.latitude},${res.longitude}`,
                        output: output,  //格式
                    },
                    success: (res) => {
                        if (res.data.status == "0") {
                            wx.hideLoading()
                            reslove(res)
                        } else {
                            wx.hideLoading()
                        }
                    }
                })
            }
        })
    })
}

export function getMapInfo() {
    // 新建百度地图对象 
    let BMap = new BMapWX({
        ak: 'SF16VftdXNXFuj48U6ltzmBijaRrbBky'
    });
    // 发起POI检索请求 
    BMap.regeocoding({
        // "query": '酒店',
        fail: (data) => {
            console.log(data)
        },
        success: (data) => {
            console.log(data)
            let info = data.wxMarkerData;
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
}

export function getSearchBaiduMapInfo(query, radius, output, scope, filter, pageSize) {
    return new Promise((reslove, reject) => {
        // 新建百度地图对象 
        let BMap = new BMapWX({
            ak: ak
        });
        // 发起POI检索请求 
        BMap.regeocoding({
            // "query": '酒店',
            fail: (data) => {
                console.log(data)
            },
            success: (data) => {
                console.log(data);
                let city = data.originalData.result.addressComponent.city;
                let cityName = city.substring(0,city.length-1);
                let info = data.originalData.result.location;
                var longitude = info.lng.toString()
                var latitude = info.lat.toString()
                // let info = data.originalData.result.pois[0].point;
                // var longitude = info.x.toString()
                // var latitude = info.y.toString()
                wx.request({
                    url: `https://api.map.baidu.com/place/v2/search?query=${query}&page_size=${pageSize}&location=${latitude},${longitude}&radius=${radius}&output=${output}&ak=${ak}&scope=${scope}&filter=${filter}`,
                    data: {},
                    header: {
                        'Content-Type': 'application/json'
                    },
                    success: (res) => {
                        let data = {...res,cityName}
                        reslove(data)
                    },
                    fail: (res) => {
                        reject(res)
                    },
                })
            },
        });
    })
}

export function useWxLocation() {
    console.log(111)
    wx.getLocation({
        type: 'gcj02',
        isHighAccuracy:true,
        highAccuracyExpireTime:5000,
        success(res) {
            console.log(res)
            const latitude = res.latitude
            const longitude = res.longitude
            const speed = res.speed
            const accuracy = res.accuracy
            // wx.choosePoi({
            //     success:(data)=>{
            //         console.log(data)
            //     },
            //     fail:(err)=>{
            //         console.log(err)
            //     }
            // });
            // wx.chooseLocation({
            //     latitude:latitude,
            //     longitude:longitude,
            //     success:(res)=>{
            //         console.log(res)
            //     }
            // });

            wx.openLocation({
                latitude,
                longitude,
                scale: 18,
                name:'肯德基'
              })
  
        },
        fail(err) {
            console.log(err)
        }
    })
}