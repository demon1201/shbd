// pages/writeOff/writeOff.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        url:app.globalData.URL,
        hexiao: false,
        hx: {}
    },
    // 扫码
    scanCo(){
        const that = this
        wx.scanCode({
            success (res) {     
                // 获取二维码内容
                // const result = Number(res.result)
                // console.log(res.path.split("%26")[0].split("%3D")[1])
                // return false
                // var pid = res.path.split("%26")[0].split("%3D")[1]
                var pid = res.path.split('&')[0].split('=')[1];
              console.log(pid)
                // 核销
                // that.setData({
                //     hexiao: true
                // })
                wx.getStorage({
                  key: "id",
                  success: function (user) {
                  let url = app.globalData.URL + '/er/shbd/shbd_hexiao';
                  let data = {
                    appid: wx.getAccountInfoSync().miniProgram.appId,
                    uid:user.data,
                    pid:pid
                  };
                  app.wxRequest('POST', url, data, (res) => {

                      
                      if(res.code!=1){
                            wx.showToast({
                                title: res.msg,
                                icon: 'loading',
                                duration: 1000
                              })
                        }else{
                            that.setData({
                                hexiao: true,
                                hx:res.shbd,
                                pid:res.shbd.id
                            })
                        }
            
                  }, (err) => {
                    console.log(err.errMsg)
                  })
                }
              })
            }
          })
    },

    // 取消
    cancel(){
        this.setData({
            hexiao: false
        })
    },
    // 确认
    affirm(){
        var that = this;
        // 核销
        wx.showToast({
          title: '正在处理中',
          icon: 'loading',
          duration: 1000
        })
        
        wx.getStorage({
            key: "id",
            success: function (user) {
            let url = app.globalData.URL + '/er/shbd/hexiao';
            let data = {
                appid: wx.getAccountInfoSync().miniProgram.appId,
              uid:user.data,
              pid:that.data.pid
            };
            app.wxRequest('POST', url, data, (res) => {
                if(res.code!=1){
                    wx.showToast({
                        title: res.msg,
                        icon: 'loading',
                        duration: 1000
                      })
                }else{
                    wx.showToast({
                        title: res.msg,
                        icon: 'success',
                        duration: 1000
                      })
                    that.setData({
                        hexiao: false,
                    })
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
        //测试
        // var that = this;
        // wx.getStorage({
        //     key: "id",
        //     success: function (user) {
        //     let url = app.globalData.URL + '/er/shbd/shbd_hexiao';
        //     let data = {
        //       appid: wx.getAccountInfoSync().miniProgram.appId,
        //       uid:user.data,
        //         pid:1
        //     };
        //     app.wxRequest('POST', url, data, (res) => {
        //         if(res.code!=1){
        //             wx.showToast({
        //                 title: res.msg,
        //                 icon: 'loading',
        //                 duration: 1000
        //               })
        //         }else{
        //             that.setData({
        //                 hexiao: true,
        //                 hx:res.shbd,
        //                 pid:1
        //             })
        //         }
      
        //     }, (err) => {
        //       console.log(err.errMsg)
        //     })
        //   }
        // })
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
    
})