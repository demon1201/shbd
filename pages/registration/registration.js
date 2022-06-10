// pages/registration/registration.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    start: "",
    start1: "",
    stop: "",
    stop1: "",
    theme: null,
    themes: {
      blue: {
        bg: "#fff",
        fontColor: "#000",
        rangeStartColor: "#FF6D14",
        rangeColor: "#FFB385",
        rangeEndColor: "#FF6D14"
      }
    },
    dayStyle: [
      {month: 'current', day: new Date().getDate(), color: 'white', background: '#86B7C1'},
      {month: 'current', day: new Date().getDate(), color: 'white', background: '#86B7C1' },
      {month: 'current', day: app.globalData.day, color: 'white', background: 'gray'}
    ],
    status:1,
    startDate: '2021-10',
    endDate: '2099-06',
    price: 50,
    dates: {
      year: 2021,
      month: 6,
      day: 1,
      num: 40,
      date: [
        {
          id : 0,
          d: '9：00~12：00',
          num: 40,
        },
        {
          id : 1,
          d: '12：00~14：00',
          num: 38,
        }  
          ]
    },

    // 活动日期
    actives: [

    ],
    // 活动第一个日期
    chushidate: '',
  },
  select1 ({detail}) {
    const date = detail.text
    console.log(detail, '1111')

    // 获取时间段
    this.getacti(date);

  },

  getacti(date){
    var that = this;
    let url = app.globalData.URL + '/er/shbd/get_activity_time';
    let data = {
      pid: this.data.pid,
      date:date
    };
    app.wxRequest('POST', url, data, (res) => {
      if(res.code==1){
        that.setData({
          lists:res.lists,
          date:date,
          status:res.status
        })
      }else{
        that.setData({
          lists:[]
        })
      }
      that.setData({
        err_msg:res.msg
      })
    }, (err) => {
      console.log(err.errMsg)
    })
  },

  //给点击的日期设置一个背景颜色
  dayClick: function (event) {
    let clickDay = event.detail.day;
    let changeBgColor = `dayStyle[0].color`;
    let changeBg = `dayStyle[0].background`;
    let changeDay = `dayStyle[1].day`;
    let changeEndBg = `dayStyle[1].background`;
    
    const date = event.detail.year+'-'+event.detail.month+'-'+event.detail.day
    console.log(date)
    console.log(event.detail.year)

    const dates = this.data.dates
    dates.year = event.detail.year
    dates.month = event.detail.month
    dates.day = event.detail.day

    let url = app.globalData.URL + '/er/shbd/get_activity_time';
    let data = {
      pid: this.data.pid,
      date:date
    };
    app.wxRequest('POST', url, data, (res) => {
      if(res.code==1){
        this.setData({
          lists:res.lists,
          date:date,
          status:res.status
        })
      }else{
        this.setData({
          lists:[]
        })
      }
    }, (err) => {
      console.log(err.errMsg)
    })
    this.setData({
      [changeDay]: clickDay,
      [changeBg]:"rgba(255,255,255,0)",
      [changeBgColor]:"black",
      [changeEndBg]: "#86B7C1",
      dates: dates
    })
 
  },
  onLoad: function (options) {

    this.setData({
      theme: this.data.themes.blue,
    });
    var that = this;
    


    console.log(options)
    // const data = JSON.parse(options.data)
    // let date
    // if(data.month < 10){
    //    date = data.year+ '-0' + data.month
    // }else{
    //   date = data.year+ '-' + data.month
    // }
    //获取活动时间段列表
    wx.setNavigationBarTitle({
      title: options.title,
    })
    let url = app.globalData.URL + '/er/shbd/get_activity_time';
    let data = {
      pid: options.pid
    };
    app.wxRequest('POST', url, data, (res) => {
      if(res.code==1){
       
        that.setData({
          lists:res.lists,
          startDate:res.startDate,
          date:res.date,
          actives:res.actives,
          chushidate: res.chushidate
        })
        console.log(res)

        console.log(that.data.actives)
        that.getacti(that.data.chushidate);
      }
      console.log(res.msg)
      that.setData({
        err_msg:res.msg
      })
    }, (err) => {
      console.log(err.errMsg)
    })
    // this.setData({
    //   price: data.price,
    //   startDate: date
    // })
    this.setData({
      pid:options.pid,
      money:options.money,
      title: options.title,
      photo: options.photo,
    })
  },
  toApply(e){
    // const idx = e.target.dataset.idx
    // let data = {
    //   year: this.data.dates.year,
    //   month: this.data.dates.month,
    //   day: this.data.dates.month,
    //   date: this.data.dates.date[idx].d,
    //   num: this.data.dates.date[idx].num,
    //   price: this.data.price,
    // }
    // console.log(data, '1111')
    // data = JSON.stringify(data)
    let data = {
      pid:e.currentTarget.dataset.pid,
      title:e.currentTarget.dataset.title,
      pid_title:this.data.title,
      num:e.currentTarget.dataset.num,
      money:e.currentTarget.dataset.money,
      activity_id:this.data.pid,
      date:this.data.date,
      photo:this.data.photo,
    }
    data = JSON.stringify(data)
    wx.navigateTo({
      url: '/pages/addParticipant/addParticipant?data='+ data,
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