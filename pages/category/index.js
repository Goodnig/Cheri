import { request } from '../../request/index.js'
Page({
    data: {
        // 左侧的菜单数据
        leftMenuList: [],
        // 右侧的商品数据
        rightContent: [],
        // 被点击的左侧菜单
        currentIndex: 0,
        // 右侧内容的滚动条距顶部的位置
        scrollTop: 0

    },
    // 临时接受返回的数据
    Cates: [],

    onLoad: function(options) {
        /*
        web中的本地存储和 小程序的本地存储区别
            1 代码区别：
                web:  localStorage.setItem("key","value")   localStorage.getItem("key")
                小程序：  wx.setStorageSync("key","value")   wx.getStorageSync("key")
            2 存的时候 有没有做类型转换
                web：  不管存入的是什么类型的数据，最终都会先调用 toString() 把数据变成字符串，再存入进去
                小程序：  不存在类型转换，存入什么数据，获取的就是什么数据
        小程序：
        因为每次请求返回的数据过于庞大，所以本地存储
        1 先判断本地存储中有没有旧的数据
          {time:Date.now(),data:[...]}
        2 没有旧数据  旧的数据过期了或者不一样了  那就发送请求
        3 就使用本地存储的旧数据
        */
        //  1 先判断本地存储中有没有旧的数据
        const Cates = wx.getStorageSync('cates');
        // 2 判断
        if (!Cates) {
            // 不存在那就发送请求
            this.getCates();
        } else {
            // 存在数据，但是时间过期，100秒过期
            if (Date.now() - Cates.time > 10000 * 10) {
                // 重新发送请求
                this.getCates();
            } else {
                // 可以使用旧的数据
                this.Cates = Cates.data
                let leftMenuList = this.Cates.map(v => v.cat_name);
                let rightContent = this.Cates[0].children;
                this.setData({
                    leftMenuList,
                    rightContent
                })
            }
        }
    },
    // 获取分类数据
    async getCates() {
        // request({
        //         url: '/categories'
        //     })
        //     .then(res => {
        //         let leftMenuList = res.data.message.map(v => v.cat_name);
        //         let rightContent = res.data.message[0].children
        //         this.Cates = res.data.message
        //             // 把接口的数据存储到本地存储中
        //         wx.setStorageSync('cates', { time: Date.now(), data: this.Cates })
        //         this.setData({
        //             leftMenuList,
        //             rightContent
        //         })
        //     })

        // 1 使用es7中的async await来发送请求
        const res = await request({ url: '/categories' })
            // 左侧菜单数据
        let leftMenuList = res.data.message.map(v => v.cat_name);
        // 右侧商品数据
        let rightContent = res.data.message[0].children
        this.Cates = res.data.message
            // 把接口的数据存储到本地存储中
        wx.setStorageSync('cates', { time: Date.now(), data: this.Cates })
        this.setData({
            leftMenuList,
            rightContent
        })
    },
    // 左侧菜单点击事件
    handleItenTap(e) {
        const { index } = e.currentTarget.dataset;
        let rightContent = this.Cates[index].children
        this.setData({
            currentIndex: index,
            rightContent,
            // 重新设置 右侧内推的scrollTop顶部的距离
            scrollTop: 0
        })
    }
})