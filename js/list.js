/**
 * 商品列表部分 list.html
 * 需要动态的去生成页面的商品---需要遍历数组生成结构
 * --1.需要在生成动态商品的时候,在链接加上id,才能跳转找到对应的产品信息页面
   --2.修改商品图片,名字, 价钱,以售数量,销售进度,剩余件数;
 */

$(() => {
  //声明一个空结构
  let html = '';
  //遍历数组,动态生成商品
  phoneData.forEach((e, i) => { //e指数组的每个元素,每个元素是对象
    //让结构li累加
    //让生成的时候,在链接加上id,修改图片,名字,价钱,件数..
    html += `<li class="goods-list-item">
        <a href="detail.html?id=${e.pID}">
          <div class="item-img">
            <img src=${e.imgSrc} alt="">
          </div>
          <div class="item-title">
            ${e.name}
          </div>
          <div class="item-price">
            <span class="now">¥${e.price}</span> 
          </div>
          <div class="sold">
            <span> 已售 <em>${e.percent}% </em></span>
            <div class="scroll">
              <div class="per" style=width:${e.percent}%></div>
            </div>
            <span>剩余<i>${e.left}</i>件</span>
          </div>
        </a>
        <a href="#" class="buy">
          查看详情
        </a>
      </li>`
  })
   //手动找父元素
   $('.goods-list > ul').html(html);
})