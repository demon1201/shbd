const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    vip_status:0,
    url:app.globalData.URL,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    navHeight: app.globalData.navHeight,
    navTop: app.globalData.navTop,
    tximg: '../images/logo.png',
    name: '昵称',
    items: [
      {
        id: 5,
        ico: '../images/mine/5.png',
        link: "/pages/writeOff/writeOff",
        title: '核销订单'
      },
      {
        id: 0,
        ico: '../images/mine/1.png',
        link: '/pages/myOrder/myOrder',
        title: '酒店订单'
      },
      {
        id: 1,
        ico: '../images/mine/1.png',
        link: '/pages/activityOrder/activityOrder',
        title: '我的活动'
      },
      {
        id: 2,
        ico: '../images/mine/2.png',
        link: '/pages/taocan/taocan',
        title: '我的预定'
      },
      
      {
        id: 3,
        ico: '../images/mine/4.png',
        link: '/pages/feedback/feedback',
        title: '意见反馈'
      },
    ],
    vip:1,//1普通会员2山海会员3业主/4星钻会员
  },
  toVip(){
    var that =this;
    if(that.data.vip_status==0){
      wx.showToast({
          title: '预售准备中……',
          icon: 'error',
          duration: 1500
      })
      return false;
    }
    wx.navigateTo({
      url: `/pages/upMember/upMember?vip=${this.data.vip}&nickname=${this.data.userInfo.nickName}&headimgurl=${this.data.userInfo.avatarUrl}`,
    })
  },
  // 我的服务跳转
  toMyType(e){
    const url = e.target.dataset.url
    wx.navigateTo({
      url: url,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.get_id();
    // wx.getStorage({
    //   key: "id",
    //   success: function (user) {
    //     let url = app.globalData.URL + '/er/shbd/get_user';
    //     let data = {
    //       id:user.data,
    //       appid: wx.getAccountInfoSync().miniProgram.appId,
    //     };
    //     app.wxRequest('POST', url, data, (res1) => {
    //       if(res1.code==1){
    //         console.log(res1)
    //         that.setData({
    //           canIUseGetUserProfile: true,
    //           userInfo:res1.userInfo,
    //           hasUserInfo: true,
    //           tel:res1.userInfo.phone,
    //           vip:res1.vip,
    //           count:res1.count,
    //           items:res1.menu.dow_menu
              
    //         })
    //       }
    //     }, (err) => {
    //       console.log(err.errMsg)
    //     })
    //   }
    // })

    // if (wx.getUserProfile) {
      // this.setData({
      //   canIUseGetUserProfile: true
      // })
    // }
  },
  get_user(){
    var that = this;
    wx.getStorage({
      key: "id",
      success: function (ms) {
        console.log("同步"+ms.data)
        let url = app.globalData.URL + '/er/shbd/get_user';
        let data = {
          id: ms.data,
          appid: wx.getAccountInfoSync().miniProgram.appId
        };
        app.wxRequest('POST', url, data, (res1) => {
          
          that.setData({
            canIUseGetUserProfile: true,
              userInfo:res1.userInfo,
              hasUserInfo: true,
              tel:res1.userInfo.phone,
              vip:res1.vip,
              count:res1.count,
              items:res1.menu.dow_menu,
              vip_status:res1.vip_status
          })

        }, (err) => {
          console.log(err.errMsg)
        })

      },
      fail:function(){
        console.log("重新请求")
        wx.getSetting({
          success: function (res) {
            wx.login({
              success: function (res) {
                if (res.code) {
                  //发起网络请求
                  wx.request({
                    url: 'https://pt.zerom.cn/er/index/sendCode',
                    data: {
                      code: res.code,
                      appid: wx.getAccountInfoSync().miniProgram.appId
                    },
                    success: function (msg) {
                      let url = app.globalData.URL + '/er/shbd/get_user';
                      let data = {
                        id: msg.data.id,
                        appid: wx.getAccountInfoSync().miniProgram.appId
                      };
                      app.wxRequest('POST', url, data, (res1) => {
                      
                        that.setData({
                          canIUseGetUserProfile: true,
                          userInfo:res1.userInfo,
                          hasUserInfo: true,
                          tel:res1.userInfo.phone,
                          vip:res1.vip,
                          count:res1.count,
                          items:res1.menu.dow_menu
                        })
              
                      }, (err) => {
                        console.log(err.errMsg)
                      })

                    }
                  })
                } else { }
                //获取所有用
              }
            });
    
          }
        })

        // setTimeout(function () {
        //   that.get_id()
        // }, 1000)
      }
    })
 
  },
  get_id(){
    var that = this;
    wx.getStorage({
      key: "id",
      success: function (ms) {
        console.log("同步"+ms.data)
        let url = app.globalData.URL + '/er/index/if_rz';
        let data = {
          id: ms.data,
          appid: wx.getAccountInfoSync().miniProgram.appId
        };
        app.wxRequest('POST', url, data, (res) => {
          if(res.is_sq!=1){
            wx.navigateTo({
              url: '/pages/login/login',
            })
          }

        }, (err) => {
          console.log(err.errMsg)
        })

      },
      fail:function(){
        console.log("重新请求")
        setTimeout(function () {
          that.get_id()
        }, 1000)
      }
    })

  },
  getPhone (e) {
  
    var that = this;
    wx.getStorage({
      key: "session_key",
      success: function (ms) {
        wx.request({
          data: {
            iv: e.detail.iv,
            encryptedData: e.detail.encryptedData,
            session_key: ms.data,
            appid: wx.getAccountInfoSync().miniProgram.appId
          },
          url: app.globalData.URL + '/api/demo2.php',
          method: 'POST',
          header: {
            "Content-Type": "application/x-www-form-urlencoded" // 默认值
          },
          success: function (res) {
            wx.getStorage({
              key: "id",
              success: function (ms) {
                wx.request({
                  data: {
                    id: ms.data,
                    phone: res.data.phoneNumber,
                  },
                  url: app.globalData.URL + '/er/index/phone',
                  method: 'POST',
                  header: {
                    "Content-Type": "application/x-www-form-urlencoded" // 默认值
                  },
                  success: function (res) {
                    console.log(res)
                    if (res.data.state == 1) {
                      that.setData({
                        tel: res.data.phone,
                      
                      })
                      wx.setStorage({
                        key: 'phone',
                        data: res.data.phone,
                        success: function (ms) { },
                      })
                    }
                  }
                })
              }
            })
          }
        });
      }
    })
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户头像昵称信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {


        //头像传参后台
        wx.getStorage({
          key: "id",
          success: function (user) {
            let url = app.globalData.URL + '/er/shbd/user_add';
            let data = {
              id:user.data,
              nickname:res.userInfo.nickName,
              headimgurl:res.userInfo.avatarUrl,
            };
            app.wxRequest('POST', url, data, (res1) => {
              console.log(res1.msg)
            }, (err) => {
              console.log(err.errMsg)
            })
          }
        })
        
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })

  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
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
    var that = this;
    that.get_user();
    if (typeof this.getTabBar === 'function' &&
    this.getTabBar()) {
    this.getTabBar().setData({
      selected: 3
    })
  }
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
