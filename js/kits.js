//头部的购物车的数量计算
//头部购物车的数量是多个页面都要使用的,把他单独的抽离做一个公共文件,在每个需要他的地方引入他就行

    //创建一个对象
    let kits = {};
    //封装一个根据键获取数组的方法
    kits.loadArray = function(key) {
        let str = localStorage.getItem(key);
        let arr;
        if(str === null){
            arr = [];
        }else {
            arr = JSON.parse(str);
        }
        return arr;
    }
