// pages/club/club.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        inputShowed: false,
        inputVal: "",
        myc:[
            {
                id: 1,
                title: '青年社团',
                img: '/pages/images/club/c2.png' 
            },
            {
                id: 2,
                title: '音乐社团',
                img: '/pages/images/club/c2.png' 
            },
            {
                id: 3,
                title: '商会社团',
                img: '/pages/images/club/c2.png' 
            },
            {
                id: 4,
                title: '健身社团',
                img: '/pages/images/club/c2.png' 
            },
            {
                id: 5,
                title: '健身社团',
                img: '/pages/images/club/c2.png' 
            },
            {
                id: 6,
                title: '健身社团',
                img: '/pages/images/club/c2.png' 
            },
            {
                id: 7,
                title: '健身社团',
                img: '/pages/images/club/c2.png' 
            },
        ],
        newc:[
            {
                id: 1,
                title: '青年社团',
                img: '/pages/images/club/c2.png' 
            },
            {
                id: 2,
                title: '音乐社团',
                img: '/pages/images/club/c2.png' 
            },
            {
                id: 3,
                title: '商会社团',
                img: '/pages/images/club/c2.png' 
            },
            {
                id: 4,
                title: '健身社团',
                img: '/pages/images/club/c2.png' 
            },
            {
                id: 5,
                title: '娱乐社团',
                img: '/pages/images/club/c2.png' 
            },
            {
                id: 6,
                title: '娱乐社团',
                img: '/pages/images/club/c2.png' 
            },
            {
                id: 7,
                title: '娱乐社团',
                img: '/pages/images/club/c2.png' 
            },
            {
                id: 8,
                title: '娱乐社团',
                img: '/pages/images/club/c2.png' 
            },
            {
                id: 9,
                title: '娱乐社团',
                img: '/pages/images/club/c2.png' 
            },
            {
                id: 10,
                title: '娱乐社团',
                img: '/pages/images/club/c2.png' 
            },
            {
                id: 11,
                title: '娱乐社团',
                img: '/pages/images/club/c2.png' 
            },
        ],
        news: [
            {
                id: 1,
                timg: '/pages/images/club/c2.png',
                c_name: '青年社团',
                date: '2021/07/20',
                time: '18:00:00',
                img: '/pages/images/club/c5.png',
                title: '山海半岛环岛马拉松',
                title1: '运动休闲季，欢乐马拉松，梦幻彩虹跑等你来！',
                acti_time: '2021年7月20日至2021年8月20日'
            },
            {
                id: 2,
                timg: '/pages/images/club/c2.png',
                c_name: '娱乐社团',
                date: '2021/07/20',
                time: '18:00:00',
                img: '/pages/images/club/c5.png',
                title: '山海半岛东区美食节，倒计时4天！',
                title1: '运动休闲季，欢乐马拉松，梦幻彩虹跑等你来！',
                acti_time: '2021年7月20日至2021年8月20日'
            },
            {
                id: 3,
                timg: '/pages/images/club/c2.png',
                c_name: '青年社团',
                date: '2021/07/20',
                time: '18:00:00',
                img: '/pages/images/club/c5.png',
                title: '山海半岛东区美食节，倒计时4天！',
                title1: '运动休闲季，欢乐马拉松，梦幻彩虹跑等你来！',
                acti_time: '2021年7月20日至2021年8月20日'
            },
        ],
        m1: false,
        m2: false,

    },
    // 到我的社团
    toMyc(e){
        const idx = e.currentTarget.dataset.idx
        wx.navigateTo({
          url: `/pages/missOrgan/missOrgan?id=${this.data.myc[idx].id}`,
        })
    },
    // 到新的社团
    toNewc(e){
        const idx = e.currentTarget.dataset.idx
        wx.navigateTo({
          url: `/pages/newClub/newClub?id=${this.data.myc[idx].id}`,
        })
    },
    search1: function (value) {
        const that = this
        return new Promise((resolve, reject) => {
            // setTimeout(() => {
            //     // resolve([{text: '搜索结果', value: 1}, {text: '搜索结果2', value: 2}])
            // }, 200)
            console.log(that.more1)
            

        })
    },
    search2: function (value) {
        return new Promise((resolve, reject) => {
            // setTimeout(() => {
            //     // resolve([{text: '搜索结果', value: 1}, {text: '搜索结果2', value: 2}])
            // }, 200)
            console.log(value)

        })
    },
    search3: function (value) {
        return new Promise((resolve, reject) => {
            // setTimeout(() => {
            //     // resolve([{text: '搜索结果', value: 1}, {text: '搜索结果2', value: 2}])
            // }, 200)
            console.log(value)

        })
    },
    selectResult: function (e) {
        console.log('select result', e.detail)
    },
    more1(){
        this.setData({
            m1: !this.data.m1
        })
    },
    more2(){
        wx.request({
          url: 'url',
          success: (result) => {

          },
          fail: (res) => {},
          complete: (res) => {},
        })
    },
    more3() {
        wx.request({
            url: 'url',
            success: (result) => {

            },
            fail: (res) => {},
            complete: (res) => {},
          })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            search1: this.search1.bind(this),
            search2: this.search2.bind(this),
            search3: this.search3.bind(this)
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