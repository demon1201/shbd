// pages/payForOrder/payForOrder.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
      a1:1,
      zk:1,
      b:1,
      pay:'pay',
      a:'2020-10-10',
      url: app.globalData.URL,
      room: {
      title: '度假酒店',
      roomType: '大床房',
      bed: "单床(1.8Mx2M)",
      hideitems: [],
      id: 0,
      img: '/pages/images/6.png',
      oldPrice: 180,
      open: false,
      price: 175,
      title: "单间",
    },
    person: {
      name: '1',
      tel: '2',
      comment: '3'
    },
    days: 1,
    date: '05-18',
    wDate: '',
    date2: '05-19',
    wDate2: '',
    prices: 175,
    startDate: '',
    startDate2: '',
    endDate: '2099-12-31',
    zrf: false,
    },

    tuikuan(){

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      var that = this;
      if(!options.id){
        wx.showToast({
          title: '参数错误',
          duration: 2000,
          icon: 'none'
        });
        return 
      }

      //查看该订单是否支付
      let url1 = app.globalData.URL + '/er/shbd/shbd_find';
      const data2 = {
        id: options.id,
        user_id:wx.getStorageSync('id')
      }
      app.wxRequest('POST', url1, data2, (res) => {
          if(res.code==1){
           //未支付订单
           that.setData({
            detail:res.res,
            df_id:res.df_id,
            date:res.date,
            zk:res.zk,
           })
          }
         
        }, (err) => {
          console.log(err.errMsg)
        })

     
    },
    pay(e){
      // return
      var that = this;
      let money = that.data.detail.money;
      money = money.toFixed(2)
     
      that.setData({
        pay:'no',
      })
        let url1 = app.globalData.URL + '/er/pay/shbd_pay';
        const data1 = {
          money: money,
          pid:Number(that.data.detail.id),//房型id
          appid: wx.getAccountInfoSync().miniProgram.appId,
          user_id:wx.getStorageSync('id'),//代付人id
          type:e.currentTarget.dataset.type,//1为代付状态
          
        }
        app.wxRequest('POST', url1, data1, (res) => {
          if(res.code==3){
            wx.showToast({
              title: res.msg,
              icon: 'success',
              duration: 2000
            })
            setTimeout(function () {
              wx.reLaunch({
                url: '/pages/index/index'
              })
            }, 1000)
          }else if(res.code==='true'){
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
                  wx.reLaunch({
                    url: '/pages/index/index'
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
            }
            setTimeout(function () {
              that.setData({
                pay:'pay',
              })
            }, 2000)
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