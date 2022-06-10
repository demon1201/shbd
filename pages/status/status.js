// pages/status/status.js
const app= getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        status: [
            {
                status: 1,
                sta: true
            },
            {
                status: 2,
                sta: true
            },
            {
                status: 3,
                sta: true
            },
        ],

        fs: [],
        url:app.globalData.URL,
        iShow: false,

        types: [
            {
                id: 0,
                title: '全部房型',
                no: 1
            },
            {
                id: 1,
                title: '大床房',
                no: 2
            },
            {
                id: 2,
                title: '双床房',
                no: 3
            },
            {
                id: 3,
                title: '一房一厅',
                no: 4
            },
            {
                id: 4,
                title: '两房一厅',
                no: 5
            },
        ],
        fangxing: '全部房型',
        date: '2016-09-01',
        start: '2016-09-01',
    },

    // 选择时间
    bindDateChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
          date: e.detail.value
        })
        //查询数据
        var that = this;
        let url = app.globalData.URL + '/er/shbd/get_hotel_status';
        let data = {
          appid: wx.getAccountInfoSync().miniProgram.appId,
          time : e.detail.value
        };
        app.wxRequest('POST', url, data, (res) => {
          if(res.code==1){
            that.setData({
                fs:res.fs,
            })

          }
        }, (err) => {
          console.log(err.errMsg)
        })
      },
    // 筛选
    shaixuan(e){
        const idx = e.currentTarget.dataset.idx
        const status = this.data.status
        status[idx].sta = !status[idx].sta
        this.setData({
            status
        })

        const fs = this.data.fs

        for (const f of fs) {
            for (const f1 of f.f) {
                if(f1.status == status[idx].status && f1.type == this.data.fangxing || f1.status == status[idx].status && this.data.fangxing == '全部房型'){
                    f1.isShow = !f1.isShow
                }
            }
        }
        console.log(fs[0].f)
        console.log(fs[1].f)
        this.setData({
            fs,
           
        })
        
        
    },
    // 选项
    show(){
        this.setData({
            iShow: !this.data.iShow
        })
    },

    xuanzhe(e){
        const id = e.currentTarget.dataset.id
        const title = e.currentTarget.dataset.title
        const fs = this.data.fs
        // 全部房型
        if(title == '全部房型'){
            for (const f of fs) {
                for (const f1 of f.f) {
                    f1.isShow = true

                }
            }
            console.log(fs[0].f)
        }else{
            // 分类
            for (const ff of fs) {
                for (const f1 of ff.f) {
                    f1.isShow = false
                    if(f1.type == title){
                        f1.isShow = true
                    }
                }
            }
           
        }
        
        const status = this.data.status

        for (const sta of status) {
            sta.sta = true
        }

        console.log(fs[0].f)
        console.log(fs[1].f)
        this.setData({
            fs,
            status,
            iShow: false,
            fangxing: title
        })
        
        
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        let url = app.globalData.URL + '/er/shbd/get_hotel_status';
        let data = {
          appid: wx.getAccountInfoSync().miniProgram.appId
        };
        app.wxRequest('POST', url, data, (res) => {
          if(res.code==1){
            that.setData({
                fs:res.fs,
                date:res.start,
                start:res.start
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