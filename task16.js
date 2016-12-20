/**
 * Created by xiao on 2016/12/14.
 */

/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var aqi_city = document.getElementById("city").value.trim().replace(/\s+/g,"");
    var aqi_value = document.getElementById("value").value.trim().replace(/\s+/g,"");
    var regex1 =/^[a-zA-Z\u4E00-\u9FA5]+$/;
    var regex2 = /^[0-9]*[1-9][0-9]*$/ ;
    if(!regex1.test(aqi_city)){
        alert("城市名为中文或者英文");
        return;
    }
    if(!regex2.test(aqi_value)){
        alert("空气质量请输入整数");
        return;
    }
    aqiData[aqi_city] = aqi_value;

    // console.log(aqi_city+","+aqi_value);
    // console.dir(aqiData);

}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var table = document.getElementById("aqi-table");
    var contentStr = "<tr> <td>城市</td><td>空气质量</td><td>操作</td></tr>";
    for(var i in aqiData)
    {
        contentStr += " <tr> <td>" + i + "</td><td>" + aqiData[i] + "</td><td><button name="+ i +">删除</button></td></tr>";
        // table.innerHTML = contentStr;
    }
    table.innerHTML = contentStr;
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(event) {
    // do sth.
    if(event.target.name in aqiData){
        delete aqiData[event.target.name];
    }

    renderAqiList();
}

window.onload = function(){

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    var addBtn = document.getElementById("add-btn");
    addBtn.addEventListener("click",addBtnHandle);
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    var table = document.getElementById("aqi-table");
    table.addEventListener("click",delBtnHandle);
}

/*  总结
1.js引入方式为外部引入时，其中的全局函数会在页面加载完成前加载，所有按钮监听函数需要
赋值给window.load（）；

2.正则表达式的应用，暂时直接上网搜索，后期需要学习

3.此题事件冒泡的利用很关键，直接查找所有按钮的父控件并给其添加句柄，
然后根据event.target得到被点击的元素，在获取其属性值

4.此题已给出大致思路，如果完全自己做不一定能完成

5.对象的动态添加和删除，作为遗留问题，此处对象中最后一个键值对无法删除，这是一个bug

6.bug已修正，把更改内容的放到了for循环里面，数组为空，无法进入循环，那么页面上的内容不会被更改！！！！

 */