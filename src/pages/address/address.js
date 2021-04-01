// src/pages/address/address.js
import { getSearchBaiduMapInfo } from "../../utils/location.js";
import { getDbCloudInfo, addDbCloudInfo, removeDbCloudInfo, setAnimation } from "../../utils/util";

const date = new Date();
const today = date.getDate();
date.setDate(date.getDate() + 1);
const tomorrow = date.getDate();
const years = []
const months = []
const days = []



Page({

  /**
   * 页面的初始数据
   */
  data: {
    slideButtons: [],
    nearShops: [],
    collections: [],
    isSweet: false,
    toastMsg: '',
    showToast: false,
    tAnimation: '',
    cityName: '',
    localCityName: '',
    isLoaction: true,
    theChoseShopInfo: null,
    dinnerTypes: [
      {
        text: '现在点餐 支付成功后取餐',
        value: 'Now'
      },
      {
        text: '预约点餐 您未选择预约时间',
        text_1: '预约点餐 ',
        text_2: '签到后取餐',
        value: 'Later'
      },
    ],
    sec_4_animation: '',
    sec_5_animation: '',
    dinnerTime: '',

    today,
    tomorrow,
    hours: [],
    miniutes: [],
    pickerVal: [0, 0, 0],
    hasOrderTime: false,
    orderTimeText: ''




  },
  // 返回sec_4 
  goBackSec_4() {
    let ani_sec_4 = wx.createAnimation({ //保存时sec_5 执行的动画
      duration: 400,
      timingFunction: 'linear',

    });
    let ani_sec_5 = wx.createAnimation({
      duration: 400,
      timingFunction: 'linear',

    });
    ani_sec_4.translate('0').step();
    ani_sec_5.translate('100%').step();
    this.setData({
      sec_4_animation: ani_sec_4.export(),
      sec_5_animation: ani_sec_5.export()
    });
  },
  // 点击确定，保存订餐时间
  saveTime() {
    let day = this.data.pickerVal[0] === 0 ? '今天' : '明天';
    let h_index = this.data.pickerVal[1];
    let m_index = this.data.pickerVal[2];
    let hour = this.data.hours[h_index].text;
    let minutes = this.data.miniutes[m_index].text;
    this.setData({
      orderTimeText: day + hour + ':' + minutes,
      hasOrderTime: true
    });

    this.goBackSec_4();//返回sec_4动画
  },
  // 获取缓存的时间
  getInitTime() {


  },
  // 初始化小时
  initHours() {
    let d = new Date();
    const hour = d.getHours();
    console.log(hour)
    this.getHours(hour);
  },
  // 初始化分钟
  initMiniutes() {
    let d = new Date();
    const minutes = d.getMinutes();
    console.log(minutes)
    this.getMiniutes(minutes);
  },
  // 获取分钟
  getMiniutes(start_minutes) {
    let arr = [];
    for (let i = (start_minutes || 0); i < 60; i++) {
      let obj = {};
      if (i % 5 === 0) {
        if (i < 10) {
          obj = {
            value: i,
            text: '0' + i
          }
        } else {
          obj = {
            value: i,
            text: i.toString()
          };
        };
        arr.push(obj);
      }
    }
    this.setData({
      miniutes: [...arr]
    })
  },
  // 获取小时
  getHours(start_time, end_time) {
    let arr = []
    for (let i = start_time; i < (end_time || 24); i++) {
      let obj = {}
      if (i < 10) {
        obj = {
          value: i,
          text: '0' + i
        }
      } else {
        obj = {
          value: i,
          text: i.toString()
        }
      }
      arr.push(obj)
    }
    this.setData({
      hours: [...arr]
    })
    return arr;
  },

  // ////////////////////////////////////////选择就餐的时间///////////////////////////////////////////
  bindTimeChange(ev) {
    const val = ev.detail.value
    console.log(val, ev)
    if (val[0] === 0) {
      this.initHours();  //当前时间 ：小时
    } else if (val[0] === 1) {
      this.getHours(6, 10) //第二天上午工作时间
    }
    if (val[0] === 0 && val[1] === 0) {
      this.initMiniutes();//初始时，从几分种开始可以订餐
    } else {
      this.getMiniutes(); //全部分钟可以选
    }
    this.setData({
      pickerVal: [...val]
    });
  },
  // 点击预约时间页面左右移动的动画
  handleOrderTap(ev) {
    if (ev.currentTarget.dataset.type !== 'Later') {
      return;
    }
    let ani_sec_4 = wx.createAnimation({
      duration: 400,
      timingFunction: 'linear',

    });
    let ani_sec_5 = wx.createAnimation({
      duration: 400,
      timingFunction: 'linear',

    });
    ani_sec_4.translate('-100%').step();
    ani_sec_5.translate('0').step();
    this.setData({
      sec_4_animation: ani_sec_4.export(),
      sec_5_animation: ani_sec_5.export()
    });
    //初始化时间
    this.initMiniutes();
    this.initHours();
  },
  // ////////////////////////////////////////选择就餐的方式///////////////////////////////////////////
  radioChange(ev) {
    if (ev.detail.value === 'Later') {
      let ani_sec_4 = wx.createAnimation({
        duration: 400,
        timingFunction: 'linear',

      });
      let ani_sec_5 = wx.createAnimation({
        duration: 400,
        timingFunction: 'linear',

      });
      console.log(ani_sec_4)
      ani_sec_4.translate('-100%').step();
      ani_sec_5.translate('0').step();
      this.setData({
        sec_4_animation: ani_sec_4.export(),
        sec_5_animation: ani_sec_5.export()
      });
      //初始化时间
      this.initMiniutes();
      this.initHours();
    } else {
      this.setData({   //选择现在点餐后初始化pick-view 数据
        pickerVal: [0, 0, 0],
        hasOrderTime: false,
        orderTimeText: ''
      })
    }
  },
  // ////////////////////////////////////////选择就餐的餐厅///////////////////////////////////////////
  choseTheShop(ev) {
    console.log(ev);
    this.setData({
      choseTheShop: ev.currentTarget.dataset.item
    })
  },
  // ////////////////////////////////////////跳到city-page///////////////////////////////////////////
  handleCity() {
    let _this = this
    wx.navigateTo({
      url: '../city/city',
      events: {
        getCityName(data) {
          _this.setData({
            cityName: data
          });
          _this.setData({
            isLoaction: data !== _this.data.localCityName ? false : true
          });
        }
      },
      success: (res) => {
        // 通过eventChannel向被打开页面传送数据
        console.log(1111111)
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: '' })
      }
    })
  },
  // ////////////////////////////////////动画//////////////////////////////////////////////////
  handleAnimationToast() {
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    let ani = wx.createAnimation({
      duration: 400,
      timingFunction: 'linear',

    });
    ani.opacity(1).step();

    this.setData({
      tAnimation: ani.export()
    });
    setTimeout(() => {
      ani.opacity(0).step();
      this.setData({
        tAnimation: ani.export()
      })
    }, 2000);
  },
  handleShopType(ev) {
    if (ev.currentTarget.dataset.type === 'normall') {
      this.setData({
        isSweet: false
      });
      this.handleShopTypeChange('肯德基')
    } else {
      this.setData({
        isSweet: true
      });
      this.handleShopTypeChange('肯德基甜品店')
    }
  },
  // //////////////////////////////////点击收藏button//////////////////////////////////////
  slideButtonTap(ev, data) {

    // 收藏toast动画
    this.handleAnimationToast();

    this.data.nearShops.map((item) => {
      if (item.uid === ev.detail.data) {
        if (this.data.collections.length === 2 && !item.isCollected) {
          wx.hideLoading();
          this.setData({
            toastMsg: '收藏服务提示:添加地址收藏数量不能大于2'
          })
          return;
        }
        let arr = [];
        item.isCollected = !item.isCollected;
        if (item.isCollected) {
          addDbCloudInfo('collections', { uid: ev.detail.data }).then((res) => {
            console.log('res', res);
            wx.hideLoading();
            item.slideButtons[0].text = '取消收藏';
            this.setData({
              toastMsg: '收藏餐厅成功'
            });
          }).catch(() => {
            wx.hideLoading();
            this.setData({
              toastMsg: '收藏餐厅失败'
            });
          });
          this.data.collections.push(item);
          this.setData({
            collections: [...this.data.collections]
          });

        } else {
          removeDbCloudInfo('collections', { uid: ev.detail.data }).then(() => {
            wx.hideLoading();
            item.slideButtons[0].text = '收藏';
            this.setData({
              toastMsg: '取消收藏成功'
            });
          }).catch(() => {
            wx.hideLoading();
            this.setData({
              toastMsg: '取消收藏失败'
            });
          });

          this.data.collections.map((cItem) => {
            if (cItem.uid !== ev.detail.data) {
              arr.push(cItem);
            };
          });
          this.setData({
            collections: [...arr]
          });

        }
      }
    });
    this.setData({
      nearShops: [...this.data.nearShops]
    });
  },
  // ////////////////////////////////////////////////////肯德基，甜品 切换////////////////////////////////////////////////////////////////////////
  handleShopTypeChange(type) {
    getSearchBaiduMapInfo(type, 50000, 'json', 2, 'industry_type:cater|sort_name:distance|sort_rule:1', 20).then((res) => {
      let arr = res.data.results.filter((item) => {
        return item.name.indexOf('甜品') < 0
      }).splice(0, 3);
      this.formatterNearShops(arr).then(res => {
        console.log(res)
        this.setData({
          nearShops: [...res]
        });
        if (!res.length) {
          return;
        };
        let arr = [];
        res.map((item) => {
          if (item.isCollected) {
            arr.push(item);
          };
        });
        this.setData({
          collections: [...arr]
        })

      });
    }).catch((err) => {
      console.log(err)
      wx.showToast({
        title: '获取定位失败',
        icon: 'error',
        duration: 2000
      });
    })
  },
  // ////////////////////////////////////////////////////初始化获取本地商店信息数组////////////////////////////////////////////////////////////////////////
  getPlaceInfo() {
    getSearchBaiduMapInfo('肯德基', 50000, 'json', 2, 'industry_type:cater|sort_name:distance|sort_rule:1', 20).then((res) => {
      if (this.data.cityName === '') {
        this.setData({
          cityName: res.cityName
        });
      }
      this.setData({
        localCityName: res.cityName
      })
      let arr = res.data.results.filter((item) => {
        return item.name.indexOf('甜品') < 0
      }).splice(0, 3);
      this.formatterNearShops(arr).then(res => {
        console.log(res)
        this.setData({
          nearShops: [...res]
        });
        if (!res.length) {
          return;
        };
        res.map((item) => {
          if (item.isCollected) {
            this.data.collections.push(item);
          };
        });
        this.setData({
          collections: [...this.data.collections]
        })

      });
    }).catch((err) => {
      console.log(err)
      wx.showToast({
        title: '获取定位失败',
        icon: 'error',
        duration: 2000
      });
    })
  },
  // ///////////////////////////////////判断附近商店是否收藏//////////////////////////////////////////////
  formatterNearShops(arr) {
    if (!arr.length) {
      return;
    };
    return new Promise((reslove) => {
      getDbCloudInfo('collections').then(res => {
        let db_uids = [];
        if (res.data.length) {
          res.data.map((item) => {
            db_uids.push(item.uid)
          })
        }
        arr.map((item) => {
          let isCollected = db_uids.indexOf(item.uid) < 0 ? false : true;
          item.isCollected = isCollected;
          let obj = {
            type: 'warn',
            text: isCollected ? '取消收藏' : '收藏',
            extClass: 'test',
            src: '/page/weui/cell/icon_del.svg', // icon的路径
            data: item.uid
          };
          item.slideButtons = [{ ...obj }];
        });
        reslove(arr)
      })
    });
  },
  init() {
    this.getPlaceInfo();
    this.getHours();
    this.getMiniutes();

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.init();
    this.getHours(6, 10);
    this.getMiniutes();
    this.getInitTime();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
});

