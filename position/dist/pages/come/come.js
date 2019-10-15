;require('./../../runtime');(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([[2],{

/***/ 20:
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
          wx.setStorageSync("userEnter", true);
          that.setData({
            cannotEntery: false,
            userLicenseAgreementDisplay: true
          });
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
    var agreementUrl = app.BASE_URL + '/user/agreement';
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

},[[20,0]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9jb21lL2NvbWUuanMiXSwibmFtZXMiOlsiYXBwIiwiZ2V0QXBwIiwiUGFnZSIsImRhdGEiLCJjYW5JVXNlIiwid3giLCJjYW5ub3RFbnRlcnkiLCJ1c2VyTGljZW5zZUFncmVlbWVudERpc3BsYXkiLCJpdGVtcyIsIm5hbWUiLCJ2YWx1ZSIsImlzRGlzYWJsZWQiLCJiaW5kR2V0VXNlckluZm8iLCJlIiwidGhhdCIsImdldFNldHRpbmciLCJzdWNjZXNzIiwicmVzIiwiYXV0aFNldHRpbmciLCJzZXRTdG9yYWdlU3luYyIsInNldERhdGEiLCJsb2dpbiIsImNvZGUiLCJhdXRob3JpemVVcmwiLCJCQVNFX1VSTCIsImF1dGhvcml6ZURhdGEiLCJyZXF1ZXN0IiwiY29uc29sZSIsImxvZyIsImhlYWRlciIsIkF1dGhvcml6YXRpb24iLCJvbkxvYWQiLCJ0b0FncmVlbWVudCIsInJlTGF1bmNoIiwidXJsIiwiYWdyZWVtZW50ZWQiLCJ0b2tlbiIsImdldFN0b3JhZ2VTeW5jIiwiYWdyZWVtZW50VXJsIiwicmFkaW9DaGFuZ2UiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsSUFBTUEsR0FBRyxHQUFHQyxNQUFNLEVBQWxCO0FBQ0FDLElBQUksQ0FBQztBQUNIQyxNQUFJLEVBQUU7QUFDSkMsV0FBTyxFQUFFQyxFQUFFLENBQUNELE9BQUgsQ0FBVyw4QkFBWCxDQURMO0FBRUpFLGdCQUFZLEVBQUUsSUFGVjtBQUdKQywrQkFBMkIsRUFBRSxLQUh6QjtBQUlKQyxTQUFLLEVBQUUsQ0FDTDtBQUFFQyxVQUFJLEVBQUUsV0FBUjtBQUFxQkMsV0FBSyxFQUFFO0FBQTVCLEtBREssQ0FKSDtBQU9KQyxjQUFVLEVBQUU7QUFQUixHQURIO0FBVUhDLGlCQUFlLEVBQUUseUJBQVVDLENBQVYsRUFBYTtBQUMvQjtBQUNHLFFBQUlDLElBQUksR0FBRyxJQUFYO0FBQ0FULE1BQUUsQ0FBQ1UsVUFBSCxDQUFjO0FBQ1pDLGFBRFksbUJBQ0pDLEdBREksRUFDQztBQUNYLFlBQUlBLEdBQUcsQ0FBQ0MsV0FBSixDQUFnQixnQkFBaEIsQ0FBSixFQUF1QztBQUNyQ2IsWUFBRSxDQUFDYyxjQUFILENBQWtCLFdBQWxCLEVBQStCLElBQS9CO0FBQ0FMLGNBQUksQ0FBQ00sT0FBTCxDQUFhO0FBQ1hkLHdCQUFZLEVBQUUsS0FESDtBQUVYQyx1Q0FBMkIsRUFBRTtBQUZsQixXQUFiO0FBSUFGLFlBQUUsQ0FBQ2dCLEtBQUgsQ0FBUztBQUNQTCxtQkFBTyxFQUFFLGlCQUFBQyxHQUFHLEVBQUk7QUFDZCxrQkFBSUEsR0FBRyxDQUFDSyxJQUFSLEVBQWM7QUFDWixvQkFBSUMsWUFBWSxHQUFHdkIsR0FBRyxDQUFDd0IsUUFBSixHQUFlLGVBQWxDO0FBQ0Esb0JBQUlDLGFBQWEsR0FBRztBQUFFSCxzQkFBSSxFQUFFTCxHQUFHLENBQUNLO0FBQVosaUJBQXBCO0FBQ0F0QixtQkFBRyxDQUFDMEIsT0FBSixDQUFZSCxZQUFaLEVBQTBCLE1BQTFCLEVBQWtDRSxhQUFsQyxFQUFpRCxVQUFBUixHQUFHLEVBQUk7QUFDdERVLHlCQUFPLENBQUNDLEdBQVIsQ0FBWSxlQUFaO0FBQ0FELHlCQUFPLENBQUNDLEdBQVIsQ0FBWVgsR0FBWjtBQUNBWixvQkFBRSxDQUFDYyxjQUFILENBQWtCLE9BQWxCLEVBQTJCRixHQUFHLENBQUNZLE1BQUosQ0FBV0MsYUFBdEM7QUFDRCxpQkFKRCxFQUlHLFVBQUFiLEdBQUcsRUFBSSxDQUFHLENBSmIsRUFJZTtBQUFFLGtDQUFnQjtBQUFsQixpQkFKZixFQUl1RCxFQUp2RDtBQUtEO0FBQ0Y7QUFYTSxXQUFUO0FBYUQsU0FuQkQsTUFtQk87QUFDTFUsaUJBQU8sQ0FBQ0MsR0FBUixDQUFZLFFBQVo7QUFDRDtBQUNGO0FBeEJXLEtBQWQ7QUEwQkQsR0F2Q0U7QUF3Q0hHLFFBeENHLG9CQXdDTSxDQUVSLENBMUNFO0FBMkNIO0FBQ0FDLGFBQVcsRUFBRSxxQkFBVW5CLENBQVYsRUFBYTtBQUN4QlIsTUFBRSxDQUFDNEIsUUFBSCxDQUFZO0FBQ1ZDLFNBQUcsRUFBRTtBQURLLEtBQVo7QUFHRCxHQWhERTtBQWlESDtBQUNBQyxhQUFXLEVBQUUscUJBQVV0QixDQUFWLEVBQWE7QUFDeEJSLE1BQUUsQ0FBQ2MsY0FBSCxDQUFrQixXQUFsQixFQUErQixJQUEvQjtBQUNBLFNBQUtDLE9BQUwsQ0FBYTtBQUNYYixpQ0FBMkIsRUFBRTtBQURsQixLQUFiO0FBR0EsUUFBTTZCLEtBQUssR0FBRy9CLEVBQUUsQ0FBQ2dDLGNBQUgsQ0FBa0IsT0FBbEIsQ0FBZDtBQUNBLFFBQU1DLFlBQVksR0FBR3RDLEdBQUcsQ0FBQ3dCLFFBQUosR0FBYyxpQkFBbkM7QUFFQXhCLE9BQUcsQ0FBQzBCLE9BQUosQ0FBWVksWUFBWixFQUEwQixLQUExQixFQUFpQyxFQUFqQyxFQUFxQyxVQUFBckIsR0FBRyxFQUFJO0FBQzFDVSxhQUFPLENBQUNDLEdBQVIsQ0FBWSxjQUFaO0FBQ0FELGFBQU8sQ0FBQ0MsR0FBUixDQUFZWCxHQUFaO0FBQ0FaLFFBQUUsQ0FBQzRCLFFBQUgsQ0FBWTtBQUNWQyxXQUFHLEVBQUU7QUFESyxPQUFaO0FBR0QsS0FORCxFQU1HLFVBQUFqQixHQUFHLEVBQUksQ0FBRyxDQU5iLEVBTWU7QUFBRSx1QkFBaUJtQjtBQUFuQixLQU5mLEVBTTJDLEVBTjNDO0FBT0QsR0FqRUU7QUFrRUhHLGFBQVcsRUFBRSxxQkFBVTFCLENBQVYsRUFBYTtBQUN4QixTQUFLTyxPQUFMLENBQWE7QUFDWFQsZ0JBQVUsRUFBRTtBQURELEtBQWI7QUFHRDtBQXRFRSxDQUFELENBQUosQyIsImZpbGUiOiJwYWdlc1xcY29tZVxcY29tZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGFwcCA9IGdldEFwcCgpXHJcblBhZ2Uoe1xyXG4gIGRhdGE6IHtcclxuICAgIGNhbklVc2U6IHd4LmNhbklVc2UoJ2J1dHRvbi5vcGVuLXR5cGUuZ2V0VXNlckluZm8nKSxcclxuICAgIGNhbm5vdEVudGVyeTogdHJ1ZSxcclxuICAgIHVzZXJMaWNlbnNlQWdyZWVtZW50RGlzcGxheTogZmFsc2UsXHJcbiAgICBpdGVtczogW1xyXG4gICAgICB7IG5hbWU6ICdhZ3JlZW1lbnQnLCB2YWx1ZTogJ+aIkeW3sumYheivu+W5tuWQjOaEjycgfSxcclxuICAgIF0sXHJcbiAgICBpc0Rpc2FibGVkOiB0cnVlLFxyXG4gIH0sXHJcbiAgYmluZEdldFVzZXJJbmZvOiBmdW5jdGlvbiAoZSkge1xyXG4gLy8g5p+l55yL5piv5ZCm5o6I5p2DXHJcbiAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICB3eC5nZXRTZXR0aW5nKHtcclxuICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICBpZiAocmVzLmF1dGhTZXR0aW5nWydzY29wZS51c2VySW5mbyddKSB7XHJcbiAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYyhcInVzZXJFbnRlclwiLCB0cnVlKVxyXG4gICAgICAgICAgdGhhdC5zZXREYXRhKHtcclxuICAgICAgICAgICAgY2Fubm90RW50ZXJ5OiBmYWxzZSxcclxuICAgICAgICAgICAgdXNlckxpY2Vuc2VBZ3JlZW1lbnREaXNwbGF5OiB0cnVlLFxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIHd4LmxvZ2luKHtcclxuICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcclxuICAgICAgICAgICAgICBpZiAocmVzLmNvZGUpIHtcclxuICAgICAgICAgICAgICAgIGxldCBhdXRob3JpemVVcmwgPSBhcHAuQkFTRV9VUkwgKyAnL3VzZXIvc2Vzc2lvbidcclxuICAgICAgICAgICAgICAgIGxldCBhdXRob3JpemVEYXRhID0geyBjb2RlOiByZXMuY29kZSB9XHJcbiAgICAgICAgICAgICAgICBhcHAucmVxdWVzdChhdXRob3JpemVVcmwsICdQT1NUJywgYXV0aG9yaXplRGF0YSwgcmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJy91c2VyL3Nlc3Npb24nKVxyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCd0b2tlbicsIHJlcy5oZWFkZXIuQXV0aG9yaXphdGlvbilcclxuICAgICAgICAgICAgICAgIH0sIHJlcyA9PiB7IH0sIHsgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LCAnJylcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwi55So5oi35ouS57ud55m75b2VXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgb25Mb2FkKCkge1xyXG5cclxuICB9LFxyXG4gIC8vIOafpeeci+eUqOaIt+iuuOWPr+WNj+iuruivpue7huWGheWuue+8iOi3s+i9rFxyXG4gIHRvQWdyZWVtZW50OiBmdW5jdGlvbiAoZSkge1xyXG4gICAgd3gucmVMYXVuY2goe1xyXG4gICAgICB1cmw6ICcuLi9hZ3JlZW1lbnQvYWdyZWVtZW50J1xyXG4gICAgfSlcclxuICB9LFxyXG4gIC8vIOWQjOaEj+eUqOaIt+iuuOWPr+WNj+iuruWQjuS4jeWGjeaYvuekuueUqOaIt+iuuOWPr+WNj+iurumdouadv1xyXG4gIGFncmVlbWVudGVkOiBmdW5jdGlvbiAoZSkge1xyXG4gICAgd3guc2V0U3RvcmFnZVN5bmMoXCJhZ3JlZW1lbnRcIiwgdHJ1ZSlcclxuICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgIHVzZXJMaWNlbnNlQWdyZWVtZW50RGlzcGxheTogZmFsc2UsXHJcbiAgICB9KVxyXG4gICAgY29uc3QgdG9rZW4gPSB3eC5nZXRTdG9yYWdlU3luYygndG9rZW4nKVxyXG4gICAgY29uc3QgYWdyZWVtZW50VXJsID0gYXBwLkJBU0VfVVJMICsnL3VzZXIvYWdyZWVtZW50J1xyXG5cclxuICAgIGFwcC5yZXF1ZXN0KGFncmVlbWVudFVybCwgJ0dFVCcsICcnLCByZXMgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZygnYWdyZWVtZW50VXJsJylcclxuICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICB3eC5yZUxhdW5jaCh7XHJcbiAgICAgICAgdXJsOiAnLi4vaW5kZXgvaW5kZXgnXHJcbiAgICAgIH0pXHJcbiAgICB9LCByZXMgPT4geyB9LCB7ICdBdXRob3JpemF0aW9uJzogdG9rZW4gfSwgJycpXHJcbiAgfSxcclxuICByYWRpb0NoYW5nZTogZnVuY3Rpb24gKGUpIHtcclxuICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgIGlzRGlzYWJsZWQ6IGZhbHNlXHJcbiAgICB9KVxyXG4gIH1cclxufSkiXSwic291cmNlUm9vdCI6IiJ9