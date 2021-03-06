// pages/comments/systemNotice/noticeContent/noticeContent.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contentList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var data = JSON.parse(options.jsonStr);
    var app = getApp();
    var id = data.id;
    if (data.isRead != 1){
      wx.request({
        url: app.globalData.domain + '/userMessage/updateReadStatus',
        data: {
          id: id
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log(res.data.data)
        }
      })
    }   
    var detailTime = data.message.split("***");
    if (detailTime.length == 2) {
      data.message = detailTime[0] + "的" + detailTime[1];
    } else {
      data.message = detailTime[0];
    }
    this.setData({
      contentList: data
    })
    console.log(this.data.contentList)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})