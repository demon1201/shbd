// pages/hotel/hotel.js
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
    vip: 1,
    sorr: false,
    gk: [
      {
        img: '/pages/images/hotel/31.png',
        tit: '室外景观',
        gg: [
          '海景',
          '阳台',
          '背靠高尔夫前瞻海景',
          '天然氧吧'
        ]
      },
      {
        img: '/pages/images/hotel/32.png',
        tit: '洗护 用品',
        gg: [
          '牙刷',
          '牙膏',
          '沐浴露',
          '洗发水',
          '香皂',
          '浴帽',
          '梳子',
          '剃须刀'
        ]
      },
      {
        img: '/pages/images/hotel/33.png',
        tit: '便利 设备',
        gg: [
          '坐卧两用长沙发',
          '房间内高速上网',
          '客房WIFI',
          '遮光窗帘',
          '手动窗帘',
          '空调',
          '沙发',
          '衣柜/衣橱',
          '书桌',
          '餐桌',
          '床具:毯子或被子',
          '衣架',
          '多种规格电源插座',
          '220V电压插座',
        ]
      },
      {
        img: '/pages/images/hotel/34.png',
        tit: '媒体 设备',
        gg: [
          '液晶电视机',
          '有线频道',
        ]
      },
      {
        img: '/pages/images/hotel/35.png',
        tit: '浴室',
        gg: [
          '独立淋浴间',
          '独立卫生间',
          '吹风机',
          '24小时热水',
          '拖鞋',
        ]
      },
      {
        img: '/pages/images/hotel/36.png',
        tit: '厨房',
        gg: [
          '电磁炉',
          '抽油烟机'
        ]
      },
      {
        img: '/pages/images/hotel/37.png',
        tit: '食品 饮品',
        gg: [
          '茶包(免费)',
          '瓶装水(免费)',
          '电热水壶'
        ]
      },
    ],
    themes: {
    
      blue: {
        bg: "#fff",
        fontColor: "#000",
        rangeStartColor: "#FF6D14",
        rangeColor: "#FFB385",
        rangeEndColor: "#FF6D14"
      }
    },
   

    navHeight: app.globalData.navHeight,
    url: app.globalData.URL,
    navTop: app.globalData.navTop,
    background: [],
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
    address_item_imgs: [],
    // 入住时间
    startDate: '2021-06-09',
    endDate1: '2099-12-31',
    endDate2: '2099-12-31',
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
        tags: [],
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
    ],
    time_box: false,
    time_box1: false,
    show: false,
    // 相册图
    imgUrls: [
    ],
    current: 0,
  },
  
  seeImg(e){
    const url = e.currentTarget.dataset.url;
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: [url,] // 需要预览的图片http链接列表
    })
  },

  showh(e){
    console.log(this.data.imgUrls)
    const current = e.currentTarget.dataset.idx
    this.setData({
      show: true,
      current: current
    })
  },
  // 隐藏画廊
  hide() {
    console.log('component hide')
        this.setData({
            show: false
        })
},

  // 选择日期
  select ({detail: {begin: {text: begin}, over: {text: over}}}) {
    console.log(begin, over)

    const date1 = begin.split('-')

    const date2 = over.split('-')


    const d1 = date1[1]+'-'+date1[2]
    const d2 = date2[1]+'-'+date2[2]
   
    this.setData({
      date: d1,
      date2: d2,
      start: begin,
      stop: over,
      wDate: begin,
      startDate2: begin,
      wDate2: over,
      time_box: false
    });
    this.dateInterval( this.data.wDate, this.data.wDate2)
  },
  colbox(){
    this.setData(
      {
        time_box: false
      }
    ),
    wx.showToast({
      title: '请选择时间范围',
      icon: 'loading',
      duration: 500
    })
  },
 offCalendar () {
    this.setData({time_box1: false});
  },

  // 选择离店日期
  select1 ({detail}) {

    detail = detail.text
    console.log(detail, '1111')
    this.offCalendar();

    const date1 = detail.split('-')
    const d1 = date1[1]+'-'+date1[2]
  
   
    this.setData({
      stop: detail,
      date2: d1,
      wDate2: detail,
      time_box1: false
    });
    this.dateInterval( this.data.wDate, this.data.wDate2)
  },
  colbox1(){
    this.setData(
      {
        time_box: false
      }
    )
  },
  // 住店日期
  bindDateChange: function(e) {

  this.setData({
    time_box: true
  })
  return false
  },
  // 离店日期
bindDateChange2: function(e) {
  this.setData({
    time_box1: true
  })
  return false
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
   // 计算价格
   this.req()

},
// //  请求
req(){
  const that = this
  wx.getStorage({
    key: "id",
    success: function (user) {
    let url1 = app.globalData.URL + 'er/shbd/get_money2';
    const data1 = {
    
      start_time: that.data.wDate,
      end_time: that.data.wDate2,
      user_id:user.data,
    }
    const _that = that
      app.wxRequest('POST', url1, data1, (res) => {
       
        if(res.code == 1){
          _that.setData({
            moneys: res.money1,
            yuan_moneys: res.yuan_money,
          })
          console.log(res)
        }else{
          wx.showToast({
            title: res.msg,
            icon: 'loading',
            duration: 2000
          })
        }
      })
    }
  })
},

  // 支付
  // pay(e) {
  //   const idx = e.target.dataset.idx
  //   let room = this.data.rooms[idx]
  //   room = JSON.stringify(room)
  //   console.log(room)
  //   return false
  //   wx.navigateTo({
  //     url: '/pages/pay/pay?room='+ room,
  //   })
  // },
  pay1(e) {
    wx.navigateTo({
      url: '/pages/pay/pay?pid='+ e.currentTarget.dataset.pid+'&title='+e.currentTarget.dataset.title+'&money='+e.currentTarget.dataset.money+'&wDate='+this.data.wDate+'&wDate2='+this.data.wDate2+'&user_dis='+e.currentTarget.dataset.discount+'&days='+this.data.days+'&photo='+e.currentTarget.dataset.photo+'&hotel='+e.currentTarget.dataset.hotel+'&ya_money='+e.currentTarget.dataset.ya_money+'&startDate=' + this.data.startDate
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

    // 计算下一天

    // nextDay(d){
    //   const today = new Date(d);
    //   const year = today.getFullYear();
    //   const month = today.getMonth()+1;
    //   const date = today.getDate();
     
    //   let date1 = month + '-' + date
    //   let wdate1 = year + '-' + month + '-' + date

    //   let end1 = year+1 + '-' + month + '-' + date
      
    //   var new_year = year; //取当前的年份
    //   var new_month = month+1;//取下一个月的第一天，方便计算（最后一天不固定）
    //   if(month>12){//如果当前大于12月，则年份转到下一年
    //       new_month -=12; //月份减
    //       new_year+1; //年份增
    //   }
    //   console.log(new_month)
    //   var new_date = new Date(new_year,new_month-1,1); //取当年当月中的第一天
  
    //   var month_last_day = (new Date(new_date.getTime()-1000*60*60*24)).getDate();
    //   console.log(today, month_last_day, new_date,new Date(new_date.getTime()-1000*60*60*24))
    //   let date2
    //   let wdate2
    //   if( date == month_last_day ){
    //     if(month+1 <10){
    //       date2 = '0' + month+1 + '-' + '01'
    //       wdate2 = year + '-' + '0' + month+1 + '-' + '01'
    //     }else{
    //       date2 = month+1 + '-' + '01'
    //       wdate2 = year + '-' + month+1 + '-' + '01'
    //     }
        
    //   }else{
    //     if(month<10){
    //       if(date < 9){
    //         date2 = '0'+ month + '-' + '0' + (Number(date)+1)
    //         wdate2 = year + '-' + '0'+month + '-' + '0' + (Number(date)+1)
    //       }else{
    //         date2 = '0'+ month + '-' + (Number(date)+1)
    //         wdate2 = year + '-' + '0'+month + '-' + (Number(date)+1)
    //       }
    //     }else{
    //       if(date < 9){
    //         date2 = month + '-0' + (Number(date)+1)
    //         wdate2 = year + '-0' + month + '-' + (Number(date)+1)
    //       }else{
    //         date2 = month + '-' + (Number(date)+1)
    //         wdate2 = year + '-' + month + '-' + (Number(date)+1)
    //       }
          
    //     }
    //   }
    //   const dd = {
    //     nextDay: date2,
    //     nextDate: wdate2,
    //     end1: end1
    //   }
    //   return dd;
    // },
  swiperTab: function(e) {
    this.setData({
      n: e.detail.current+1
    })
  },
  phone_call: function (e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone 
    })
  },
  get_map(){
    var that = this;
    const MapContext = wx.createMapContext('myMap')
    MapContext.openMapApp({
      longitude: Number(that.data.lng) ,
      latitude: Number(that.data.lat),
      destination: that.data.title
    })

    // wx.getLocation({
    //   type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
    //   success: function (res) {
    //     //使用微信内置地图查看位置接口
    //     wx.openLocation({
    //       latitude: parseFloat(that.data.lat), // 要去的地址经度，浮点数
    //       longitude: parseFloat(that.data.lng), // 要去的地址纬度，浮点数
    //       name: "酒店", // 位置名
    //       address: '', // 要去的地址详情说明
    //       scale: 15, // 地图缩放级别,整形值,范围从1~28。默认为最大
    //       infoUrl: 'http://www.gongjuji.net' // 在查看位置界面底部显示的超链接,可点击跳转（测试好像不可用）
    //     });
    //   },
    //   cancel: function (res) {
    //     console.log('地图定位失败');
    //   }
    // })
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      theme: this.data.themes.blue
    });
    var that = this;
    // const today = new Date(Number(new Date().getTime()) + 86400000);
    // const year = today.getFullYear();
    // const month = today.getMonth()+1;
    // const date = today.getDate();
   
    // let date1 = ''
    // let wdate1 = ''
    // let endDate1 = year+1 + '-' + month + '-' + date
    
    // var new_year = year; //取当前的年份
    // var new_month = month+1;//取下一个月的第一天，方便计算（最后一天不固定）
    // if(month>12){//如果当前大于12月，则年份转到下一年
    //     new_month -=12; //月份减
    //     new_year+1; //年份增
    // }
    // console.log(new_month)
    // var new_date = new Date(new_year,new_month-1,1); //取当年当月中的第一天

    // var month_last_day = (new Date(new_date.getTime()-1000*60*60*24)).getDate();
    // console.log(today, month_last_day, new_date,new Date(new_date.getTime()-1000*60*60*24))
    // let date2
    // let wdate2
    // if( date == month_last_day ){
    //   console.log(1112)
    //   if(month <10){
      
    //     date2 = '0' + (month+1) + '-' + '01'
    //     wdate2 = year + '-' + '0' + (month+1) + '-' + '01'
    //   }else{
    //     date2 = month+1 + '-' + '01'
    //     wdate2 = year + '-' + (month+1) + '-' + '01'
    //   }
    //   if(month < 10) {
    //     date1 = '0'+ month + '-' + (Number(date))
    //     wdate1 = year + '-' + '0'+month + '-' + (Number(date))
    //   }else{
    //     date1 = month + '-' + '0' + (Number(date))
    //     wdate1 = year + '-' +month + '-' + (Number(date))
    //   }
      
    // }else{
    //   console.log(1113)
    //   if(month<10){
    //     if(date < 9){
    //       date2 = '0'+ month + '-' + '0' + (Number(date)+1)
    //       wdate2 = year + '-' + '0'+month + '-' + '0' + (Number(date)+1)
    //     }else{
    //       date2 = '0'+ month + '-' + (Number(date)+1)
    //       wdate2 = year + '-' + '0'+month + '-' + (Number(date)+1)
    //     }

    //     if(date < 10){
    //       date1 = '0'+ month + '-' + '0' + (Number(date))
    //       wdate1 = year + '-' + '0'+month + '-' + '0' + (Number(date))
    //     }else{
    //       date1 = '0'+ month + '-' + (Number(date))
    //       wdate1 = year + '-' + '0'+month + '-' + (Number(date))
    //     }
       
    //   }else{
    //     console.log(1212)
    //     if(date < 9){
    //       date2 = month + '-0' + (Number(date)+1)
    //       wdate2 = year +'-'+ month + '-0' + (Number(date)+1)
    //     }else{
    //       date2 = month + '-' + (Number(date)+1)
    //       wdate2 = year + '-' + month + '-' + (Number(date)+1)
    //     }
    //     if(date < 10){
    //       date1 = month + '-0' + (Number(date))
    //       wdate1 = year +'-'+ month  + '-0' + (Number(date))
    //     }else{
    //       date1 = month + '-' + (Number(date))
    //       wdate1 = year + '-' + month + '-' + (Number(date))
    //     }
        
    //   }
    // }
    
    // console.log(date2, wdate2,Number(date)+1)
    //获取酒店信息
    wx.getStorage({
      key: "id",
      success: function (user) {
    let url = app.globalData.URL + '/er/shbd/get_hotel';
        let data = {
          appid: wx.getAccountInfoSync().miniProgram.appId,
          user_id:user.data
        };
        app.wxRequest('POST', url, data, (res) => {
          if(res.code==1){

            that.setData({
              title:res.hotel.title,
              tags:res.hotel.label,
              background:res.hotel.banner0,
              ns: res.hotel.banner0.length,
              address_item_imgs:res.hotel.banner1,
              address:res.hotel.sever_add,
              addressTel:res.hotel.tel,
              lat:res.hotel.lat,
              lng:res.hotel.lng,
              content:res.hotel.content,
              detail_items:res.hotel.overview,
              id:res.hotel.id,
              rooms:res.lists,
              star: 0,
              get_status:res.get_status,
              endDate1: that.data.endDate1,
              vip: 4,
              date:res.date.date1,
              date2:res.date.date2,
              wDate: res.date.wdate1,
              wDate2: res.date.wdate2,
              startDate: res.date.wdate1,
      startDate2: res.date.wdate2,
            })

          }
        }, (err) => {
          console.log(err.errMsg)
        })
      }
    })

    that.setData({
      
      ns: this.data.background.length
    })
    that.get_id()
  },
  get_id(){
    var that = this;
    wx.getStorage({
      key: "id",
      success: function (ms) {
        console.log("同步"+ms.data)
        let url = app.globalData.URL + '/er/index/if_rz';
        let data = {
          id: ms.data,
          appid: wx.getAccountInfoSync().miniProgram.appId
        };
        app.wxRequest('POST', url, data, (res) => {
          if(res.is_sq!=1){
            wx.navigateTo({
              url: '/pages/login/login',
            })
          }

        }, (err) => {
          console.log(err.errMsg)
        })

      },
      fail:function(){
        console.log("重新请求")
        setTimeout(function () {
          that.get_id()
        }, 1000)
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
  // 页面滑动
  onPageScroll(e){
    console.log(e.scrollTop)
    if(e.scrollTop > 200){
      this.setData({
        sorr : true
      })
    }else{
      this.setData({
        sorr: false
      })
    }
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