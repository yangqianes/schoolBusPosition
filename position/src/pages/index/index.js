//index.js
const app = getApp()
Page({
  data: {
    longitude: 113.324520,
    latitude: 23.099994,

    boxDisplay:true,
    repairFeedbackDisplay:false,


    disabled: true,
    timer:"",
    feedbackErea:"",
    submitFeedback:[],
  
    markers: [
      {
        iconPath: "../img/greenBus.png",
        id: 0,
        latitude: 30.495214532303866,
        longitude: 114.39670774090536,
        width: 30,
        height: 30
      }
    ],
    //路线
    polyline: [{
      points: [{
        longitude: 114.3953508139 ,
        latitude: 30.4935356094 
      }, {
          longitude: 114.3964666128,
          latitude: 30.4932952419 
        }, {
          longitude: 114.3960320950 ,
          latitude: 30.4916218979 
        }, {
          longitude: 114.3934786320,
          latitude: 30.4919316074
        },
        {
          longitude: 114.3934732676,
          latitude: 30.4914462413,
        },
        {
          longitude: 114.3920302391,
          latitude: 30.4914323737, 
        },
        {
          longitude: 114.3920999765,
          latitude: 30.4900779583, 
        },
        {
          longitude: 114.3915581703,
          latitude: 30.4886033344, 
        },
        {
          longitude: 114.3913757801,
          latitude: 30.4864306503, 
        },
        {
          longitude: 114.3916976452,
          latitude: 30.4846970910, 
        },
        {
          longitude: 114.3925344944,
          latitude: 30.4841238539, 
        },
        {
          longitude: 114.3918746710,
          latitude: 30.4823717616,
        },
        {
          longitude: 114.3909251690,
          latitude: 30.4823948765, 
        }],
      color: "#FF0000DD",
      width: 2,
      dottedLine: true
    }],

    // 故障反馈类型
    feedbacks: [
      { name: 'location', value: '校车的定位错误；定位与实际位置偏离'},
      // { name: 'state', value: '校车颜色标示的状态与校车的实际状态不符' },
      { name: 'number', value: '校车车号不对应' },
    ],
  
  },
  onLoad: function (options) {
    console.log("onLoad")
    const that = this
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
  },
  onReady: function (e) {
    // 请求车辆定位信息
    console.log("onReady")
    const that = this

    wx.login({
      success: res => {
        if (res.code) {
          let authorizeUrl = app.BASE_URL + '/user/session'
          let authorizeData = { code: res.code }
          app.request(authorizeUrl, 'POST', authorizeData, res => {
            console.log('/user/session')
            console.log(res)
            wx.setStorageSync('token', res.header.Authorization)
            const busPositionUrl = app.BASE_URL + '/bus/all'
            const token = wx.getStorageSync('token')
            that.setData({
              timer: setInterval(function () {
                app.request(busPositionUrl, 'GET', '', res => {
                  console.log(res)
                  const getLatitude = res.data.bused[0].position.latitude
                  const getLongitude = res.data.bused[0].position.longitude.toString()
                  const getId = res.data.bused[0].id
                  that.setData({
                    markers: [
                      {
                        iconPath: "../img/greenBus.png",
                        id: getId,
                        latitude: getLatitude,
                        longitude: getLongitude,
                        width: 30,
                        height: 30
                      }
                    ]
                  })
                  console.log(that.data.markers)
                }, res => { }, { 'Authorization': token }, '')
              }, 20000)
            })
          }, res => { }, { 'content-type': 'application/json' }, '')
        }
      }
    }) 

  },  
  onShow: function (e) {
    console.log("onShow")
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
    this.setData({
      submitFeedback: e.detail.value
    })
  },
  //获取反馈建议texterea的值
  feedbackErea: function (e) {
    this.setData({
      feedbackErea: e.detail.value
    })
  },
  // 提交反馈
  submitFeedback:function(e){
    const that = this
    const feedbackData = { type: that.data.submitFeedback.toString(), text: that.data.feedbackErea}
    const token = wx.getStorageSync('token')
    const feedbackUrl = app.BASE_URL + '/feedback'

    app.request(feedbackUrl, 'POST', feedbackData, res => {
      console.log('feedbackUrl')
      console.log(res)
      wx.showToast({
        title: '成功',
            icon: 'succes',
            duration: 1000,
            mask:true
        })
        that.setData({
          repairFeedbackDisplay: false,
          boxDisplay: true,
        })
    }, res => { }, { 'Authorization': token }, '')

  },
  repairFeedbackBox:function(){
    this.setData({
      repairFeedbackDisplay: false,
      boxDisplay: true,
    })
  },
  Unload:function(){
    clearInterval(this.data.timer)
  },
  clear:function(){
    wx.clearStorageSync()
    console.log("清除数据操作")
  }
})
