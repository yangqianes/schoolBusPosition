//app.js
import { camelCase } from 'lodash';

App({
  BASE_URL: "https://bus.duanlv.ltd",
  onLaunch: function () {
    this.request = require('./utils/request.js').request;
    const that = this;
   
    const agreement = wx.getStorageSync('agreement')
    console.log("agreement")
    console.log(agreement)
  
    if (agreement){
      wx.reLaunch({
        url: 'pages/index/index'
      })
    }
  }
})