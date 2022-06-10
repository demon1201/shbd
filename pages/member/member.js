// pages/member/member.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: app.globalData.URL,
    navHeight: app.globalData.navHeight,
    navTop: app.globalData.navTop,
    types: [],
    acts: [
      {
        id: 0,
        img: '/pages/images/6.png',
        title: '51城市逃离计划 | 来山海半岛放肆high玩',
        time: '1.5小时',
        tags:['户外活动']
      },
      {
        id: 1,
        img: '/pages/images/6.png',
        title: '“五一小长假”这些人在半岛玩high了',
        time: '1.5小时',
        tags:['户外活动']
      }

    ]
  },
  toActivity(e){
    const idx = e.target.dataset.idx;
    let data = this.data.types[idx]
    wx.navigateTo({
      url: '/pages/memberActivity/memberActivity?data='+ JSON.stringify(data)
    })
  },
  //活动详情页 
  toActivityDetail(e){
    wx.navigateTo({
      url: '/pages/activityDetail/activityDetail?id=' + e.target.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  //获取酒店信息
  let url = app.globalData.URL + '/er/shbd/get_activity';
  let data = {
    appid: wx.getAccountInfoSync().miniProgram.appId
  };
  app.wxRequest('POST', url, data, (res) => {

      this.setData({
        types:res.cate_lists,
        acts:res.lists
      })

  }, (err) => {
    console.log(err.errMsg)
  })
  var that = this;
  that.get_id();
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
  // onShareAppMessage: function () {

  // }
})