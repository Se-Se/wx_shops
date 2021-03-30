// src/pages/address/address.js
import { getSearchBaiduMapInfo } from "../../utils/location.js";
import { getDbCloudInfo, addDbCloudInfo, removeDbCloudInfo } from "../../utils/util"
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
    cityName:'',
    localCityName:'',
    isLoaction:true

  },
  // ////////////////////////////////////////跳到city-page///////////////////////////////////////////
  handleCity(){
    let _this = this
    wx.navigateTo({
      url: '../city/city',
      events:{
       getCityName(data){
         _this.setData({
          cityName:data
        });
          _this.setData({
            isLoaction:data!==_this.data.localCityName?false:true
          });
       }
      },
      success: (res)=> {
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
      mask:true,
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
    } else {
      this.setData({
        isSweet: true
      });
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
          }).catch(()=>{
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
          removeDbCloudInfo('collections', { uid: ev.detail.data }).then(()=>{
            wx.hideLoading();
            item.slideButtons[0].text = '收藏';
            this.setData({
              toastMsg: '取消收藏成功'
            });
          }).catch(()=>{
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
  // ////////////////////////////////////////////////////初始化获取本地商店信息数组////////////////////////////////////////////////////////////////////////
  getPlaceInfo() {
    getSearchBaiduMapInfo('肯德基', 50000, 'json', 2, 'industry_type:cater|sort_name:distance|sort_rule:1', 20).then((res) => {
      if(this.data.cityName===''){
        this.setData({
          cityName:res.cityName
        });
      }
      this.setData({
        localCityName:res.cityName
      })
      let arr = res.data.results.splice(0, 3);
      this.formatterNearShops(arr).then(res => {
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
    // this.getPlaceInfo();

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init();
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
})
