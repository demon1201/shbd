// pages/catering/catering.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: app.globalData.URL,
    topImg: '/pages/images/6.png',
    items: []
  },
  toCatering(e){
    console.log(e)
    // return 
    const id = e.currentTarget.dataset.id
    const title = e.currentTarget.dataset.title
    // let site = this.data.items[idx]
    // site = JSON.stringify(site)
    if(id==2){
      wx.navigateTo({
        url: '/pages/classifyDetail/classifyDetail?id=11&title='+title,
      })
    }else{
      wx.navigateTo({
        url: '/pages/hotel/hotel?id=' + id+'&title='+title,
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this
   
    // 
  

    // 获取分类中各地点数据
 
    let url = app.globalData.URL + '/er/shbd/get_hotel_lists';
        let data1 = {
          id:options.id,
          
        };
        app.wxRequest('POST', url, data1, (res) => {

          if(res.code==1){
            wx.setNavigationBarTitle({
              title: res.banner.name
            })
            console.log(res.lists, '1111111111111111111111111111')
            this.setData({
              lists:res.lists,
              banner:res.banner
            })

          }
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