// pages/hotel/hotel.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navHeight: app.globalData.navHeight,
    navTop: app.globalData.navTop,
    background: ['../images/6.png', '../images/6.png', '../images/6.png'],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 500,
    title: '业主食堂',
    star: 0,
    tags:['旋转火锅', '西餐牛排','每日海鲜'],
    openTime:'9:00~18:00',
    address: '星河山海半岛-商业街旁',
    addressTel: '0752-8511111',
    n: 1,
    ns: 0,
    address_item_imgs: ['../images/6.png', '../images/6.png', '../images/6.png'],
    // 入住时间
    
    detail_items: [
      {
        id: 0,
        img: '/pages/images/6.png',
        title: '牛油果沙拉',
        tt: '低卡食物',
      },
      {
        id: 1,
        img: '/pages/images/6.png',
        title: '牛油果沙拉',
        tt: '低卡食物',
      },
      {
        id: 2,
        img: '/pages/images/6.png',
        title: '牛油果沙拉',
        tt: '低卡食物',
      },
      {
        id: 3,
        img: '/pages/images/6.png',
        title: '牛油果沙拉',
        tt: '低卡食物',
      },
      {
        id: 4,
        img: '/pages/images/6.png',
        title: '牛油果沙拉',
        tt: '低卡食物',
        link: ''
      },
      {
        id: 5,
        img: '/pages/images/6.png',
        title: '牛油果沙拉',
        tt: '低卡食物',
      },
    ]
    
  },
  // 支付

  swiperTab: function(e) {
    console.log(e)
    this.setData({
      n: e.detail.current+1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.cat)
    const cat = JSON.parse(options.cat)
    this.setData({
      ns: this.data.background.length,
      title: cat.title,
      tags: cat.tags,
      star: cat.star
    })
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