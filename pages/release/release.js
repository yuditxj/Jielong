
// 获取全局应用程序实例对象
var app = getApp();

// 创建页面实例对象
Page({
  /**
   * 页面名称
   */
  name: "release",
  /**
   * 页面的初始数据
   */

  data: {
    userId:14,
    topic: "",          //主题
    description: "",    //活动描述  
    addressName: "定位活动地址",           //活动地址名称
    addressDetail: "",                   //活动详细地址
    addressLongitude:60,                 //活动地址经度
    addressLatitude:30,                  //活动地址纬度
    imageLocalPaths: [],                //本地介绍图片数组 { id:1, unique: 'unique_1',path:''}
    introImages:"001.png,002.png",      //服务器图片介绍数组 用逗号隔开
    goodsAddresses:"1,2,3" ,            //用户自提地址id数组，用逗号隔开
    phoneNumber:"",                    //用户手机号
    setFinishTime: 0,               //是否设置截止时间
    finishTime: "2018-03-15 12:00:05",
    seleAddrNum: 3,
    goodsList: [                     //商品数组 
      {
        unique: 'unique_0',            // 该item在数组中的唯一标识符
        name: "",              //商品名称 
        localPaths: [],         // 商品本地图片路径 数组
        serverPaths: "1.png,2.png",       // 商品服务器图片路径数组,用逗号隔开
        parentClassId: 0,     //商品一级分类 id
        subClassId: 0,      // 商品二级分类 id
        specification: "",          //商品规格
        price: 10,        //商品价格 
        repertory: 10,   //商品库存
        isSetGroup: 0,       //是否设置最低成团数量，0否，1是
        groupSum: 5        //最低成团数量

      }


    ]



  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    //加载分类数据  ' /getAllGoodsClass '
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
    // 执行coolsite360交互组件展示
    // app.coolsite360.onShow(this);
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

  // 上传图片
  uploadImage: function (e) {
    var self = this;
    if (Number(e.currentTarget.dataset.iscommon)) {
      console.log(e.currentTarget.dataset.iscommon)
      var imgs = self.data.imageLocalPaths;
      if (imgs.length >= 9) {
        wx.showModal({
          title: '提示',
          content: '最多上传9张图片',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else {
              console.log('用户点击取消')
            }
          }
        })
      } else {
        var imgNumber = 9 - imgs.length;
        console.log("imgnumber= " + imgNumber)
        wx.chooseImage({   //可选择多个图片
          count: imgNumber,
          success: function (res) {
            var tempFilePaths = res.tempFilePaths  //图片临时路径,数组
            console.log(tempFilePaths + '----1');
            //var imgs = self.data.imageLocalPaths;
            var length = self.data.imageLocalPaths.length;
            for (var i = 0; i < tempFilePaths.length; i++) {
              var loalImg = { id: length, unique: 'unique_' + length, path: tempFilePaths[i] };
              length++;
              //if (imgs.length >= 9) {
               // that.setData({
                //  imageLocalPaths: imgs
                //});
               // return false;
              //} else {
              imgs.push(loalImg);
              //}
            }
            console.log(imgs);
            self.setData({
              imageLocalPaths: imgs
            })
            console.log(self.data.imageLocalPaths[0])
            console.log(self.data.imageLocalPaths[0].path + "==D.O")
          }
        })
      }
    } else {
      console.log(e.currentTarget.dataset.iscommon)
      console.log("goodsindex")
      console.log(e.currentTarget.dataset.goodsindex)
      var goodsindex = e.currentTarget.dataset.goodsindex;
      var imgs = self.data.goodsList[goodsindex].localPaths;
      console.log(imgs.length)
      if (imgs.length >= 9) {
        wx.showModal({
          title: '提示',
          content: '最多上传9张图片',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else {
              console.log('用户点击取消')
            }
          }
        })
      }else{
        var imgNumber = 9 - imgs.length;
        console.log("goodsimgnumber= " + imgNumber)
        wx.chooseImage({   //可选择多个图片
          count: imgNumber,
          success: function (res) {
            var tempFilePaths = res.tempFilePaths  //图片临时路径,数组
            console.log(tempFilePaths + '----2');
            var length = imgs.length;
            for (var i = 0; i < tempFilePaths.length; i++) {
              var loalImg = { id: length, unique: 'unique_' + length, path: tempFilePaths[i] };
              length++;
              imgs.push(loalImg);
            }
            console.log(imgs);
            self.setData({
              goodsList: self.data.goodsList
            })
            console.log(self.data.goodsList)
            console.log(self.data.goodsList[goodsindex].localPaths[0])
            console.log(self.data.goodsList[goodsindex].localPaths[0].path + "222==D.O")
          }
        })
      }
      // for (var i = 0; i < tempFilePaths.length; i++) {
      //   var loalImg = [{ id: length, unique: 'unique_' + length, path: tempFilePaths[i] }];
      //   self.data.goodsList[e.currentTarget.dataset.goodsindex].localPaths = self.data.goodsList[e.currentTarget.dataset.goodsindex].localPaths.concat(loalImg)   //concat拼接多个数组
      //   length++;
      // }
      // console.log(self);
      // self.setData({
      //   goodsList: self.data.goodsList
      // })
    }
  },
  // 删除图片
  deleteImg: function (e) {
    var _this = this;
    if (Number(e.currentTarget.dataset.iscommon)) {
      var imgs = _this.data.imageLocalPaths;
      var index = e.currentTarget.dataset.index;
      imgs.splice(index, 1);
      for (var i = 0; i < imgs.length;i++){
        imgs[i].id = i;
        imgs[i].unique = "unique_" + i;
      }
      _this.setData({
        imageLocalPaths: imgs
      })
      console.log(_this.data.imageLocalPaths) 
    } else{
      var goodsindex = e.currentTarget.dataset.fatheridx;
      var imgs = _this.data.goodsList[goodsindex].localPaths;
      var index = e.currentTarget.dataset.index;
      imgs.splice(index, 1);
      for (var i = 0; i < imgs.length; i++) {
        imgs[i].id = i;
        imgs[i].unique = "unique_" + i;
      }
      _this.setData({
        goodsList: _this.data.goodsList
      })
      console.log(_this.data.goodsList)
    }
  },
  //选择活动地址
  chooseAddress: function () {
    console.log('chooseAddress')
    var self = this

    wx.chooseLocation({
      success: function (res) {
        self.setData({
          addressName: res.name,
          addressDetail: res.address
        })
      },
      fail: function (res) {
        console.log(res)
      }
    })


  },
  //设置自提点
  selectAddress:function(e){
    wx.setStorage({
      key: 'a',
      data: 'a',
    })
    wx.navigateTo({
      url: './selectAddress/selectAddress',
    })

  },
  //设置截止时间  
  timeChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      setFinishTime: e.detail.value

    })
  },
  //上传商品图片
  uploadGoodsImage: function (index) {
    var self = this
    wx.chooseImage({
      success: function (res) {

      },
    })
  },
  inputGoodsName:function(e){
       console.log(e)

  },
  //最小成团数量控制
  chenTuanNum:function(res){
      console.log(this)
      console.log(res.target.dataset.setgroupnum)  //找到渲染数组的索引位置
      console.log(this.data.goodsList[res.target.dataset.setgroupnum].isSetGroup) //找到遍历列表成团字段
      res.detail.value = res.detail.value ? 1 : 0 ;
      this.data.goodsList[res.target.dataset.setgroupnum].isSetGroup = res.detail.value;
       this.setData({
         goodsList:this.data.goodsList
       })
  },
  //新增商品
  addGoods: function () {
    var goods = [{
      unique: 'unique_' + this.data.goodsList.length,            // 该item在数组中的唯一标识符
      name: null,              //商品名称 
      localPaths: [],         // 商品本地图片路径 数组
      serverPaths: [],       // 商品服务器图片路径 数组
      parentClassId: null,     //商品一级分类 id
      subClassId: null,      // 商品二级分类 id
      specification: null,          //商品规格
      price: null,        //商品价格 
      repertory: null,   //商品库存
      isSetGroup: false,       //是否设置最低成团数量，0否，1是
      groupSum: null        //最低成团数量

    }]
    
    this.data.goodsList = this.data.goodsList.concat(goods)
    this.setData({
      goodsList: this.data.goodsList

    })

  },
  //发布接龙
  publish: function () {
    var localImages = this.data.imageLocalPaths
    //先循环上传接龙介绍图片，得到url
    for (var i = 0; i < localImages.length; i++) {

      wx.uploadFile({
        url: app.globalData.domain + '/uploadImage',        //服务器上传地址
        filePath: localImages[i].path,
        name: 'image',
        success: function (res) {
          var data = res.data   //会返回图片服务器存储路径
          console.log(data)
        }
      })
    }

  }




})

