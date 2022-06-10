// pages/myClub/myClub.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        clubs: [
            {
                id: 1,
                name: '青年社团',
                img: '/pages/images/club/c2.png',
                num: 231,
                activities: 10,
                wx_ewm: '/pages/images/club/c4.png',
                intro: '一群年轻的人，一群年轻的人一群年轻的人一群年轻的人，一群年轻的人，一群年轻的人。'
            },
            {
                id: 2,
                name: '年老社团',
                img: '/pages/images/club/c2.png',
                num: 231,
                activities: 10,
                wx_ewm: '/pages/images/club/c6.png',
                intro: '一群年轻的人，一群年轻的人一群年轻的人一群年轻的人，一群年轻的人，一群年轻的人。'
            },
        ],
        wx: false,
        wx_ewm: '',
    },
    toClub(e){
        const idx = e.currentTarget.dataset.idx;
        const id = this.data.clubs[idx]
        wx.navigateTo({
          url: `/pages/missOrgan/missOrgan?id=${id}`,
        })

    },
    // 显示二维码
    sWx(e){
        const idx = e.cur
        this.setData({
            wx_ewm: this.data.clubs[e.currentTarget.dataset.idx].wx_ewm,
            wx: true
        })
    },
    // 隐藏二维码
    cWx(){
        this.setData({
            wx: false
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