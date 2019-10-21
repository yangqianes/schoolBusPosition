;require('./../../runtime');(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([[2],{

/***/ 2:
/***/ (function(module, exports) {

var app = getApp();
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    cannotEntery: true,
    userLicenseAgreementDisplay: false,
    items: [{
      name: 'agreement',
      value: '我已阅读并同意'
    }],
    isDisabled: true
  },
  bindGetUserInfo: function bindGetUserInfo(e) {
    // 查看是否授权
    var that = this;
    wx.getSetting({
      success: function success(res) {
        if (res.authSetting['scope.userInfo']) {
          console.log("用户正在登录");
          wx.login({
            success: function success(res) {
              if (res.code) {
                var authorizeUrl = app.BASE_URL + '/user/session';
                var authorizeData = {
                  code: res.code
                };
                app.request(authorizeUrl, 'POST', authorizeData, function (res) {
                  console.log('/user/session');
                  console.log(res);
                  wx.setStorageSync('token', res.header.Authorization);
                }, function (res) {}, {
                  'content-type': 'application/json'
                }, '');
              }
            }
          });
          wx.setStorageSync("userEnter", true);
          that.setData({
            cannotEntery: false,
            userLicenseAgreementDisplay: true
          });
          console.log("用户允许登录");
        } else {
          console.log("用户拒绝登录");
        }
      }
    });
  },
  onLoad: function onLoad() {},
  // 查看用户许可协议详细内容（跳转
  toAgreement: function toAgreement(e) {
    wx.reLaunch({
      url: '../agreement/agreement'
    });
  },
  // 同意用户许可协议后不再显示用户许可协议面板
  agreemented: function agreemented(e) {
    wx.setStorageSync("agreement", true);
    this.setData({
      userLicenseAgreementDisplay: false
    });
    var token = wx.getStorageSync('token');
    var agreementUrl = app.BASE_URL + '/user/agreement'; // wx.reLaunch({
    //   url: '../index/index'
    // })

    app.request(agreementUrl, 'GET', '', function (res) {
      console.log('agreementUrl');
      console.log(res);
      wx.reLaunch({
        url: '../index/index'
      });
    }, function (res) {}, {
      'Authorization': token
    }, '');
  },
  radioChange: function radioChange(e) {
    this.setData({
      isDisabled: false
    });
  }
});

/***/ })

},[[2,0]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9jb21lL2NvbWUuanMiXSwibmFtZXMiOlsiYXBwIiwiZ2V0QXBwIiwiUGFnZSIsImRhdGEiLCJjYW5JVXNlIiwid3giLCJjYW5ub3RFbnRlcnkiLCJ1c2VyTGljZW5zZUFncmVlbWVudERpc3BsYXkiLCJpdGVtcyIsIm5hbWUiLCJ2YWx1ZSIsImlzRGlzYWJsZWQiLCJiaW5kR2V0VXNlckluZm8iLCJlIiwidGhhdCIsImdldFNldHRpbmciLCJzdWNjZXNzIiwicmVzIiwiYXV0aFNldHRpbmciLCJjb25zb2xlIiwibG9nIiwibG9naW4iLCJjb2RlIiwiYXV0aG9yaXplVXJsIiwiQkFTRV9VUkwiLCJhdXRob3JpemVEYXRhIiwicmVxdWVzdCIsInNldFN0b3JhZ2VTeW5jIiwiaGVhZGVyIiwiQXV0aG9yaXphdGlvbiIsInNldERhdGEiLCJvbkxvYWQiLCJ0b0FncmVlbWVudCIsInJlTGF1bmNoIiwidXJsIiwiYWdyZWVtZW50ZWQiLCJ0b2tlbiIsImdldFN0b3JhZ2VTeW5jIiwiYWdyZWVtZW50VXJsIiwicmFkaW9DaGFuZ2UiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsSUFBTUEsR0FBRyxHQUFHQyxNQUFNLEVBQWxCO0FBQ0FDLElBQUksQ0FBQztBQUNIQyxNQUFJLEVBQUU7QUFDSkMsV0FBTyxFQUFFQyxFQUFFLENBQUNELE9BQUgsQ0FBVyw4QkFBWCxDQURMO0FBRUpFLGdCQUFZLEVBQUUsSUFGVjtBQUdKQywrQkFBMkIsRUFBRSxLQUh6QjtBQUlKQyxTQUFLLEVBQUUsQ0FDTDtBQUFFQyxVQUFJLEVBQUUsV0FBUjtBQUFxQkMsV0FBSyxFQUFFO0FBQTVCLEtBREssQ0FKSDtBQU9KQyxjQUFVLEVBQUU7QUFQUixHQURIO0FBVUhDLGlCQUFlLEVBQUUseUJBQVVDLENBQVYsRUFBYTtBQUMvQjtBQUNHLFFBQUlDLElBQUksR0FBRyxJQUFYO0FBRUFULE1BQUUsQ0FBQ1UsVUFBSCxDQUFjO0FBQ1pDLGFBRFksbUJBQ0pDLEdBREksRUFDQztBQUNYLFlBQUlBLEdBQUcsQ0FBQ0MsV0FBSixDQUFnQixnQkFBaEIsQ0FBSixFQUF1QztBQUNyQ0MsaUJBQU8sQ0FBQ0MsR0FBUixDQUFZLFFBQVo7QUFDQWYsWUFBRSxDQUFDZ0IsS0FBSCxDQUFTO0FBQ1BMLG1CQUFPLEVBQUUsaUJBQUFDLEdBQUcsRUFBSTtBQUNkLGtCQUFJQSxHQUFHLENBQUNLLElBQVIsRUFBYztBQUNaLG9CQUFJQyxZQUFZLEdBQUd2QixHQUFHLENBQUN3QixRQUFKLEdBQWUsZUFBbEM7QUFDQSxvQkFBSUMsYUFBYSxHQUFHO0FBQUVILHNCQUFJLEVBQUVMLEdBQUcsQ0FBQ0s7QUFBWixpQkFBcEI7QUFDQXRCLG1CQUFHLENBQUMwQixPQUFKLENBQVlILFlBQVosRUFBMEIsTUFBMUIsRUFBa0NFLGFBQWxDLEVBQWlELFVBQUFSLEdBQUcsRUFBSTtBQUN0REUseUJBQU8sQ0FBQ0MsR0FBUixDQUFZLGVBQVo7QUFDQUQseUJBQU8sQ0FBQ0MsR0FBUixDQUFZSCxHQUFaO0FBQ0FaLG9CQUFFLENBQUNzQixjQUFILENBQWtCLE9BQWxCLEVBQTJCVixHQUFHLENBQUNXLE1BQUosQ0FBV0MsYUFBdEM7QUFDRCxpQkFKRCxFQUlHLFVBQUFaLEdBQUcsRUFBSSxDQUFHLENBSmIsRUFJZTtBQUFFLGtDQUFnQjtBQUFsQixpQkFKZixFQUl1RCxFQUp2RDtBQUtEO0FBQ0Y7QUFYTSxXQUFUO0FBYUFaLFlBQUUsQ0FBQ3NCLGNBQUgsQ0FBa0IsV0FBbEIsRUFBK0IsSUFBL0I7QUFDQWIsY0FBSSxDQUFDZ0IsT0FBTCxDQUFhO0FBQ1h4Qix3QkFBWSxFQUFFLEtBREg7QUFFWEMsdUNBQTJCLEVBQUU7QUFGbEIsV0FBYjtBQUlBWSxpQkFBTyxDQUFDQyxHQUFSLENBQVksUUFBWjtBQUNELFNBckJELE1BcUJPO0FBQ0xELGlCQUFPLENBQUNDLEdBQVIsQ0FBWSxRQUFaO0FBQ0Q7QUFDRjtBQTFCVyxLQUFkO0FBNEJELEdBMUNFO0FBMkNIVyxRQTNDRyxvQkEyQ00sQ0FFUixDQTdDRTtBQThDSDtBQUNBQyxhQUFXLEVBQUUscUJBQVVuQixDQUFWLEVBQWE7QUFDeEJSLE1BQUUsQ0FBQzRCLFFBQUgsQ0FBWTtBQUNWQyxTQUFHLEVBQUU7QUFESyxLQUFaO0FBR0QsR0FuREU7QUFvREg7QUFDQUMsYUFBVyxFQUFFLHFCQUFVdEIsQ0FBVixFQUFhO0FBQ3hCUixNQUFFLENBQUNzQixjQUFILENBQWtCLFdBQWxCLEVBQStCLElBQS9CO0FBQ0EsU0FBS0csT0FBTCxDQUFhO0FBQ1h2QixpQ0FBMkIsRUFBRTtBQURsQixLQUFiO0FBR0EsUUFBTTZCLEtBQUssR0FBRy9CLEVBQUUsQ0FBQ2dDLGNBQUgsQ0FBa0IsT0FBbEIsQ0FBZDtBQUNBLFFBQU1DLFlBQVksR0FBR3RDLEdBQUcsQ0FBQ3dCLFFBQUosR0FBYyxpQkFBbkMsQ0FOd0IsQ0FReEI7QUFDQTtBQUNBOztBQUVBeEIsT0FBRyxDQUFDMEIsT0FBSixDQUFZWSxZQUFaLEVBQTBCLEtBQTFCLEVBQWlDLEVBQWpDLEVBQXFDLFVBQUFyQixHQUFHLEVBQUk7QUFDMUNFLGFBQU8sQ0FBQ0MsR0FBUixDQUFZLGNBQVo7QUFDQUQsYUFBTyxDQUFDQyxHQUFSLENBQVlILEdBQVo7QUFDQVosUUFBRSxDQUFDNEIsUUFBSCxDQUFZO0FBQ1ZDLFdBQUcsRUFBRTtBQURLLE9BQVo7QUFHRCxLQU5ELEVBTUcsVUFBQWpCLEdBQUcsRUFBSSxDQUFHLENBTmIsRUFNZTtBQUFFLHVCQUFpQm1CO0FBQW5CLEtBTmYsRUFNMkMsRUFOM0M7QUFRRCxHQXpFRTtBQTBFSEcsYUFBVyxFQUFFLHFCQUFVMUIsQ0FBVixFQUFhO0FBQ3hCLFNBQUtpQixPQUFMLENBQWE7QUFDWG5CLGdCQUFVLEVBQUU7QUFERCxLQUFiO0FBR0Q7QUE5RUUsQ0FBRCxDQUFKLEMiLCJmaWxlIjoicGFnZXNcXGNvbWVcXGNvbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBhcHAgPSBnZXRBcHAoKVxyXG5QYWdlKHtcclxuICBkYXRhOiB7XHJcbiAgICBjYW5JVXNlOiB3eC5jYW5JVXNlKCdidXR0b24ub3Blbi10eXBlLmdldFVzZXJJbmZvJyksXHJcbiAgICBjYW5ub3RFbnRlcnk6IHRydWUsXHJcbiAgICB1c2VyTGljZW5zZUFncmVlbWVudERpc3BsYXk6IGZhbHNlLFxyXG4gICAgaXRlbXM6IFtcclxuICAgICAgeyBuYW1lOiAnYWdyZWVtZW50JywgdmFsdWU6ICfmiJHlt7LpmIXor7vlubblkIzmhI8nIH0sXHJcbiAgICBdLFxyXG4gICAgaXNEaXNhYmxlZDogdHJ1ZSxcclxuICB9LFxyXG4gIGJpbmRHZXRVc2VySW5mbzogZnVuY3Rpb24gKGUpIHtcclxuIC8vIOafpeeci+aYr+WQpuaOiOadg1xyXG4gICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgIHd4LmdldFNldHRpbmcoe1xyXG4gICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgIGlmIChyZXMuYXV0aFNldHRpbmdbJ3Njb3BlLnVzZXJJbmZvJ10pIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwi55So5oi35q2j5Zyo55m75b2VXCIpXHJcbiAgICAgICAgICB3eC5sb2dpbih7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgaWYgKHJlcy5jb2RlKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYXV0aG9yaXplVXJsID0gYXBwLkJBU0VfVVJMICsgJy91c2VyL3Nlc3Npb24nXHJcbiAgICAgICAgICAgICAgICBsZXQgYXV0aG9yaXplRGF0YSA9IHsgY29kZTogcmVzLmNvZGUgfVxyXG4gICAgICAgICAgICAgICAgYXBwLnJlcXVlc3QoYXV0aG9yaXplVXJsLCAnUE9TVCcsIGF1dGhvcml6ZURhdGEsIHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCcvdXNlci9zZXNzaW9uJylcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgICAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygndG9rZW4nLCByZXMuaGVhZGVyLkF1dGhvcml6YXRpb24pXHJcbiAgICAgICAgICAgICAgICB9LCByZXMgPT4geyB9LCB7ICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSwgJycpXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoXCJ1c2VyRW50ZXJcIiwgdHJ1ZSlcclxuICAgICAgICAgIHRoYXQuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIGNhbm5vdEVudGVyeTogZmFsc2UsXHJcbiAgICAgICAgICAgIHVzZXJMaWNlbnNlQWdyZWVtZW50RGlzcGxheTogdHJ1ZSxcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIueUqOaIt+WFgeiuuOeZu+W9lVwiKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIueUqOaIt+aLkue7neeZu+W9lVwiKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9LFxyXG4gIG9uTG9hZCgpIHtcclxuXHJcbiAgfSxcclxuICAvLyDmn6XnnIvnlKjmiLforrjlj6/ljY/orq7or6bnu4blhoXlrrnvvIjot7PovaxcclxuICB0b0FncmVlbWVudDogZnVuY3Rpb24gKGUpIHtcclxuICAgIHd4LnJlTGF1bmNoKHtcclxuICAgICAgdXJsOiAnLi4vYWdyZWVtZW50L2FncmVlbWVudCdcclxuICAgIH0pXHJcbiAgfSxcclxuICAvLyDlkIzmhI/nlKjmiLforrjlj6/ljY/orq7lkI7kuI3lho3mmL7npLrnlKjmiLforrjlj6/ljY/orq7pnaLmnb9cclxuICBhZ3JlZW1lbnRlZDogZnVuY3Rpb24gKGUpIHtcclxuICAgIHd4LnNldFN0b3JhZ2VTeW5jKFwiYWdyZWVtZW50XCIsIHRydWUpXHJcbiAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICB1c2VyTGljZW5zZUFncmVlbWVudERpc3BsYXk6IGZhbHNlLFxyXG4gICAgfSlcclxuICAgIGNvbnN0IHRva2VuID0gd3guZ2V0U3RvcmFnZVN5bmMoJ3Rva2VuJylcclxuICAgIGNvbnN0IGFncmVlbWVudFVybCA9IGFwcC5CQVNFX1VSTCArJy91c2VyL2FncmVlbWVudCdcclxuXHJcbiAgICAvLyB3eC5yZUxhdW5jaCh7XHJcbiAgICAvLyAgIHVybDogJy4uL2luZGV4L2luZGV4J1xyXG4gICAgLy8gfSlcclxuXHJcbiAgICBhcHAucmVxdWVzdChhZ3JlZW1lbnRVcmwsICdHRVQnLCAnJywgcmVzID0+IHtcclxuICAgICAgY29uc29sZS5sb2coJ2FncmVlbWVudFVybCcpXHJcbiAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgd3gucmVMYXVuY2goe1xyXG4gICAgICAgIHVybDogJy4uL2luZGV4L2luZGV4J1xyXG4gICAgICB9KVxyXG4gICAgfSwgcmVzID0+IHsgfSwgeyAnQXV0aG9yaXphdGlvbic6IHRva2VuIH0sICcnKVxyXG5cclxuICB9LFxyXG4gIHJhZGlvQ2hhbmdlOiBmdW5jdGlvbiAoZSkge1xyXG4gICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgaXNEaXNhYmxlZDogZmFsc2VcclxuICAgIH0pXHJcbiAgfVxyXG59KSJdLCJzb3VyY2VSb290IjoiIn0=