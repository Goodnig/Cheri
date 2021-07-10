import { request } from "../../request/index.js"
Page({
    data: {
        // 轮播图数组
        swiperList: [],
        // 导航 数组
        catesList: [],
        // 楼层 数组
        floorList: []
    },
    onLoad: function() {
        // 1.发送请求获取轮播图数据
        // wx-wx.request({
        //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
        //   success: (result) => {
        //     this.setData({
        //       swiperList:result.data.message  
        //     })
        //   },
        // })

        this.getSwiperList();
        this.getCatesList();
        this.getFloorList();
    },

    // 获取轮播图数据
    getSwiperList() {
        request({ url: "/home/swiperdata" })
            .then(result => {
                this.setData({
                    swiperList: result.data.message
                })
            })
    },

    // 获取导航数据
    getCatesList() {
        request({ url: "/home/catitems" })
            .then(result => {
                this.setData({
                    catesList: result.data.message
                })
            })
    },

    // 获取楼层数据
    getFloorList() {
        request({ url: "/home/floordata" })
            .then(result => {
                this.setData({
                    floorList: result.data.message
                })
            })
    }
})