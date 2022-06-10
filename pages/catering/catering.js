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
        title: '业主食堂',
        price: '80',
        star: 5,
        type: '西餐 /牛排 /海鲜',
        tags:['食材采用当日新鲜进口']
      },
      {
        id: 1,
        img: '/pages/images/6.png',
        title: '木屋烧烤',
        price: '120',
        star: 4,
        type: '西餐 /牛排 /海鲜',
        tags:['融合烤肉，独特口味','DIY烘焙']
      },
      {
        id: 2,
        img: '/pages/images/6.png',
        title: '食野山房',
        price: '70',
        star: 4,
        type: '西餐 /牛排 /海鲜',
        tags:['融合烤肉，独特口味','旋转烤肉']
      },
      {
        id: 3,
        img: '/pages/images/6.png',
        title: '山海会客厅',
        price: '70',
        star: 4,
        type: '西餐 /牛排 /海鲜',
        tags:['进口牛奶，每日新鲜','DIY烘焙']
      },
      {
        id: 4,
        img: '/pages/images/6.png',
        title: '山海烧烤',
        price: '120',
        star: 4,
        type: '西餐 /牛排 /海鲜',
        tags:['融合烤肉，独特口味']
      },
    ]
  },
  toCatering(e){
    const idx = e.target.dataset.idx
    let data = this.data.cats[idx]
    data = JSON.stringify(data)
    wx.navigateTo({
      url: '/pages/cateringDetail/cateringDetail?cat=' + data,
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