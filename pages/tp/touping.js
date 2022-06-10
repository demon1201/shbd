// pages/pages/touping.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        background: [
            'https://pt.zerom.cn/uploads/shbd/tp/1.jpg?v=2',
            'https://pt.zerom.cn/uploads/shbd/tp/2.jpg?v=2',
            'https://pt.zerom.cn/uploads/shbd/tp/3.jpg?v=2',
            'https://pt.zerom.cn/uploads/shbd/tp/4.jpg?v=2',
            'https://pt.zerom.cn/uploads/shbd/tp/5.jpg?v=2',
            'https://pt.zerom.cn/uploads/shbd/tp/6.jpg?v=2',
            'https://pt.zerom.cn/uploads/shbd/tp/7.jpg?v=2',
            'https://pt.zerom.cn/uploads/shbd/tp/8.jpg?v=2',
            'https://pt.zerom.cn/uploads/shbd/tp/9.jpg?v=2',
            'https://pt.zerom.cn/uploads/shbd/tp/10.jpg?v=2',
           ],
        indicatorDots: false,
        vertical: true,
        autoplay: false,
        interval: 2000,
        duration: 500,
        scurrent: 0,
        list: [
            {
                show: true,
                img: 'https://pt.zerom.cn/uploads/shbd/tp/list/1.png',
                title: '星河山海半岛'
            },
            {
                show: false,
                img: 'https://pt.zerom.cn/uploads/shbd/tp/list/2.png',
                title: '山海运动'
            },
            {
                show: false,
                img: 'https://pt.zerom.cn/uploads/shbd/tp/list/3.png',
                title: '游山玩水'
            },
            {
                show: false,
                img: 'https://pt.zerom.cn/uploads/shbd/tp/list/4.png',
                title: '精神建筑'
            },
            {
                show: false,
                img: 'https://pt.zerom.cn/uploads/shbd/tp/list/5.png',
                title: '自然课堂'
            },
            {
                show: false,
                img: 'https://pt.zerom.cn/uploads/shbd/tp/list/6.png',
                title: '缤纷商业'
            },
            {
                show: false,
                img: 'https://pt.zerom.cn/uploads/shbd/tp/list/7.png',
                title: '归乡田园'
            },
            {
                show: false,
                img: 'https://pt.zerom.cn/uploads/shbd/tp/list/8.png',
                title: '整体规划'
            },

        ],
        imgUrls: [
           
        ],
        imgs: [
            'https://pt.zerom.cn/uploads/shbd/tp/1.jpg',
            'https://pt.zerom.cn/uploads/shbd/tp/2.jpg',
            'https://pt.zerom.cn/uploads/shbd/tp/3.jpg',
            'https://pt.zerom.cn/uploads/shbd/tp/4.jpg',
            'https://pt.zerom.cn/uploads/shbd/tp/5.jpg',
            'https://pt.zerom.cn/uploads/shbd/tp/6.jpg',
            'https://pt.zerom.cn/uploads/shbd/tp/7.jpg',
            'https://pt.zerom.cn/uploads/shbd/tp/8.jpg',
            'https://pt.zerom.cn/uploads/shbd/tp/9.jpg',
            'https://pt.zerom.cn/uploads/shbd/tp/10.jpg',
            'https://pt.zerom.cn/uploads/shbd/tp/yd/01.jpg',
            'https://pt.zerom.cn/uploads/shbd/tp/yd/02.jpg',
            'https://pt.zerom.cn/uploads/shbd/tp/yd/03.jpg',
            'https://pt.zerom.cn/uploads/shbd/tp/yd/04.jpg',
            'https://pt.zerom.cn/uploads/shbd/tp/yd/05.jpg',
            'https://pt.zerom.cn/uploads/shbd/tp/yd/06.jpg',
            'https://pt.zerom.cn/uploads/shbd/tp/ls/01.jpg',
            'https://pt.zerom.cn/uploads/shbd/tp/ls/02.jpg',
            'https://pt.zerom.cn/uploads/shbd/tp/ls/03.jpg',
            'https://pt.zerom.cn/uploads/shbd/tp/ls/04.jpg',
            'https://pt.zerom.cn/uploads/shbd/tp/jz/01.jpg',
            'https://pt.zerom.cn/uploads/shbd/tp/jz/02.jpg',
            'https://pt.zerom.cn/uploads/shbd/tp/jz/03.jpg',
            'https://pt.zerom.cn/uploads/shbd/tp/jz/04.jpg',
            'https://pt.zerom.cn/uploads/shbd/tp/kt/01.jpg',
            'https://pt.zerom.cn/uploads/shbd/tp/kt/02.jpg',
            'https://pt.zerom.cn/uploads/shbd/tp/kt/03.jpg',
            'https://pt.zerom.cn/uploads/shbd/tp/kt/04.jpg',
            'https://pt.zerom.cn/uploads/shbd/tp/kt/05.jpg',
            'https://pt.zerom.cn/uploads/shbd/tp/sy/01.jpg',
            'https://pt.zerom.cn/uploads/shbd/tp/sy/02.jpg',
            'https://pt.zerom.cn/uploads/shbd/tp/sy/03.jpg',
            'https://pt.zerom.cn/uploads/shbd/tp/sy/04.jpg',
            'https://pt.zerom.cn/uploads/shbd/tp/ty/01.jpg',
            'https://pt.zerom.cn/uploads/shbd/tp/ty/02.jpg',
            'https://pt.zerom.cn/uploads/shbd/tp/ty/03.jpg',
        ],
        show: false,
        current: 1,
        yd: [
            'https://pt.zerom.cn/uploads/shbd/tp/yd/01.jpg',
            'https://pt.zerom.cn/uploads/shbd/tp/yd/02.jpg',
            'https://pt.zerom.cn/uploads/shbd/tp/yd/03.jpg',
            'https://pt.zerom.cn/uploads/shbd/tp/yd/04.jpg',
            'https://pt.zerom.cn/uploads/shbd/tp/yd/05.jpg',
            'https://pt.zerom.cn/uploads/shbd/tp/yd/06.jpg',
        ],
        ls: [
            'https://pt.zerom.cn/uploads/shbd/tp/ls/01.jpg',
            'https://pt.zerom.cn/uploads/shbd/tp/ls/02.jpg',
            'https://pt.zerom.cn/uploads/shbd/tp/ls/03.jpg',
            'https://pt.zerom.cn/uploads/shbd/tp/ls/04.jpg',
        ],
        jz: [
            'https://pt.zerom.cn/uploads/shbd/tp/jz/01.jpg',
            'https://pt.zerom.cn/uploads/shbd/tp/jz/02.jpg',
            'https://pt.zerom.cn/uploads/shbd/tp/jz/03.jpg',
            'https://pt.zerom.cn/uploads/shbd/tp/jz/04.jpg',
        ],
        kt: [
            'https://pt.zerom.cn/uploads/shbd/tp/kt/01.jpg',
            'https://pt.zerom.cn/uploads/shbd/tp/kt/02.jpg',
            'https://pt.zerom.cn/uploads/shbd/tp/kt/03.jpg',
            'https://pt.zerom.cn/uploads/shbd/tp/kt/04.jpg',
            'https://pt.zerom.cn/uploads/shbd/tp/kt/05.jpg',
        ],
        xh: [
            'https://pt.zerom.cn/uploads/shbd/tp/xh/01.jpg',
            'https://pt.zerom.cn/uploads/shbd/tp/xh/02.jpg',
            'https://pt.zerom.cn/uploads/shbd/tp/xh/03.jpg',
            'https://pt.zerom.cn/uploads/shbd/tp/xh/04.jpg',
            'https://pt.zerom.cn/uploads/shbd/tp/xh/05.jpg',
        ],
        sy: [
            'https://pt.zerom.cn/uploads/shbd/tp/sy/01.jpg',
            'https://pt.zerom.cn/uploads/shbd/tp/sy/02.jpg',
            'https://pt.zerom.cn/uploads/shbd/tp/sy/03.jpg',
            'https://pt.zerom.cn/uploads/shbd/tp/sy/04.jpg',
        ],
        ty: [
            'https://pt.zerom.cn/uploads/shbd/tp/ty/01.jpg',
            'https://pt.zerom.cn/uploads/shbd/tp/ty/02.jpg',
            'https://pt.zerom.cn/uploads/shbd/tp/ty/03.jpg',
        ],
    },

    // 页面切换
    change(e) {
        console.log('current index has changed', e.detail)
        const list = this.data.list
        const current = Number(e.detail.current)-2
        for (const item of list) {
            item.show = false
        }
        if(current>= 0){
            list[current].show = true
        }
        this.setData({
            list: list,
            scurrent: e.detail.current
        })
    },
    
    // 点击右侧切换
    change1(e) {
        const idx = e.currentTarget.dataset.idx
        const list = this.data.list
        for (const item of list) {
            item.show = false
        }
        list[idx].show = true
        this.setData({
            list: list,
            scurrent: Number(idx)+2
        })
    },
    // 相册切换
    change2(e) {
        console.log('current index has changed', e.detail)
        this.setData({
            current: e.detail.current
        })
    },
    
    showImg(e){
        const idx = e.currentTarget.dataset.idx
        const type = e.currentTarget.dataset.type
        if(type == 'yd'){
            this.setData({
                imgUrls: this.data.yd,
                current: idx,
                show: true
            })
        }else if(type == 'ls'){
            this.setData({
                imgUrls: this.data.ls,
                current: idx,
                show: true
            })
        }else if(type == 'jz'){
            this.setData({
                imgUrls: this.data.jz,
                current: idx,
                show: true
            })
        }else if(type == 'kt'){
            this.setData({
                imgUrls: this.data.kt,
                current: idx,
                show: true
            })
        }else if(type == 'xh'){
            this.setData({
                imgUrls: this.data.xh,
                current: idx,
                show: true
            })
        }else if(type == 'sy'){
            this.setData({
                imgUrls: this.data.sy,
                current: idx,
                show: true
            })
        }else if(type == 'ty'){
            this.setData({
                imgUrls: this.data.ty,
                current: idx,
                show: true
            })
        }
    },
    hide() {
        console.log('component hide')
        // setTimeout(() => {
        //     console.log('component show')
            this.setData({
                show: false
            })
        // }, 1000)
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const _this = this
        wx.getImageInfo({
            src: 'https://pt.zerom.cn/uploads/shbd/tp/5.jpg',
            success (res) {
                console.log(res)
            },
            fail(res){
                console.log(res)
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

    }
})