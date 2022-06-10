// pages/yhj/yhj.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
      url: app.globalData.URL,
        coupon:[
           
          ],
    },

    check(e){
        const idx = e.currentTarget.dataset.idx;
        console.log(idx);
        const coupon = this.data.coupon
        for (const cou of coupon) {
            cou.check = false
        }
        coupon[idx].check = true
        this.setData({
            coupon
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      var that = this;
      wx.getStorage({
        key: "id",
        success: function (user) {

            let url = app.globalData.URL + '/er/shbd/get_myyhj';
            let data = {
              user_id:user.data,
            };
            app.wxRequest('POST', url, data, (res) => {
                that.setData({
                  coupon:res.lists,
                })

            }, (err) => {
              console.log(err.errMsg)
            })
            
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