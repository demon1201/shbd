// pages/writeOffHistory/writeOffHistory.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
      url:app.globalData.URL,
        types: [
            {
                type: 1,
                title: '最近',
                act: true
            },
            {
                type: 2,
                title: '本周',
                act: false
            },
            {
                type: 3,
                title: '本月',
                act: false
            },
        ],
        orders: [
            {
                tx: '/pages/images/mine/22.png',
                name: '网投白',
                orderId: '5113221054',
                date: '2021/07/20 18:00:00',
                hxname: '王透白',
                title: '木屋烧烤',
                type: 'A套餐',
                price: '488'
            },
            {
                tx: '/pages/images/mine/22.png',
                name: '网投白',
                orderId: '5113221054',
                date: '2021/07/20 18:00:00',
                hxname: '王透白',
                title: '木屋烧烤',
                type: 'A套餐',
                price: '488'
            },
        ],
        type: '',
        roles1: ['本月','一月', '二月', '三月', '四月'],
    },

    // 月份查询
    bindPickerChange: function(e) {
        // 更改月份类型
        const _this = this;
        console.log('picker发送选择改变，携带值为', e.detail.value);
        var inde = Number(e.detail.value)+1;
        var month_index = _this.data.month[inde];
        // 获取下标
        const idx = e.detail.value;
        var month = _this.data.roles1[idx];
        this.setData({
            type: month
        })
        // 月份
        const id = idx+1;
        console.log(id)
       
        // 更新数据
        _this.setData({
          type: this.data.roles1[idx],
        })
        _this.look(2,month_index.start_time,month_index.end_time)

      },  
  // 切换分类
  classification(e){
    const idx = e.currentTarget.dataset.idx
    const types = this.data.types
    for(const type of types){
      type.act = false
      console.log(type.act)
    }
    types[idx].act = true
    this.setData({
      types : types
    })
   var that = this;
   if(idx==0 || idx==1){
    that.look(idx)
   }
  },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      var that = this;
      var index = 0;
      that.look(index)
     

    },
    look(index,start_time='',end_time=''){
      var that = this;
      wx.getStorage({
          key: "id",
          success: function (user) {
          let url = app.globalData.URL + '/er/shbd/look_hexiao';
          let data = {
            appid: wx.getAccountInfoSync().miniProgram.appId,
            uid:user.data,
            index:index,
            start_time:start_time,
            end_time:end_time,
          };
          app.wxRequest('POST', url, data, (res) => {
              if(res.code!=1){
                  wx.showToast({
                      title: res.msg,
                      icon: 'loading',
                      duration: 1000
                    })
                    that.setData({
                      orders:''
                    })
              }else{
                console.log(res.month.arr[res.now_month])
                  that.setData({
                    orders:res.lists,
                    roles1:res.month.arr,
                    month:res.month,
                    now_month:res.now_month,
                    type:res.month.arr[res.now_month-1]
                  })
              }
    
          }, (err) => {
            console.log(err.errMsg)
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
   
})