// pages/feedback/feedback.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        files: [],
        imageList2:[],
        arr_url:[],
        
        opinion: '',
        tel: '',

    },

    // 提交反馈
    // 提交反馈
    submit(){
      var that = this;
      wx.getStorage({
        key: "id",
        success: function (user) {
        const data = {
            content: that.data.opinion,
            phone: that.data.tel,
            images: [that.data.imageList2],
            appid: wx.getAccountInfoSync().miniProgram.appId,
            uid:user.data
        }
        console.log(data);

        // return false
        if (!data.phone) {
            wx.showToast({
              title: '请输入手机号',
              icon: 'loading',
              duration: 1500
            })
            return false;
          }
          if (data.phone.length != 11) {
            wx.showToast({
              title: '手机号长度有误！',
              icon: 'loading',
              duration: 1500
            })
            return false;
          }
          if (!(/^((13[0-9])|(14[0-9])|(15[0-9])|(16[0-9])|(17[0-9])|(18[0-9])|(19[0-9]))\d{8}$/.test(data.phone))) {
      
            wx.showToast({
      
              title: '手机号码有误',
      
              duration: 2000,
      
              icon: 'none'
      
            });
            return false;
          }
        
          let url = app.globalData.URL + '/er/shbd/message_add';
          app.wxRequest('POST', url, data, (res) => {
            if(res.code==1){
              wx.showToast({
                title: res.msg,
                icon: 'success',
                duration: 2000
              })
              setTimeout(function () {
                wx.reLaunch({
                  url: '/pages/mine/mine',
                })
              }, 1500) //延迟时间
            }
          }, (err) => {
            console.log(err.errMsg)
          })
        }
    })
  },

    chooseImage: function (e) {
        var that = this;
        wx.chooseImage({
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {

                console.log(333333333333333)
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                that.setData({
                    files: that.data.files.concat(res.tempFilePaths)
                });
            }
        })
    },
    previewImage: function(e){
        wx.previewImage({
            current: e.currentTarget.id, // 当前显示图片的http链接
            urls: this.data.files // 需要预览的图片http链接列表
        })
    },
    selectFile(files) {
        console.log('files', files)
        // 返回false可以阻止某次文件上传
    },
    
    uplaodFile(files) {
      console.log('upload files', files)
      // 文件上传的函数，返回一个promise
      return new Promise((resolve, reject) => {
        var tempFilePaths = files.tempFilePaths;
        //上传返回值
        var app = getApp();
        var that = this;
        that.setData({
          urlArr: [], //这用来存放上传多张时的路径数组
        });
        var object = {};
        for (var i = 0; i < tempFilePaths.length; i++) {
          wx.uploadFile({
            url: app.globalData.URL+'/er/upload/webUploaderImages',
            filePath: files.tempFilePaths[i],
            name: 'files',
            formData: {
              cname: that.data.cname
            },
            success: function (res) {
              var imageList2 = that.data.imageList2;
              console.log(imageList2.concat(res.data))
              that.setData({
                imageList2: imageList2.concat(res.data),
                arr_url: that.data.arr_url.concat(app.globalData.URL+res.data),
                
              })
              object['urls'] = that.data.arr_url;
              if (that.data.arr_url.length == tempFilePaths.length) {
                resolve(object)  //这就是判断是不是最后一张已经上传了，用来返回，
                that.setData({
                  arr_url: [],
                  
                })
              }
              // setTimeout(() => {
              //   reject(res)
              // }, 1000)
            }
          })
        }
          
      })
    },
  
    uploadError(e) {
        console.log('upload error', e.detail)
    },
    uploadSuccess(e) {
        console.log('upload success', e.detail)
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            selectFile: this.selectFile.bind(this),
            uplaodFile: this.uplaodFile.bind(this)
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