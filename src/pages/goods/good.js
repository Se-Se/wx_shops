// pages/goods/good.js
Page({
  data: {
    groups: [],
    goods: [],
    currentGroup: 0,
    isScroll: 0,
    scrollTop: 0,
    goodsTopInfo: [],
    currentTags: {},
    swiperInfo: {
      indicatorDots: true,
      vertical: false,
      autoplay: true,
      interval: 2000,
      duration: 500,
      circular: true
    },
    swiperArr: [],
    order: {
      price: 0,
    },
    orderNum: 0,
    showOrder: false
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

  },

  test_init() {
    this.setData({
      goods: test_goods
    }, () => {
      this.handleScrollRange(this.data.goods).then((res) => {
        this.setData({
          goodsTopInfo: [...res]
        }, () => {
          if (this.data.goodsTopInfo) {
            this.setData({
              currentTags: this.data.goodsTopInfo[0]
            });
          };
        })
      });
    });
    this.setData({
      groups: test_groups
    });
    this.setData({
      swiperArr: test_swiper
    })
  },
  init() {
    // this.getCollectionInfo('goods', 'goods');
    // this.getCollectionInfo('shop-groups', 'groups');
    // console.log(JSON.stringify(this.data.goods[0]))

    this.test_init()
  },

  // 购买商品
  buy() {
    let arr = [];
    this.data.goods.map((item) => {
      if (item.goods.length) {
        item.goods.map((good) => {
          if (good.num) {
            arr.push(good);
          }
        })
      }
    });
    console.log(arr);

    // 跳到支付页面
    wx.navigateTo({
      url: '../order/order',
      success: (res)=> {
        // 通过eventChannel向被打开页面传送数据
        console.log(1111111)
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: arr,totalPrice:this.data.order.price })
      }
    })
  },
  // 添加到购物车
  addToCar(ev) {
    console.log(ev.target.dataset);
    let type = ev.target.dataset.type;
    let num = 0;
    this.data.goods.map((item) => {
      if (item.goods.length) {
        item.goods.map((good) => {
          if (good.id === ev.target.dataset.target.id) {
            if (type === 'add') {
              good.num += 1;
              num++;
            } else {
              good.num -= 1;
              num--;
            }
          }
        })
      }
    })
    this.setData({
      goods: this.data.goods
    })
    this.setData({
      orderNum: this.data.orderNum + num
    })
    this.setData({
      order: {
        price: type === 'add' ? (Number(this.data.order.price) + Number(ev.target.dataset.target.price)).toFixed(1) : (Number(this.data.order.price) - Number(ev.target.dataset.target.price)).toFixed(1)
      }
    }, () => {
      this.setData({
        showOrder: Number(this.data.order.price) ? true : false
      })
    })

  },
  getOrderNum() {

  },
  getCollectionInfo(name, prop) {
    if (!wx.cloud) {
      console.log('wx.cloud error');
      return;
    }
    wx.cloud.init({
      traceUser: true,
    });
    const db = wx.cloud.database();
    db.collection(name).get().then(res => {
      // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
      console.log(res.data,);
      // let _this = prop
      let obj = {};
      obj[prop] = [...res.data];
      this.setData(obj, () => {
        if (prop === 'goods') {
          this.handleScrollRange(this.data.goods).then((res) => {
            this.setData({
              goodsTopInfo: [...res]
            }, () => {
              if (this.data.goodsTopInfo) {
                this.setData({
                  currentTags: this.data.goodsTopInfo[0]
                });
              };
            })
          });
        }
      });
    })
  },
  handleScrollRange(list) {
    if (list.length > 0) {
      let arr = [];
      return new Promise((resolve) => {
        list.map((item, index) => {
          const query = wx.createSelectorQuery();
          query.select(`#${item.id}`).boundingClientRect();
          query.exec((ev) => {
            let obj = {};
            if (index === list.length - 1 && list.length > 1) {
              obj.scrolltop = arr[index - 1].scrolltop + arr[index - 1].height;
            } else {
              obj.scrolltop = ev[0].top
            }
            obj.index = index;
            obj.name = item.name;
            obj.tags = [...item.tags];
            obj.id = item.id;
            obj.height = ev[0].height;
            arr.push(obj);
            if (index === list.length - 1) {
              resolve(arr)
            }
          })
        });
      })

    }
  },

  tapGroups(ev) {
    console.log(ev.currentTarget.dataset.id);
    let id = ev.currentTarget.dataset.id;
    const query = wx.createSelectorQuery();
    query.select(`#${id}`).boundingClientRect();
    query.exec((ev) => {
      this.setData({
        scrollTop: this.data.isScroll + ev[0].top - 200
      })
    })
    this.setData({
      currentGroup: ev.currentTarget.dataset.index
    });
    this.data.goodsTopInfo.map((item) => {
      if (item.id === id) {
        this.setData({
          currentTags: item
        });
      };
    });

  },
  handleScroll(ev) {
    if (this.data.goodsTopInfo) {
      let len = this.data.goodsTopInfo.length - 1;
      let arr = this.data.goodsTopInfo;
      let top = ev.detail.scrollTop + 200;
      this.data.goodsTopInfo.map((item, index) => {
        if (index === len && top >= item.scrolltop) {
          this.setData({
            currentGroup: item.index
          });
          this.setData({
            currentTags: item
          });
        }
        if (top >= item.scrolltop && index !== len && top <= arr[index + 1].scrolltop) {
          this.setData({
            currentGroup: item.index
          });
          this.setData({
            currentTags: item
          });
        }
      })
    }
    this.setData({
      isScroll: ev.detail.scrollTop
    })
  }
})

const test_groups = [
  {
    name: '人气热卖',
    id: 'id_1',
    icon: 'shiwuqimin1'
  },
  {
    name: '精选套餐',
    id: 'id_2',
    icon: 'shiwumiantiao'
  },
  {
    name: '披萨',
    id: 'id_3',
    icon: 'shiwuqimin2'
  },
  {
    name: '桶',
    id: 'id_4',
    icon: 'shiwuqimin'
  },
  {
    name: '主食',
    id: 'id_5',
    icon: 'shiwuqimin3'
  },
];
const test_goods = [
  {
    name: '人气热卖',
    tags: [],
    id: 'id_1',
    goods: [
      {
        img: 'https://7368-shops-6guf8y5z1a8e9bbb-1305216326.tcb.qcloud.la/shops-img/food1.jpg?sign=8949fd99b2185daa082f3498dc13a39b&t=1615951070',
        name: '商品名1',
        price: '39.5',
        id: 'good_1',
        num: 0,

      },
      {
        img: 'https://7368-shops-6guf8y5z1a8e9bbb-1305216326.tcb.qcloud.la/shops-img/food2.jpg?sign=1dc12821848e9a69ddc3b30c9156b09e&t=1615951103',
        name: '商品名',
        price: '39.3',
        id: 'good_2',
        num: 0,

      },
      {
        img: 'https://7368-shops-6guf8y5z1a8e9bbb-1305216326.tcb.qcloud.la/shops-img/food3.jpg?sign=f8e8196e196862e7b8ce61f1db35a6f2&t=1615951122',
        name: '商品名',
        price: '39.2',
        id: 'good_3',
        num: 0,

      },
    ]
  },
  {
    name: '精选套餐',
    tags: ['tag-1', 'tag-2'],
    id: 'id_2',
    goods: [
      {
        img: 'https://7368-shops-6guf8y5z1a8e9bbb-1305216326.tcb.qcloud.la/shops-img/food4.jpg?sign=5c47cba38b48942f273816fce6fa01f5&t=1615951144',
        name: '商品名2',
        price: '39.0',
        id: 'good_4',
        num: 0,

      },
      {
        img: 'https://7368-shops-6guf8y5z1a8e9bbb-1305216326.tcb.qcloud.la/shops-img/food6.jpg?sign=0dfdd3aea76288992b8edbb18cbba96c&t=1615951160',
        name: '商品名',
        price: '39.0',
        id: 'good_5',
        num: 0,

      },
      {
        img: 'https://7368-shops-6guf8y5z1a8e9bbb-1305216326.tcb.qcloud.la/shops-img/food7.jpg?sign=b5def9f9db80f128e0cbfc420a45c56b&t=1615951175',
        name: '商品名',
        price: '39.0',
        id: 'good_6',
        num: 0,

      },

      {
        img: 'https://7368-shops-6guf8y5z1a8e9bbb-1305216326.tcb.qcloud.la/shops-img/food7.jpg?sign=b5def9f9db80f128e0cbfc420a45c56b&t=1615951175',
        name: '商品名',
        price: '39.0',
        id: 'good_7',
        num: 0,

      },
    ]
  },
  {
    name: '原味/脆皮鸡',
    tags: ['tag-1', 'tag-2'],
    id: 'id_3',
    goods: [
      {
        img: 'https://7368-shops-6guf8y5z1a8e9bbb-1305216326.tcb.qcloud.la/shops-img/food7.jpg?sign=b5def9f9db80f128e0cbfc420a45c56b&t=1615951175',
        name: '商品名3',
        price: '39.0',
        id: 'good_8',
        num: 0,

      },
      {
        img: 'https://7368-shops-6guf8y5z1a8e9bbb-1305216326.tcb.qcloud.la/shops-img/food7.jpg?sign=b5def9f9db80f128e0cbfc420a45c56b&t=1615951175',
        name: '商品名',
        price: '39.0',
        id: 'good_9',
        num: 0,

      }
    ]
  },
  {
    name: '桶',
    tags: ['tag-1', 'tag-2'],
    id: 'id_4',
    goods: [
      {
        img: 'https://7368-shops-6guf8y5z1a8e9bbb-1305216326.tcb.qcloud.la/shops-img/food7.jpg?sign=b5def9f9db80f128e0cbfc420a45c56b&t=1615951175',
        name: '商品名4',
        price: '39.0',
        id: 'good_10',
        num: 0,

      },
      {
        img: 'https://7368-shops-6guf8y5z1a8e9bbb-1305216326.tcb.qcloud.la/shops-img/food7.jpg?sign=b5def9f9db80f128e0cbfc420a45c56b&t=1615951175',
        name: '商品名',
        price: '39.0',
        id: 'good_11',
        num: 0,

      },
      {
        img: 'https://7368-shops-6guf8y5z1a8e9bbb-1305216326.tcb.qcloud.la/shops-img/food7.jpg?sign=b5def9f9db80f128e0cbfc420a45c56b&t=1615951175',
        name: '商品名',
        price: '39.0',
        id: 'good_12',
        num: 0,

      },
    ]
  },
  {
    name: '主食',
    tags: ['tag-1', 'tag-2'],
    id: 'id_5',
    goods: [
      {
        img: 'https://7368-shops-6guf8y5z1a8e9bbb-1305216326.tcb.qcloud.la/shops-img/food7.jpg?sign=b5def9f9db80f128e0cbfc420a45c56b&t=1615951175',
        name: '商品名5',
        price: '39.0',
        id: 'good_13',
        num: 0,

      },
      {
        img: 'https://7368-shops-6guf8y5z1a8e9bbb-1305216326.tcb.qcloud.la/shops-img/food7.jpg?sign=b5def9f9db80f128e0cbfc420a45c56b&t=1615951175',
        name: '商品名',
        price: '39.0',
        id: 'good_14',
        num: 0,

      },
      {
        img: 'https://7368-shops-6guf8y5z1a8e9bbb-1305216326.tcb.qcloud.la/shops-img/food7.jpg?sign=b5def9f9db80f128e0cbfc420a45c56b&t=1615951175',
        name: '商品名',
        price: '39.0',
        id: 'good_15',
        num: 0,

      },
    ]
  },
]

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