// pages/login/login.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    open: true,
    blo: 'blo',
    url: app.globalData.URL,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  //返回
  fh: function () {
    console.log(1111111)
    // wx.reLaunch({
    //   url: '/pages/index/index'
    // })
    var pages = getCurrentPages(); //当前页面
    var beforePage = pages[pages.length - 2]; //前一页
    // beforePage.data.pid = that.data.pid
    beforePage.data.count = 1
    console.log(beforePage.data.pid)

    wx.navigateBack({
      success: function () {
        beforePage.onLoad(); // 执行前一个页面的onLoad方法
      }
    });
  },
  qx: function () {
    console.log(111)

    var that = this;
    that.setData({
      blo: "dis"
    })
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  //获取用户信息
  getUserProfile: function (res) {
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
                  // that.globalData.aaa = msg.data.id;
                  wx.setStorage({
                    key: 'id',
                    data: msg.data.id,
                    success: function (ms) { },
                  })
                  wx.setStorage({
                    key: 'session_key',
                    data: msg.data.session_key,
                    success: function (ms) { },
                  })
                }
              })
            } else { }
            //获取所有用
          }
        });

      }
    });
    var params = new Object()
    var that = this;
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (e) => {
        console.log( e.userInfo)
        wx.getStorage({
          key: "id",
          success: function (ms) {
            console.log("asssssssssssssssss")
            params.nickName = e.userInfo.nickName,
              params.headimgurl = e.userInfo.avatarUrl,
              params.sex = e.userInfo.gender,
              wx.request({
                data: {
                  nickname: e.userInfo.nickName,
                  headimgurl: e.userInfo.avatarUrl,
                  id: ms.data,
                  sex: e.userInfo.gender,
                  province: e.userInfo.province,
                },
                url: app.globalData.URL + '/er/index/us_update',
                method: 'POST',
                header: {
                  "Content-Type": "application/x-www-form-urlencoded" // 默认值
                },
                success: function (msg) {
                  console.log(msg)
                  wx.setStorage({
                    key: 'get_nickname',
                    data: e.userInfo.nickName,
                    success: function (ms) { },
                  })
                  wx.setStorage({
                    key: 'headimgurl',
                    data: e.userInfo.avatarUrl,
                    success: function (ms) { },
                  })
                  wx.setStorage({
                    key: 'is_sq',
                    data: 1,
                    success: function (ms) { },
                  })
                  that.setData({
                    open: false
                  })
                  // var pages = getCurrentPages(); //当前页面
                  // var beforePage = pages[pages.length - 2]; //前一页
                  // // beforePage.data.pid = that.data.pid
                  // beforePage.data.count = 1
                  // console.log(beforePage.data.pid)
    
                  // wx.navigateBack({
                  //   success: function () {
                  //     beforePage.onLoad(); // 执行前一个页面的onLoad方法
                  //   }
                  // });
    
    
                }
              });
          },
          fail:function(){
            
          }
        })
      }
    })

    


  },
  getPhoneNumber: function (e) {

    console.log(e)
    var that = this;
    wx.getStorage({
      key: "session_key",
      success: function (ms) {
        if (ms.data == undefined) {
          wx.showToast({
            title: "网络错误请重试！",
            icon: 'loading',
            duration: 2000,
            mask: true
          })
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
                    wx.setStorage({
                      key: 'id',
                      data: msg.data.id,
                      success: function (ms) {
                        console.log("缓存id成功")
                      },
                      fail(msg) {
                        console.log("缓存id失败")
                      }
                    })
                    wx.setStorage({
                      key: 'session_key',
                      data: msg.data.session_key,
                      success: function (ms) { },
                    })
                  }
                })
              } else { }
              //获取所有用
            }
          });
          return false;
        }
        if (!ms.data) {
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
                    // that.globalData.aaa = msg.data.id;
                    wx.setStorage({
                      key: 'id',
                      data: msg.data.id,
                      success: function (ms) { },
                    })
                    wx.setStorage({
                      key: 'session_key',
                      data: msg.data.session_key,
                      success: function (ms) { },
                    })
                    wx.request({
                      data: {
                        iv: e.detail.iv,
                        encryptedData: e.detail.encryptedData,
                        session_key: msg.data.session_key,
                        appid: wx.getAccountInfoSync().miniProgram.appId
                      },
                      url: app.globalData.URL + '/api/demo2.php',
                      method: 'POST',
                      header: {
                        "Content-Type": "application/x-www-form-urlencoded" // 默认值
                      },
                      success: function (res) {
                        console.log(res)
                        wx.getStorage({
                          key: "id",
                          success: function (ms) {
                            wx.request({
                              data: {
                                id: ms.data,
                                phone: res.data.phoneNumber,
                              },
                              url: app.globalData.URL + '/er/linzhu/phone',
                              method: 'POST',
                              header: {
                                "Content-Type": "application/x-www-form-urlencoded" // 默认值
                              },
                              success: function (res) {
                                console.log(res,'123123')
                                if (res.data.state == 1) {
                                  that.setData({
                                    phone: res.data.phone,
                                    is_count: res.data.count
                                  })
                                  wx.setStorage({
                                    key: 'phone',
                                    data: res.data.phone,
                                    success: function (ms) { },
                                  })

                                  var pages = getCurrentPages(); //当前页面
                                  var beforePage = pages[pages.length - 2]; //前一页
                                  // beforePage.data.pid = that.data.pid
                                  beforePage.data.count = 1
                                  console.log(beforePage.data.pid)
                                  beforePage.data.is_sq = 1
                                  wx.navigateBack({
                                    success: function () {
                                      beforePage.onLoad(); // 执行前一个页面的onLoad方法
                                    }
                                  });





                                }
                              }
                            })
                          }
                        })
                      }
                    });
                  }
                })
              } else { }
              //获取所有用
            }
          });
          return;
        }
        console.log(ms.data)
        console.log(e.detail.iv)
        console.log(e.detail.encryptedData)
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
            console.log(res)
            wx.getStorage({
              key: "id",
              success: function (ms) {
                wx.request({
                  data: {
                    id: ms.data,
                    phone: res.data.phoneNumber,
                  },
                  url: app.globalData.URL + '/er/linzhu/phone',
                  method: 'POST',
                  header: {
                    "Content-Type": "application/x-www-form-urlencoded" // 默认值
                  },
                  success: function (res) {
                    console.log(res)
                    if (res.data.state == 1) {
                      that.setData({
                        phone: res.data.phone,
                        is_count: res.data.count
                      })
                      wx.setStorage({
                        key: 'phone',
                        data: res.data.phone,
                        success: function (ms) { },
                      })

                      var pages = getCurrentPages(); //当前页面
                      var beforePage = pages[pages.length - 2]; //前一页
                      // beforePage.data.pid = that.data.pid
                      beforePage.data.count = 1
                      console.log(beforePage.data.pid)

                      wx.navigateBack({
                        success: function () {
                          beforePage.onLoad(); // 执行前一个页面的onLoad方法
                        }
                      });





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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    var that = this;
    
let url = app.globalData.URL + '/er/index/category';
    let data = {
      appid: wx.getAccountInfoSync().miniProgram.appId
    };
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      that.setData({
        category: res.category_list,
        info_banner: res.info_banner
      })
      wx.setStorage({
        key: 'category',
        data: res.category_list,
        success: function (ms) {},
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
  onShareAppMessage: function () {

  }
})