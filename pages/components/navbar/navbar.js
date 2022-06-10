// components/navbar/navbar.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    pageName:String,
    showNav:{
      type:Boolean,
      value:true
    },
    sorr:{
      type:Boolean,
      value:false
    },
    share1:{
      type:Boolean,
      value:false
    },

  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  lifetimes: {
    attached: function () {
      this.setData({
        navH: app.globalData.navHeight,
        navTop : app.globalData.navTop
      })
     }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    navBack: function () {
      wx.navigateBack({
        delta: 1
      })      
    },
    toHome() {
     wx.reLaunch({
       url: '/pages/index/index',
     })   
    },
    navHeight: function(e){
      this.triggerEvent('navH', app.globalData.navHeight)
    }
  }
})
