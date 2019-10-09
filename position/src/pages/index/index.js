//index.js
const app = getApp()

Page({
  
  data: {
    longitude: 113.324520,
    latitude: 23.099994,
    mapHeight:"100vh",

    userLicenseAgreementDisplay:false,
    boxDisplay:false,
    repairFeedbackDisplay:false,

    hasUserInfo: false,
    disabled: true,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    cannotEntery: true,

    timer:"",
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
      }
    ],
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

    var token = wx.getStorageSync('token')
    if (token) {
      let busPositionUrl = app.BASE_URL + '/bus/all'
      app.request(busPositionUrl, 'GET', '', res => {
        let getLatitude = res.data.bused[0].position.latitude / 100
        let getLongitude = res.data.bused[0].position.longitude.toString() / 100
        let getId = res.data.bused[0].id
        that.setData({
          markers: [
            {
              iconPath: "../img/greenBus.png",
              id: 0,
              latitude: 30.487226,
              longitude: 114.392588,
              width: 30,
              height: 30
            }
          ]
        })
        console.log(that.data.markers)
      }, res => { }, { 'Authorization': token }, '')
      clearInterval(that.data.timer)
    } else {
      that.setData({
        timer: setInterval(function () {
          that.onReady()
        }, 10000)
      })
    }
  },  


  bindGetUserInfo: function (e) {
    // 查看是否授权
    let that = this;

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
                      authorizeUrl = app.BASE_URL +'/user/session',
                      authorizeData = { code: res.code }
                      app.request(authorizeUrl, 'POST', authorizeData, res => {
                        wx.setStorageSync('token', res.header.Authorization) 
                      }, res => { }, { 'content-type': 'application/json' }, '')
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

  },
  onShow: function (e) {
    const agreement = wx.getStorageSync('agreement')
    const userEnter = wx.getStorageSync('userEnter')
    userEnter ? this.setData({ cannotEntery: false, userLicenseAgreementDisplay: true }) : this.setData({ cannotEntery: true, userLicenseAgreementDisplay: false })

    if (agreement) {
      this.setData({ userLicenseAgreementDisplay: false, boxDisplay: true })
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
     boxDisplay: true,
   })

    var token = wx.getStorageSync('token')
    let agreementUrl = app.BASE_URL+'/user/agreement'
    app.request(agreementUrl, 'GET', '', res => {
      console.log('agreementUrl')
     console.log(res)
    }, res => { }, { 'Authorization': token }, '')
  },

  //map组件上添加button测试
  toOrder: function (e) {
    wx.navigateTo({
      url: '../agreement/agreement'
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
    let feedbackUrl = app.BASE_URL + '/user/feedback'
    app.request(feedbackUrl, 'GET', '', res => {
      console.log('feedbackUrl')
     console.log(res)
    }, res => { }, {'content-type':'application/json'}, '')

  },
  repairFeedbackBox:function(){
    this.setData({
      repairFeedbackDisplay: false,
      boxDisplay: true,
    })
  }
})
