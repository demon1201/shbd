// pages/catering/catering.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cats: [
      {
        id: 0,
        img: '/pages/images/6.png',
        title: '反斗乐园',
        price: '80',
        star: 5,
        type: '儿童乐园',
        tags:['安全系数高，专人看护']
      },
      {
        id: 1,
        img: '/pages/images/6.png',
        title: '萌宠森林屋',
        price: '120',
        star: 4,
        type: '儿童乐园',
        tags:['安全系数高，专人看护']
      },
      {
        id: 2,
        img: '/pages/images/6.png',
        title: '梦幻乐园',
        price: '70',
        star: 4,
        type: '儿童乐园',
        tags:['安全系数高，专人看护']
      },
      {
        id: 3,
        img: '/pages/images/6.png',
        title: '趣味乐园',
        price: '70',
        star: 4,
        type: '儿童乐园',
        tags:['安全系数高，专人看护']
      },
     
    ]
  },
  toCatering(e){
    const idx = e.target.dataset.idx
    let data = this.data.cats[idx]
    data = JSON.stringify(data)
    wx.navigateTo({
      url: '/pages/childrenPlaceDetail/childrenPlaceDetail?place=' + data,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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