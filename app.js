//app.js
App({
  onLaunch: function (options) {
    let menuButtonObject = wx.getMenuButtonBoundingClientRect();
    wx.getSystemInfo({
      success: res => {
        let statusBarHeight = res.statusBarHeight,
          navTop = menuButtonObject.top,//胶囊按钮与顶部的距离
          navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight)*2;//导航高度
        this.globalData.navHeight = navHeight;
        this.globalData.navTop = navTop;
        this.globalData.windowHeight = res.windowHeight;
      },
      fail(err) {
        console.log(err);
      }
    })
    var that = this;
    if (options.query.fx_id) {
      wx.setStorage({
        key: 'fx_id',
        data: options.query.fx_id,
        success(msg) {
          console.log(11)
        }
      })
    }
    wx.request({
      url: 'https://pt.zerom.cn/er/index/a',
      data: {
        appid: wx.getAccountInfoSync().miniProgram.appId,
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded" // 默认值
      },
      success: function (msg) {
        if (msg.data.state == 1) {
          wx.setStorage({
            key: 'color',
            data: msg.data.color,
            fail(msg) {
              that.color();
            }
          })
        } else {
          wx.setStorage({
            key: 'color',
            data: "#000",
            success(msg) { }
          })
        }
      },
      fail(msg) {
        console.log(msg)
      }
    })


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
                  try {
                    wx.setStorageSync('id', msg.data.id,)
                  } catch (e) {
                    console.log(e)
                   }
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
                  wx.setStorageSync('id',msg.data.id)
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
    })



  },

  onShow: function (options) {
    //获取主题颜色
    // 登录
    // 查看是否授权
    // const worker = wx.createWorker('/worker/myworker.js');
    // worker.postMessage({
    //   "data":"你好"
    // });

    // worker.onMessage(function(res){
    //   console.log(res)
    // });

    var that = this;
 
    that.color();
    console.log(1111111)
    setTimeout(function () {
      wx.getStorage({
        key: "id",
        success: function (id) {
          wx.request({
            url: 'https://pt.zerom.cn/er/scenes/index',
            data: {
              scene: options.scene,
              appid: wx.getAccountInfoSync().miniProgram.appId,
              my_id: id.data
            },
            method: 'POST',
            header: {
              "Content-Type": "application/x-www-form-urlencoded" // 默认值
            },
            success: function (msg) {

            },
          })
        }
      })

      if (options.query.fx_id) {
        console.log("分享进入")
        wx.getStorage({
          key: "id",
          success: function (userid2) {
            wx.request({
              url: 'https://pt.zerom.cn/er/jxzs/user_add',
              data: {
                appid: wx.getAccountInfoSync().miniProgram.appId,
                uid: userid2.data,
                fxid: options.query.fx_id,
                type: 1
              },
              method: 'POST',
              header: {
                "Content-Type": "application/x-www-form-urlencoded" // 默认值
              },
              success: function (msg) {
                console.log(msg)
              },
              fail(msg) {
                console.log(msg)
              }
            })
          }
        })

      } else if (options.query.scene) {
        console.log("扫码进入")
        if (options.query.scene.split("%26")[0].split("%3D")[0] == "id") {
          //分享海报进入详情页
          wx.setStorage({
            key: 'detail_id',
            data: options.query.scene.split("%26")[0].split("%3D")[1],
            success: function (ms) { },
          })
          var fx_id = options.query.scene.split("%26")[1].split("%3D")[1]; //销售id
          wx.getStorage({
            key: "id",
            success: function (userid2) {
              wx.request({
                url: 'https://pt.zerom.cn/er/zx/jilu',
                data: {
                  appid: wx.getAccountInfoSync().miniProgram.appId,
                  uid: userid2.data,
                  fxid: fx_id,
                },
                method: 'POST',
                header: {
                  "Content-Type": "application/x-www-form-urlencoded" // 默认值
                },
                success: function (msg) {
                  console.log(msg)
                },
                fail(msg) {
                  console.log(msg)
                }
              })
            }
          })

        }
        if (options.query.scene.split("%26")[0].split("%3D")[0] == "u_id") {
          //扫描销售二维码加客户
          console.log("扫销售二维码进入")

          var fx_id = options.query.scene.split("%26")[0].split("%3D")[1]; //销售id
          wx.getStorage({
            key: "id",
            success: function (userid2) {
              wx.request({
                url: 'https://pt.zerom.cn/er/jxzs/user_add',
                data: {
                  appid: wx.getAccountInfoSync().miniProgram.appId,
                  uid: userid2.data,
                  fxid: fx_id,
                  type: 2
                },
                method: 'POST',
                header: {
                  "Content-Type": "application/x-www-form-urlencoded" // 默认值
                },
                success: function (msg) {
                  console.log(msg)
                },
                fail(msg) {
                  console.log(msg)
                }
              })
            }
          })
        }
        if (options.query.scene.split("%26")[1].split("%3D")[0] == "uid") {
          //扫描普通1用户二维码加客户

          var fx_id = options.query.scene.split("%26")[1].split("%3D")[1]; //销售id
          wx.getStorage({
            key: "id",
            success: function (userid2) {
              wx.request({
                url: 'https://pt.zerom.cn/er/jxzs/user_add',
                data: {
                  appid: wx.getAccountInfoSync().miniProgram.appId,
                  uid: userid2.data,
                  fxid: fx_id,
                  type: 2
                },
                method: 'POST',
                header: {
                  "Content-Type": "application/x-www-form-urlencoded" // 默认值
                },
                success: function (msg) {
                  console.log(msg)
                },
                fail(msg) {
                  console.log(msg)
                }
              })
            }
          })
        }
        if (options.query.scene.split("%26")[0].split("%3D")[0] == "hd") {
          //扫描区域二维码
          console.log("扫描区域二维码")

          var k = options.query.scene.split("%26")[0].split("%3D")[1]; //key
          wx.getStorage({
            key: "id",
            success: function (userid2) {
              wx.request({
                url: 'https://pt.zerom.cn/er/hd/index',
                data: {
                  appid: wx.getAccountInfoSync().miniProgram.appId,
                  uid: userid2.data,
                  k: k,
                  rk: options.query.scene.split("%26")[1].split("%3D")[1]
                },
                method: 'POST',
                header: {
                  "Content-Type": "application/x-www-form-urlencoded" // 默认值
                },
                success: function (msg) {
                  console.log(msg)
                },
                fail(msg) {
                  console.log(msg)
                }
              })
            }
          })
        }
        //经纪人进入
        if (options.query.scene.split("%26")[0].split("%3D")[0] == "jjr") {

        }

      } else {
        console.log("正常进入")
        wx.setStorage({
          key: 'detail_id',
          data: 1,
          success: function (ms) { },
        })
      }
    }, 2000);
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 获取系统状态栏信息
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
        this.new_id = '';
      }
    })
    console.log('CustomBar',this.globalData.CustomBar)
    if(this.globalData.CustomBar< 78){
        this.globalData.pagePaddingTop = '170rpx'
    }else{
      this.globalData.pagePaddingTop = '190rpx'
    }
  },
  globalData: {
    aaa: '',
    uid: ''
  },

  color: function (e) {
    wx.getSystemInfo({
      success: function (m) {
        wx.getStorage({
          key: "id",
          success: function (res) {
            console.log(res.data)
            wx.request({
              url: 'https://pt.zerom.cn/er/index/a',
              data: {
                appid: wx.getAccountInfoSync().miniProgram.appId,
                id: res.data,
                model: m.model,
                system: m.system,
              },
              method: 'POST',
              header: {
                "Content-Type": "application/x-www-form-urlencoded" // 默认值
              },
              success: function (msg) {
                if (msg.data.state == 1) {
                  wx.setStorage({
                    key: 'color',
                    data: msg.data.color,
                    fail(msg) {
                      that.color();
                    }
                  })
                } else {
                  wx.setStorage({
                    key: 'color',
                    data: "#000",
                    success(msg) { }
                  })
                }
              },
              fail(msg) {
                console.log(msg)
              }
            })

          }
        })
      }
    })


  },
  wifi() {
    var that = this;
    wx.getNetworkType({
      success(res) {
        if (res.networkType == 'none') {
          console.log("APP" + 2)
          that.globalData.wifi = 2;
        } else {
          console.log("APP" + 1)
          that.globalData.wifi = 1;
        }
        console.log(111111111);
        // console.log('网络类型:', res.networkType)
      }
    })
  },
  //设置全局域名
  globalData: {
    URL: 'https://pt.zerom.cn/',
    arr: [],
    las_arr: [],
    qi_arr: [],
    fx_rukou: [],
    cd_rukou: [],

    wz_rukou: [],
    xcx_rukou: [],
    ql_rukou: [],
    sys_rukou: [],
    is_gzh: 0,
    wifi: 0,
    myself:'本人'



  },

  wxRequest(method, url, data, callback, errFun) {
    wx.request({
      url: url,
      method: method,
      data: data,
      header: {
        'content-type': method == 'GET' ? 'application/json' : 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      dataType: 'json',
      success: function (res) {
        callback(res.data);
      },
      fail: function (err) {
        errFun(res);
      }
    })
  },

  //重新获取缓存
  session_id(method, url, data, callback, errFun) {
    wx.request({
      url: url,
      method: method,
      data: data,

      header: {
        'content-type': method == 'GET' ? 'application/json' : 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      dataType: 'json',
      success: function (res) {
        callback(res.data);
      },
      fail: function (err) {
        errFun(res);
      }
    })
  }
})