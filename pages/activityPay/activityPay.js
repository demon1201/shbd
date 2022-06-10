// pages/activityPay/activityPay.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:app.globalData.URL,
    navHeight: app.globalData.navHeight,
    navTop: app.globalData.navTop,
    title: '趣浪六一·FUN飞山海半岛',
    year: 2021,
    month: '06',
    day: '06',
    date: "9：00~12：00",
    price: 50,
    prices: 50,
    pay:'pay',
    m_pay:'m_pay',
    
    parts: [
      {
        name: '张三',
        role: 0
      },
      {
        name: '李四',
        role: 1
      },
      {
        name: '王五',
        role: 2
      },

    ],
    open: false,
    remark: ''
  },
  open(){
    this.setData({
      open : !this.data.open
    })
  },
  m_pay(){
    var that = this;
    that.setData({
      m_pay:'none'
    })
    const time = this.data.time
    const prices = this.data.prices
    wx.getStorage({
      key: "id",
      success: function (user) {
      let url1 = app.globalData.URL + '/er/shbd/activity_add';
      const data1 = {
        name: that.data.selfName,
        money: prices,
        parts: JSON.stringify(that.data.parts),
        remark: that.data.remark,
        pid:that.data.pid,
        activity_id:that.data.activity_id,
        p_title:that.data.title,
        appid: wx.getAccountInfoSync().miniProgram.appId,
        user_id:user.data,
        phone:that.data.phone,
        fx_status:that.data.fx_status,
        fj:that.data.fj,
        sfz:that.data.sfz,
        fx_num:that.data.fx_num,
        time: time
      }
      console.log(data1);
        app.wxRequest('POST', url1, data1, (res) => {

          if(res.code==1){
              wx.showToast({
                title: res.msg,
                icon: 'success',
                duration: 2000
              })
              setTimeout(function () {
                wx.navigateTo({
                  url: '/pages/activityOrder/activityOrder'
                })
              }, 1000)
          }else{
            wx.showToast({
              title: res.msg,
              icon: 'loading',
              duration: 2000
            })
          }
          setTimeout(function () {
            that.setData({
              m_pay:'m_pay',
            })
          }, 2000)
        }, (err) => {
          console.log(err.errMsg)
        })
      }
    })


    
  
  },
  pay(){
    var that = this;
    that.setData({
      pay:'none'
    })
    const time = this.data.time
    const prices = this.data.prices
    wx.getStorage({
      key: "id",
      success: function (user) {
      let url1 = app.globalData.URL + '/er/pay/activitypay';
      const data1 = {
        name: that.data.selfName,
        money: prices,
        parts: JSON.stringify(that.data.parts),
        remark: that.data.remark,
        pid:that.data.pid,
        activity_id:that.data.activity_id,
        p_title:that.data.title,
        appid: wx.getAccountInfoSync().miniProgram.appId,
        user_id:user.data,
        phone:that.data.phone,
        fx_status:that.data.fx_status,
        fj:that.data.fj,
        sfz:that.data.sfz,
        fx_num:that.data.fx_num,
        time: time
      }
 
        app.wxRequest('POST', url1, data1, (res) => {

          if(res.code==='true'){
            wx.requestPayment({
              timeStamp: res.data.timeStamp,
              nonceStr: res.data.nonceStr,
              package: res.data.package,
              signType: 'MD5',
              paySign: res.data.paySign,
              success (res) {
              wx.showToast({
                      title: '支付成功',
                      icon: 'success',
                      duration: 2000
                    })
              setTimeout(function () {
                wx.navigateTo({
                  url: '/pages/activityOrder/activityOrder'
                })
              }, 1000)

              },
              fail (res) {
                console.log(res)
                wx.showToast({
                  title: '支付失败',
                  icon: 'loading',
                  duration: 2000
                })
              }
            })
          }else{
            wx.showToast({
              title: res.msg,
              icon: 'loading',
              duration: 2000
            })
            setTimeout(function () {
              that.setData({
                pay:'pay',
              })
            }, 2000)
          }
         
        }, (err) => {
          console.log(err.errMsg)
        })
      }
    })


    
  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const data = JSON.parse(options.data) 
    console.log(data)
    var prices = data.price;
    this.setData({
      res:data,
      prices:prices,
      parts:data.parts,
      pid:data.pid,
      activity_id:data.activity_id,
      time:data.time,
      title:data.title,
      selfName:data.name,
      phone:data.phone,
      fj:data.fj,
      photo:data.photo,
      sfz:data.sfz,
      fx_status:data.fx_status,
      fx_num:data.rnum
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