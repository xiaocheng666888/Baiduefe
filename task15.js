/**
 * Created by xiao on 2016/12/13.
 */
/**
 * getData方法
 * 读取id为source的列表，获取其中城市名字及城市对应的空气质量
 * 返回一个数组，格式见函数中示例
 */
function getData() {
    /*
     coding here
     */
    var source = document.getElementsByName("aqi");
    var data = new Array();
    for(var i=0;i<source.length;i++)
    {
        var city =source[i].innerText.substr(0,2);
        var aqi = source[i].innerText.substr(7,2);
        var data1 = [city,aqi];
        data.push(data1);
    }

    return data;
}

/**
 * sortAqiData
 * 按空气质量对data进行从小到大的排序
 * 返回一个排序后的数组
 */
function sortAqiData(data) {
    data.sort(function (x,y) {
        return y[1]-x[1];
    })
    return data;
}

/**
 * render
 * 将排好序的城市及空气质量指数，输出显示到id位resort的列表中
 * 格式见ul中的注释的部分
 */
//    <li>第一名：北京空气质量：<b>90</b></li>
function render(data) {
    var chineseNum = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
    var contentStr = "";
    data.forEach(function (element, index) {
        contentStr += "<li>第" + chineseNum[index] + "名：" + element[0] + "空气质量：<b>" + element[1] + "</b></li>";
        console.log(element[0]);
        document.getElementById("resort").innerHTML = contentStr;
    })
}
function btnHandle() {
    var aqiData = getData();
    aqiData = sortAqiData(aqiData);
    render(aqiData);
}

function init() {

    // 在这下面给sort-btn绑定一个点击事件，点击时触发btnHandle函数
    var btn = document.getElementById("sort-btn");
    btn.addEventListener("click",btnHandle);
//        btn.onclick = btnHandle();
}

init();


/*总结

1.sortData没有给返回值
虽然data.sort().有返回值，但是自定义的sortData没有，导致后来aqiData = sortAqiData(aqiData);赋值后为空

2.使用getElementByTagName()有个问题，就是后来JS生成的li元素也会被计算在内，导致按钮多次被点击后出现混乱，所以在前面为li元素添加name，后面使用getElementByName()

3.巩固了forEach(),sort()的使用

4.学会了字符串截取函数的使用substr(start,length)   ,substring(start,end)
 */