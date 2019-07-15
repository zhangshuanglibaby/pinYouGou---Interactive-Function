$(() => {
    let arr = kits.loadArray('shopCartData');
    let count = 0;
    arr.forEach(e => {
        count += e.number;
    });
    $('.shopcar .count').text(count);
})