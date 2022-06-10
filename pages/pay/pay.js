// pages/pay/pay.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    yhj_id:0,
    start: "",
    start1: "",
    stop: "",
    stop1: "",
    theme: null,
    tk: false,
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
    navTop: app.globalData.navTop,
    pay:'pay',
    mm: '',
    room: {
      title: '度假酒店',
      roomType: '大床房',
      bed: "单床(1.8Mx2M)",
      hideitems: [],
      id: 0,
      img: '/pages/images/6.png',
      oldPrice: 180,
      open: false,
      price: 175,
      title: "单间",
    },
    person: {
      name: '1',
      tel: '2',
      comment: '3'
    },
    days: 1,
    date: '05-18',
    wDate: '',
    date2: '05-19',
    wDate2: '',
    prices: 175,
    startDate: '',
    startDate2: '',
    endDate: '2099-12-31',
    zrf: false,
    moneys: '',
    yuan_moneys: '',
    coupon:[
      {
        id: 1,
        type: 1,
        title1: '打折券',
        title: '7折',
        dis: 0.7,
        check: false
      },
      {
        id: 2,
        type: 1,
        title1: '打折券',
        title: '8折',
        dis: 0.8,
        check: false
      },
      {
          id: 0,
          type: 1,
          title1: '不使用优惠券',
          title: '',
          dis: 1,
          check: true
      }
    ],
    yhq: false,   //优惠券选择显示
    cou: '不使用优惠券',  //优惠券
    discount: {
      id: 0,
      type: 1,
      title1: '不使用优惠券',
      title: '',
      dis: 1,
      check: true
    },
    remark:''
  },

  // 优惠券
  showCoupon(){
    this.setData({
      yhq: true
    })
  },

  // 取消优惠券选择
  hideCoupon(){
    this.setData({
      yhq: false
    })
  },
  // 确认优惠券选择
  qrCoupon(){
    const discount = this.data.discount;
    console.log(discount)
    // 原价
    const money = this.data.yuan_moneys
    this.setData({
      cou: discount.name + ' ' + discount.zhekou,
      yhq: false,
      moneys: (money * discount.dis).toFixed(2),
      user_dis: discount.dis,
      yhj_id: discount.id
    })
  },

  // 优惠券选择
  radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    const dis = this.data.coupon[e.detail.value]
    const coupon = this.data.coupon
    for (const cou of coupon) {
      cou.check = false
    }
    coupon[e.detail.value].check = true
    console.log(dis)
    this.setData({
      discount: dis,
      coupon
    })
  },

  // 支付
  pay2(){
    const that = this
    wx.getStorage({
      key: "id",
      success: function (user) {
      let url1 = app.globalData.URL + '/er/pay/pay';
      const data1 = {
        name: that.data.name,
        sfz: that.data.sfz,
        id: that.data.id,
        phone: that.data.tel,
        remark: that.data.remark,
        days: that.data.days,
        // money: that.data.money*parseInt(that.data.days)*that.data.user_dis,
        money: that.data.moneys,
        ya_money:that.data.ya_money,
        start_time: that.data.wDate,
        end_time: that.data.wDate2,
        title:that.data.title,
        pid:that.data.pid,
        yhj_id:that.data.yhj_id,
        appid: wx.getAccountInfoSync().miniProgram.appId,
        user_id:user.data,
      }

      console.log(data1)
        app.wxRequest('POST', url1, data1, (res) => {

          if(res.code==='true'){
            wx.requestPayment({
              timeStamp: res.data.timeStamp,
              nonceStr: res.data.nonceStr,
              package: res.data.package,
              signType: 'MD5',
              paySign: res.data.paySign,
              success (res) {
              wx.showToast({
                      title: '支付成功',
                      icon: 'success',
                      duration: 2000
                    })
              setTimeout(function () {
                wx.navigateTo({
                  url: '/pages/myOrder/myOrder'
                })
              }, 1000)

              },
              fail (res) {
                console.log(res)
                wx.showToast({
                  title: '支付失败',
                  icon: 'loading',
                  duration: 2000
                })
              }
            })
          }else{
            wx.showToast({
              title: res.msg,
              icon: 'loading',
              duration: 2000
            })
          }
          setTimeout(function () {
            that.setData({
              pay:'pay',
              tk: false
            })
          }, 2000)
        }, (err) => {
          console.log(err.errMsg)
        })
      }
    })
  },
  dd(){
    wx.navigateTo({
      url: '/pages/myOrder/myOrder'
    })
  },
  // 取消
  qx1(){
    this.setData({
      tk: false
    })
  },

  seeImg(e){
    const url = e.currentTarget.dataset.url;
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: [url,] // 需要预览的图片http链接列表
    })
  },
   // 拨打电话
   call(){
    wx.makePhoneCall({
        phoneNumber: '0752-8678820' 
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
        icon: 'error',
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

  // 找人付
  pay1(){
   
    var that = this;
    // console.log(that.data.user_id)
    // return
    const money = that.data.prices;
    if (!that.data.name) {
      wx.showToast({
        title: "请输入姓名",
        icon: 'error',
        duration: 2000,
        mask: true
      })
      return false;
    }

    if (!that.data.tel) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'error',
        duration: 1500
      })
      return false;
    }
    if (that.data.tel.length != 11) {
      wx.showToast({
        title: '手机号长度有误！',
        icon: 'error',
        duration: 1500
      })
      return false;
    }
    if (!(/^((13[0-9])|(14[0-9])|(15[0-9])|(16[0-9])|(17[0-9])|(18[0-9])|(19[0-9]))\d{8}$/.test(that.data.tel))) {

      wx.showToast({

        title: '手机号码有误',

        duration: 2000,

        icon: 'none'

      });
      return false;
    }
    let reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;

    if (reg.test(that.data.sfz) == false) {
      wx.showToast({
        title: '身份证号码有误',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    wx.showToast({

      title: '生成订单',

      duration: 2000,

      icon: 'none'

    });
    wx.getStorage({
      key: "id",
      success: function (user) {
      var name = that.data.name;
      var phone = that.data.tel;
      var remark = that.data.remark;
      const data2 = {
      type_id:that.data.id,
      name:name,
      phone:phone,
      remark:remark,
      money:that.data.yuan_moneys,
      sfz:that.data.sfz,
      ya_money:that.data.ya_money,
      title:that.data.arr.title,
      pid:that.data.arr.pid,
      user_id:that.data.user_id,
      appid: wx.getAccountInfoSync().miniProgram.appId,
      start_time: that.data.wDate,
      end_time: that.data.wDate2,
      days: that.data.days,
      user_id:user.data
    }
    let url1 = app.globalData.URL + '/er/shbd/order_insert';
    app.wxRequest('POST', url1, data2, (res) => {

        if(res.code==1){
          that.setData({
            zrf : true,
            id:res.id
          })
          
        } else{
           wx.showToast({
              title: res.msg,
              icon: 'none',
              duration: 2000
            })
        }
        
      }, (err) => {
        console.log(err.errMsg)
      })
      }
    })
  },
  // 取消
  qx(){
    this.setData({
      zrf : false,
    }) 
  },
  // 分享
  fx(){

  },

  name: function(e) {
    this.setData({
      name: e.detail.value
    })
  },
  isphone: function(e) {
    this.setData({
      tel: e.detail.value
    })
  },
  issfz: function(e) {
    this.setData({
      sfz: e.detail.value
    })
  },
  remark: function(e) {
    this.setData({
      remark: e.detail.value
    })
  },
  // 支付
  pay(e){
    var that = this;
    wx.requestSubscribeMessage({
      tmplIds: ['LYPH5IPQDAlt2_Q_Njk2drpbQ8quVtMQJ3wnTO3Z2a0'],
      success (res) {
        const money = that.data.prices;
        if (!that.data.name) {
          wx.showToast({
            title: "请输入姓名",
            icon: 'error',
            duration: 1000,
            mask: true
          })
          return false;
        }
    
        if (!that.data.tel) {
          wx.showToast({
            title: '请输入手机号',
            icon: 'error',
            duration: 1000
          })
          return false;
        }
        if (that.data.tel.length != 11) {
          wx.showToast({
            title: '手机号长度有误！',
            icon: 'error',
            duration: 1000
          })
          return false;
        }
        if (!(/^((13[0-9])|(14[0-9])|(15[0-9])|(16[0-9])|(17[0-9])|(18[0-9])|(19[0-9]))\d{8}$/.test(that.data.tel))) {
    
          wx.showToast({
    
            title: '手机号码有误',
    
            duration: 1000,
    
            icon: 'none'
    
          });
          return false;
        }
        let reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    
        if (reg.test(that.data.sfz) == false) {
          wx.showToast({
            title: '身份证号码有误',
            icon: 'none',
            duration: 1000
          })
          return false;
        }
        that.setData({
          pay:'no',
          tk: true
        })
    
       
      }
    })
    

    
  },

//  请求
req(){
  const that = this
  wx.getStorage({
    key: "id",
    success: function (user) {
    let url1 = app.globalData.URL + 'er/shbd/get_money';
    const data1 = {
      cate_id: that.data.pid,
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
            mm:res.money1,
            coupon:res.juan
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    wx.hideShareMenu()
    const to = new Date();
    const y = to.getFullYear();
    const m = to.getMonth()+1;
    const d = to.getDate()+1;
    
    let wdate1 = y + '-' + m + '-' + d
    console.log(wdate1,options.wDate, options.startDate)

    this.setData({
      theme: this.data.themes.blue,
      startDate: options.wDate
    });
    console.log(options)
    const dd1= options.wDate.split('-')

    const dd2 = options.wDate2.split('-')


    const d1 = dd1[1]+'-'+dd1[2]
    const d2 = dd2[1]+'-'+dd2[2]
    console.log(options.money*options.user_dis)
    //折扣
    const money = options.money*options.user_dis
    
    var that = this
    wx.getStorage({
      key: "id",
      success: function (user) {
        that.setData({
          user_id:user.data
        })
      }
    })
    that.setData({
      url: app.globalData.URL,
      arr:options,
      pid:options.pid,
      date: d1,
      date2: d2,
      wDate: options.wDate,
      start: options.startDate,
      wDate2: options.wDate2,
      stop: options.wDate2,
      title:options.title,
      money:Number(options.money),
      days:options.days,
      photo:options.photo,
      hotel:options.hotel,
      user_dis: options.user_dis,
      ya_money: Number(options.ya_money),
    })


    this.req()
    return false;
    


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
    var that = this;
    console.log(that.data.arr)
    var name = that.data.name;
    var phone = that.data.tel;
    var remark = that.data.remark;

    //生成订单
    const data = {
      hotel: that.data.arr.hotel,
      name:name,
      phone:phone,
      remark:remark,
      // money: (that.data.mm *that.data.days).toFixed(2),
      money: that.data.yuan_moneys,
      photo:that.data.arr.photo,
      title:that.data.arr.title,
      user_dis:that.data.arr.user_dis,
      wDate:that.data.arr.wDate,
      wDate2:that.data.arr.wDate2,
      days:that.data.arr.days,
      pid:that.data.arr.pid,
      user_id:that.data.user_id,
      id:that.data.id,
    }
    var data1 = JSON.stringify(data);
    console.log('/pages/negotiation/negotiation?data1='+data1)

    return {
      title: '您的好友申请代付款',
      imageUrl: that.data.url+that.data.photo,
      path: '/pages/negotiation/negotiation?data1='+data1,
     
    }
    // that.data.nickname+'--'+
  }
  
  // 住店日期
  // bindDateChange: function(e) {
  //     console.log('picker发送选择改变，携带值为', e.detail.value)
  //     const detail = e.detail.value
  //     const date = detail.split('-')
  //     const d = date[1]+'-'+date[2]
  //     const nextDay = this.nextDay(detail)
  //     this.setData({
  //       wDate: e.detail.value,
  //       date: d,
  //       startDate2: nextDay.nextDate,
  //       wdate2: nextDay.nextDate,
  //       date2: nextDay.nextDay,
  //       days: 1
  //     })
  //     // this.dateInterval( this.data.wDate, this.data.wDate2)
  //   },
  //   // 离店日期
  // bindDateChange2: function(e) {
  //     console.log('picker发送选择改变，携带值为', e.detail.value)
  //     const detail = e.detail.value
  //     const date = detail.split('-')
  //     const d = date[1]+'-'+date[2]
  //     this.setData({
  //       wDate2: e.detail.value,
  //       date2: d
  //     })
  //     this.dateInterval( this.data.wDate, this.data.wDate2)
  //   },
  // 两个时间间隔天数
  // dateInterval(oldDate, newDate){
  //   const newDate1 = new Date(newDate);
  //   const oldDate1 = new Date(oldDate);

  //   const time1 = Date.parse(newDate1)
  //   const time2 = Date.parse(oldDate1)

  //   console.log(newDate, newDate1)
  //   console.log(oldDate, oldDate1)

  //   const count =  Math.floor((Math.abs(time1 - time2))/1000/60/60/24);  
  //   this.setData({
  //     days: Math.floor(count),
  //     prices: this.data.room.price*count
  //   })

  // },

    // 计算下一天

    // nextDay(d){
    //   const today = new Date(d);
    //   const year = today.getFullYear();
    //   const month = today.getMonth()+1;
    //   const date = today.getDate();
     
    //   let date1 = month + '-' + date
    //   let wdate1 = year + '-' + month + '-' + date
      
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
    //   }
    //   return dd;
    // },
})