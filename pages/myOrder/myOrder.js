// pages/myOrder/myOrder.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    m1: 0,
    m2: 0,
    s1: 0,
    s2: 0,
    dialogShow: false,
    buttons: [{text: '取消'}, {text: '确定'}],
    // types: [
    //   {
    //     type: 1,
    //     title: '全部',
    //     act: true
    //   },
    //   {
    //     type: 2,
    //     title: '待支付',
    //     act: false
    //   },
    //   {
    //     type: 3,
    //     title: '待评价',
    //     act: false
    //   },
    // ],
    
    // 订单
    orders: [],
    // 支付订单
    payOrder:  {
      activityName: '活动',
      id: 0,
      title: '趣浪六一·FUN飞山海半岛',
      img: '/pages/images/6.png',
      date: '2021年06月01日',
      week:'',
      time: '9:00~12:00',
      name: '张三',
      price: 50,
      pay: 0,
      no: 'SZ51321654',
      payTime: '2021-06-09 16:00:00',
      orderDate: '2021-05-31',
      orderTime: '18:00:00'
    },
  },

  // 计算剩余时间
  getEndTime() {
    // // 获取当前时间
    let startDate = new Date();
    // // 获取开始时间
    let endDate = new Date(this.data.payOrder.payTime)
    // // 算出相差时间
    let t = endDate.getTime() - startDate.getTime();

    console.log(t);
    let m, s;

    if (t >= 0) {
        m = Math.floor(t / 1000 / 60 % 60).toString();
        s = Math.floor(t / 1000 % 60).toString();
    }

    let m1,m2,s1,s2
    //分钟数
    if (m.length == 1) {
        m1 = 0;
        m2 = m.split('')[0];
    } else if (m.length == 2) {
        m1 = m.split('')[0];
        m2 = m.split('')[1];
    }

    // 秒数
    if (s.length == 1) {
        s1 = 0;
        s2 = s.split('')[0];
    } else if (s.length == 2) {
        s1 = s.split('')[0];
        s2 = s.split('')[1];
    }
    this.setData({
      m1: m1,
      m2: m2,
      s1: s1,
      s2: s2
    })
},
  // 取消订单确认框
  openConfirm: function (e) {
      this.setData({
          dialogShow: true,
          id:e.target.dataset.id,
      })
  },
  // 确认按钮
  tapDialogButton(e) {
    const _this = this
    //发起退款
    if(e.detail.index==1){
    wx.getStorage({
    key: "id",
    success: function (user) {

    let url = app.globalData.URL + '/er/refund/refund';
    let data = {
    appid: wx.getAccountInfoSync().miniProgram.appId,
    id:_this.data.id,
    table:'hotel_user_reserve',
    uid:user.data
    };
    app.wxRequest('POST', url, data, (res) => {

    if(res.code==1){
      _this.get_lists();
      wx.showToast({
        title: res.msg,
        icon: 'success',
        duration: 2000
      })
      

    }else{
      wx.showToast({
        title: res.msg,
        icon: 'error',
        duration: 2000
      })
    }

    }, (err) => {
    console.log(err.errMsg)
    })

    _this.setData({
    dialogShow: false,
    showOneButtonDialog: false,
    pay: false
    })
    }
    })
  }else{
    _this.setData({
      dialogShow: false,
      showOneButtonDialog: false,
      pay: false
      })
  }
  
    
    console.log(e.detail.index)
  },
  showPay(){
    const _this = this
    wx.showToast({
      title: '',
      icon: 'loading',
      duration: 1000,
      success: function(){
        _this.setData({
          pay: true
        })
      }
    })
    setInterval(() => {
      _this.getEndTime();
    }, 1000);
    
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this;

    if(options.id){
      that.share_lists(options.id);
      return false
    }
    // 获取订单？
    that.get_lists();
    
  },
  get_lists(){
    var that = this;
    wx.getStorage({
      key: "id",
      success: function (user) {
        console.log(user.data)
      let url = app.globalData.URL + '/er/shbd/get_hotel_order';
      let data = {
        appid: wx.getAccountInfoSync().miniProgram.appId,
        id:user.data,
      };
      app.wxRequest('POST', url, data, (res) => {

        const data = res.lists;
        for (const dat of data) {
          dat.sum = (Number(dat.money) + Number(dat.ya_money)).toFixed(2)
        }
          that.setData({
            orders:data
          })

      }, (err) => {
        console.log(err.errMsg)
      })
    },
   
  })
  },
  share_lists(id){
    var that = this;
    
      let url = app.globalData.URL + '/er/shbd/get_hotel_order';
      let data = {
        appid: wx.getAccountInfoSync().miniProgram.appId,
        id:id,
      };
      app.wxRequest('POST', url, data, (res) => {

          that.setData({
            orders:res.lists
          })

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
  // onShareAppMessage: function () {

  // }
})