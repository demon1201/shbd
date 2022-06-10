// pages/hotel/hotel.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: app.globalData.URL,
    // 中心经度
    longitude: '114.77471',
    sorr: false,
    // 中心纬度
    latitude: '22.720912',
    scale: '16',
    markers: [
      {
        id: '2039300226923334111',
        latitude: 22.720912,
        longitude: 114.77471,
        callout: {
          content: '星河山海半岛',
          color: '#000',	
          fontSize: 12,
          borderWidth: 8,	
          bgColor	: '#fff',
          padding	: 2
        }
      }
    ],
    navHeight: app.globalData.navHeight,
    navTop: app.globalData.navTop,
    background: ['../images/6.png', '../images/6.png', '../images/6.png'],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 500,
    title: '山海半岛高尔夫球场',
    tags:['环境优美', '优质服务   ','配套齐全'],
    openDate:'预计2021年9月1日',
    openTime:'09:00~18:00',
    address: '惠州市惠东县巽寮湾体育路1号',
    addressTel: '0752-8511111',
    n: 1,
    address_item_imgs: ['../images/6.png', '../images/6.png', '../images/6.png'],
    // 入住时间
    startDate: '2021-06-09',
    endDate: '2099-12-31',
    inTime: '05-18',
    inTimeDay: '今日',
    outTime: '05-20',
    outTimeDay: '周四',
    days: 1,
    date: '05-18',
    wDate: '2021-05-18',
    date2: '05-19',
    wDate2: '2021-05-19',
    prices: 175,
    sessions: [
      {
        id: 0,
        title: '前九洞A场',
        price: 175,
        img: '/pages/images/6.png',
      },
      {
        id: 1,
        title: '后九洞B场',
        price: 270,
        img: '/pages/images/6.png',
      },
    ],
      show: false,

      // 相册图
      imgUrls: [

      ],
      current: 0,
      show1: false,

      // 相册图
      imgUrls1: [

      ],
      current1: 0
  },

  showh(e){
    console.log(this.data.imgUrls)
    const current = e.currentTarget.dataset.idx
    this.setData({
      show: true,
      current: current
    })
  },
  // 高尔夫
  showh1(e){
    const idx = e.currentTarget.dataset.idx


    this.setData({
      imgUrls2: this.data.imgUrls1[idx],
      // imgUrls1: this.data.imgUrls,
      show1: true,
    })
  },
  // 隐藏画廊
  hide() {
    console.log('component hide')
        this.setData({
            show: false
        })
},
  // 隐藏画廊1
  hide1() {
    console.log('component hide')
        this.setData({
            show1: false
        })
},

  // 订单
  toGolfOrder(){
    wx.navigateTo({
      url: '/pages/golfOrder/golfOrder'
    })
  },

  // 拨打电话
  call: function(){
    console.log('111')
    wx.makePhoneCall({
      phoneNumber: this.data.addressTel
    })
  },
  toMap(){

    const MapContext = wx.createMapContext('myMap')

    MapContext.openMapApp({
      longitude: Number(this.data.longitude) ,
      latitude: Number(this.data.latitude),
      destination: '星河山海半岛'
    })
  },
  // 支付
  pay(e) {
    console.log(e);
    const AreaName = e.currentTarget.dataset.areaname;
    const AreaCode = e.currentTarget.dataset.areacode;
    const money = e.currentTarget.dataset.money;
    // console.log(AreaCode);return
    // let sessions = this.data.sessions[idx]
    // sessions = JSON.stringify(sessions)
    wx.navigateTo({
      url: '/pages/golfPay/golfPay?AreaCode='+ AreaCode + '&AreaName=' +AreaName+ '&money=' +money,
    })
  },
  
  swiperTab: function(e) {
    this.setData({
      n: e.detail.current+1
    })
  },
  share(){
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },
  // 页面滑动
  onPageScroll(e){
    console.log(e.scrollTop)
    if(e.scrollTop > 180){
      this.setData({
        sorr : true
      })
    }else{
      this.setData({
        sorr: false
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    let url = app.globalData.URL + '/er/shbd/get_golf_lists';
    let data = {
      appid: wx.getAccountInfoSync().miniProgram.appId
    };
    app.wxRequest('POST', url, data, (res) => {
      if(res.code==1){
        let imgUrls = []
        const deurl = res.golf.banner1
        for (const url of deurl) {
          let ur = that.data.url + url
          imgUrls.push(ur)
        }
        // console.log(imgUrls, '1231232131')
        // console.log(res.golf_lists, '1231232131')
        that.setData({
          golf:res.golf,
          imgUrls1: res.imgUrls,
          imgUrls: imgUrls,
          // golf_lists:res.golf_lists,
          addressTel:res.golf.tel,
          longitude: res.golf.lng,
          // 中心纬度
          latitude: res.golf.lat,
        })
      }
    }, (err) => {
      console.log(err.errMsg)
    })
    that.glof_lists();

    // this.setData({
    //   ns: this.data.background.length
    // })
  },
  glof_lists(){
    let url = app.globalData.URL + '/er/shbd/golf_lists';
    let data = {
      appid: wx.getAccountInfoSync().miniProgram.appId
    };
    app.wxRequest('POST', url, data, (res) => {
      if(res.code==1){
        that.setData({
          golf_lists:res.golf_lists,
        })
      }
    }, (err) => {
      console.log(err.errMsg)
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