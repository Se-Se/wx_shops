// pages/order/order.js
Page({



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

  },
  /**
 * 页面的初始数据
 */
  data: {
    orderList: [],
    recommondLsit: [],
    maxIndex_r: 3,
    show_r_all: false,
    recommond_t_price:0,
    show_r_Price:false
  },
  init() {
    this.setData({
      recommondLsit: test_recommondLsit
    });
    if(test_recommondLsit.length){
      let num = 0;
      test_recommondLsit.map((item)=>{
        if(item.chose){
         num+=Number(item.price);
        }
      });
      this.setData({
        recommond_t_price:(Number(this.data.recommond_t_price) + Number(num)).toFixed(1)
      },()=>{
        this.showRPrice();
      })
    }
  },
  showRPrice(){
    this.setData({
      show_r_Price:Number(this.data.recommond_t_price)>0
    })
  },
  handleRecommendShowAll() {
    this.setData({
      show_r_all: !this.data.show_r_all
    }, () => {
      this.setData({
        maxIndex_r: this.data.show_r_all ? this.data.recommondLsit.length : 3
      })
    })
  },
  handleRecommend(ev) {
    console.log(ev)
    console.log(ev.currentTarget.dataset.id);
    let id = ev.currentTarget.dataset.id;
    this.data.recommondLsit.map((item) => {
      if (item.id === id) {
        item.chose = !item.chose;
        this.setData({
          recommond_t_price:item.chose?(Number(this.data.recommond_t_price) + Number(item.price)).toFixed(1) :(Number(this.data.recommond_t_price) - Number(item.price)).toFixed(1)
        },()=>{
          this.showRPrice();
        })
      }
    });
    this.setData({
      recommondLsit: [...this.data.recommondLsit]
    });
  },
});
const test_orderList = [

]
const test_recommondLsit = [
  {
    img: 'https://7368-shops-6guf8y5z1a8e9bbb-1305216326.tcb.qcloud.la/shops-img/food1.jpg?sign=8949fd99b2185daa082f3498dc13a39b&t=1615951070',
    name: '9元换购黄金鸡块',
    pre_price: '11.5',
    price: '9.0',
    chose: true,
    id: 'r_1',
  },
  {
    img: 'https://7368-shops-6guf8y5z1a8e9bbb-1305216326.tcb.qcloud.la/shops-img/food1.jpg?sign=8949fd99b2185daa082f3498dc13a39b&t=1615951070',
    name: '9元换购黄金鸡块',
    pre_price: '11.5',
    price: '9.0',
    chose: false,
    id: 'r_2',
  },
  {
    img: 'https://7368-shops-6guf8y5z1a8e9bbb-1305216326.tcb.qcloud.la/shops-img/food1.jpg?sign=8949fd99b2185daa082f3498dc13a39b&t=1615951070',
    name: '9元换购黄金鸡块',
    pre_price: '11.5',
    price: '9.0',
    chose: false,
    id: 'r_3',
  },
  {
    img: 'https://7368-shops-6guf8y5z1a8e9bbb-1305216326.tcb.qcloud.la/shops-img/food1.jpg?sign=8949fd99b2185daa082f3498dc13a39b&t=1615951070',
    name: '9元换购黄金鸡块',
    pre_price: '11.5',
    price: '9.0',
    chose: false,
    id: 'r_4',
  },
]