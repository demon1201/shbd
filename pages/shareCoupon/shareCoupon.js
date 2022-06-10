// pages/shareCoupon/shareCoupon.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        url: app.globalData.URL,
        // coupon:{
        //     id: 1,
        //     type: 1,
        //     title1: '打折券',
        //     title: '7折',
        //     sendname: '网投白',
        //     tximg: '/pages/images/mine/22.png',
        //     time: '2021/10/10',
        //     dis: 0.7,
        //     img: '/pages/images/mine/y11.png',
        //   },
    },

    getCoupon(){
        console.log('领取优惠券')
        var that = this;
        wx.getStorage({
            key: "id",
            success: function (user) {
                let url = app.globalData.URL + '/er/shbd/yhj_add';
                let data = {
                user_id:user.data,
                pid:that.data.pid,
                cate_id:that.data.cate_id,
                };
                app.wxRequest('POST', url, data, (res) => {
                    if(res.code==1){
                        wx.showToast({
                            title: res.msg,
                            icon: 'success',
                            duration: 2000
                        })
                        
                    }else{
                        wx.showToast({
                            title: res.msg,
                            icon: 'loading',
                            duration: 2000
                        })
                    }
                    setTimeout(function () {
                        wx.switchTab({
                          url: '/pages/index/index'
                        })
                      }, 2000)
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
        console.log(options)
        var that = this;
        let url = app.globalData.URL + '/er/shbd/get_yhj';
        let data = {
          user_id:options.user_id,
          id:options.id,
        };
        app.wxRequest('POST', url, data, (res) => {
            that.setData({
              coupon:res.yhj,
              cate_id:res.yhj.cate_id
            })
  
        }, (err) => {
          console.log(err.errMsg)
        })
        that.setData({
            pid:options.id
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