/**
 * 从详情页面跳转到购物车页面,实现两个页面间的联系,要用到本地储存
 * 一、 读取当前的数据 ,用数组遍历动态生成商品结构
 *        1.读取本本地数据
 *        2.遍历数组动态生成本地结构
 * 二、判断当前页面又没有内容
 *     1.如果当前没有内容,就显是空空如也的文字,表头和总计隐藏
 *     2.如果当前有内容,空空乳液文字隐藏,表头和总计显示
 * 
 *三、总件数和总价钱的计算
       1.由于后面每一个操作都会用到这个计算,把这个计算封装一个函数
          1.通过在按钮的钱袋元素设置id,才能找到在本地数据里哪些数据是被勾选的
          2.遍历勾选的按钮数组,获取id,再遍历数组把总件数和总价钱累加
          3.把累加的总件数和总价钱设置给页面

 四、注册全选和全不选事件  数量和价钱要和总件数和总价钱同步

 五、实现页面数量的增减
     1.要获取旧数据
     2.操作后要把数据返回
     3.要更新本地数据库里面的数值
        --1.通过获取id,遍历数组找到与之对应id号的商品,修改商品的数量
        --2.要把修改后的数量重新存储到本地数据里面

  六、实现商品删除
      1.对于删除这种危险的操作,需要弹出一个提示框
      2.要用户点击确认后再进行删除操作
      3.由于点击删除时一个还是,点击确认也是一个函数,我们需要提前用变量保存一下点击删除函数的this
      4.在点击确认的函数里
         1.让页面移出对应的商品
         2.让本地数据里面相应的移出商品
             1.通过当前点击删除的商品的id,利用findIndexo()的方法,找到与之id相对应的商品,返回的值是索引
             2.利用数组的splice()方法,把数组里面对应的商品移出
             3.要把更改后的数据重新存储到本地数据里面

 */


$(() => {
  //读取本地数据
  let jsonStr = localStorage.getItem('shopCartData');
  //转成数组
  let arr = JSON.parse(jsonStr);
  //遍历数组,生成页面的结构
  let html = '';
  //修改id号,图片,内容,名字,价钱,数量...
  arr.forEach(e => {
    html += `<div class="item" data-id="${e.id}">
    <div class="row">
      <div class="cell col-1 row">
        <div class="cell col-1">
          <input type="checkbox" class="item-ck" checked="">
        </div>
        <div class="cell col-4">
          <img src="${e.imgSrc}" alt="">
        </div>
      </div>
      <div class="cell col-4 row">
        <div class="item-name">${e.name}</div>
      </div>
      <div class="cell col-1 tc lh70">
        <span>￥</span>
        <em class="price">${e.price}</em>
      </div>
      <div class="cell col-1 tc lh70">
        <div class="item-count">
          <a href="javascript:void(0);" class="reduce fl">-</a>
          <input autocomplete="off" type="text" class="number fl" value="${e.number}">
          <a href="javascript:void(0);" class="add fl">+</a>
        </div>
      </div>
      <div class="cell col-1 tc lh70">
        <span>￥</span>
        <em class="computed">4158</em>
      </div>
      <div class="cell col-1">
        <a href="javascript:void(0);" class="item-del">从购物车中移除</a>
      </div>
    </div>
  </div>`
  });
  //手动添加父元素
  $('.item-list').html(html);

  //判断当当前有数据时,则把空空如也和隐藏,否则显示
  if (arr.length >= 1) {
    //把空空如也和隐藏
    $('.empty-tip').addClass('hidden');
    //把标头和总计显示出来
    $('.cart-header').removeClass('hidden');
    $('.total-of').removeClass('hidden');
  } else {
    $('.empty-tip').removeClass('hidden');
    $('.cart-header').addClass('hidden');
    $('.total-of').addClass('hidden');
  }

  //实现总计的计算
  /**
   * 要计算总件数和总计,计算的时候可以从本地储存里面获取数据
   * 有个问题,怎么知道本地储存里面是哪个数据被勾选了呢
   *  解决办法,在购物车页面生成结构时,用自定义属性在多选框储存当前商品的id
   * 得到勾选的多选框,得到对应的id,去本地储存里面,找对应的id商品
   * 然后把它们的数量和价钱加起来
   * 
   * 
   * 在生成的时候就要把id储存到多选框上,但是考虑到后面删除的时候也要用到id
   * 可以把id存到共同的前代元素身上item
   */

  //把计算总件数和总计封装成函数
  function getCountAndMoney() {
    let totalCount = 0;
    let totalMoney = 0;
    $('.item-ck:checked').each((i, e) => { //：checked是伪数组来的,e代表每个勾选的input元素
      // console.log(e);
      //获取id
      let id = parseInt($(e).parents('.item').attr('data-id')); //把id转换成数字
      // console.log(id);
      //遍历从本地储存获取数据的数组arr,找到对应的id
      arr.forEach(e => {
        if (id === e.id) {
          //如果找到了,则把这些商品都加起来
          totalCount += e.number;
          totalMoney += e.number * e.price;
        }
      })
    })
    //设置给页面的总件数和总计
    $('.selected').text(totalCount);
    $('.total-money').text(totalMoney);
  }
  getCountAndMoney();

  //实现全选和全不选
  //注册全选点击事件
  $('.pick-all').on('click', function () {
    //用一个变量保存自己的状态
    let status = $(this).prop('checked');
    //把自己的状态设置给每个多选框
    $('.item-ck').prop('checked', status);
    //总计那里还有个全选
    $('.pick-all').prop('checked', status);
    //实现总计和总价同步
    getCountAndMoney();
  })

  //注册每个多选框点击事件
  $('.item-ck').on('click', function () {
    //如果选择多选框数量的长度等于数组的长度,则代表是全选了
    $('.pick-all').prop('checked', $('.item-ck:checked').length === arr.length);
    //实现总计和总价同步
    getCountAndMoney();
  })

  //实现数量的相加
  //由于购物车的商品是动态生成的
  //注册事件最好使用事件委托
  //注册加号的点击事件
  $('.item-list').on('click', '.add', function () {
    //获取旧数据 事件委托的this指的是后代元素
    let old = $(this).siblings('.number').val();
    // console.log(old);
    old++;
    //把值重新赋值给number
    $(this).siblings('.number').val(old);
    //把本地里面的数据更新
    //判断依据是点击当前商品的id
    //获取id
    let id = parseInt($(this).parents('.item').attr('data-id')); //把id转成数字
    // console.log(id);
    //在数组里面遍历寻找对应的id商品
    let obj = arr.find(e => {
      return e.id === id;
    })
    //更新数量
    obj.number = old;
    //要把更改好的数据重新存回去
    jsonStr = JSON.stringify(arr);
    localStorage.setItem('shopCartData', jsonStr);
    //实现总计和总价同步
    getCountAndMoney();
  })

  //注册减号的点击事件
  $('.item-list').on('click', '.reduce', function () {
    //获取旧数据  在事件委托中this指的是后代元素
    let old = parseInt($(this).siblings('input').val()); //把字符串转成数字
    // console.log(old);
    //如果当前是1,则不能点击
    if (old === 1) {
      return;
    }
    old--;
    //如果当当前的商品减数量减到1的时候,设置禁用样式
    if (old === 1) {
      $(this).addClass('disabled');
    }
    //把值重新赋值给回去
    $(this).siblings('input').val(old);
    //更新本地的数据
    //获取id
    let id = parseInt($(this).parents('.item').attr('data-id')); //把id转成数字
    // console.log(id);
    //在数组里面找对应的id的商品
    let obj = arr.find(e => {
      return e.id === id;
    })
    //更新数量
    obj.number = old;
    //把更改的数据重新赋值回去
    jsonStr = JSON.stringify(arr);
    localStorage.setItem('shopCartData', jsonStr);
    //实现总计和总价同步
    getCountAndMoney();
  })

  //实现商品删除
  /**
   * 我们需要有一些页面的交互常识
   * 比如要删除数据这种危险的操作,需要让客户进行确认
   * 弹出一个提示框让用户确认
   * 在原生的js中有个去人的提示框
   * confirm('你确认要删除吗')?
   * 但是一般不会用原生js去写
   * 这里用到jq的ui框架
   */
  //由于购物车的商品都是动态生成的
  //注册删除时间要用事件委托
  //注册点击删除事件
  $('.item-list').on('click', '.item-del', function () {
    //因为点击删除的动作是在提示框弹出,点击确认后再删除的,提示框是另一函数
    //我们在这里先用一个变量保存这里的this---这里的this指向委托的元素.item-del删除
    let _this = this;
    //弹出一个提示框
    $(function () {
      $("#dialog-confirm").dialog({
        resizable: false, //设置提示框不可拉大
        height: 140,
        modal: true,
        buttons: {
          "确认": function () {
            $(this).dialog("close");
            //点击确认后,从页面中移除商品项
            $(_this).parents('.item').remove();
            //也要根据被移出的商品的id在本地出村里面把相应的商品移出
            //获取要删除商品的id
            let id = parseInt($(_this).parents('.item').attr('data-id')); //把id转成数字
            // console.log(id);
            //可以利用findinde()的方法在数组里面寻找对应id商品的索引,通过索引把数组里面对应的商品删除
            let index = arr.findIndex(e => { //返回的是对应商品的索引
              return e.id === id;
            })
            //通过索引把数组的对应商品移出
            arr.splice(index, 1);
            // console.log(arr);
            //需要把更改后的数据重新储存在本地里面
            //把数组转成字符串
            jsonStr = JSON.stringify(arr);
            localStorage.setItem('shopCartData', jsonStr);
          },
          "取消": function () {
            $(this).dialog("close");
          }
        }
      });
    });
  })

})