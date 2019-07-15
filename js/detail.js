/**
 * 三大功能: 1.在list.html上点击了商品后,会跳转到detail商品详情这里,修改内容
 *          2.在页面中实现加减商品数量
 *          3.点击加入购物车存储本地数据
 */

$(() => {
  //实现功能 1.在list.html上点击了商品后,会跳转到detail商品详情这里,修改内容
  /**
   * 商品详情部分
   * 一.在list.html上点击了商品后,会跳转到detail商品详情这里
   *  --1. 需要获取当前商品的id,才能对应找到商品的数据修改内容
   *  --2. location.search是用于获取网页地址跟在?号后面那部分 ****
   *  --3. 使用find()函数查找数组的里面与页面id相对应的对象id
   *        ---find()函数是用来查找元素的,找到就返回该元素,否则返
   *  --4. 修改商品的图片,名字,价格
   */
  //获取当前商品的id--location.search可以获得URL?后面那部分
  let id = parseInt(location.search.substring(4)); //把字符串转成数字
  // console.log(id);
  //用find在数组里面找到与此id对应的商品元素出来
  let obj = phoneData.find(e => {
    return e.pID === id; //这里会返回与着条件相符的元素,数组的元素是对象
  })

  //修改当前商品的图片
  $('.preview-img > img').attr('src', obj.imgSrc);
  //修改当前商品的名称
  $('.sku-name').text(obj.name);
  //修改当前商品的价钱
  $('.summary-price > .dd > em').text(obj.price);


  //实现功能2.在页面中实现加减商品数量
  /**  --1.获取原本的数据
   *   --2.点击加号时,自增,当数量>1 取消减号的禁用样式
   *   --3.点击减号时,自减,判断当前数量是1,则不可以继续减了
   *       判断当自减的时候数量又重新到回1了,重新设置禁用样式
   *   --4.一定要把值重新赋予回去
   */

  //获取元素
  let chooseNumber = $('.choose-number');
  let addBtn = $('.add');
  let reduceBtn = $('.reduce');

  //注册加号点击事件
  addBtn.on('click', () => {
    //先获取旧数据
    let old = parseInt(chooseNumber.val()); //把字符串转换成数字
    //让点击加号时自增
    old++;
    //由于减号在一开始设置了禁用样式,当加号大于1时,把减号的禁用样式去掉
    if (old > 1) {
      reduceBtn.removeClass('disabled');
    }
    //把数据重新赋值给chooseNumber
    chooseNumber.val(old);
  })

  //注册减号点击事件
  reduceBtn.on('click', () => {
    //获取旧数据
    let old = parseInt(chooseNumber.val()); //把字符串转换成数字
    //判断如果当前数字是1,则不能继续点击 ,停止后面的操作
    if (old === 1) {
      return;
    }
    old--;
    //当减到1的时候,把禁用样式重新设置给减号
    if (old === 1) {
      reduceBtn.addClass('disabled');
    }
    //把数据重新赋值给chooseNumber
    chooseNumber.val(old);
  })

  //实现功能 3.点击加入购物车存储本地数据
  /**
    在实现商品详情到购物车两个页面的联系时,要使用到本地数据
 * 本地数据的生成要在点击加入购物车的时候就要做了
 * 想以什么形式存储到本地数据?
 * 用一个对象保存要的数据,把数据以数组的形式储存到本地里去
 * 存储id,商品图片,商品名称,商品价钱,商品的数量
    1.--创建一个空数组
        --要读取之前有没有就数据,如果没有,则给空数组,如果有则读取出来,放到数组里面
    2.因为当我多次点击同一个商品时,在本地储存会出现相同的同一个商品数据
      --通过点击当前的商品,通过当前商品的id去旧数据里面找有没有相同的id
        如果有,则把数量相加,如果没有则创建新的
    3.把数组存到本地储存里面
  */

  //注册点击购物车事件
  $('.addshopcar').on('click', function () {
    //先获取加入购物车的商品数量
    let number = parseInt(chooseNumber.val()); //需要把字符串转成数字
    // console.log(number);
    //声明一个数组
    let arr;
    //读取数据,判断是否有旧数据
    let jsonStr = localStorage.getItem('shopCartData');
    if (jsonStr === null) {
      arr = [];
    } else {
      arr = JSON.parse(jsonStr);
    }
    //需要用find来找获取数据的数组里面是否有当前商品的id,如果有则让商品的数量相加
    let isExist = arr.find(e => {
      return e.id === id; //返回的是与当前id相对应的对象
    }) 
    // console.log(arr);
    // console.log(isExist)
    //如果没有重复的则返回undefined
    if(isExist !== undefined) {
      //这里是有相同id的时候,执行数量相加
      isExist.number += number;
    }else {
      //创建一个要保存数据的对象
      let good = {
        id : obj.pID,
        imgSrc : obj.imgSrc,
        name : obj.name,
        price : obj.price,
        number : number
      }
      //把数据放到数组里面
      arr.push(good);
    }

    //把数组转成字符串
    jsonStr = JSON.stringify(arr);
    //存到本地数据里
    localStorage.setItem('shopCartData',jsonStr);
  })





























})