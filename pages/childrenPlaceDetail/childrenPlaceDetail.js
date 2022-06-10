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
    title: '反斗乐园',
    star: 0,
    tags:['亲子乐园', '安全玩乐','趣味益智'],
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
        title: '组合滑梯',
        tt: '游玩设备',
      },
      {
        id: 1,
        img: '/pages/images/6.png',
        title: '幼教座椅',
        tt: '游玩设备',
      },
      {
        id: 2,
        img: '/pages/images/6.png',
        title: '室外创意设备',
        tt: '游玩设备',
      },
      {
        id: 3,
        img: '/pages/images/6.png',
        title: '室内儿童乐园',
        tt: '游玩设备',
      },
      {
        id: 4,
        img: '/pages/images/6.png',
        title: '室内游乐场',
        tt: '游玩设备',
        link: ''
      },
      {
        id: 5,
        img: '/pages/images/6.png',
        title: '木质游乐设备',
        tt: '游玩设备',
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
    console.log(options.place)
    const place = JSON.parse(options.place)
    this.setData({
      ns: this.data.background.length,
      title: place.title,
      tags: place.tags,
      star: place.star
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