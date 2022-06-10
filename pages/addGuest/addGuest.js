// pages/addGuest/addGuest.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myself: app.globalData.myself,
    num: 1,
    residue: 1,
    price: 100,
    p1: '',
    p2: '',
    p3: '',
    time: '',
    title: '',
    sId: '',
    guest:[],
  },
  addGuest(){
   
    var that = this;
    var money = that.data.price*that.data.num
    //调起支付
    console.log(that.data.name)
    if(!that.data.name){
      wx.showToast({
        title: '请输入本人姓名',
        icon: 'loading',
        duration: 2000
      })
      return 
    }
    wx.getStorage({
      key: "id",
      success: function (user) {
        const data1 = {
          PlayDate: that.data.date,
          // price: this.data.price * (this.data.num),
          name: that.data.name,
          money:money,
          Booker: that.data.title,
          GroupID: that.data.GroupID,
          appid:wx.getAccountInfoSync().miniProgram.appId,
          AreaCode:that.data.AreaCode,
          PersonNumber:that.data.num,
          guest: that.data.guest,
          user_id:user.data,
          teetime:that.data.teetime
        }
        // var data2 = JSON.stringify(data1)
        // console.log(data2)
        // return false;
        let url1 = app.globalData.URL + '/er/pay/golfpay';
        app.wxRequest('POST', url1, data1, (res) => {

          if(res.code==='true'){
            
            wx.requestPayment({
              timeStamp: res.data.timeStamp,
              nonceStr: res.data.nonceStr,
              package: res.data.package,
              signType: 'MD5',
              paySign: res.data.paySign,
              success (ms) {
                const data2 = {
                  PlayDate: that.data.date,
                  // price: this.data.price * (this.data.num),
                  name: that.data.name,
                  money:money,
                  Booker: that.data.title,
                  GroupID: that.data.GroupID,
                  appid:wx.getAccountInfoSync().miniProgram.appId,
                  AreaCode:that.data.AreaCode,
                  PersonNumber:that.data.num,
                  guest: that.data.guest,
                  user_id:user.data,
                  teetime:that.data.teetime,
                  time:res.data.time,
                  id:res.data.id,
                }

              wx.showToast({
                      title: '支付成功',
                      icon: 'success',
                      duration: 2000
                    })

                    //付款成功之后请求场地
                   var data3= JSON.stringify(data2)
              setTimeout(function () {
                
                wx.navigateTo({
                  url: '/pages/payForOrder/payForOrder?data='+data3
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
         
        }, (err) => {
          console.log(err.errMsg)
        })

      }
    })

        return
    //
    wx.getStorage({
      key: "id",
      success: function (user) {
        const data1 = {
          PlayDate: that.data.date,
          guest: that.data.guest,
          // price: this.data.price * (this.data.num),
          name: that.data.myself,
          Booker: that.data.title,
          GroupID: that.data.GroupID,
          appid:wx.getAccountInfoSync().miniProgram.appId,
          AreaCode:that.data.AreaCode,
          PersonNumber:that.data.num,
          id:user.data
        }
        let url = app.globalData.URL + '/er/shbd/golf_add';
        app.wxRequest('POST', url, data1, (res) => {
          if(res.code==1){
            wx.showToast({
              title: res.msg,
              icon: 'success',
              duration: 2000
            })
            // setTimeout(function () {
            //   wx.reLaunch({
            //     url: '/pages/mine/mine',
            //   })
            // }, 1500) //延迟时间
          }
        }, (err) => {
          console.log(err.errMsg)
        })
      }
  })
    return 
    // wx.navigateTo({
    //   url: '/pages/golfPay/golfPay',
    // })
    wx.request({
      url: 'add',
      data: data,
      success: function () {
        wx.showToast({
          title: '添加成功',
          icon: 'success',
          duration: 1000
        })

        wx.navigateTo({
          url: '/pages/golfPay/golfPay',
        })
      }
    })


  },
  name: function (e) {
    this.setData({
      name: e.detail.value
    })
  },

  bindblur(e){
    let guest = []
   if(this.data.p1 != ''){
    guest.push(this.data.p1)
   }
   if(this.data.p2 != ''){
    guest.push(this.data.p2)
   }
   if(this.data.p3 != ''){
    guest.push(this.data.p3)
   }
   console.log(guest.length)

   this.setData({
     num: 1+ guest.length,
     guest: guest
   })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let data = options.data
    data = JSON.parse(data)
    console.log(data)
    this.setData({
      nums: data.num,
      num: data.num,
      price: data.price,
      date: data.date.year+ '-'+ data.date.month+'-'+data.date.day,
      title: data.title,
      AreaCode:data.AreaCode,
      teetime:data.teetime,
      GroupID: data.GroupID
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