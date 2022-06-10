// pages/payForOrder/payForOrder.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        type: 1,
        time: '09:00:00',
        time1: '09:01:00',
        title: '山海半岛高尔夫球场',
        data: '06-30',
        changdi: '前九洞A场',
        changci: '06:00~06:30',
        ps: [
            '张三',
            '李四',
            '王五'
        ],
        price: 100,
        prices: 300
    },

    tuikuan(){
        var _this = this;
        wx.getStorage({
            key: "id",
            success: function (user) {
        
            let url = app.globalData.URL + '/er/refund/refund';
            let data = {
            appid: wx.getAccountInfoSync().miniProgram.appId,
            id:_this.data.id,
            table:'golf_order',
            uid:user.data
            };
            app.wxRequest('POST', url, data, (res) => {
        
            if(res.code==1){
              wx.showToast({
                title: res.msg,
                icon: 'success',
                duration: 2000
              })
              setTimeout(function () {
                wx.switchTab({
                    url: '/pages/index/index',
                  })
              }, 2000)
              
            }else{
              wx.showToast({
                title: res.msg,
                icon: 'loading',
                duration: 2000
              })
            }
        
            }, (err) => {
            console.log(err.errMsg)
            })
        
            _this.setData({
            dialogShow: false,
            showOneButtonDialog: false,
            pay: false
            })
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let data = options.data
        data = JSON.parse(data)
        console.log(data)
        this.setData({
            data1:data,
            time:data.time,
            id:data.id
        })
        console.log(data)
        var that = this
        that.golf_add();
    },
    //抢票
    golf_add(){
        var that = this
       
            const data2 = that.data.data1
            console.log(data2)
            let url = app.globalData.URL + '/er/shbd/golf_add';
            app.wxRequest('POST', url, data2, (res) => {
            if(res.code==1){
                wx.showToast({
                title: res.msg,
                icon: 'success',
                duration: 2000
                })
                this.setData({
                    type:2,
                    base:res.base,
                    time1:res.time
                })
            }else{
                this.setData({
                    type:3,
                    msg:res.msg,
                    time1:res.time
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
    // onShareAppMessage: function () {

    // }
})