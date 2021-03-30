// pages/main/main.js
import {getSearchMapInfo} from "../../utils/location.js";
Page({

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init()
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

  },
  /**
 * 页面的初始数据
 */
  data: {
    swiperInfo: {
      indicatorDots: true,
      vertical: false,
      autoplay: true,
      interval: 2000,
      duration: 500,
      circular: true,
    },
    swiperArr: [],
    longitude:null,
    latitude:null,
    sec_2_groups: [
      {
        name: '会员码',
        id: 'vip_code',
        icon: 'huiyuanqia'
      },
      {
        name: '我的卡包',
        id: 'card',
        icon: 'kabao'
      },
      {
        name: '我的订单',
        id: 'order_list',
        icon: 'dingdanyichenggong'
      },
    ],
    pic_arr: [
      {
        img: 'https://7368-shops-6guf8y5z1a8e9bbb-1305216326.tcb.qcloud.la/shops-img/food1.jpg?sign=8949fd99b2185daa082f3498dc13a39b&t=1615951070',
        id: 'shop_1'
      },
      {
        img: 'https://7368-shops-6guf8y5z1a8e9bbb-1305216326.tcb.qcloud.la/shops-img/food1.jpg?sign=8949fd99b2185daa082f3498dc13a39b&t=1615951070',
        id: 'shop_2'
      },
    ],
    services:[
      {
        id:'s_1',
        icon:'v',
        name:'V金商城'
      },
      {
        id:'s_2',
        icon:'kafei',
        name:'K咖啡'
      },
      {
        id:'s_3',
        icon:'shop1',
        name:'口袋炸鸡店'
      },
      {
        id:'s_4',
        icon:'huiyuan',
        name:'会员'
      },
      {
        id:'s_5',
        icon:'scooter__easy',
        name:'宅急送'
      },
    ],
    nearShop:{
      name:'',
      distance:'',
    }
  },
  init() {
    this.setData({
      swiperArr: test_swiper
    });
    this.getNearShopInfo()
  },
  getNearShopInfo(){
    getSearchMapInfo('肯德基',50000,'json',2,'|sort_name:distance|sort_rule:1',20).then(res=>{
      console.log(res);
      let info = res.data.results[0]
      this.setData({
        nearShop:{
          name:info.name,
          distance:info.detail_info.distance,
        }
      })
    })
  },
  handleServiceTap(ev) {
    console.log(ev.currentTarget.dataset.id)
  },
  handleTapPic(ev) {
    console.log(ev.currentTarget.dataset.id)
  },
  handleTapItem(ev) {
    console.log(ev.currentTarget.dataset.id)
  },
})
const test_swiper = [
  {
    img: 'https://7368-shops-6guf8y5z1a8e9bbb-1305216326.tcb.qcloud.la/shops-img/food1.jpg?sign=8949fd99b2185daa082f3498dc13a39b&t=1615951070',
    name: '商品名1',
    price: '￥39.0',

  },
  {
    img: 'https://7368-shops-6guf8y5z1a8e9bbb-1305216326.tcb.qcloud.la/shops-img/food2.jpg?sign=1dc12821848e9a69ddc3b30c9156b09e&t=1615951103',
    name: '商品名',
    price: '￥39.0',

  },
  {
    img: 'https://7368-shops-6guf8y5z1a8e9bbb-1305216326.tcb.qcloud.la/shops-img/food3.jpg?sign=f8e8196e196862e7b8ce61f1db35a6f2&t=1615951122',
    name: '商品名',
    price: '￥39.0',

  },
]