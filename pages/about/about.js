// pages/about/about.js
const my_title = require('../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    about:'',
    content:'',
    url: app.globalData.URL
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
   
    // if (options.title){
    //   my_title.title(options.title)

    // }
        wx: wx.request({
          url: app.globalData.URL+'/er/index/about',
          data: {
            appid: wx.getAccountInfoSync().miniProgram.appId,
            id:options.id
          },
          method: 'POST',
          header: {
            "Content-Type": "application/x-www-form-urlencoded" // 默认值
          },
          success: function (res) {
            console.log(res)
            var _str = res.data.about.category_content.replace(/<img /g, '<img class="rich_img" ');
            my_title.title(res.data.about.category_title)
            that.setData({
              about: res.data.about,
              content: _str,
              
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
    var that = this;
    return {
      title: that.data.about.category_title,
     
    }
  }
})