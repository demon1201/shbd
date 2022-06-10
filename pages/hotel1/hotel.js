// pages/hotel/hotel.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navHeight: app.globalData.navHeight,
    navTop: app.globalData.navTop,
    background: ['../images/6.png', '../images/6.png', '../images/6.png'],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 500,
    title: '星遇酒店',
    tags:['凭栏瞰景', '果岭山色','山海风光'],
    openTime:'24小时营业',
    address: '星河山海半岛-一期A1栋',
    addressTel: '0752-8511111',
    n: 1,
    ns: 0,
    address_item_imgs: ['../images/6.png', '../images/6.png', '../images/6.png'],
    // 入住时间
    startDate: '2021-06-09',
    startDate2: '2021-06-09',
    endDate: '2099-12-31',
    inTime: '05-18',
    inTimeDay: '今日',
    outTime: '05-20',
    outTimeDay: '周四',
    days: 1,
    date: '05-18',
    wDate: '2021-05-18',
    date2: '05-19',
    wDate2: '2021-05-19',
    prices: 175,
    rooms: [
      {
        id: 0,
        title: '单间',
        bed: '单床(1.8Mx2M)',
        price: 175,
        img: '/pages/images/6.png',
        oldPrice: 180,
        open: false,
        hideitems: [
          {
            id: 0,
            title: '原价',
            price: 175,
            oldPrice: 180,
            discounts: 5,
            yu: true
          },
          {
            id: 1,
            title: '节假日',
            price: 169,
            oldPrice: 180,
            discounts: 11,
            yu: true
          },
          {
            id: 2,
            title: '周六日',
            price: 170,
            oldPrice: 180,
            discounts: 10,
            yu: false
          }
        ]
      },
      {
        id: 1,
        title: '大床房',
        bed: '单床(1.8Mx2M)',
        price: 270,
        img: '/pages/images/6.png',
        oldPrice: 280,
        open: false,
        hideitems: [
          {
            id: 0,
            title: '原价',
            price: 175,
            oldPrice: 180,
            discounts: 5,
            yu: true
          },
          {
            id: 1,
            title: '节假日',
            price: 169,
            oldPrice: 180,
            discounts: 11,
            yu: true
          },
          {
            id: 2,
            title: '周六日',
            price: 170,
            oldPrice: 180,
            discounts: 10,
            yu: true
          }
        ]
      },
    ],
    detail_items: [
      {
        img: '../images/hotel/11.png',
        title: '早餐48一位'
      },
      {
        img: '../images/hotel/12.png',
        title: '免费WIFI'
      },
      {
        img: '../images/hotel/13.png',
        title: '健身房'
      },
      {
        img: '../images/hotel/14.png',
        title: '洗衣房'
      },
      {
        img: '../images/hotel/15.png',
        title: '会议室'
      },
      {
        img: '../images/hotel/16.png',
        title: '免费停车场'
      },
      {
        img: '../images/hotel/15.png',
        title: '图书馆'
      },
    ]
    
  },
  // 住店日期
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    const detail = e.detail.value
    const date = detail.split('-')
    const d = date[1]+'-'+date[2]
    console.log(this.nextDay(detail))
    // 下一天
    const nextDay = this.nextDay(detail);
    this.setData({
      wDate: e.detail.value,
      date: d,
      startDate2: nextDay.nextDate,
      wdate2: nextDay.nextDate,
      date2: nextDay.nextDay,
      days: 1
    })
    // this.dateInterval( this.data.wDate, this.data.wDate2)
  },
  // 离店日期
bindDateChange2: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    const detail = e.detail.value
    const date = detail.split('-')
    const d = date[1]+'-'+date[2]

    this.setData({
      wDate2: e.detail.value,
      date2: d,
    })
    this.dateInterval( this.data.wDate, this.data.wDate2)
  },
// 两个时间间隔天数
dateInterval(oldDate, newDate){
  const newDate1 = new Date(newDate);
  const oldDate1 = new Date(oldDate);

  const time1 = Date.parse(newDate1)
  const time2 = Date.parse(oldDate1)

  console.log(newDate, newDate1)
  console.log(oldDate, oldDate1)

  const count =  Math.floor((Math.abs(time1 - time2))/1000/60/60/24);  
  this.setData({
    days: Math.floor(count),
  })

},
  // 支付
  pay(e) {
    const idx = e.target.dataset.idx
    let room = this.data.rooms[idx]
    room = JSON.stringify(room)
    wx.navigateTo({
      url: '/pages/pay/pay?room='+ room,
    })
  },
  pay1(e) {
    const idx = e.target.dataset.idx
    const old = e.target.dataset.old
    const news = e.target.dataset.new
    let room = this.data.rooms[idx]
    room.price = news
    room.oldPrice = old
    room = JSON.stringify(room)
    wx.navigateTo({
      url: '/pages/pay/pay?room='+ room,
    })
  },
  // 打开其他选项
  showHide(e){
    const rooms = this.data.rooms
    console.log(e.target.dataset)
    const idx = e.target.dataset.idx
    console.log(rooms[idx])
    rooms[idx].open = !rooms[idx].open
    this.setData({
      rooms: rooms
    })
    console.log(this.data.rooms)
  },
  swiperTab: function(e) {
    console.log(e)
    this.setData({
      n: e.detail.current+1
    })
  },
  // 计算下一天

  nextDay(d){
    const today = new Date(d);
    const year = today.getFullYear();
    const month = today.getMonth()+1;
    const date = today.getDate();
   
    let date1 = month + '-' + date
    let wdate1 = year + '-' + month + '-' + date
    
    var new_year = year; //取当前的年份
    var new_month = month+1;//取下一个月的第一天，方便计算（最后一天不固定）
    if(month>12){//如果当前大于12月，则年份转到下一年
        new_month -=12; //月份减
        new_year+1; //年份增
    }
    console.log(new_month)
    var new_date = new Date(new_year,new_month-1,1); //取当年当月中的第一天

    var month_last_day = (new Date(new_date.getTime()-1000*60*60*24)).getDate();
    console.log(today, month_last_day, new_date,new Date(new_date.getTime()-1000*60*60*24))
    let date2
    let wdate2
    if( date == month_last_day ){
      if(month+1 <10){
        date2 = '0' + month+1 + '-' + '01'
        wdate2 = year + '-' + '0' + month+1 + '-' + '01'
      }else{
        date2 = month+1 + '-' + '01'
        wdate2 = year + '-' + month+1 + '-' + '01'
      }
      
    }else{
      if(month<10){
        if(date < 9){
          date2 = '0'+ month + '-' + '0' + (Number(date)+1)
          wdate2 = year + '-' + '0'+month + '-' + '0' + (Number(date)+1)
        }else{
          date2 = '0'+ month + '-' + (Number(date)+1)
          wdate2 = year + '-' + '0'+month + '-' + (Number(date)+1)
        }
      }else{
        if(date < 9){
          date2 = month + '-0' + (Number(date)+1)
          wdate2 = year + '-0' + month + '-' + (Number(date)+1)
        }else{
          date2 = month + '-' + (Number(date)+1)
          wdate2 = year + '-' + month + '-' + (Number(date)+1)
        }
        
      }
    }
    const dd = {
      nextDay: date2,
      nextDate: wdate2
    }
    return dd;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth()+1;
    const date = today.getDate();
   
    let date1 = month + '-' + date
    let wdate1 = year + '-' + month + '-' + date
    
    var new_year = year; //取当前的年份
    var new_month = month+1;//取下一个月的第一天，方便计算（最后一天不固定）
    if(month>12){//如果当前大于12月，则年份转到下一年
        new_month -=12; //月份减
        new_year+1; //年份增
    }
    console.log(new_month)
    var new_date = new Date(new_year,new_month-1,1); //取当年当月中的第一天

    var month_last_day = (new Date(new_date.getTime()-1000*60*60*24)).getDate();
    console.log(today, month_last_day, new_date,new Date(new_date.getTime()-1000*60*60*24))
    let date2
    let wdate2
    if( date == month_last_day ){
      if(month+1 <10){
        date2 = '0' + month+1 + '-' + '01'
        wdate2 = year + '-' + '0' + month+1 + '-' + '01'
      }else{
        date2 = month+1 + '-' + '01'
        wdate2 = year + '-' + month+1 + '-' + '01'
      }
      
    }else{
      if(month<10){
        if(date < 9){
          date2 = '0'+ month + '-' + '0' + (Number(date)+1)
          wdate2 = year + '-' + '0'+month + '-' + '0' + (Number(date)+1)
        }else{
          date2 = '0'+ month + '-' + (Number(date)+1)
          wdate2 = year + '-' + '0'+month + '-' + (Number(date)+1)
        }

        if(date < 10){
          date1 = '0'+ month + '-' + '0' + (Number(date))
          wdate1 = year + '-' + '0'+month + '-' + '0' + (Number(date))
        }else{
          date1 = '0'+ month + '-' + (Number(date))
          wdate1 = year + '-' + '0'+month + '-' + (Number(date))
        }
       
      }else{
        if(date < 9){
          date2 = month + '-0' + (Number(date)+1)
          wdate2 = year + '-0' + month + '-' + (Number(date)+1)
        }else{
          date2 = month + '-' + (Number(date)+1)
          wdate2 = year + '-' + month + '-' + (Number(date)+1)
        }
        if(date < 10){
          date1 = month + '-0' + (Number(date))
          wdate1 = year + '-0' + month + '-' + (Number(date))
        }else{
          date1 = month + '-' + (Number(date))
          wdate1 = year + '-' + month + '-' + (Number(date))
        }
        
      }
    }
    
    console.log(date2, wdate2,Number(date)+1)
    this.setData({
      date: date1,
      startDate: wdate1,
      startDate2: wdate2,
      wDate: wdate1,
      date2: date2,
      wDate2: wdate2,
      ns: this.data.background.length
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