// pages/goods_list/index.js
Page({
    data: {
        tabs: [{
                id: 0,
                value: "综合",
                isActive: true
            },
            {
                id: 1,
                value: "销量",
                isActive: false
            },
            {
                id: 2,
                value: "价格",
                isActive: false
            }
        ]
    },
    onLoad: function(options) {
    },
    // 标题点击事件获取索引
    handletabsItemChange(e) {
        // 获取标题索引
        const {index} = e.detail
        const {tabs} = this.data
        tabs.forEach((v,i) => i===index?v.isActive=true:v.isActive=false)
        this.setData({
            tabs
        })
    }
})