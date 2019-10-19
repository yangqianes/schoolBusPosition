;require('./../../runtime');(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([[4],{

/***/ 4:
/***/ (function(module, exports) {

Page({
  data: {},
  // 同意用户许可协议后不再显示用户许可协议面板
  agreemented: function agreemented(e) {
    wx.setStorageSync("agreement", true);
    var token = wx.getStorageSync('token');
    var agreementUrl = app.BASE_URL + '/user/agreement';
    app.request(agreementUrl, 'GET', '', function (res) {
      console.log('agreementUrl');
      console.log(res);
      wx.redirectTo({
        url: '../index/index'
      });
    }, function (res) {}, {
      'Authorization': token
    }, '');
  }
});

/***/ })

},[[4,0]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9hZ3JlZW1lbnQvYWdyZWVtZW50LmpzIl0sIm5hbWVzIjpbIlBhZ2UiLCJkYXRhIiwiYWdyZWVtZW50ZWQiLCJlIiwid3giLCJzZXRTdG9yYWdlU3luYyIsInRva2VuIiwiZ2V0U3RvcmFnZVN5bmMiLCJhZ3JlZW1lbnRVcmwiLCJhcHAiLCJCQVNFX1VSTCIsInJlcXVlc3QiLCJyZXMiLCJjb25zb2xlIiwibG9nIiwicmVkaXJlY3RUbyIsInVybCJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQUEsSUFBSSxDQUFDO0FBQ0hDLE1BQUksRUFBQyxFQURGO0FBSUg7QUFDQUMsYUFBVyxFQUFFLHFCQUFVQyxDQUFWLEVBQWE7QUFDeEJDLE1BQUUsQ0FBQ0MsY0FBSCxDQUFrQixXQUFsQixFQUErQixJQUEvQjtBQUVBLFFBQU1DLEtBQUssR0FBR0YsRUFBRSxDQUFDRyxjQUFILENBQWtCLE9BQWxCLENBQWQ7QUFDQSxRQUFNQyxZQUFZLEdBQUdDLEdBQUcsQ0FBQ0MsUUFBSixHQUFjLGlCQUFuQztBQUVBRCxPQUFHLENBQUNFLE9BQUosQ0FBWUgsWUFBWixFQUEwQixLQUExQixFQUFpQyxFQUFqQyxFQUFxQyxVQUFBSSxHQUFHLEVBQUk7QUFDMUNDLGFBQU8sQ0FBQ0MsR0FBUixDQUFZLGNBQVo7QUFDQUQsYUFBTyxDQUFDQyxHQUFSLENBQVlGLEdBQVo7QUFDQVIsUUFBRSxDQUFDVyxVQUFILENBQWM7QUFDWkMsV0FBRyxFQUFDO0FBRFEsT0FBZDtBQUdELEtBTkQsRUFNRyxVQUFBSixHQUFHLEVBQUksQ0FBRyxDQU5iLEVBTWU7QUFBRSx1QkFBaUJOO0FBQW5CLEtBTmYsRUFNMkMsRUFOM0M7QUFRRDtBQW5CRSxDQUFELENBQUosQyIsImZpbGUiOiJwYWdlc1xcYWdyZWVtZW50XFxhZ3JlZW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJQYWdlKHtcclxuICBkYXRhOntcclxuXHJcbiAgfSxcclxuICAvLyDlkIzmhI/nlKjmiLforrjlj6/ljY/orq7lkI7kuI3lho3mmL7npLrnlKjmiLforrjlj6/ljY/orq7pnaLmnb9cclxuICBhZ3JlZW1lbnRlZDogZnVuY3Rpb24gKGUpIHtcclxuICAgIHd4LnNldFN0b3JhZ2VTeW5jKFwiYWdyZWVtZW50XCIsIHRydWUpXHJcblxyXG4gICAgY29uc3QgdG9rZW4gPSB3eC5nZXRTdG9yYWdlU3luYygndG9rZW4nKVxyXG4gICAgY29uc3QgYWdyZWVtZW50VXJsID0gYXBwLkJBU0VfVVJMICsnL3VzZXIvYWdyZWVtZW50J1xyXG5cclxuICAgIGFwcC5yZXF1ZXN0KGFncmVlbWVudFVybCwgJ0dFVCcsICcnLCByZXMgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZygnYWdyZWVtZW50VXJsJylcclxuICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICB3eC5yZWRpcmVjdFRvKHtcclxuICAgICAgICB1cmw6Jy4uL2luZGV4L2luZGV4J1xyXG4gICAgICB9KVxyXG4gICAgfSwgcmVzID0+IHsgfSwgeyAnQXV0aG9yaXphdGlvbic6IHRva2VuIH0sICcnKVxyXG5cclxuICB9LFxyXG59KSJdLCJzb3VyY2VSb290IjoiIn0=