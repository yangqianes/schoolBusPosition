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
      { name: 'location', value: '校车的定位错误；定位与实际位置偏离'},
      { name: 'state', value: '校车颜色标示的状态与校车的实际状态不符' },
      { name: 'number', value: '校车车号不对应' },
      // { name: 'path', value: '路线错误，上车点错误', color: 'red'  },
    ]
  },

  onReady: function (e) {
    // 使用 wx.createMapContext 获取 map 上下文
    let that = this
    this.mapCtx = wx.createMapContext('myMap')
    //获取当前位置
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

    let code = wx.getStorageSync('code')
    console.log(code)
    if (code) {
      console.log("codecodecodecode")

      // let authorizeUrl = app.BASE_URL + '/user/session'
      // let authorizeData = { code: code }
      // app.request(authorizeUrl, 'POST', authorizeData, res => {
      //   console.log(res)
      //   wx.setStorageSync('token', res.header.Authorization)

        var token = wx.getStorageSync('token')
        console.log(token)
        let busPositionUrl = app.BASE_URL + '/bus/all'
        app.request(busPositionUrl, 'GET', '', res => {
          console.log(res)
          let getLatitude = res.data.bused[0].position.latitude
          let getLongitude = res.data.bused[0].position.longitude.toString()
          let getId = res.data.bused[0].id
          console.log(getLatitude)
          console.log(getLongitude)
          console.log(getId)
          that.setData({
            markers: [
              {
                iconPath: "../img/greenBus.png",
                id: getId,
                // latitude: '30.4871610474',
                latitude: getLatitude,
                longitude: getLongitude,
                // longitude: '114.3926203251',
                width: 30,
                height: 30
              }
            ]
          })
          console.log(that.data.markers)
        }, res => { }, { 'Authorization': token }, '')
      // }, res => { }, { 'content-type': 'application/json' }, '')
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
                    wx.setStorageSync('code', res.code)
                    that.onReady();
                    // let code = wx.getStorageSync('code')
                    // console.log(code)
                    // let authorizeUrl = app.BASE_URL +'/user/session'
                    // let  authorizeData = { code:code }
                    //   app.request(authorizeUrl, 'POST', authorizeData, res => {
                    //     console.log(res)
                    //     wx.setStorageSync('token', res.header.Authorization) 
                    //     var token = wx.getStorageSync('token')
                    //     console.log(token)
                    //   }, res => { }, { 'content-type': 'application/json' }, '')
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
    //测试需要，后期删除
    // if (agreement) {
    //   this.setData({ userLicenseAgreementDisplay: true, boxDisplay: false })
    // }
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
    let agreementUrl = app.BASE_URL +'/user/agreement'

    // app.request(agreementUrl, 'GET', '', res => {
    //   console.log('agreementUrl')
    //  console.log(res)
    // }, res => { }, { 'Authorization': token }, '')
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
    // var token = wx.getStorageSync('token')
    // let feedbackUrl = app.BASE_URL + '/feedback'
    // let data = { text: "定位与实际位置偏离",type: "校车的定位错误；定位与实际位置偏离", }
    // app.request(feedbackUrl, 'POST', data, res => {
    //   console.log('feedbackUrl')
    //  console.log(res)
    //  console.log(data)
    // }, res => { }, { 'Authorization': token }, '')

  },
  repairFeedbackBox:function(){
    this.setData({
      repairFeedbackDisplay: false,
      boxDisplay: true,
    })
  }
})
