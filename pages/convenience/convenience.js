// pages/convenience/convenience.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        hotels: [
            {
                id: 6,
                name: '美女渔村海鲜餐厅',
                telName: '段先生',
                tel: '18345675289',
                address: '惠东县巽寮湾金海湾金 海路金海湾金海路',
                price: '800',
            },
            {
                id: 1,
                name: '美女渔村海鲜餐厅',
                telName: '段先生',
                tel: '18345675289',
                address: '惠东县巽寮湾金海湾金 海路金海湾金海路',
                price: '800',
            },
            {
                id: 2,
                name: '美女渔村海鲜餐厅',
                telName: '段先生',
                tel: '18345675289',
                address: '惠东县巽寮湾金海湾金 海路金海湾金海路',
                price: '800',
            },
            {
                id: 3,
                name: '美女渔村海鲜餐厅',
                telName: '段先生',
                tel: '18345675289',
                address: '惠东县巽寮湾金海湾金 海路金海湾金海路',
                price: '800',
            },
            {
                id: 4,
                name: '美女渔村海鲜餐厅',
                telName: '段先生',
                tel: '18345675289',
                address: '惠东县巽寮湾金海湾金 海路金海湾金海路',
                price: '800',
            },
            {
                id: 5,
                name: '美女渔村海鲜餐厅',
                telName: '段先生',
                tel: '18345675289',
                address: '惠东县巽寮湾金海湾金 海路金海湾金海路',
                price: '800',
            },
        ],
        catering: [
            {
                id: 6,
                name: '美女渔村海鲜餐厅',
                telName: '段先生',
                tel: '18345675289',
                address: '惠东县巽寮湾金海湾金 海路金海湾金海路',
                price: '800',
            },
            {
                id: 1,
                name: '美女渔村海鲜餐厅',
                telName: '段先生',
                tel: '18345675289',
                address: '惠东县巽寮湾金海湾金 海路金海湾金海路',
                price: '800',
            },
            {
                id: 2,
                name: '美女渔村海鲜餐厅',
                telName: '段先生',
                tel: '18345675289',
                address: '惠东县巽寮湾金海湾金 海路金海湾金海路',
                price: '800',
            },
            {
                id: 3,
                name: '美女渔村海鲜餐厅',
                telName: '段先生',
                tel: '18345675289',
                address: '惠东县巽寮湾金海湾金 海路金海湾金海路',
                price: '800',
            },
            {
                id: 4,
                name: '美女渔村海鲜餐厅',
                telName: '段先生',
                tel: '18345675289',
                address: '惠东县巽寮湾金海湾金 海路金海湾金海路',
                price: '800',
            },
            {
                id: 5,
                name: '美女渔村海鲜餐厅',
                telName: '段先生',
                tel: '18345675289',
                address: '惠东县巽寮湾金海湾金 海路金海湾金海路',
                price: '800',
            },
        ],
    },
    // 拨打电话
    call(e){
        const phone = e.currentTarget.dataset.tel
        console.log(phone)
        wx.makePhoneCall({
            phoneNumber: phone+'' 
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