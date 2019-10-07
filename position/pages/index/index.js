//index.js
const app = getApp()

Page({
  data: {
    longitude: 113.324520,
    latitude: 23.099994,


    userLicenseAgreementDisplay:false,
    mapDisplay:false,
    repairFeedbackDisplay:false,
    boxDisplay:true,

    hasUserInfo: false,
    disabled: true,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    cannotEntery: true,

    submitFeedback:[],
    userInfo: {},
  
    markers: [
      {
        iconPath: "../img/mapMarker.png",
        id: 0,
        latitude: 30.49984,
        longitude: 114.34253,
        width: 30,
        height: 30
      },
      {
        iconPath: "../img/mapMarker.png",
        id: 0,
        latitude: 30.489959,
        longitude: 114.401657,
        width: 30,
        height: 30
      },
      {
        iconPath: "../img/mapMarker.png",
        id: 0,
        latitude: 30.49514,
        longitude: 114.402185,
        width: 30,
        height: 30
      }
    ],
    // 路线
    polyline: [{
      points: [{
        latitude: 30.49984,
        longitude: 114.34253,
      }, {
          latitude: 30.489959,
          longitude: 114.401657,
      },{
          latitude: 30.49514,
          longitude: 114.402185,
      }],
      color: "#FF0000DD",
      width: 2,
      dottedLine: true
    }],

    controls: [{
      id: 1,
      iconPath: '/resources/location.png',
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }],
    // 故障反馈类型
    items: [
      { name: 'location', value: '校车的定位错误；定位与实际位置偏离', color:'red' },
      { name: 'state', value: '校车颜色标示的状态与校车的实际状态不符', color: 'red'  },
      { name: 'number', value: '校车车号不对应', color: 'red'  },
      { name: 'path', value: '路线错误，上车点错误', color: 'red'  },
    ]
  },

  onReady: function (e) {
    // 使用 wx.createMapContext 获取 map 上下文
    let that = this
    this.mapCtx = wx.createMapContext('myMap')
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
      that.setData({
        latitude: latitude,
        longitude: longitude,
      })
      }
    }) 
  },  


  bindGetUserInfo: function (e) {
    // 查看是否授权
    var that = this;

    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              wx.setStorageSync("userInfoStr", res.userInfo)
              wx.login({
                success(res) {
                  var userInfoStr = wx.getStorageSync("userInfoStr");
                  console.log(userInfoStr)
                  if (res.code) {
                    //发起网络请求
                    let nicN = userInfoStr.nickName,
                      nicA = userInfoStr.avatarUrl,
                      // authorizeUrl = app.BASE_URL + '/api/weapp/authorizations',
                      authorizeData = { code: res.code, nickname: nicN, avatar: nicA }

                    // app.request(authorizeUrl, 'POST', authorizeData, res => {
                    //   wx.setStorageSync('token', res.data.access_token)   
                    //   var token = wx.getStorageSync('token')
                    // }, res => { }, { 'content-type': 'application/x-www-form-urlencoded' }, '')
                  } else {
                    console.log('登录失败！' + res.errMsg)
                  }
                }
              })
            }
          })
          wx.setStorageSync("userEnter", true)
          that.setData({
            cannotEntery: false,
            userLicenseAgreementDisplay: true,
          })
        } else {
          console.log("用户拒绝登录")
        }
      }
    })
  },

  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onShow: function (e) {
    const agreement = wx.getStorageSync('agreement')
    const userEnter = wx.getStorageSync('userEnter')
    userEnter ? this.setData({ cannotEntery: false, userLicenseAgreementDisplay: true }) : this.setData({ cannotEntery: true, userLicenseAgreementDisplay: false })

    if (agreement) {
      this.setData({ userLicenseAgreementDisplay: false, mapDisplay: true })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  // 查看用户许可协议详细内容（跳转
  toAgreement:function(e){
    wx.navigateTo({
      url:'../agreement/agreement'
    })
  },
  // 同意用户许可协议后不再显示用户许可协议面板
  agreemented:function(e){
    wx.setStorageSync('agreement', true)
   this.setData({
     userLicenseAgreementDisplay: false,
     mapDisplay: true,
   })
  },
// 故障反馈面板是否显示
  repair:function(){
    this.setData({
      boxDisplay: false,
      repairFeedbackDisplay: true,
    })
  },
  // 获取checkbox的值
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    this.setData({
      submitFeedback: e.detail.value
    })
  },
  // 提交反馈
  submitFeedback:function(e){
    console.log(this.data.submitFeedback)
  },
  repairFeedbackBox:function(){
    this.setData({
      repairFeedbackDisplay: false,
      boxDisplay: true,
    })
  }
})
