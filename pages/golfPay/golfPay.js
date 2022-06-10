// pages/registration/registration.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    idx: 'i1',
    num : 0,

    // 场次
    session: [
      {
        id : 0,
        time: '6:00',
        s:[
            {
              id: 0,
              type: 2,
            },
            {
              id: 1,
              type: 0,
            },
            {
              id: 2,
              type: 0,
            },
            {
              id: 3,
              type: 0,
            },
          ],
      },
      {
        id : 2,
        time: '7:00',
        s:[
          {
            id: 0,
            type: 2,
          },
          {
            id: 1,
            type: 2,
          },
          {
            id: 2,
            type: 0,
          },
          {
            id: 3,
            type: 0,
          },
        ],
      },

    ],
    dayStyle: [
      {month: 'current', day: new Date().getDate(), color: 'white', background: '#86B7C1'},
      {month: 'current', day: new Date().getDate(), color: 'white', background: '#86B7C1' },
    ],
    startDate: '2021-06',
    endDate: '2099-06',
    dates: {
      year: new Date().getFullYear(),
      month: new Date().getMonth()+1,
      day: new Date().getDate()
    },
    add: false,
    myself: app.globalData.myself,
    price: 100,
    title: '',
    sId: ''
  },

  add1(e){
    // 场次Id
  
    const idx = e.target.dataset.idx;
    // 位置id
    const ind = e.target.dataset.ind;
    console.log(ind)
    
    const lists = this.data.lists;
    const type = lists[idx].s[ind].type;
    
    // 初始状态没有点击之前
    if(this.data.idx == 'i1'){
      if(type == 2){
        return
      }else{
        lists[idx].s[ind].type = !lists[idx].s[ind].type
        this.setData({
          lists: lists,
          idx : idx,
          id:e.currentTarget.dataset.id,
          teetime:e.currentTarget.dataset.teetime,
        })
      }
    }else{
      // idx相同的点击有效
      if(this.data.idx == idx){
        if(type == 2){
          console.log(123)
          return
        }else{
          lists[idx].s[ind].type = !lists[idx].s[ind].type
          this.setData({
            lists: lists,
            idx : idx
          })
        }
      }else{
        wx.showToast({
          title: '选择非法',
          icon: 'error',
          duration: 500
        })
        return
      }
    }
    
    // 选中的个数
    let num = 0;
    for(const i of lists[idx].s){
        if(i.type == 1){
          num ++
        }
    }

    this.setData({
      num: num
    })
    console.log('num', this.data.num, this.data.idx);
    // 如果个数为0，初始化id
    if(num == 0 ){
      this.setData({
        idx: 'i1'
      })
    }

  },
  //给点击的日期设置一个背景颜色
  dayClick: function (event) {

    console.log(event)
    const now =  new Date()
    
    const year =  now.getFullYear()
    const month = now.getMonth()
    const day = now.getDate()
    let clickDay = event.detail.day;
    let clickMonth = event.detail.month;
    let clickYear = event.detail.year;

    if(clickDay < day){
      if(clickMonth <= month){
        if(clickYear <= year){
          wx.showToast({
            title: '选择之后日期',
            icon: 'error',
            duration: 500
          })
          return false
        }
      }
    }

    let changeBgColor = `dayStyle[0].color`;
    let changeBg = `dayStyle[0].background`;
    let changeDay = `dayStyle[1].day`;
    let changeEndBg = `dayStyle[1].background`;
    
    const date = event.detail.year+'-'+event.detail.month+'-'+event.detail.day
    console.log(date, event.detail)
    const d = event.detail
    const dates = this.data.dates
    console.log(d.year)
    
    // 年月日
    dates.year = d.year
    dates.month = d.month
    dates.day = d.day

    const dt = d.year + '' + d.month + '' + d.day
    const time = d.year + '-' + d.month + '-' + d.day
    // 获取时间段数据
    this.getData(dt)
    
    this.setData({
      [changeDay]: clickDay,
      [changeBg]:"rgba(255,255,255,0)",
      [changeBgColor]:"black",
      [changeEndBg]: "#86B7C1",
      dates: dates
    })
    this.get_lists(this.data.AreaCode,time)
  },

   // 获取时间段数据
  getData(date){
   
    // wx.request({
    //   url: 'url',
    //   data: {
    //     date: this.now,
    //     title: sessions.title,
    //     sId: sessions.id
    //   },
    //   success: function (res){
    //     this.setData({
    //       session: res.data
    //     })
    //   }
    // })
  },

  onLoad: function (options) {
    // let sessions = options.sessions;
    // sessions = JSON.parse(sessions);
    console.log(options)
    // this.setData({
    //   price : sessions.price,
    //   title: sessions.title,
    //   sId: sessions.id
    // })

    this.get_lists(options.AreaCode)

    this.setData({
      title: options.AreaName,
      AreaCode:options.AreaCode,
      money:options.money,
    })



    // 初始为当天的数据
    const now = new Date().getFullYear() + '-' + new Date().getMonth() + '' + new Date().getDate()

    this.getData(now)

  },

  //获取可预订场次
  get_lists(AreaCode,PlayDate=''){
    let url = app.globalData.URL + '/er/shbd/TheFreeTime';
    let data = {
      appid: wx.getAccountInfoSync().miniProgram.appId,
      PlayDate : PlayDate,
      AreaCode:AreaCode
    };
    app.wxRequest('POST', url, data, (res) => {
      if(res.code==1){
        this.setData({
          lists:res.lists
        }) 
      }
    }, (err) => {
      console.log(err.errMsg)
    })
  },
  // toApply(e){
  //   const idx = e.target.dataset.idx
  //   let data = {
  //     year: this.data.dates.year,
  //     month: this.data.dates.month,
  //     day: this.data.dates.month,
  //     date: this.data.dates.date[idx].d,
  //     num: this.data.dates.date[idx].num,
  //     price: this.data.price,
  //   }
  //   console.log(data, '1111')
  //   data = JSON.stringify(data)

  //   wx.navigateTo({
  //     url: '/pages/addParticipant/addParticipant?data='+ data,
  //   })
  // },
  // 添加客人信息
  addGuest: function (e) {
    console.log(this.data.num)
    if(this.data.num > 0){
   
    const idx = this.data.idx;
    const se = this.data.lists[idx]
    const _this = this
    console.log()
   
      wx.showToast({
        title: '加载中',
        icon: 'loading',
        duration: 500,
      })

      let data = {
        num : this.data.num,
        time: se.time,
        price: this.data.money,
        date: this.data.dates,
        title: this.data.title,
        AreaCode:this.data.AreaCode,
        teetime:this.data.teetime,
        GroupID: this.data.id//场次id
      }

      data = JSON.stringify(data)

      setTimeout(function () {
       wx.navigateTo({
         url: `/pages/addGuest/addGuest?data=${data}`,
       })
      }, 500)

       
    }else{
      wx.showToast({
        title: '请选择场次',
        icon: 'error',
        duration: 1000
      })
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