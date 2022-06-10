Component({
  data: {
    selected: 1,
    color: "#7A7E83",
    selectedColor: "#A0C3CA",
    list: [
      {
        "pagePath": "/pages/index/index",
        "iconPath": "/pages/images/1.png",
        "selectedIconPath": "/pages/images/1-1.png",
        "text": "首页"
      },
      {
        "pagePath": "/pages/mhsh/mhsh",
        "iconPath": "/pages/images/2.png",
        "selectedIconPath": "/pages/images/2.png",
        "text": "美好生活馆"
      },
      {
        "pagePath": "/pages/member/member",
        "iconPath": "/pages/images/3.png",
        "selectedIconPath": "/pages/images/3.png",
        "text": "会员基地"
      },
      {
        "pagePath": "/pages/mine/mine",
        "iconPath": "/pages/images/4.png",
        "selectedIconPath": "/pages/images/4-1.png",
        "text": "我的"
      }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      console.log(data)
      if(data.index == 2){
        wx.navigateTo({
          url: '/pages/member/member',
        })
        return false;
      }
      if(data.index == 1){
        wx.navigateTo({
          url: '/pages/mhsh/mhsh',
        })
        return false
      }
      
        wx.switchTab({url})
        this.setData({
          selected: data.index
        })

   
    }
  }
})