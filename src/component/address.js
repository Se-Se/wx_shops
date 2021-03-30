// src/component/address.js
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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    getAddr: function (e) {
      console.log(e.detail) // code: [330000, 330100, 330106]
      console.log(e.detail) // text: ["浙江省", "杭州市", "西湖区"]
      console.log(e.detail) // json: [{name: "浙江省", code: 330000}, {name: "杭州市", code: 330100}, {name: "西湖区", code: 330106}]
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  getLocation() {
    wx.chooseLocation({
      success: (res) => {
        console.log(res)
      }
    })
  },
  loginSuccess: function (e) {
    console.log(e.detail.code) // wx.login 的 code
    console.log(e.detail.userInfo) // wx.getUserInfo 的 userInfo
  },
  openLocation() {
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success (res) {
        const latitude = res.latitude
        const longitude = res.longitude
        wx.openLocation({
          latitude,
          longitude,
          scale: 18
        })
      }
     })
  },
  }
})
