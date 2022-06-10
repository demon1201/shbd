const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    vip_status:0,
    url: app.globalData.URL,
    navHeight: app.globalData.navHeight,
    navTop: app.globalData.navTop,
    logo: '../images/logo.png',
    background: ['../images/6.png', '../images/6.png', '../images/6.png'],
    bb : 2,
    current: '',
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 500,
    classify: [],
    activities: [
      {
        id: 0,
        img: '../images/6.png',
        title: '“五一小长假”这些人在半岛玩high了'
      },
      {
        id: 1,
        img: '../images/6.png',
        title: '51城市逃离计划 | 来山海半岛放肆high玩'
      }
    ],
    vip: 4,
    close: true,
  },
  // 删除海报
  coloseHaibao(){
    this.setData({
      close: false
    })
    // app.globalData.haibao = false
  },
  //视频
  click1: function (e) {
    wx.navigateTo({
      //目的页面地址
      url: '/pages/video/video?video=' + e.target.dataset.video,
    })
  },
  //跳转内页
  click2: function (e) {
    wx.navigateTo({
      //目的页面地址
      url: e.target.dataset.url,
    })
  },
  //跳转外链
  click3: function (e) {
    wx.navigateTo({
      //目的页面地址 
      url: '/pages/webview/webview?linkurl='+e.target.dataset.url,
    })
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
  // 跳转到对应
  toLink(e){
    

    const idx = e.target.dataset.idex;
    let data = this.data.classify[idx];
    const link = data[e.currentTarget.dataset.idx].link
    let a = link.split("?")
    console.log(a)

    if (a[0]=='phone'){
      wx.makePhoneCall({
        phoneNumber: a[1] // 仅为示例，并非真实的电话号码
      })
      return false;
    }
    data = JSON.stringify(data)
    wx.navigateTo({
      url: link + '?data='+data
    })
  },
  toActivityDetail(e){
    wx.navigateTo({
      url: '/pages/activityDetail/activityDetail?id=' + e.target.dataset.id,
    })
  },
  login(){
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },

  // 项目按钮页改变
  change1(e){
    console.log(e)
    this.setData({
      current: e.detail.current
    })
  },
  // 点击指示点切换
  change11(e){
    const idx = e.currentTarget.dataset.idx
    this.setData({
      current: idx
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    const _this = this
    // 请求轮播图,会员活动
   

    let url = app.globalData.URL + '/er/shbd/get_index';
        let data = {
          appid: wx.getAccountInfoSync().miniProgram.appId
        };
        app.wxRequest('POST', url, data, (res) => {
          if(res.code==1){

            console.log(res)

            // 将项目拆分成8个一组
            let cfy = res.menu_lists
            let cc = []
            let index = 0
            while(index < cfy.length){
              cc.push(cfy.slice(index, index+=8))
            }
            console.log(cc, '111')
            this.setData({
              classify:cc,
              bb: cc.length,
              background:res.banner,
              activities:res.activity
            })

          }
        }, (err) => {
          console.log(err.errMsg)
        })

    var that = this;
      that.get_id()
      
    
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
        app.wxRequest('POST', url, data, (res) => {
          
          that.setData({
            userInfo:res.userInfo,
            vip:res.vip,
            vip_status:res.vip_status,
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
                          userInfo:res1.userInfo,
                          vip:res1.vip,
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
          wx.setStorage({
            key: 'is_sq',
            data: res.is_sq,
            success: function (ms) { },
          })
          that.setData({
            'is_sq': res.is_sq
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
                      let url = app.globalData.URL + '/er/index/if_rz';
                      let data = {
                        id: msg.data.id,
                        appid: wx.getAccountInfoSync().miniProgram.appId
                      };
                      app.wxRequest('POST', url, data, (res) => {
                      
                        that.setData({
                          'is_sq': res.is_sq
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
                        is_sq: 1,
                      
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
    that.get_user()
    if (typeof this.getTabBar === 'function' &&
    this.getTabBar()) {
    this.getTabBar().setData({
      selected: 0
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
