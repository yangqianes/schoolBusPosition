Page({
  data:{

  },
  // 同意用户许可协议后不再显示用户许可协议面板
  agreemented: function (e) {
    wx.setStorageSync("agreement", true)

    const token = wx.getStorageSync('token')
    const agreementUrl = app.BASE_URL +'/user/agreement'

    app.request(agreementUrl, 'GET', '', res => {
      console.log('agreementUrl')
      console.log(res)
      wx.redirectTo({
        url:'../index/index'
      })
    }, res => { }, { 'Authorization': token }, '')

  },
})