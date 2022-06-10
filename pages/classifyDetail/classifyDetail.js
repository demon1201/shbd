// pages/hotel/hotel.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    idx:0,
    daoju0:true,
    daoju1:false,
    remark:'',
    array1: ['美国', '中国', '巴西', '日本'],
    index1: 0,
    yhj_id:0,
    zrf: false,
    daifu: {
      title1: '烧烤场',
      guige: '购买食材a套餐',
      date: '2021-08-31 12:00',
      tuiding: ''
    },

    date1:'2021-6-30 13:37',
    disabled:false,//设置是否能点击 false可以 true不能点击
    startDate: '2021-6-30 13:37',
    endDate: '2099-12-12 12:12',
    placeholder:'请选择时间',
    url: app.globalData.URL,
    navHeight: app.globalData.navHeight,
    navTop: app.globalData.navTop,
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 500,
    zuonum:1,
    zuonum1:1,
    sorr: false,
    star: 0,
    in: 1,
    // 经度
    // 底部提醒
    consultTitle: '用餐须知',
    consult: `从业主日常生活出发，在社区内规划业主食堂，设计风格精致简约，
    给人营造出大方、舒适的格调，根据业主饮食习惯,提供温馨质朴，整洁干净，
    “安心、安享、安逸”的就餐环境和一个共享美食又能畅谈天地的场所。`,
    // 6品类展示
    detailItemsTitle: '菜品',
    detail_items: [],
    taocan: [],
    guige: [
      {
        id: 1,
        name: '半场',
        open: true,
      },
      {
        id: 2,
        name: '全场',
        open: false
      }
    ],
    cd_money:0,
    money3:10,
    money4:0,
    num: 1,
    num1: 0,
    taocan_price:{},
    vip: 2,
    gh:0,
    
    // 业主权益
    isqy: {
 
    },
    // 星河权益
    otherqy: 
      {
      },
      // 游客权益
      ykqy:{
      },
      pay: false,
      show: false,

      // 相册图
      imgUrls: [

      ],
      current: 0,
      // 桌子个数
      znum: 1,
      date: '',
      start1: "",
      stop: "",
      stop1: "",
      themes: {
    
        blue: {
          bg: "#fff",
          fontColor: "#000",
          rangeStartColor: "#86b7c1",
          rangeColor: "#86b7c1",
          rangeEndColor: "#86b7c1"
        }
      },
      time_box1: false,
    show: false, coupon:[
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
    }
  
    },
    remark: function(e) {
      this.setData({
        remark: e.detail.value
      })
    },
    bindPickerChange1: function(e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        index1: e.detail.value,
        date:this.data.arr_time[e.detail.value]
      })
    },

    daoju0(){
        this.setData({
          daoju0:true,
          money4:0,
          num1:0,
          daoju1:false,
        })
    },
    daoju1(){
      this.setData({
        daoju0:false,
        daoju1:true,
        num1:1,
        money4:Number(this.data.money3)*(2-1),
      })
  },
    qr(){
      this.setData({
        state_id:1,
      })
    },
    phone_call: function (e) {
      wx.makePhoneCall({
        phoneNumber: '0752-8678820'
      })
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
      // 原价
      this.setData({
        cou: discount.name + ' ' + discount.zhekou,
        yhq: false,
        ['isqy.zk']: discount.dis*10,
        yhj_id:discount.id
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
  
// 选择时间
  onPickerChange: function (e) {
    console.log(e.detail, '11111111111');
    this.setData({
      date: e.detail.dateString
    })
  },
  qx(){
    this.setData({
      zrf: false
    })
  },
  offCalendar () {
    this.setData({time_box1: false});
  },
  bindDateChange2: function(e) {
    this.setData({
      time_box1: true
    })
    return false
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
      date: detail,
      time_box1: false
    });
  },
  colbox1(){
    this.setData(
      {
        time_box1: false
      }
    )
  },
  add(){

    let i = this.data.num;
    i++
    var sta_id = this.data.sta_id;
    if(sta_id==25){
      var gh = (i-1)*300;
      var money = Number(this.data.money2)+Number(gh);
      this.setData({
        num: i,
        money: money,
        gh: gh,
      })
    }else{
      var cont = Math.ceil(i/this.data.number);
      console.log(i)
      console.log(this.data.number)
      console.log(cont)
  
      // if(i>=this.data.number){
      //   cont = 2;
      // }
      this.setData({
        num: i,
        zuonum: cont
      })
    }
    
    
  },

  add1(){

      let i = this.data.num1;
      i++
      var money = Number(this.data.money3)*(i);
      this.setData({
        num1: i,
        money4: money,
      })
    
  },
  subtraction1(){

    let i = this.data.num1;
    if(i<=1){
      return false
    }
    let cont = 1;
    console.log(cont)
    var sta_id = this.data.sta_id;
      i--;
      var money = Number(this.data.money3)*(i);
      this.setData({
        num1: i,
        money4: money,
      })
  },

  subtraction(){

    let i = this.data.num;
    if(i<=1){
      return false
    }
    let cont = 1;
    console.log(cont)
    var sta_id = this.data.sta_id;
    if(sta_id==25){
      i--;
      var gh2 = (i-1)*300;
      var money = Number(this.data.money2)+Number(gh2);
      this.setData({
        num: i,
        money: money,
        gh: gh2,
      })
    }else{

      if(i<=1){
        return false
      }else{
        i--;
        // cont = Math.ceil(i/8);
        // if(i>=this.data.number){
        //   cont = 2;
        // }
        cont = Math.ceil(i/this.data.number);
      
      }
      
      this.setData({
        num: i,
        yuan_moneys: this.data.money * i,
        zuonum: cont
      })
    }


  },
  num(e){
    console.log(e)
    // let cont = 1;
    var n = e.detail.value;
    // if(n>=this.data.number){
    //   cont = 2;
    // }
    var sta_id = this.data.sta_id
    if(sta_id==25){
      n = Number(n)
      console.log(n)

      var gh = (n)*300;
      var money = Number(this.data.money2)+Number(gh);
      this.setData({
        num: n,
        money: money,
        gh: gh,
      })
    }else{
      let cont = Math.ceil(n/this.data.number);
      this.setData({
        zuonum: cont
      })
    }








    
  },
  seeImg(e){
    const url = e.currentTarget.dataset.url;
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: [url,] // 需要预览的图片http链接列表
    })
  },
  // 选择规格
  gg1(e){
    const idx = e.currentTarget.dataset.idx
    console.log(idx)
    
    for (const item of this.data.guige) {
        item.open = false
    }
    this.data.guige[idx].open = true,
    this.setData({
      guigename: this.data.guige[idx].name,
      guige: this.data.guige,
      guige_id: e.currentTarget.dataset.id,
      money: this.data.guige[idx].money,
      cd_money: this.data.guige[idx].cd_money,
      number: this.data.guige[idx].number,
      danwei: this.data.guige[idx].danwei,
      danwei2: this.data.guige[idx].danwei2,
      content: this.data.guige[idx].content,
      zc: this.data.guige[idx].zc,
      num:1,
      zuonum:1
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
// 隐藏价格栏
  payy(){
    this.setData({
      pay: false
    })
  },
  // 选择价格
  pay1(){
    this.setData({
      pay: true,
    })
  },
  pay11(){
    var that = this;

    // console.log(that.data.user_id)
    var sta_id = this.data.sta_id;
    if(sta_id==25){
      var money = this.data.money+that.data.money4;
    }else{
      var money = that.data.number == 0?(that.data.money*that.data.isqy.zk*that.data.num/10+that.data.money4).toFixed(2):(that.data.money*that.data.isqy.zk*that.data.num/10+that.data.cd_money*that.data.zuonum+that.data.money4).toFixed(2);
    }
   
    const cd_money = that.data.cd_money*that.data.zuonum;
    wx.showToast({

      title: '生成订单',
      duration: 2000,
      icon: 'none'

    });
    // 
    var num1 = that.data.num1;
    if(!that.data.date){
      wx.showToast({
        title: '请选择时间',
        icon: 'error',
        duration: 2000
      })
      return
    }
    if(that.data.pid==3){
      ///篮球足球
      if(num1>1){
        wx.showToast({
          title: '最多租赁1个',
          icon: 'error',
          duration: 2000
        })
        return
      }
    }
    if(that.data.pid==4){
      ///篮球足球
      if(num1>2){
        wx.showToast({
          title: '最多租赁2个',
          icon: 'error',
          duration: 2000
        })
        return
      }
    }
    if(that.data.pid==5){
      ///网球
      if(num1>8){
        wx.showToast({
          title: '最多租赁8个',
          icon: 'error',
          duration: 2000
        })
        return
      }
    }
    // 
    wx.getStorage({
      key: "id",
      success: function (user) {
      const data2 = {
        pid:that.data.pid,
        type_id:that.data.id,
        cate_id:that.data.detail.id,
        appid: wx.getAccountInfoSync().miniProgram.appId,
        
        user_id:user.data,
        money:money,
        num1:num1,
        cd_money:cd_money,
        time: that.data.date,
        guige_id:that.data.guige_id,
        num:that.data.num,
        remark:that.data.remark
      }
    let url1 = app.globalData.URL + '/er/shbd/shbd_insert';
    app.wxRequest('POST', url1, data2, (res) => {
        if(res.code==1){
          that.setData({
            zrf : true,
            money5:money,
            id:res.id
          })
          
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
      }
    })
  },
  // 支付

  pay2(e){
    var that = this;
    console.log(that.data.num, that.data.num/10);
    console.log(that.data.money*that.data.isqy.zk);
    console.log(that.data.cd_money);
    console.log(that.data.zuonum, that.data.number);
   
    // const money = that.data.money * that.data.num*that.data.isqy.zk/10;
    var sta_id = that.data.sta_id;
   
      
     
      if(sta_id==25){
        var money = that.data.money;
        console.log(money)
        console.log(111111111111222222222222)
      }else{
        var money = that.data.number == 0?(that.data.money*that.data.isqy.zk*that.data.num/10+that.data.money4).toFixed(2):(that.data.money*that.data.isqy.zk*that.data.num/10+that.data.cd_money*that.data.zuonum+that.data.money4).toFixed(2);
      }
      console.log(money);
    const cd_money = that.data.cd_money*that.data.zuonum;
    console.log(this.data.sta_id)
    // return 
    console.log(that.data.detail.id)//项目id[中央公园]
    console.log(that.data.pid)//类型id【类型】
 
    console.log(that.data.guige_id)//规格id

    // return false
    
    that.setData({
      pay:'no',
    })
    var num1 = that.data.num1;
    if(!that.data.date){
      wx.showToast({
        title: '请选择时间',
        icon: 'error',
        duration: 2000
      })
      return
    }
    if(that.data.pid==3){
      ///篮球足球
      if(num1>1){
        wx.showToast({
          title: '最多租赁1个',
          icon: 'error',
          duration: 2000
        })
        return
      }
    }
    if(that.data.pid==4){
      ///篮球足球
      if(num1>2){
        wx.showToast({
          title: '最多租赁2个',
          icon: 'error',
          duration: 2000
        })
        return
      }
    }
    if(that.data.pid==5){
      ///网球
      if(num1>8){
        wx.showToast({
          title: '最多租赁8个',
          icon: 'error',
          duration: 2000
        })
        return
      }
    }
    // return false
    wx.getStorage({
      key: "id",
      success: function (user) {
      let url1 = app.globalData.URL + '/er/pay/shbd_pay';
      const data1 = {
        pid:that.data.pid,
        cate_id:that.data.detail.id,
        appid: wx.getAccountInfoSync().miniProgram.appId,
        user_id:user.data,
        money:money,
        num1:num1,
        time: that.data.date,
        guige_id:that.data.guige_id,
        remark:that.data.remark,
        num:that.data.num,
        cd_money:cd_money?cd_money:0,
        yhj_id:that.data.yhj_id
      }
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
                  url: '/pages/taocan/taocan'
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
            })
          }, 2000)
        }, (err) => {
          console.log(err.errMsg)
        })
      }
    })
  },

  // 选择套餐
  tc(e){
    const idx = e.currentTarget.dataset.idx
    console.log(idx)
    
    for (const item of this.data.taocan) {
        item.open = false
    }
    let gg = []
    for (const item of this.data.taocan[idx].guige) {
        item.open = false
        gg.push(item)
    }
    gg[0].open = true;
    this.data.taocan[idx].open = true,
    this.daoju0();
    this.setData({
      idx:idx,
      money3:this.data.taocan[idx].money,
      guige_id:this.data.taocan[idx].guige[0].id,
      guigelx: this.data.taocan[idx].name,
      danwei:this.data.taocan[idx].guige[0].danwei,
      danwei2:this.data.taocan[idx].guige[0].danwei2,
      content:this.data.taocan[idx].guige[0].content,
      zc:this.data.taocan[idx].guige[0].zc,
      taocan: this.data.taocan,
      guige: gg,
      money: gg[0].money,
      cd_money: gg[0].cd_money,
      number: gg[0].number,
      taocan_price: this.data.taocan[idx],
      isqy: this.data.taocan_price.prices,
      otherqy: this.data.taocan_price.prices[1],
      ykqy: this.data.taocan_price.prices[2],
      pid:e.currentTarget.dataset.pid,
      cate_title:e.currentTarget.dataset.title,
    })
  },
  // 打电话
  call: function(e){
    wx.makePhoneCall({
      phoneNumber: this.data.detail.tel
    })
  },
  toMap(){

    const MapContext = wx.createMapContext('myMap')

    MapContext.openMapApp({
      longitude: Number(this.data.detail.lng) ,
      latitude: Number(this.data.detail.lat),
      destination: this.data.detail.title
    })
  },
  // 轮播图index
  swiperTab: function(e) {
    this.setData({
      in: e.detail.current+1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    const dd = new Date().getTime()+24*60*60*1000;
    console.log(new Date(dd))
    let today = new Date(dd);
    const year = today.getFullYear();
    const month = today.getMonth()+1;
    const date = today.getDate();

    let now = new Date();
    let startD = now.getFullYear() + '-' + (now.getMonth()+1) + '-' + now.getDate() + ' ' + now.getHours() + ':' + now.getMinutes();
    this.setData({
      date1: startD,
      startDate: startD,
    })
    let wdate1 = year + '-' + month + '-' + date
    
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
    //   if(month+1 <10){
    //     date2 = '0' + month+1 + '-' + '01'
    //     wdate2 = year + '-' + '0' + month+1 + '-' + '01'
    //   }else{
    //     date2 = month+1 + '-' + '01'
    //     wdate2 = year + '-' + month+1 + '-' + '01'
    //   }
      
    // }else{
    //   if(month<10){
    //     if(date < 10){
    //       wdate1 = year + '-' + '0'+month + '-' + '0' + (Number(date))
    //     }else{
    //       wdate1 = year + '-' + '0'+month + '-' + (Number(date))
    //     }
       
    //   }else{
    //     if(date < 10){
    //       date1 = month + '-0' + (Number(date))
    //       wdate1 = year + '-0' + month + '-' + (Number(date))
    //     }else{
    //       date1 = month + '-' + (Number(date))
    //       wdate1 = year + '-' + month + '-' + (Number(date))
    //     }
        
    //   }
    // }
    var share1 = false;
    if(options.share1){
      share1 = options.share1
    }
    console.log("传参1"+options.share1)
    console.log("传参"+share1)
    console.log(options)
    that.setData({
      theme: this.data.themes.blue,
      state_id:options.id,
      share1:share1,
      sta_id:options.id,
      
    });
    // let url = app.globalData.URL + '/er/shbd/detail';
    // let data1 = {
    //   id:options.id
    // };
    // app.wxRequest('POST', url, data1, (res) => {

    //   if(res.code==1){
       
    //     this.setData({
    //       detail:res.detail,
    //     })

    //   }
    // }, (err) => {
    //   console.log(err.errMsg)
    // })
    that.get_lists(options.id,wdate1);
    wx.hideShareMenu();
  },
get_lists(id,wdate1){
    var that = this;
    wx.getStorage({
      key: "id",
      success: function (ms) {
        let url = app.globalData.URL + '/er/shbd/detail';
        let data = {
          id:id,
          user_id:ms.data
        };
        app.wxRequest('POST', url, data, (res) => {
          
          if(res.detail.pay==1){

            console.log(res.taocan[0].guige)
            for (let i = 0; i <res.taocan.length; i++) {
              
              res.taocan[i]['content'] =res.taocan[i]['content'].replace(/<img /g, '<img class="rich_img" ');
            }

            console.log(res.taocan[0].guige)
            let gg = []
            for (const item of res.taocan[0].guige) {
                item.open = false
                gg.push(item)
            }
            gg[0].open = true;
            if(id==9){
              wdate1 = res.arr_time[0]
            }else{
              wdate1 = res.nex_time
            }
            //中央公园购货
            if(id==25){
              that.setData({
                money:res.taocan[0].guige[0].money*res.taocan[0]['prices'].zk
              })
            }
            that.setData({
              // detail:res.detail,
              guige_id:res.taocan[0].guige[0].id,
              taocan:res.taocan,
              taocan_price:res.taocan[0],
              guige:gg,
              money3: res.taocan[0].money,
              guigelx: res.taocan[0].name,
              money: res.taocan[0].guige[0].money,
              money2: res.taocan[0].guige[0].money,
              cd_money: res.taocan[0].guige[0].cd_money,
              number: res.taocan[0].guige[0].number,
              danwei: res.taocan[0].guige[0].danwei,
              danwei2: res.taocan[0].guige[0].danwei2,
              content: res.taocan[0].guige[0].content,
              zc: res.taocan[0].guige[0].zc,
              vip:res.vip,
              isqy:res.taocan[0]['prices'],
              otherqy:res.taocan[0]['prices'][1],
              ykqy:res.taocan[0]['prices'][2],
              pid:res.taocan[0]['id'],
              cate_title:res.taocan[0]['name'],
              coupon:res.juan,
              arr_time:res.arr_time,
              date: wdate1,

            })
          }
            let imgUrls = []
            const deurl = res.detail.banner1
            for (const url of deurl) {
              let ur = that.data.url + url
              imgUrls.push(ur)
            }
            console.log(imgUrls, '1231232131')
            that.setData({
              detail:res.detail,
              imgUrls: imgUrls,
            })

          

        }, (err) => {
          console.log(err.errMsg)
        })

      },
      fail:function(){
        console.log("重新请求")
        wx.getSetting({
          success: function (res) {
            wx.login({
              success: function (res) {
                if (res.code) {
                  //发起网络请求
                  wx.request({
                    url: 'https://pt.zerom.cn/er/index/sendCode',
                    data: {
                      code: res.code,
                      appid: wx.getAccountInfoSync().miniProgram.appId
                    },
                    success: function (msg) {
                      let url = app.globalData.URL + '/er/shbd/detail';
                        let data = {
                          id:id,
                          user_id:msg.data.id
                        };
                        app.wxRequest('POST', url, data, (res) => {
                          
                          that.setData({
                            detail:res.detail,
                            taocan:res.taocan,
                            vip:res.vip,
                            taocan_price:res.taocan[0],
                          })

                        }, (err) => {
                          console.log(err.errMsg)
                        })

                    }
                  })
                } else { }
                //获取所有用
              }
            });
    
          }
        })

        // setTimeout(function () {
        //   that.get_id()
        // }, 1000)
      }
    })
 
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  onShareAppMessage: function (e) {
    console.log(e.target.id)
    var that = this;

    if(e.target.id){

      return {
        path: '/pages/classifyDetail/classifyDetail?id='+that.data.sta_id+'&share1=true'
      }
    }
    console.log('/pages/negotiation1/negotiation?id='+that.data.id)
    return {
      title: '您的好友申请代付款',
      path: '/pages/negotiation1/negotiation?id='+that.data.id
    }
    // that.data.nickname+'--'+

  }
})