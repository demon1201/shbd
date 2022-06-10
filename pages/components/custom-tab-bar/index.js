Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [
      {
      pagePath: "/pages/index/index",
      iconPath: "/pages/images/1.png",
      selectedIconPath: "/pages/images/1-1.png",
      text: "首页"
    }, 
    {
      pagePath: "/pages/hotel_list/hotel_list",
      iconPath: "/pages/images/2.png",
      selectedIconPath: "/pages/images/2.png",
      text: "酒店"
    },
    {
      pagePath: "/pages/member/member",
      iconPath: "/pages/images/3.png",
      selectedIconPath: "/pages/images/3.png",
      text: "会员"
    },
    {
      pagePath: "/pages/mine/mine",
      iconPath: "/pages/images/4.png",
      selectedIconPath: "/pages/images/4-1.png",
      text: "我的"
    }
  ]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      console.log(data)
    
      
        wx.switchTab({url})
        this.setData({
          selected: data.index
        })

   
    }
  }
})

