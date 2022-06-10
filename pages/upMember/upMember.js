// pages/upMember/upMember.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        vip: 4,///1普通会员2山海会员3业主/4星钻会员
        ok: false,
        zc: false,
        xy: false,
        ty: 10,
        tk: false,
        pay:'pay',
        name: '',
        tel: '',
        idCard: '',
        app_url: app.globalData.URL,
        to: false,
        xy1: false,
        agree: false,
        int1: ''

    },
    // 同意协议
    tyxy(){
      this.setData({
        agree: true,
        xy1: false
      })
    },
    // 协议
    agreeXy(){
      this.setData({
        xy1 : true
      })
      const that = this
      // 倒计时
      const int1 = setInterval(function() {
          that.data.ty--;
          that.setData({
              ty: that.data.ty
          })
          if(that.data.ty == 0){
              clearInterval(int1)
              that.setData({
                  ok: true,
              })
              
          }   
      },1000)

      this.setData({
        int1: int1
      })
      
    },
    // 退还
    tuihuan(){
        // 退还星钻金
        this.setData({
          tk: true,
        })
        console.log('退还')
     
    },
     // 确认按钮


  tapDialogButton(e) {
    const _this = this
    // _this.setData({
    //   vip:1,
    // })
    // return 
    //发起退款
    wx.getStorage({
    key: "id",
    success: function (user) {

    let url = app.globalData.URL + '/er/refund/vip_refund';
    let data = {
    appid: wx.getAccountInfoSync().miniProgram.appId,
    id:_this.data.id,
    table:'hotel_user_reserve',
    uid:user.data
    };
    app.wxRequest('POST', url, data, (res) => {

    if(res.code==1){
      _this.setData({
        vip:1,
        tk: false,
      })
      wx.showToast({
        title: res.msg,
        icon: 'success',
        duration: 2000
      })
      
      // wx.redirectTo({
      //   url: '/page/index/index',
      // })

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

    _this.setData({
    dialogShow: false,
    showOneButtonDialog: false,
    pay: false
    })
    }
    })
 
  },



    qx1(){
      this.setData({
        tk: false,
      })
    },
    // 升级
    shengji(){
        this.setData({
            // zc: true
            to: true
        })
    },

    colose(){
      this.setData({
        // zc: true
        to: false
    })
    },

    // 升级会员
    up_box(){
        if(this.data.name == ''){
            wx.showToast({
              title: '请输入姓名',
              icon:'error',
              duration: 500
            })
            return
        }
        if(this.data.tel == ''){
            wx.showToast({
              title: '请输入手机号码',
              icon:'error',
              duration: 500
            })
            return
        }
        if (!(/^((13[0-9])|(14[0-9])|(15[0-9])|(16[0-9])|(17[0-9])|(18[0-9])|(19[0-9]))\d{8}$/.test(this.data.tel))){
            wx.showToast({
              title: '号码格式错误',
              icon:'error',
              duration: 500
            })
            return
        }
        if(this.data.idCard == ''){
            wx.showToast({
                title: '请输入证件号',
                icon:'error',
                duration: 500
              })
              return
        }
        if(this.data.idCard.length != 18){
            wx.showToast({
                title: '证件号格式错误',
                icon:'error',
                duration: 500
              })
              return
        }
        if(this.data.agree){
          this.pay()
        }else {
          wx.showToast({
            title: '请阅读协议书',
            icon: 'error',
            duration: 1000
          })
        }
       
    },
     // 取消
     qx(){
         console.log('取消按钮')
         clearInterval(this.data.int1)
        this.setData({
            xy1: false,
            ok: false,
            ty: 10,
            pay:'pay'
        })
    },
    // 同意升级会员
    
    pay(){
        console.log(1111111111111111)
        var that = this;
        that.setData({
            pay:'no',
          })
        //   return false
        wx.getStorage({
            key: "id",
            success: function (user) {
            let url1 = app.globalData.URL + '/er/pay/vippay';
            let data1 = {
                name: that.data.name,
                phone: that.data.tel,
                sfz: that.data.idCard,
                uid:user.data,
                appid: wx.getAccountInfoSync().miniProgram.appId,
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
                      that.setData({
                          vip:4,
                          zc:false,
                          xy: false,
                          to:false,
                        })
                      // wx.redirectTo({
                      //   url: '/page/index/index',
                      // })
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
            }
          })

        console.log('同意')
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const vip = options.vip
        this.setData({
            vip:vip,
            nickname: options.nickname,
            headimgurl: options.headimgurl,
            
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