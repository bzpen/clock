let baiduDom = document.getElementById('baidu'),
  weekDom = document.getElementsByClassName('week')[0],
  dateDom = document.getElementsByClassName('date')[0],
  hourDom = document.getElementsByClassName('hour')[0],
  minuteDom = document.getElementsByClassName('minute')[0],
  secondDom = document.getElementsByClassName('second')[0],
  offTimeDom = document.getElementsByClassName('offTime')[0],
  weekArr = ['星 期 日', '星 期 一', '星 期 二', '星 期 三', '星 期 四', '星 期 五', '星 期 六'],
  goHomeTime = '18:00:00';
// 搜索回车事件
baiduDom.onkeydown = function (event) {
  if(event.keyCode==13){
    window.open(`https://www.baidu.com/s?wd=${event.target.value}`)
  }
}
// 时间补零
function addZero(num){
  if(num>=10){
    return num
  }else{
    return '0' + num
  }
}
// 更新text
function setText(dom,text){
  dom.innerText = text
}
// 时间戳转时间
function time(time = +new Date()) {
    var date = new Date(time); // 增加8小时
    return date.toJSON().substr(11, 8).replace('T', ' ');
}
// 更新时间
function updateTime(){
  let date = new Date(),
    YY = date.getFullYear(),
    MM = addZero(date.getMonth() + 1),
    DD = addZero(date.getDate()),
    WW = weekArr[date.getDay()],
    hh = addZero(date.getHours()),
    mm = addZero(date.getMinutes()),
    ss = addZero(date.getSeconds()),
    // 当前时间
    currentTime = +new Date,
    // 下班时间
    offTime = +new Date(`${YY}-${MM}-${DD} ${goHomeTime}`);
    setText(weekDom,WW)
    setText(dateDom,`${YY} 年 ${MM} 月 ${DD} 日`)
    setText(hourDom,hh)
    setText(minuteDom,mm)
    setText(secondDom, ss)
    if (currentTime > offTime) {
      setText(offTimeDom,'到点了, 赶紧下班啦')
    } else {
      setText(offTimeDom,'距离下班：' + time(offTime-currentTime))
    }
}
// 设置定时器
let timer = null
timer = setInterval(() => {
  updateTime()
}, 1000);
// 监听窗口进入与隐藏
document.addEventListener("visibilitychange", function() {
  if (document.visibilityState == "hidden") {
    //切离该页面时执行
    clearInterval(timer)
  } else if (document.visibilityState == "visible") {
    //切换到该页面时执行
    timer = setInterval(() => {
      updateTime()
    }, 1000);
  }
});
