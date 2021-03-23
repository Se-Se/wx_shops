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
    orderPrice: 0,
    totalPrice: 0,
    recommondLsit: [],
    maxIndex_r: 3,
    show_r_all: false,
    recommond_t_price: 0,
    show_r_Price: false,
    advert: {
      chose: false
    },
    vTick: {
      check: false
    },
    surplusPay: {
      check: false
    },
    showNoticeSec: false,
    maxLen: 18,
    oldTags: [],
    tagVal: '',
    fastTags: ['不要辣', '不加葱'],
    PhoneNum: 12345678,
    packageTags: ['店内就餐', '打包带走'],
    showPackageSec: false,
    packageIndex: 0,
    pre_packageIndex: 0,
    thePackageType: ''
  },
  init() {
    console.log(333);
    this.setData({
      thePackageType: this.data.packageTags[this.data.packageIndex]
    })
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', (data) => {
      console.log('data', data);
      this.setData({
        orderList: [...data.data]
      });
      this.setData({
        orderPrice: data.totalPrice
      });

      // 
      this.setData({
        recommondLsit: test_recommondLsit
      });
      if (test_recommondLsit.length) {
        let num = 0;
        test_recommondLsit.map((item) => {
          if (item.chose) {
            num += Number(item.price);
          }
        });
        this.setData({
          recommond_t_price: (Number(this.data.recommond_t_price) + Number(num)).toFixed(1),
        }, () => {
          this.handleTotalPrice(data.totalPrice, num)
          this.showRPrice();
        })
      }

    });
  },
  savePackageType() {
    this.setData({
      showPackageSec: false
    });
    this.setData({
      pre_packageIndex: this.data.packageIndex
    }, () => {
      this.setData({
        thePackageType: this.data.packageTags[this.data.pre_packageIndex]
      })
    })
  },
  tapPackageTag(ev) {
    this.setData({
      packageIndex: ev.currentTarget.dataset.index
    })
  },
  handleShowPackage() {
    this.setData({
      showPackageSec: true
    })
  },
  closePackageSec() {
    this.setData({
      showPackageSec: false,
      packageIndex: this.data.pre_packageIndex
    })
  },
  handleTotalPrice(data, num) {
    this.setData({
      totalPrice: (Number(data) + Number(num)).toFixed(1)
    })
  },
  editPhoneNum() {
    this.setData({
      ablePhone: !this.data.ablePhone
    })
  },
  handleTapFastTag(ev) {
    this.setData({
      tagVal: (this.data.tagVal + ev.currentTarget.dataset.item).substring(0, 18)
    })
  },
  handleTapOldTag(ev) {
    console.log(ev);
    this.setData({
      tagVal: (this.data.tagVal + ev.currentTarget.dataset.item).substring(0, 18)
    })
  },
  saveTag() {
    if (this.data.tagVal.trim() !== '') {
      this.setData({
        oldTags: [...this.data.oldTags, this.data.tagVal]
      });
    } else {
      this.setData({
        tagVal: this.data.tagVal.trim()
      });
    };
    this.setData({
      showNoticeSec: false
    })
  },

  handleNticeInput(ev) {
    console.log('input', ev);
    this.setData({
      tagVal: ev.detail.value

    })
  },
  editNotice() {
    this.setData({
      showNoticeSec: true
    })
  },
  closeNoticeSec() {
    this.setData({
      showNoticeSec: false
    })
  },

  switchSurplusChange() {
    this.setData({
      surplusPay: {
        check: !this.data.surplusPay.check
      }
    })
  },
  switchVtickChange() {
    this.setData({
      vTick: {
        check: !this.data.vTick.check
      }
    })
  },
  handleAdvertChose() {
    this.setData({
      advert: {
        chose: !this.data.advert.chose
      }
    })
  },
  showRPrice() {
    this.setData({
      show_r_Price: Number(this.data.recommond_t_price) > 0
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
          recommond_t_price: item.chose ? (Number(this.data.recommond_t_price) + Number(item.price)).toFixed(1) : (Number(this.data.recommond_t_price) - Number(item.price)).toFixed(1)
        }, () => {
          this.handleTotalPrice(this.data.orderPrice, this.data.recommond_t_price)
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