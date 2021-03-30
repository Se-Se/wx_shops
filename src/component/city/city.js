// src/component/city/city.js
import {getSearchBaiduMapInfo,getMapLocation,getLocationInfo} from "../../utils/location.js";
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    cityList: [],
    cityTags: [],
    currentCity: '大连',
    ak: 'SF16VftdXNXFuj48U6ltzmBijaRrbBky'
  },

  created() {
    // this.getCityList('city_a-z');
    // this.getLocation();
  },



  /**
   * 组件的方法列表
   */
  methods: {
    getSearchMapInfo(){
      getSearchBaiduMapInfo('肯德基',50000,'json',2,'industry_type:cater|sort_name:distance|sort_rule:1',20).then(res=>{
        console.log(res)
      }).catch(()=>{
        wx.showToast({
          title: '获取定位失败',
          icon: 'error',
          duration: 2000
        });
      })
    },

    getLocationInfo() {
      getLocationInfo('https://api.map.baidu.com/reverse_geocoding/v3/','json').then(res=>{
        console.log(res)
        this.setData({
          province: res.data.result.addressComponent.province,
          city: res.data.result.addressComponent.city,
          district: res.data.result.addressComponent.district,
          isShow: true
        });
      })
    },
    getLocation(){
      getMapLocation('json',1,'肯德基',true,true,5000).then((res)=>{
        let city = res.data.result.addressComponent.city;
        this.setData({ 
          currentCity: city.substring(0,city.length-1) 
        },()=>{
          wx.hideLoading();
        });
      }).catch(()=>{
        wx.showToast({
          title: '获取定位失败',
          icon: 'error',
          duration: 2000
        });
        wx.hideLoading();
      })
    },

    // ///////////////////////////////向父组件传递city-name////////////////////////////////////
    tapCurrentCiyt(){
      this.triggerEvent('myevent', this.data.currentCity)
    },
    handleCurrentCity(ev) {
      this.setData({
        currentCity: ev.currentTarget.dataset.name
      });
      this.triggerEvent('myevent', ev.currentTarget.dataset.name)
    },
    // ////////////////////////////////////////////////////////////////////////////////////////
    getCityTags(arr) {
      if (arr.length) {
        let tags = []
        arr.map((item) => {
          tags.push(item.title)
        });
        this.setData({
          cityTags: [...tags]
        })
      }
    },
    getCityList(name) {
      if (!wx.cloud) {
        console.log('wx.cloud error');
        return;
      }
      wx.cloud.init({
        traceUser: true,
      });
      const db = wx.cloud.database();
      db.collection(name).get().then((res) => {
        console.log(res.data[0].city);
        this.getCityTags(res.data[0].city);
        this.setData({
          cityList: res.data[0].city
        })
      })
    },
  }
})
