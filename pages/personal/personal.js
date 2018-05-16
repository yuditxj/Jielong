// 获取全局应用程序实例对象
var app = getApp();

// 创建页面实例对象
Page({
  /**
   * 页面名称
   */
  name: "personal",
  /**
   * 页面的初始数据
   */

  data: {
    userDetialList:[{
      mineIcon:"../../images/mine/training.png",
      mineName:"我发起的Mart",
      rlCont: "0个",
      navUrl: "./mineJieLong/mineJieLong"
    }, {
      mineIcon: "../../images/mine/supplier-features.png",
      mineName: "我参与的Mart",
      mineMarginTop:"mineMarginTop",
      rlCont: "0次",
      navUrl: "./joinJieLong/joinJieLong"
    },{
      mineIcon: "../../images/mine/personal-center.png",
      mineName: "个人资料",
      navUrl: "./userInfo/userInfo"
    }, {
      mineIcon: "../../images/mine/map.png",
      mineName: "取货点及时间管理",
      navUrl:  "./address/address",
      mineMarginTop: "mineMarginTop"
    }, {
      mineIcon: "../../images/mine/comments.png",
      mineName: "帮助中心",
      navUrl: "./helpCenter/helpCenter"
    }],
    userInfo:{},
    initUserInfo:false


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    if (app.globalData.userInfo) {
      this.setData({
        initUserInfo:true,
        userInfo: app.globalData.userInfo
      })
    }
    //初始化mart数据
    this.initData();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },


  //以下为自定义点击事件
  // 自定义事件
  //获取发起/参与mart数
  initData: function (e) {
    var _this = this;
    wx.request({
      url: app.globalData.domain + '/jielong/selectByUserId',
      method: "GET",
      data: { userId: wx.getStorageSync("userId") },
      success: function (res) {
        console.log(res)
        if (res.statusCode == 200 && res.data.data.length) {
          _this.data.userDetialList[0].rlCont = res.data.data.length + "个";
          _this.setData({
            userDetialList: _this.data.userDetialList
          })
        }
      }
    });

    wx.request({
      url: app.globalData.domain + '/order/selectByCustomerId',
      data: {
        customerId: wx.getStorageSync("userId")
      },
      success: function (res) {
        if (res.statusCode == 200 && res.data.data.length) {
          _this.data.userDetialList[1].rlCont = res.data.data.length + "个";
          _this.setData({
            userDetialList: _this.data.userDetialList
          })
        }
      }
    })
  },
  userInfoHandler:function(e){
    console.log(e)
  },
  //获取登陆用户信息
  getUserInfo: function (res) {
    var _this = this;
    var navUrl = res.currentTarget.dataset.navurl;
    if (res.detail.rawData) {
      if (!app.globalData.userInfo) {
        wx.showLoading({
          title: "数据加载中...",
          mask: true
        })
        app.globalData.userInfo = JSON.parse(res.detail.rawData);
        app.login();
        _this.initData();
        setTimeout(function () {
          wx.navigateTo({
            url: navUrl,
            complete: function () {
              wx.hideLoading();
            }
          })
        },2000)
      } else {
        wx.navigateTo({
          url: res.currentTarget.dataset.navurl
        })
      }
    } else {

    }
  },
  getUserInfo2: function (res) {
    var _this = this;
    var navUrl = res.currentTarget.dataset.navurl;
    if (res.detail.rawData) {
      if (!app.globalData.userInfo) {
        wx.showLoading({
          title: "数据加载中...",
          mask: true
        })
        app.globalData.userInfo = JSON.parse(res.detail.rawData);
        app.login();
        _this.initData();
        _this.setData({
          initUserInfo:true,
          userInfo: app.globalData.userInfo
        })
        setTimeout(function () {
          _this.initData();
          wx.hideLoading();
        }, 2000)
      }
    } else {

    }
    }


})

