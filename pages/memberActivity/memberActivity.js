// pages/memberActivity/memberActivity.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: app.globalData.URL,
    order_time:"desc",
    order_money:"desc",
    time_i:"d.png",
    money_i:"u.png",
    id:0,
    acts: [
      {
        id: 0,
        img: '/pages/images/6.png',
        title: '51城市逃离计划 | 来山海半岛放肆high玩',
        time: '1.5小时',
        tags:['户外活动']
      },
      {
        id: 1,
        img: '/pages/images/6.png',
        title: '“五一小长假”这些人在半岛玩high了',
        time: '1.5小时',
        tags:['户外活动']
      }

    ],
    type: '全部',
    roles1: ['全部', '运动', '音乐', '儿童'],
   
  },
  toActivityDetail(e){
    wx.navigateTo({
      url: '/pages/activityDetail/activityDetail?id=' + e.target.dataset.id,
    })
  },
  bindPickerChange: function(e) {
    // 更改活动类型
    const _this = this;
    console.log('picker发送选择改变，携带值为', e.detail.value);
    // 获取下标
    const idx = e.detail.value;
    var id = _this.data.arr_id[idx];
    console.log(id)
    // return false
    // wx.request({
    //   url: 'url',
    //   dataType: 'json',
    //   data: this.data.roles[idx],
    //   success: function(res){
    //     _this.setData({
    //       type: this.data.roles1[idx],
    //       acts: res.data
    //     })
    //   }
    // });
    let url = app.globalData.URL + '/er/shbd/get_activity_lists';
    let data1 = {
      id:id
    };
    app.wxRequest('POST', url, data1, (res) => {
      if(res.code==1){
        this.setData({
          acts:res.activity,
          roles1:res.roles1,
          type: this.data.roles1[idx],
          arr_id:res.arr_id,
          id:id,
          time_i:res.time_i,
          money_i:res.money_i
        })

      }
    }, (err) => {
      console.log(err.errMsg)
    })
    // 更新数据
    _this.setData({
      type: this.data.roles1[idx],
    })
  },
  order_time(){
    var that = this;
    var id = that.data.id;
    var order_time = that.data.order_time;
    if(order_time=='desc'){
      that.setData({
        order_time:'asc',
        time_i:"u.png"
      })
    }else{
      that.setData({
        order_time:'desc',
        time_i:"d.png"
      })
    }
    var order_time1 = that.data.order_time;
    let url = app.globalData.URL + '/er/shbd/get_activity_lists';
        let data1 = {
          id:id,
          order_time:order_time1,
        };
        app.wxRequest('POST', url, data1, (res) => {
          if(res.code==1){
            that.setData({
              acts:res.activity,
              roles1:res.roles1,
              arr_id:res.arr_id,
              money_i:"d.png"
            })

          }
        }, (err) => {
          console.log(err.errMsg)
        })
  },





  order_money(){
    var that = this;
    var id = that.data.id;
    var order_money = that.data.order_money;
    if(order_money=='desc'){
      that.setData({
        order_money:'asc',
        money_i:"u.png"
      })
    }else{
      that.setData({
        order_money:'desc',
        money_i:"d.png"
      })
    }
    var order_money1 = that.data.order_money;
    let url = app.globalData.URL + '/er/shbd/get_activity_lists';
        let data1 = {
          id:id,
          order_money:order_money1,
        };
        app.wxRequest('POST', url, data1, (res) => {
          if(res.code==1){
            
           
            that.setData({
              acts:res.activity,
              roles1:res.roles1,
              time_i:"d.png",
              arr_id:res.arr_id,

            })

          }
        }, (err) => {
          console.log(err.errMsg)
        })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this;
    // 如果从分类进来，获取分类数据，请求后台获取数据
    if(options.data){
      const data = JSON.parse(options.data); 
      let url = app.globalData.URL + '/er/shbd/get_activity_lists';
        let data1 = {
          id:data.id
        };
        app.wxRequest('POST', url, data1, (res) => {
          if(res.code==1){
            this.setData({
              acts:res.activity,
              roles1:res.roles1,
              id:data.id,
              arr_id:res.arr_id,
              time_i:res.time_i,
              money_i:res.money_i
            })

          }
        }, (err) => {
          console.log(err.errMsg)
        })
      _this.setData({
        type: data.title
      });

    }else{
      // 默认获取全部
      let url = app.globalData.URL + '/er/shbd/get_activity_lists';
        let data1 = {
        };
        app.wxRequest('POST', url, data1, (res) => {
          if(res.code==1){
            this.setData({
              acts:res.activity,
              roles1:res.roles1,
              arr_id:res.arr_id,
              time_i:res.time_i,
              money_i:res.money_i
            })

          }
        }, (err) => {
          console.log(err.errMsg)
        })

      _this.setData({
        type: this.data.roles1[0]
      });
    }
    
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