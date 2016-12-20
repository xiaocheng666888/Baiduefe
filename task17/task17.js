/**
 * Created by xiao on 2016/12/15.
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
    var datStr = ''
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
var chartData = {};
var city = [];

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: -1,
    nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
    var curCityIndex = pageState.nowSelectCity;
    var curTime = pageState.nowGraTime;

    if(curTime=="day"){
        if(curCityIndex>=0){
            chartData = aqiSourceData[city[curCityIndex]];
            // console.log(chartData);
        }
    }else if(curTime=="month"){
        var dataFir = aqiSourceData[city[curCityIndex]];
        for(var i in dataFir){
            var dat = new Date(i);
            var count_1 = 0;var count_2=0;var count_3=0;
            if(dat.getMonth()==0){
                count_1 += dataFir[i];
            }else if(dat.getMonth()==1){
                count_2 += dataFir[i];
            }else if(dat.getMonth()==2){
                count_3 += dataFir[i];
            }
        }
        chartData={"2016-01-01":Math.ceil(count_1/31),"2016-02-01":Math.ceil(count_2/29),"2016-01-01":Math.ceil(count_3/31)};
        console.log(chartData);
    }else {

    }

    var str = "";
    var wrap = document.getElementById("aqi-chart-wrap");
    for(var i in chartData){
        str += "<div style='display: inline-block;width:10px;height:"+ chartData[i]+"px;background-color: #"+  chartData[i]*2000  +"'></div>";
        // console.log(str);
        wrap.innerHTML=str;
    }

}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(event) {
    var curTimeValue = event.target.value;
    // 确定是否选项发生了变化, 设置对应数据
    if(pageState.nowGraTime!=curTimeValue){
       pageState.nowGraTime = curTimeValue;
       console.log(pageState.nowGraTime);
    }
    // 调用图表渲染函数
    renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(event) {
    // 确定是否选项发生了变化
    var curCityIndex = event.target.selectedIndex;
    // console.log(curCityIndex);
    if(curCityIndex != pageState.nowSelectCity)
    // 设置对应数据
    {
        pageState.nowSelectCity = curCityIndex;
        // console.log(pageState.nowSelectCity);
    }
    // 调用图表渲染函数
    renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    var form_gra_time = document.getElementById("form-gra-time");
    form_gra_time.addEventListener("click",graTimeChange);
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var cityStr = "";
    var select = document.getElementById("city-select");
    for(var city in aqiSourceData){
       cityStr += "<option>" + city +"</option>"
    }
    select.innerHTML = cityStr;
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    select.addEventListener("click",citySelectChange);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中

    for(var c in aqiSourceData){
        city.push(c);
    }
    console.log(city);
    var color = ["black","red","blue","purple"];


}

/**
 * 初始化函数
 */
function init() {
    // var cityTest = document.getElementsByTagName("option")[0].index;
    // console.log(cityTest);
    initGraTimeForm();
    initCitySelector();
    initAqiChartData();
}

window.onload = init;

// window.onload = function () {
//     initGraTimeForm();
//     initCitySelector();
//     initAqiChartData();
// };


// var data =
//     [
//         {
//             city: "BeiJIng",
//             data: [
//                 {
//                     date: "2016-01-01",
//                     number: 10
//                 },
//                 {
//                     date: "2016-01-02",
//                     number: 30
//                 },
//                 {
//                     date: "2016-01-02",
//                     number: 40
//                 }
//             ]
//         },
//         {
//             city: "BeiJIng",
//             data: [
//                 {
//                     date: "2016-01-01",
//                     number: 10
//                 },
//                 {
//                     date: "2016-01-02",
//                     number: 30
//                 },
//                 {
//                     date: "2016-01-02",
//                     number: 40
//                 }
//             ]
//         }
//     ];