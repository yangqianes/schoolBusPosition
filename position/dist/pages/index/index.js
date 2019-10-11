;require('./../../runtime');(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([[2],{

/***/ 20:
/***/ (function(module, exports) {

//index.js
var app = getApp();
Page({
  data: {
    longitude: 113.324520,
    latitude: 23.099994,
    mapHeight: "100vh",
    userLicenseAgreementDisplay: false,
    boxDisplay: false,
    repairFeedbackDisplay: false,
    hasUserInfo: false,
    disabled: true,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    cannotEntery: true,
    timer: "",
    submitFeedback: [],
    userInfo: {},
    markers: [{
      iconPath: "../img/mapMarker.png",
      id: 0,
      latitude: 30.49984,
      longitude: 114.34253,
      width: 30,
      height: 30
    }],
    // 故障反馈类型
    items: [{
      name: 'location',
      value: '校车的定位错误；定位与实际位置偏离'
    }, {
      name: 'state',
      value: '校车颜色标示的状态与校车的实际状态不符'
    }, {
      name: 'number',
      value: '校车车号不对应'
    } // { name: 'path', value: '路线错误，上车点错误', color: 'red'  },
    ]
  },
  onReady: function onReady(e) {
    // 使用 wx.createMapContext 获取 map 上下文
    var that = this;
    this.mapCtx = wx.createMapContext('myMap'); //获取当前位置

    wx.getLocation({
      type: 'gcj02',
      //返回可以用于wx.openLocation的经纬度
      success: function success(res) {
        var latitude = res.latitude;
        var longitude = res.longitude;
        that.setData({
          latitude: latitude,
          longitude: longitude
        });
      }
    });
    var code = wx.getStorageSync('code');
    console.log(code);

    if (code) {
      console.log("codecodecodecode"); // let authorizeUrl = app.BASE_URL + '/user/session'
      // let authorizeData = { code: code }
      // app.request(authorizeUrl, 'POST', authorizeData, res => {
      //   console.log(res)
      //   wx.setStorageSync('token', res.header.Authorization)

      var token = wx.getStorageSync('token');
      console.log(token);
      var busPositionUrl = app.BASE_URL + '/bus/all';
      app.request(busPositionUrl, 'GET', '', function (res) {
        console.log(res);
        var getLatitude = res.data.bused[0].position.latitude;
        var getLongitude = res.data.bused[0].position.longitude.toString();
        var getId = res.data.bused[0].id;
        console.log(getLatitude);
        console.log(getLongitude);
        console.log(getId);
        that.setData({
          markers: [{
            iconPath: "../img/greenBus.png",
            id: getId,
            // latitude: '30.4871610474',
            latitude: getLatitude,
            longitude: getLongitude,
            // longitude: '114.3926203251',
            width: 30,
            height: 30
          }]
        });
        console.log(that.data.markers);
      }, function (res) {}, {
        'Authorization': token
      }, ''); // }, res => { }, { 'content-type': 'application/json' }, '')

      clearInterval(that.data.timer);
    } else {
      that.setData({
        timer: setInterval(function () {
          that.onReady();
        }, 10000)
      });
    }
  },
  bindGetUserInfo: function bindGetUserInfo(e) {
    // 查看是否授权
    var that = this;
    wx.getSetting({
      success: function success(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function success(res) {
              wx.setStorageSync("userInfoStr", res.userInfo);
              wx.login({
                success: function success(res) {
                  var userInfoStr = wx.getStorageSync("userInfoStr");
                  console.log(userInfoStr);

                  if (res.code) {
                    //发起网络请求
                    wx.setStorageSync('code', res.code);
                    that.onReady(); // let code = wx.getStorageSync('code')
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
                    console.log('登录失败！' + res.errMsg);
                  }
                }
              });
            }
          });
          wx.setStorageSync("userEnter", true);
          that.setData({
            cannotEntery: false,
            userLicenseAgreementDisplay: true
          });
        } else {
          console.log("用户拒绝登录");
        }
      }
    });
  },
  onLoad: function onLoad() {},
  onShow: function onShow(e) {
    var agreement = wx.getStorageSync('agreement');
    var userEnter = wx.getStorageSync('userEnter');
    userEnter ? this.setData({
      cannotEntery: false,
      userLicenseAgreementDisplay: true
    }) : this.setData({
      cannotEntery: true,
      userLicenseAgreementDisplay: false
    });

    if (agreement) {
      this.setData({
        userLicenseAgreementDisplay: false,
        boxDisplay: true
      });
    } //测试需要，后期删除
    // if (agreement) {
    //   this.setData({ userLicenseAgreementDisplay: true, boxDisplay: false })
    // }

  },
  getUserInfo: function getUserInfo(e) {
    console.log(e);
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    });
  },
  // 查看用户许可协议详细内容（跳转
  toAgreement: function toAgreement(e) {
    wx.navigateTo({
      url: '../agreement/agreement'
    });
  },
  // 同意用户许可协议后不再显示用户许可协议面板
  agreemented: function agreemented(e) {
    wx.setStorageSync('agreement', true);
    this.setData({
      userLicenseAgreementDisplay: false,
      boxDisplay: true
    });
    var token = wx.getStorageSync('token');
    var agreementUrl = app.BASE_URL + '/user/agreement'; // app.request(agreementUrl, 'GET', '', res => {
    //   console.log('agreementUrl')
    //  console.log(res)
    // }, res => { }, { 'Authorization': token }, '')
  },
  //map组件上添加button测试
  toOrder: function toOrder(e) {
    wx.navigateTo({
      url: '../agreement/agreement'
    });
  },
  // 故障反馈面板是否显示
  repair: function repair() {
    this.setData({
      boxDisplay: false,
      repairFeedbackDisplay: true
    });
  },
  // 获取checkbox的值
  checkboxChange: function checkboxChange(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);
    this.setData({
      submitFeedback: e.detail.value
    });
  },
  // 提交反馈
  submitFeedback: function submitFeedback(e) {
    console.log(this.data.submitFeedback); // var token = wx.getStorageSync('token')
    // let feedbackUrl = app.BASE_URL + '/feedback'
    // let data = { text: "定位与实际位置偏离",type: "校车的定位错误；定位与实际位置偏离", }
    // app.request(feedbackUrl, 'POST', data, res => {
    //   console.log('feedbackUrl')
    //  console.log(res)
    //  console.log(data)
    // }, res => { }, { 'Authorization': token }, '')
  },
  repairFeedbackBox: function repairFeedbackBox() {
    this.setData({
      repairFeedbackDisplay: false,
      boxDisplay: true
    });
  }
});

/***/ })

},[[20,0]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9pbmRleC9pbmRleC5qcyJdLCJuYW1lcyI6WyJhcHAiLCJnZXRBcHAiLCJQYWdlIiwiZGF0YSIsImxvbmdpdHVkZSIsImxhdGl0dWRlIiwibWFwSGVpZ2h0IiwidXNlckxpY2Vuc2VBZ3JlZW1lbnREaXNwbGF5IiwiYm94RGlzcGxheSIsInJlcGFpckZlZWRiYWNrRGlzcGxheSIsImhhc1VzZXJJbmZvIiwiZGlzYWJsZWQiLCJjYW5JVXNlIiwid3giLCJjYW5ub3RFbnRlcnkiLCJ0aW1lciIsInN1Ym1pdEZlZWRiYWNrIiwidXNlckluZm8iLCJtYXJrZXJzIiwiaWNvblBhdGgiLCJpZCIsIndpZHRoIiwiaGVpZ2h0IiwiaXRlbXMiLCJuYW1lIiwidmFsdWUiLCJvblJlYWR5IiwiZSIsInRoYXQiLCJtYXBDdHgiLCJjcmVhdGVNYXBDb250ZXh0IiwiZ2V0TG9jYXRpb24iLCJ0eXBlIiwic3VjY2VzcyIsInJlcyIsInNldERhdGEiLCJjb2RlIiwiZ2V0U3RvcmFnZVN5bmMiLCJjb25zb2xlIiwibG9nIiwidG9rZW4iLCJidXNQb3NpdGlvblVybCIsIkJBU0VfVVJMIiwicmVxdWVzdCIsImdldExhdGl0dWRlIiwiYnVzZWQiLCJwb3NpdGlvbiIsImdldExvbmdpdHVkZSIsInRvU3RyaW5nIiwiZ2V0SWQiLCJjbGVhckludGVydmFsIiwic2V0SW50ZXJ2YWwiLCJiaW5kR2V0VXNlckluZm8iLCJnZXRTZXR0aW5nIiwiYXV0aFNldHRpbmciLCJnZXRVc2VySW5mbyIsInNldFN0b3JhZ2VTeW5jIiwibG9naW4iLCJ1c2VySW5mb1N0ciIsImVyck1zZyIsIm9uTG9hZCIsIm9uU2hvdyIsImFncmVlbWVudCIsInVzZXJFbnRlciIsImdsb2JhbERhdGEiLCJkZXRhaWwiLCJ0b0FncmVlbWVudCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJhZ3JlZW1lbnRlZCIsImFncmVlbWVudFVybCIsInRvT3JkZXIiLCJyZXBhaXIiLCJjaGVja2JveENo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ImZpbGUiOiJwYWdlc1xcaW5kZXhcXGluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy9pbmRleC5qc1xuY29uc3QgYXBwID0gZ2V0QXBwKClcblxuUGFnZSh7XG4gIFxuICBkYXRhOiB7XG4gICAgbG9uZ2l0dWRlOiAxMTMuMzI0NTIwLFxuICAgIGxhdGl0dWRlOiAyMy4wOTk5OTQsXG4gICAgbWFwSGVpZ2h0OlwiMTAwdmhcIixcblxuICAgIHVzZXJMaWNlbnNlQWdyZWVtZW50RGlzcGxheTpmYWxzZSxcbiAgICBib3hEaXNwbGF5OmZhbHNlLFxuICAgIHJlcGFpckZlZWRiYWNrRGlzcGxheTpmYWxzZSxcblxuICAgIGhhc1VzZXJJbmZvOiBmYWxzZSxcbiAgICBkaXNhYmxlZDogdHJ1ZSxcbiAgICBjYW5JVXNlOiB3eC5jYW5JVXNlKCdidXR0b24ub3Blbi10eXBlLmdldFVzZXJJbmZvJyksXG4gICAgY2Fubm90RW50ZXJ5OiB0cnVlLFxuXG4gICAgdGltZXI6XCJcIixcbiAgICBzdWJtaXRGZWVkYmFjazpbXSxcbiAgICB1c2VySW5mbzoge30sXG4gIFxuICAgIG1hcmtlcnM6IFtcbiAgICAgIHtcbiAgICAgICAgaWNvblBhdGg6IFwiLi4vaW1nL21hcE1hcmtlci5wbmdcIixcbiAgICAgICAgaWQ6IDAsXG4gICAgICAgIGxhdGl0dWRlOiAzMC40OTk4NCxcbiAgICAgICAgbG9uZ2l0dWRlOiAxMTQuMzQyNTMsXG4gICAgICAgIHdpZHRoOiAzMCxcbiAgICAgICAgaGVpZ2h0OiAzMFxuICAgICAgfVxuICAgIF0sXG4gICAgLy8g5pWF6Zqc5Y+N6aaI57G75Z6LXG4gICAgaXRlbXM6IFtcbiAgICAgIHsgbmFtZTogJ2xvY2F0aW9uJywgdmFsdWU6ICfmoKHovabnmoTlrprkvY3plJnor6/vvJvlrprkvY3kuI7lrp7pmYXkvY3nva7lgY/nprsnfSxcbiAgICAgIHsgbmFtZTogJ3N0YXRlJywgdmFsdWU6ICfmoKHovabpopzoibLmoIfnpLrnmoTnirbmgIHkuI7moKHovabnmoTlrp7pmYXnirbmgIHkuI3nrKYnIH0sXG4gICAgICB7IG5hbWU6ICdudW1iZXInLCB2YWx1ZTogJ+agoei9pui9puWPt+S4jeWvueW6lCcgfSxcbiAgICAgIC8vIHsgbmFtZTogJ3BhdGgnLCB2YWx1ZTogJ+i3r+e6v+mUmeivr++8jOS4iui9pueCuemUmeivrycsIGNvbG9yOiAncmVkJyAgfSxcbiAgICBdXG4gIH0sXG5cbiAgb25SZWFkeTogZnVuY3Rpb24gKGUpIHtcbiAgICAvLyDkvb/nlKggd3guY3JlYXRlTWFwQ29udGV4dCDojrflj5YgbWFwIOS4iuS4i+aWh1xuICAgIGxldCB0aGF0ID0gdGhpc1xuICAgIHRoaXMubWFwQ3R4ID0gd3guY3JlYXRlTWFwQ29udGV4dCgnbXlNYXAnKVxuICAgIC8v6I635Y+W5b2T5YmN5L2N572uXG4gICAgd3guZ2V0TG9jYXRpb24oe1xuICAgICAgdHlwZTogJ2djajAyJywgLy/ov5Tlm57lj6/ku6XnlKjkuo53eC5vcGVuTG9jYXRpb27nmoTnu4/nuqzluqZcbiAgICAgIHN1Y2Nlc3MocmVzKSB7XG4gICAgICAgIGNvbnN0IGxhdGl0dWRlID0gcmVzLmxhdGl0dWRlXG4gICAgICAgIGNvbnN0IGxvbmdpdHVkZSA9IHJlcy5sb25naXR1ZGVcbiAgICAgIHRoYXQuc2V0RGF0YSh7XG4gICAgICAgIGxhdGl0dWRlOiBsYXRpdHVkZSxcbiAgICAgICAgbG9uZ2l0dWRlOiBsb25naXR1ZGUsXG4gICAgICB9KVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBsZXQgY29kZSA9IHd4LmdldFN0b3JhZ2VTeW5jKCdjb2RlJylcbiAgICBjb25zb2xlLmxvZyhjb2RlKVxuICAgIGlmIChjb2RlKSB7XG4gICAgICBjb25zb2xlLmxvZyhcImNvZGVjb2RlY29kZWNvZGVcIilcblxuICAgICAgLy8gbGV0IGF1dGhvcml6ZVVybCA9IGFwcC5CQVNFX1VSTCArICcvdXNlci9zZXNzaW9uJ1xuICAgICAgLy8gbGV0IGF1dGhvcml6ZURhdGEgPSB7IGNvZGU6IGNvZGUgfVxuICAgICAgLy8gYXBwLnJlcXVlc3QoYXV0aG9yaXplVXJsLCAnUE9TVCcsIGF1dGhvcml6ZURhdGEsIHJlcyA9PiB7XG4gICAgICAvLyAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgIC8vICAgd3guc2V0U3RvcmFnZVN5bmMoJ3Rva2VuJywgcmVzLmhlYWRlci5BdXRob3JpemF0aW9uKVxuXG4gICAgICAgIHZhciB0b2tlbiA9IHd4LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpXG4gICAgICAgIGNvbnNvbGUubG9nKHRva2VuKVxuICAgICAgICBsZXQgYnVzUG9zaXRpb25VcmwgPSBhcHAuQkFTRV9VUkwgKyAnL2J1cy9hbGwnXG4gICAgICAgIGFwcC5yZXF1ZXN0KGJ1c1Bvc2l0aW9uVXJsLCAnR0VUJywgJycsIHJlcyA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICAgIGxldCBnZXRMYXRpdHVkZSA9IHJlcy5kYXRhLmJ1c2VkWzBdLnBvc2l0aW9uLmxhdGl0dWRlXG4gICAgICAgICAgbGV0IGdldExvbmdpdHVkZSA9IHJlcy5kYXRhLmJ1c2VkWzBdLnBvc2l0aW9uLmxvbmdpdHVkZS50b1N0cmluZygpXG4gICAgICAgICAgbGV0IGdldElkID0gcmVzLmRhdGEuYnVzZWRbMF0uaWRcbiAgICAgICAgICBjb25zb2xlLmxvZyhnZXRMYXRpdHVkZSlcbiAgICAgICAgICBjb25zb2xlLmxvZyhnZXRMb25naXR1ZGUpXG4gICAgICAgICAgY29uc29sZS5sb2coZ2V0SWQpXG4gICAgICAgICAgdGhhdC5zZXREYXRhKHtcbiAgICAgICAgICAgIG1hcmtlcnM6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGljb25QYXRoOiBcIi4uL2ltZy9ncmVlbkJ1cy5wbmdcIixcbiAgICAgICAgICAgICAgICBpZDogZ2V0SWQsXG4gICAgICAgICAgICAgICAgLy8gbGF0aXR1ZGU6ICczMC40ODcxNjEwNDc0JyxcbiAgICAgICAgICAgICAgICBsYXRpdHVkZTogZ2V0TGF0aXR1ZGUsXG4gICAgICAgICAgICAgICAgbG9uZ2l0dWRlOiBnZXRMb25naXR1ZGUsXG4gICAgICAgICAgICAgICAgLy8gbG9uZ2l0dWRlOiAnMTE0LjM5MjYyMDMyNTEnLFxuICAgICAgICAgICAgICAgIHdpZHRoOiAzMCxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDMwXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9KVxuICAgICAgICAgIGNvbnNvbGUubG9nKHRoYXQuZGF0YS5tYXJrZXJzKVxuICAgICAgICB9LCByZXMgPT4geyB9LCB7ICdBdXRob3JpemF0aW9uJzogdG9rZW4gfSwgJycpXG4gICAgICAvLyB9LCByZXMgPT4geyB9LCB7ICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSwgJycpXG4gICAgICBjbGVhckludGVydmFsKHRoYXQuZGF0YS50aW1lcilcbiAgICB9IGVsc2Uge1xuICAgICAgdGhhdC5zZXREYXRhKHtcbiAgICAgICAgdGltZXI6IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB0aGF0Lm9uUmVhZHkoKVxuICAgICAgICB9LCAxMDAwMClcbiAgICAgIH0pXG4gICAgfVxuICB9LCAgXG5cblxuICBiaW5kR2V0VXNlckluZm86IGZ1bmN0aW9uIChlKSB7XG4gICAgLy8g5p+l55yL5piv5ZCm5o6I5p2DXG4gICAgbGV0IHRoYXQgPSB0aGlzO1xuXG4gICAgd3guZ2V0U2V0dGluZyh7XG4gICAgICBzdWNjZXNzKHJlcykge1xuICAgICAgICBpZiAocmVzLmF1dGhTZXR0aW5nWydzY29wZS51c2VySW5mbyddKSB7XG4gICAgICAgICAgd3guZ2V0VXNlckluZm8oe1xuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYyhcInVzZXJJbmZvU3RyXCIsIHJlcy51c2VySW5mbylcbiAgICAgICAgICAgICAgd3gubG9naW4oe1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgdXNlckluZm9TdHIgPSB3eC5nZXRTdG9yYWdlU3luYyhcInVzZXJJbmZvU3RyXCIpO1xuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codXNlckluZm9TdHIpXG4gICAgICAgICAgICAgICAgICBpZiAocmVzLmNvZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy/lj5HotbfnvZHnu5zor7fmsYJcbiAgICAgICAgICAgICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ2NvZGUnLCByZXMuY29kZSlcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5vblJlYWR5KCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIGxldCBjb2RlID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2NvZGUnKVxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhjb2RlKVxuICAgICAgICAgICAgICAgICAgICAvLyBsZXQgYXV0aG9yaXplVXJsID0gYXBwLkJBU0VfVVJMICsnL3VzZXIvc2Vzc2lvbidcbiAgICAgICAgICAgICAgICAgICAgLy8gbGV0ICBhdXRob3JpemVEYXRhID0geyBjb2RlOmNvZGUgfVxuICAgICAgICAgICAgICAgICAgICAvLyAgIGFwcC5yZXF1ZXN0KGF1dGhvcml6ZVVybCwgJ1BPU1QnLCBhdXRob3JpemVEYXRhLCByZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ3Rva2VuJywgcmVzLmhlYWRlci5BdXRob3JpemF0aW9uKSBcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIHZhciB0b2tlbiA9IHd4LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBjb25zb2xlLmxvZyh0b2tlbilcbiAgICAgICAgICAgICAgICAgICAgLy8gICB9LCByZXMgPT4geyB9LCB7ICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSwgJycpXG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn55m75b2V5aSx6LSl77yBJyArIHJlcy5lcnJNc2cpXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoXCJ1c2VyRW50ZXJcIiwgdHJ1ZSlcbiAgICAgICAgICB0aGF0LnNldERhdGEoe1xuICAgICAgICAgICAgY2Fubm90RW50ZXJ5OiBmYWxzZSxcbiAgICAgICAgICAgIHVzZXJMaWNlbnNlQWdyZWVtZW50RGlzcGxheTogdHJ1ZSxcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwi55So5oi35ouS57ud55m75b2VXCIpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9LFxuXG4gIG9uTG9hZDogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG4gIG9uU2hvdzogZnVuY3Rpb24gKGUpIHtcbiAgICBjb25zdCBhZ3JlZW1lbnQgPSB3eC5nZXRTdG9yYWdlU3luYygnYWdyZWVtZW50JylcbiAgICBjb25zdCB1c2VyRW50ZXIgPSB3eC5nZXRTdG9yYWdlU3luYygndXNlckVudGVyJylcbiAgICB1c2VyRW50ZXIgPyB0aGlzLnNldERhdGEoeyBjYW5ub3RFbnRlcnk6IGZhbHNlLCB1c2VyTGljZW5zZUFncmVlbWVudERpc3BsYXk6IHRydWUgfSkgOiB0aGlzLnNldERhdGEoeyBjYW5ub3RFbnRlcnk6IHRydWUsIHVzZXJMaWNlbnNlQWdyZWVtZW50RGlzcGxheTogZmFsc2UgfSlcblxuICAgIGlmIChhZ3JlZW1lbnQpIHtcbiAgICAgIHRoaXMuc2V0RGF0YSh7IHVzZXJMaWNlbnNlQWdyZWVtZW50RGlzcGxheTogZmFsc2UsIGJveERpc3BsYXk6IHRydWUgfSlcbiAgICB9XG4gICAgLy/mtYvor5XpnIDopoHvvIzlkI7mnJ/liKDpmaRcbiAgICAvLyBpZiAoYWdyZWVtZW50KSB7XG4gICAgLy8gICB0aGlzLnNldERhdGEoeyB1c2VyTGljZW5zZUFncmVlbWVudERpc3BsYXk6IHRydWUsIGJveERpc3BsYXk6IGZhbHNlIH0pXG4gICAgLy8gfVxuICB9LFxuICBnZXRVc2VySW5mbzogZnVuY3Rpb24oZSkge1xuICAgIGNvbnNvbGUubG9nKGUpXG4gICAgYXBwLmdsb2JhbERhdGEudXNlckluZm8gPSBlLmRldGFpbC51c2VySW5mb1xuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICB1c2VySW5mbzogZS5kZXRhaWwudXNlckluZm8sXG4gICAgICBoYXNVc2VySW5mbzogdHJ1ZVxuICAgIH0pXG4gIH0sXG4gIC8vIOafpeeci+eUqOaIt+iuuOWPr+WNj+iuruivpue7huWGheWuue+8iOi3s+i9rFxuICB0b0FncmVlbWVudDpmdW5jdGlvbihlKXtcbiAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgIHVybDonLi4vYWdyZWVtZW50L2FncmVlbWVudCdcbiAgICB9KVxuICB9LFxuICAvLyDlkIzmhI/nlKjmiLforrjlj6/ljY/orq7lkI7kuI3lho3mmL7npLrnlKjmiLforrjlj6/ljY/orq7pnaLmnb9cbiAgYWdyZWVtZW50ZWQ6ZnVuY3Rpb24oZSl7XG4gICAgd3guc2V0U3RvcmFnZVN5bmMoJ2FncmVlbWVudCcsIHRydWUpXG4gICB0aGlzLnNldERhdGEoe1xuICAgICB1c2VyTGljZW5zZUFncmVlbWVudERpc3BsYXk6IGZhbHNlLFxuICAgICBib3hEaXNwbGF5OiB0cnVlLFxuICAgfSlcblxuICAgIHZhciB0b2tlbiA9IHd4LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpXG4gICAgbGV0IGFncmVlbWVudFVybCA9IGFwcC5CQVNFX1VSTCArJy91c2VyL2FncmVlbWVudCdcblxuICAgIC8vIGFwcC5yZXF1ZXN0KGFncmVlbWVudFVybCwgJ0dFVCcsICcnLCByZXMgPT4ge1xuICAgIC8vICAgY29uc29sZS5sb2coJ2FncmVlbWVudFVybCcpXG4gICAgLy8gIGNvbnNvbGUubG9nKHJlcylcbiAgICAvLyB9LCByZXMgPT4geyB9LCB7ICdBdXRob3JpemF0aW9uJzogdG9rZW4gfSwgJycpXG4gIH0sXG5cbiAgLy9tYXDnu4Tku7bkuIrmt7vliqBidXR0b27mtYvor5VcbiAgdG9PcmRlcjogZnVuY3Rpb24gKGUpIHtcbiAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgIHVybDogJy4uL2FncmVlbWVudC9hZ3JlZW1lbnQnXG4gICAgfSlcbiAgfSxcblxuLy8g5pWF6Zqc5Y+N6aaI6Z2i5p2/5piv5ZCm5pi+56S6XG4gIHJlcGFpcjpmdW5jdGlvbigpe1xuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBib3hEaXNwbGF5OiBmYWxzZSxcbiAgICAgIHJlcGFpckZlZWRiYWNrRGlzcGxheTogdHJ1ZSxcbiAgICB9KVxuICB9LFxuICAvLyDojrflj5ZjaGVja2JveOeahOWAvFxuICBjaGVja2JveENoYW5nZTogZnVuY3Rpb24gKGUpIHtcbiAgICBjb25zb2xlLmxvZygnY2hlY2tib3jlj5HnlJ9jaGFuZ2Xkuovku7bvvIzmkLrluKZ2YWx1ZeWAvOS4uu+8micsIGUuZGV0YWlsLnZhbHVlKVxuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBzdWJtaXRGZWVkYmFjazogZS5kZXRhaWwudmFsdWVcbiAgICB9KVxuICB9LFxuICAvLyDmj5DkuqTlj43ppohcbiAgc3VibWl0RmVlZGJhY2s6ZnVuY3Rpb24oZSl7XG4gICAgY29uc29sZS5sb2codGhpcy5kYXRhLnN1Ym1pdEZlZWRiYWNrKVxuICAgIC8vIHZhciB0b2tlbiA9IHd4LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpXG4gICAgLy8gbGV0IGZlZWRiYWNrVXJsID0gYXBwLkJBU0VfVVJMICsgJy9mZWVkYmFjaydcbiAgICAvLyBsZXQgZGF0YSA9IHsgdGV4dDogXCLlrprkvY3kuI7lrp7pmYXkvY3nva7lgY/nprtcIix0eXBlOiBcIuagoei9pueahOWumuS9jemUmeivr++8m+WumuS9jeS4juWunumZheS9jee9ruWBj+emu1wiLCB9XG4gICAgLy8gYXBwLnJlcXVlc3QoZmVlZGJhY2tVcmwsICdQT1NUJywgZGF0YSwgcmVzID0+IHtcbiAgICAvLyAgIGNvbnNvbGUubG9nKCdmZWVkYmFja1VybCcpXG4gICAgLy8gIGNvbnNvbGUubG9nKHJlcylcbiAgICAvLyAgY29uc29sZS5sb2coZGF0YSlcbiAgICAvLyB9LCByZXMgPT4geyB9LCB7ICdBdXRob3JpemF0aW9uJzogdG9rZW4gfSwgJycpXG5cbiAgfSxcbiAgcmVwYWlyRmVlZGJhY2tCb3g6ZnVuY3Rpb24oKXtcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgcmVwYWlyRmVlZGJhY2tEaXNwbGF5OiBmYWxzZSxcbiAgICAgIGJveERpc3BsYXk6IHRydWUsXG4gICAgfSlcbiAgfVxufSlcbiJdLCJzb3VyY2VSb290IjoiIn0=