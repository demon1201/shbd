// pages/hotelDetail/hotelDetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time_content:'',
    food_content:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //获取酒店信息
    let url = app.globalData.URL + '/er/shbd/get_hotel_detail';
        let data = {
          id: options.id
        };
        app.wxRequest('POST', url, data, (res) => {
            that.setData({
              time_content:res.hotel.time_content,
              food_content:res.hotel.food_content,
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