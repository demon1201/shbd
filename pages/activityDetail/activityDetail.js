// pages/activityDetail/activityDetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: app.globalData.URL,
    sorr: false,
    navHeight: app.globalData.navHeight,
    navTop: app.globalData.navTop,
    activity: {
      tags: ['户外活动'],
      title: '趣浪六一·FUN飞山海半岛',
      address: '山海半岛游乐场',
      num: 50,
      price: 50,
      date: '2021年06月01日 周二 9：00~18：00',
      year : 2021,
      month: 6,
      day: 6,
      
      con: '“六一”怎么过？还是给孩子买礼物、吃大餐、游乐园这传统“老三样”吗？来山海半岛就对了，他们设计了N种打开“六一”的方式，每一种都是孩子们的最爱，让“六一”这天变得与众不同，一起去看看吧！',
      condition: [
                      '1凭活动码现场换取纸质门悪(演出前3小时显示活动二维码),票 价区域内凭门票座位号对号入座,提前小时现场取票,先到先得;',
                      '2.欢迎所有感兴趣的朋友参加加;',
                      '3温提示:身高1米2及以下的儿章谢绝入内。'
                 ]
    }
  },
  toRegistration(e){
    wx.navigateTo({
      url: '/pages/registration/registration?pid=' + e.currentTarget.dataset.id+'&title='+e.currentTarget.dataset.title+'&money='+e.currentTarget.dataset.money+'&photo='+this.data.activity.photo,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this;
    const id = options.id;
    //
  

    wx.getStorage({
      key: "id",
      success: function (user) {
    let url = app.globalData.URL + '/er/shbd/get_activity_detail';
    let data = {
      id: id,
      user_id:user.data
    };
    app.wxRequest('POST', url, data, (res) => {
      if(res.code==1){

        var _str = res.activity.content.replace(/<img /g, '<img class="rich_img" ');

        _this.setData({
          activity:res.activity,
          content:_str
        })
        wx.setNavigationBarTitle({
          title: res.activity.title
        })
      }
    }, (err) => {
      console.log(err.errMsg)
    })
  }})
  },
  // 页面滑动
  onPageScroll(e){
    console.log(e.scrollTop)
    if(e.scrollTop > 180){
      this.setData({
        sorr : true
      })
    }else{
      this.setData({
        sorr: false
      })
    }
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