// src/pages/city/city.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cityValue:null,
    showCityClose:false,
  },
  // //////////////////////////////向opener页面传递city-name////////////////////////////////////
  handleEmitCityName(name){
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.emit('getCityName', name.detail);
    wx.navigateBack({
      delta: 1
    });
  },
  // ///////////////////////////////////////////////////////////////////////////////////////////
  handleClearCity(){
   this.setData({
    cityValue:null,
    showCityClose:false
   })
  },
  handleCityInput(ev){
   console.log(ev)
   this.setData({
    cityValue:ev.detail.value
   });
   if(ev.detail.value.trim()!==''){
     this.setData({
      showCityClose:true
     })
   }else{
    this.setData({
      showCityClose:false
     })
   }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
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