// pages/yhj/yhj.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
      url: app.globalData.URL,
        coupon:[
            {
              id: 1,
              type: 1,
              title1: '打折券',
              title: '7折',
              dis: 0.7,
              img: '/pages/images/mine/y1.png',
              img2: '/pages/images/mine/y11.png',
              check: true,
              num: 5,
            },
            {
              id: 2,
              type: 1,
              title1: '打折券',
              title: '8折',
              dis: 0.8,
              img: '/pages/images/mine/y2.png',
              img2: '/pages/images/mine/y22.png',
              check: false,
              num: 5
            }
          ],
          cou: {}
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
            coupon,
            cou: coupon[idx],
            id:e.currentTarget.dataset.id
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.get_lists();
    },
    get_lists(){
      var that = this;
      wx.getStorage({
        key: "id",
        success: function (user) {
        let url = app.globalData.URL + '/er/shbd/get_myyhjqx';
        let data = {
          appid: wx.getAccountInfoSync().miniProgram.appId,
          user_id:user.data,
        };
        app.wxRequest('POST', url, data, (res) => {
  
            that.setData({
              coupon:res.lists,
              id:res.lists[0]['id'],
            })
  
        }, (err) => {
          console.log(err.errMsg)
        })
        that.setData({
          user_id:user.data
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

      //生成订单
      // const data = {
      //   coupon: this.data.cou,
      //   user: '网投白',
      //   userimg: '/pages/images/mine/22.png',
      //   id:this.data.id
      // }
      // var data1 = JSON.stringify(data);
      // console.log('/pages/negotiation/negotiation?data1='+data1)
      console.log('/pages/shareCoupon/shareCoupon?id='+this.data.id+'&user_id='+this.data.user_id)
      return {
        title: '优惠券',
        path: '/pages/shareCoupon/shareCoupon?id='+this.data.id+'&user_id='+this.data.user_id,
       
      }
      // that.data.nickname+'--'+
    }
})