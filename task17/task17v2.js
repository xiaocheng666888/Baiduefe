/**
 * Created by xiao on 2016/12/19.
 */

/* 数据格式演示
 var aqiSourceData = {
 "北京": {
 "2016-01-01": 10,
 "2016-01-02": 10,
 "2016-01-03": 10,
 "2016-01-04": 10
 }
 };
 */

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = '';
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {
    // "day":{
    //     "北京":{
    //         "2016-01-01": 10,
    //         "2016-01-02": 10,
    //         "2016-01-03": 10,
    //         "2016-01-04": 10},
    //     "上海":{},
    //     "深圳":{},
    //     },
    //
    // "week":{
    //     "北京":{
    //         "一": 10,
    //         "二": 10,
    //         "三": 10,
    //         "四": 10,
    //         "五": 10,
    //         "六": 10,
    //         "日": 10},
    //     "上海":{},
    //     "深圳":{}
    // },
    // "month":{
    //     "北京":{
    //         "2016-01": 10,
    //         "2016-02": 10,
    //         "2016-03": 10},
    //     "上海":{},
    //     "深圳":{}
    // }
};
var colors = ['#16324a', '#24385e', '#393f65', '#4e4a67', '#5a4563', '#b38e95',
    '#edae9e', '#c1b9c2', '#bec3cb', '#9ea7bb', '#99b4ce', '#d7f0f8'];

var left = {
    "day" :"10px",
    "week" :"20px",
    "month":"50px"
};
// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: -1,
    nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
    var cityIndex = pageState.nowSelectCity;
    var graTime = pageState.nowGraTime;
    var wrap = getEle("aqi-chart-wrap");
    var contentStr = "";
    var count = 0;
    for(var city in chartData[graTime]){
        // LOG(colors[Math.random()*10]);
        // count = 0 ;
        for(var i in chartData[graTime][city])

            var value = chartData[graTime][city][i];
            LOG(i+"-----------"+value);
            contentStr += "<div class='"+graTime+"' style='background-color: #"+Math.ceil(Math.random()*1000)+Math.ceil(Math.random()*1000)+";left: "+parseInt(left[graTime].slice(0,-2))*(count+1)+";height: "+value+"px;width: "+left[graTime]+";'></div>";
            count ++ ;
    }
    LOG(contentStr);
    wrap.innerHTML = contentStr;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(event) {
    var list = getEle("gra_time");
    var cur = event.target;
    // LOG("graTimeChange(event):event.target"+cur.value);
    // 确定是否选项发生了变化
    if(cur.value == pageState.nowGraTime)
    {
        return;
    }
    // 设置对应数据
    for(var i = 0; i < list.length; i++){
        list[i].checked = false ;
    }
    cur.checked = true;
    pageState.nowGraTime = cur.value;
    LOG(pageState.nowGraTime);
    // 调用图表渲染函数
    renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
    // 确定是否选项发生了变化
    var selectCity = getEle("city-select");
    if(selectCity.selectedIndex == pageState.nowSelectCity){
        return ;
    }
    // 设置对应数据
    pageState.nowSelectCity = selectCity.selectedIndex;
    LOG(pageState.nowSelectCity);
    // 调用图表渲染函数
    renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    var radioList = getEle("gra_time");
    // var radioList = document.getElementsByName("gra_time");
    for(var i = 0; i < radioList.length; i++){
        // radioList[i].index = i;
        radioList[i].onclick = function (event) {
            graTimeChange(event);
        };
    }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var selectCity = getEle("city-select");
    // LOG("initCitySelector()"+ aqiSourceData);
    selectCity.innerHTML = "";
    for(var i in aqiSourceData){
        // LOG(i);
        selectCity.innerHTML += "<option>" + i + "</option>";
    }
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    selectCity.onchange = function () {
        citySelectChange();
    };
    // LOG(selectCity.selectedIndex);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中
    var week = {}, wcount = 0, singleWeek = {},
        month = {}, mcount = 0, singleMonth = {};


    for (var key in aqiSourceData) {
        var tempCity = aqiSourceData[key];      //某个城市的所有数据：日期和空气质量

        //tempCity格式:{"2016-01-01": 10}；
        var keyArr = Object.getOwnPropertyNames(tempCity);   //92天的日期字符串数组
        // LOG("城市："+ key+"keyArr:"+keyArr);
        // LOG(myKeyArr==keyArr);
        var tempMonth = keyArr[0].slice(5, 7);  //截取2016-01-01的月份
        // tempMonth格式  "01"
        var weekInit = 4, weekCount = 0;        //2016-01-01为周五,
        for (var i = 0; i < keyArr.length; i++, weekInit++) {
            wcount += tempCity[keyArr[i]];       //周空气质量之和
            mcount += tempCity[keyArr[i]];      //月空气质量之和
            weekCount++;                        //这一周的天数

            //weekInit+1) % 7 == 0 表示这一周结束了
            //keyArr[i+1].slice(5, 7) !== tempMonth  表示月份结束；
            if ((weekInit+1) % 7 == 0 || i == keyArr.length - 1 || keyArr[i+1].slice(5, 7) !== tempMonth) {
                //tempKey格式："2016-01月第13周";
                var tempKey = keyArr[i].slice(0, 7) + "月第" + (Math.floor(weekInit / 7) + 1) + "周";                     //weekInit用来计算某一天是第几周

                //tempKey 第几周
                singleWeek[tempKey] = Math.floor(wcount / weekCount);


                if (i != keyArr.length - 1 && keyArr[i+1].slice(5, 7) !== tempMonth) {
                    //进来的条件为周结束，将weekInit初始化为0；
                    weekInit = weekCount % 7;
                }
                wcount = 0;
                weekCount = 0;

                if (i == keyArr.length - 1 || keyArr[i+1].slice(5, 7) !== tempMonth) {
                    //三个月全部结束或者月结束
                    tempMonth = (i == keyArr.length - 1) ? keyArr[i].slice(5, 7) : keyArr[i+1].slice(5, 7);
                    var tempMKey = keyArr[i].slice(0, 7);
                    //tempDays 为这个月的总天数
                    var tempDays = keyArr[i].slice(-2);
                    singleMonth[tempMKey] = Math.floor(mcount / tempDays);
                    mcount = 0;
                }
            }
        }
        week[key] = singleWeek;
        month[key] = singleMonth;
        singleWeek = {};
        singleMonth = {};
    }
    // 处理好的数据存到 chartData 中
    chartData.day = aqiSourceData;
    chartData.week = week;
    chartData.month = month;
}

/**
 * 初始化函数
 */
function init() {
    initGraTimeForm();
    initCitySelector();
    initAqiChartData();
}

window.onload = init;

function LOG(str) {
    console.log(str);
}

/**
 *
 * @param attr                  属性的名称
 * @returns {*}                返回元素或者元素数组；
 */
function getEle(attr) {
    var element;
    if(document.getElementById(attr)!=null){
        element = document.getElementById(attr);
    }else if(document.getElementsByClassName(attr)!=null&&document.getElementsByClassName(attr).length!=0){
        element = document.getElementsByClassName(attr);
    }else if(document.getElementsByName(attr)!=null&&document.getElementsByName(attr).length!=0){
        element = document.getElementsByName(attr);
    }else if(document.getElementsByTagName(attr)!=null&&document.getElementsByTagName(attr).length!=0){
        element = document.getElementsByTagName(attr);
    }else {
        return null;
    }
    return element;
}


/*function getMonthData(date,value){
 LOG("getMonthData()：date----" + date);
 LOG("getMonthData()：value----" + value);
 var monthData = [];
 switch (date.getMonth()){
 case 0:
 LOG("一月");
 jan += value;
 break;
 case 1:
 LOG("二月");
 feb += value;
 break;
 case 2:
 LOG("三月");
 mar += value;
 break;
 default:
 break;
 }
 monthData.push(Math.ceil(jan/31));
 monthData.push(Math.ceil(feb/29));
 monthData.push(Math.ceil(mar/31));
 console.dir("switch dir----"+monthData);
 return monthData;
 }

 function getDayData(date) {
 switch (date.getDay()){
 case 0:
 LOG("日");
 break;
 case 1:
 LOG("一");
 break;
 case 2:
 LOG("二");
 break;
 case 3:
 LOG("三");
 break;
 case 4:
 LOG("四");
 break;
 case 5:
 LOG("五");
 break;
 case 6:
 LOG("六");
 break;
 default:
 break;
 }
 }*/


// 1.onlick如果直接 = 函数（），这个函数会立即执行
// 2.getElementsByName返回值不为空时，长度可能为0；