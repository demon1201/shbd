// pages/missOrgan/missOrgan.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        pageName: '社团活动',
        navHeight: app.globalData.navHeight,
        navTop: app.globalData.navTop,
        news: [
            {
                id: 1,
                img: '/pages/images/club/c5.png',
                title: '山海半岛环岛马拉松',
                t1: '运动休闲季，欢乐马拉松，梦幻彩虹跑等你来！',
                ac_time: '2021年7月20日至2021年8月20日'
            },
            {
                id: 2,
                img: '/pages/images/club/c5.png',
                title: '山海半岛东区美食节，倒计时4天！',
                t1: '美食节正式开幕，大家一起领略山海美食。',
                ac_time: '2021年7月20日至2021年8月20日'
            },
            {
                id: 3,
                img: '/pages/images/club/c5.png',
                title: '山海半岛环岛马拉松',
                t1: '运动休闲季，欢乐马拉松，梦幻彩虹跑等你来！',
                ac_time: '2021年7月20日至2021年8月20日'
            },
        ],
        wx: false,
        club:{
            name: '青年社团',
            num: 231,
            wx_ewm: '/pages/images/club/c4.png',
            intro: '一群年轻的人，一群年轻的人一群年轻的人一群年轻的人，一群年轻的人，一群年轻的人。'
        }
    },
    sWx(){
        this.setData({
            wx: true
        })
    },
    cWx(){
        this.setData({
            wx: false
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const id = options.id
        console.log(id)
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