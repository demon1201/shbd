// pages/addParticipant/addParticipant.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sfz:'',
    pitemsg: '是否带餐具：',
    pmsg: '加收50元',
    pvalue: '',
    fj:'',
    activityName: '趣浪六一·FUN飞山海半岛',
    selfName: app.globalData.myself,
    bname: '',
    // 打开添加页面
    show: true,
    // 亲友
    parts: [],
    roles1: ['嘉宾', '孩子', '亲友', '朋友'],
    // 添加亲友信息
    partName: '',
    partID: '',
    role: 0,
    // 关系列表
    roles: [
      {
        id: 0,
        name: '嘉宾',
        act: true
      },
      {
        id: 1,
        name: '孩子',
        act: false
      },
      {
        id: 2,
        name: '亲友',
        act: false
      },
      {
        id: 3,
        name: '朋友',
        act: false
      },
    ],
    // 我的亲友个数限制
    mynum: 5,
    // 选中的时间信息
    date: "9：00~12：00",
    day: 6,
    month: 6,
    num: 40,
    year: 2021,
    price: 50,
    myname: '',
    rnum: '',
    fx_title: '',
    isR: false,
    fx_status:'',
    fx_money:0
  },
  
  radioChange11(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    const value = e.detail.value;
    let isR;
    if(value == 'yes'){
      isR = true
    }else{
      isR = false
    }
    this.setData({
      pvalue: value,
      isR
    })
    var fx_money;
    var fx_status;
    var fx_title;
    const items = this.data.pitems
    var k = 0;
    for (let i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value === e.detail.value
      console.log(items[i].value)
      if(e.detail.value==items[i].value){
        fx_money = items[i].money,
        fx_status = items[i].name,
        fx_title = items[i].remark,
        k = i
      }
    }
    console.log(fx_money, items)
    this.setData({
      pitems: items,
      fx_title: fx_title,
      fx_money:fx_money,
      k:k,
      fx_status:fx_status
    })
  },

  // myname: function (e) {
  //   this.setData({
  //     myname: e.detail.value
  //   })
  // },
  // 更改关系角色
  bindPickerChange: function(e) {
    // 更改参与者角色信息
    console.log('picker发送选择改变，携带值为', e.detail.value, e.target.dataset.idx)
    // 获取参与者下标
    const idx = e.target.dataset.idx
    const parts = this.data.parts
    // 更改角色
    parts[idx].role = e.detail.value
    parts[idx].gx = this.data.roles1[e.detail.value]
    console.log(parts)
    // 更新数据
    this.setData({
      parts: parts
    })
  },
  // 添加亲友-选择关系
  checkRole(e){
    const idx = e.target.dataset.idx
    const roles = this.data.roles
    // 清空选中状态
    for (const role of roles) {
      role.act = false
    }
    // 点击添加选中状态
    roles[idx].act = true
    console.log()
    this.setData({
      role: idx,
      roles: roles
    })

  },
  // 取消按钮
  cancel(){
    this.setData({
      show: true
    })
  },
  // 打开添加页
  showAddOneParticipant(){
    var that = this;
    var number = that.data.parts.length+2
    console.log(number)
    if(that.data.bname == ''){
      wx.showToast({
        title: '请先输入本人姓名',
        icon: 'loading',
        duration: 500
      })
      return 
    }
    if(number>that.data.num){
      wx.showToast({
        title: '剩余数量不足，请选择其他时间段',
        icon: 'loading',
        duration: 500
      })
      return 
    }
    wx.showToast({
      title: '',
      icon: 'loading',
      duration: 200
    })
    const _this = this
    setTimeout(function(){
      _this.setData({
        show: false
      })
    }, 1000)

    
  },
  // 添加亲友
  addOneParticipant(){


    const parts = this.data.parts
    if(parts.length >= 5){
      wx.showToast({
        title: '限量五个名额',
        icon: 'loading',
        duration: 1000
      })
    }
    const data = {
      name: this.data.partName,
      idcard: this.data.partID,
      role: this.data.role,
      gx: this.data.roles1[this.data.role],
      money: this.data.money
    }
    if(data.name=='' || !data.name){
      wx.showToast({
        title: '请输入姓名',
        icon: 'loading',
        duration: 500
      })
      return false;
    }

    if(this.data.activity.is_sfz==1){
      let reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    
      if (reg.test(data.idcard) == false) {
        wx.showToast({
          title: '身份证号码有误',
          icon: 'none',
          duration: 1000
        })
        return false;
      }
    }
    
    parts.push(data)
    const roles = this.data.roles
    // 清空选中状态
    for (const role of roles) {
      role.act = false
    }
    // 点击添加选中状态
    roles[0].act = true
    // 添加并初始化
    wx.showToast({
      title: '添加成功',
      icon: 'success',
      duration: 500
    })
    const _this = this
    setTimeout(function(){
      _this.setData({
        parts: parts,
        role: 0,
        partName: '',
        partID: '',
        mynum: _this.data.mynum - parts.length,
        show: true,
        roles: roles
      })
    }, 1000)
    
  },
  // 下一步
  nextPage(){
    console.log(this.data.fx_money)
    console.log(this.data.money )
    // return false
   
    if(!this.data.bname || this.data.bname==''){
      wx.showToast({
        title: '请输入本人姓名',
        icon: 'loading',
        duration: 2000
      })
      return 
    }
    if(!this.data.phone || this.data.phone==''){
      wx.showToast({
        title: '请输入电话',
        icon: 'loading',
        duration: 2000
      })
      return 
    }
    if (this.data.phone.length != 11) {
      wx.showToast({
        title: '手机号长度有误！',
        icon: 'error',
        duration: 1000
      })
      return false;
    }
    if (!(/^((13[0-9])|(14[0-9])|(15[0-9])|(16[0-9])|(17[0-9])|(18[0-9])|(19[0-9]))\d{8}$/.test(this.data.phone))) {

      wx.showToast({

        title: '手机号码有误',

        duration: 1000,

        icon: 'none'

      });
      return false;
    }
    if(this.data.activity.is_sfz==1){
      let reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    
      if (reg.test(this.data.sfz) == false) {
        wx.showToast({
          title: '身份证号码有误',
          icon: 'none',
          duration: 1000
        })
        return false;
      }
    }
    
    if(this.data.activity.fx_title){
      if(!this.data.pvalue || this.data.pvalue==''){
        wx.showToast({
          title: '请选择',
          icon: 'loading',
          duration: 2000
        })
        return 
      }
    }
      

    console.log(this.data.fj)
    let part; 
    let pnum;
    if(this.data.isR) {
      part = this.data.parts.push(
        {
          name: this.data.bname,
          role: this.data.role,
          gx: '',
          money: this.data.money
        },
        {
          money: this.data.fx_money,
          name: this.data.fx_title,
          role: this.data.role,
          gx: '',
          num: this.data.rnum
        }
      );
      pnum = this.data.parts.length-1;
    } else{
      part = this.data.parts.push(
        {
          name: this.data.bname,
          role: this.data.role,
          gx: '',
          money: this.data.money
        }
      );
      pnum =this.data.parts.length;
    }
    // let part = this.data.parts.push(
    //   {
    //     name: this.data.bname,
    //     role: this.data.role,
    //     gx: '',
    //     money: this.data.money
    //   },
    //   {
    //     money: this.data.fx_money,
    //     name: this.data.fx_title,
    //     role: this.data.role,
    //     gx: '',
    //     num: this.data.rnum
    //   }
    // )

   
  
    let data = {
      title: this.data.title,
      parts: this.data.parts,
      pid_title: this.data.pid_title,
      price:  parseInt(this.data.money * pnum)+ parseInt(this.data.fx_money * this.data.rnum),
      pid:this.data.pid,
      activity_id:this.data.activity_id,
      time:this.data.time,
      photo:this.data.photo,
      name:this.data.myname,
      phone:this.data.phone,
      rnum:this.data.rnum,
      fj:this.data.fj,
      sfz:this.data.sfz,
      fx_status:this.data.fx_status,
    }
    data = JSON.stringify(data)
    wx.navigateTo({
      url: '/pages/activityPay/activityPay?data=' + data,
    })
    this.setData({
      bname: '',
      parts:[]
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let data = JSON.parse(options.data)
    var _this =  this;
    wx.getStorage({
      key: "id",
      success: function (user) {
    let url = app.globalData.URL + '/er/shbd/get_activity_detail';
    let data2 = {
      id: data.activity_id,
      user_id:user.data
    };
    app.wxRequest('POST', url, data2, (res) => {
      if(res.code==1){
        _this.setData({
          activity:res.activity,
          pitems:res.activity.pitems
        })
      
      }
    }, (err) => {
      console.log(err.errMsg)
    })
  }})

    console.log(data)
    this.setData({
      num: data.num,
      title: data.title,
      date: data.date,
      photo: data.photo,
      pid:data.pid,
      money:data.money,
      pid_title:data.pid_title,
      activity_id:data.activity_id,
      time:data.date
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