const app = getApp()
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    cannotEntery: true,
    userLicenseAgreementDisplay: false,
    items: [
      { name: 'agreement', value: '我已阅读并同意' },
    ],
    isDisabled: true,
  },
  bindGetUserInfo: function (e) {
 // 查看是否授权
    let that = this;
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.setStorageSync("userEnter", true)
          that.setData({
            cannotEntery: false,
            userLicenseAgreementDisplay: true,
          })
          wx.login({
            success: res => {
              if (res.code) {
                let authorizeUrl = app.BASE_URL + '/user/session'
                let authorizeData = { code: res.code }
                app.request(authorizeUrl, 'POST', authorizeData, res => {
                  console.log('/user/session')
                  console.log(res)
                  wx.setStorageSync('token', res.header.Authorization)
                }, res => { }, { 'content-type': 'application/json' }, '')
              }
            }
          })
        } else {
          console.log("用户拒绝登录")
        }
      }
    })
  },
  onLoad() {

  },
  // 查看用户许可协议详细内容（跳转
  toAgreement: function (e) {
    wx.reLaunch({
      url: '../agreement/agreement'
    })
  },
  // 同意用户许可协议后不再显示用户许可协议面板
  agreemented: function (e) {
    wx.setStorageSync("agreement", true)
    this.setData({
      userLicenseAgreementDisplay: false,
    })
    const token = wx.getStorageSync('token')
    const agreementUrl = app.BASE_URL +'/user/agreement'

    app.request(agreementUrl, 'GET', '', res => {
      console.log('agreementUrl')
      console.log(res)
      wx.reLaunch({
        url: '../index/index'
      })
    }, res => { }, { 'Authorization': token }, '')
  },
  radioChange: function (e) {
    this.setData({
      isDisabled: false
    })
  }
})