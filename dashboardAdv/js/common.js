function EchartObj(domId,option) {
    this.domId = domId;
    this.option = option;
    this.myChart = echarts.init(document.getElementById(this.domId),null,{devicePixelRatio:4});
}
EchartObj.prototype={
    constructor:EchartObj,
    setOp :function () {
        this.myChart.setOption(this.option)
    }
}
var GPATH ={
    /*
        全国终端展示页面接口
    */
    queryChartsTerminal:"http://54.222.134.242:8899/boardDemo/advertise/query_charts_terminal",
    queryNumbersTerminal:"http://54.222.134.242:8899/boardDemo/advertise/query_numbers_terminal",
    terminalInitCollect:"http://54.222.134.242:8899/boardDemo/advertise/terminal_init_collect",


    //基本都是生成echart图的数据
    getChartsTerminal:"http://54.222.134.242:8899/boardDemo/advertise/get_charts_terminal",
    // 中国地图热力图
    terminalHeatData:"http://54.222.134.242:8899/boardDemo/advertise/terminalHeatData",
    //当日实时数据采集量
    terminalHeartBeat_data :"http://54.222.134.242:8899/boardDemo/advertise/terminal_heartbeat_data",
    //获取酒店房间数据
    terminalAllNewRoom:"http://54.222.134.242:8899/boardDemo/advertise/terminal_all_new_room",
    //终端活跃数量
    terminalActiveData:"http://54.222.134.242:8899/boardDemo/advertise/terminal_active_data",

    /*
        全国广告数据展示页面接口
    */
    //除地图外的echart图数据
    queryChartsAdvs:"http://yun.ctlife.tv:8899/boardDemo/dashboard/getCharts?type=advs",
    queryNumbersAdvs:"http://yun.ctlife.tv:8899/boardDemo/dashboard/getNumbers?type=advs",
    advTodayAdvsData:"http://yun.ctlife.tv:8899/boardDemo/advertise/advTodayAdvsData",



    //中国地图热力图
    advKanbanHeatData:"http://54.222.134.242:8899/boardDemo/advertise/advKanbanHeatData",
    
    // 广告曝光频次
    advTodayAdvsData:"http://54.222.134.242:8899/boardDemo/advertise/advTodayAdvsData"



}
var customFns = {
    //echart中设置文字的方法  如要设置20px即设置fontSize(20)
    fontSize:function (res){
        var docEl = document.documentElement,
        clientWidth = window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;
        if (!clientWidth) return;
        var fontSize = 100 * (clientWidth / 1920);
        return res*fontSize;
    }
}
var options = {
    //设置图标字体与fontsize的倍率
    rate:6,
    titleRate:4.5,
    dynamicRate:4.3,
    legendRate:8,
    titleColor:"#555656",//图表标题颜色
    axisColor:"#7c7b7c",//XY轴字体颜色
    chartValueColor:"#555656",//图表数值颜色
    //柱状图-具有背景横向
    barChart:function (color,barLabel,bgData,barData,num) {
        var option = {
            title: {
                show:true,
                text: '',
                textStyle: {//主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
                    // fontFamily: 'monospace',
                    fontSize: num?num/this.titleRate:14,
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    color:this.titleColor
                },
                x:"3%",
                y:"6%"
            },
            color: [color[0]],
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '5%',
                right: '8%',
                top:"25%",
                bottom: '6%',
                containLabel: true
            },
            yAxis : [
                {
                    type: 'category',
                    data: barLabel,
                    axisTick: {
                        show:false,
                        // alignWithLabel: true
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#fff',  //坐标的字体颜色
                            fontSize: num ? num / this.rate : 14,
                        },
                        interval: 0,
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#fff',  //坐标的字体颜色
                        },
                        show: false
                    },
                    splitLine: {
                        show: false
                    },

                }
            ],
            xAxis : [
                {
                    type : 'value',
                    axisLabel: {

                        textStyle:{
                            color:'#fff',  //坐标的字体颜色
                        },
                    },
                    splitLine: {
                        show: false,
                    },
                    axisLine: {
                        lineStyle:{
                            color:'#0E3254',  //坐标的字体颜色
                        },
                    },
                    max:"dataMax"
                }
            ],
            series : [
                {
                    type: 'bar',
                    itemStyle: {
                        borderType:"solid",
                        borderColor:"#264670",
                        borderWidth:1,
                        barBorderRadius:6,
                        color: 'rgba(32,23,34,.01)'

                        // emphasis:{
                        //     barBorderRadius:6,
                        // },
                        // normal: {
                        //     barBorderRadius:6,
                        //     color: 'rgba(32,23,34,.1)'
                        // }
                    },
                    silent: true,
                    barWidth: "30%",
                    barGap: '-100%', // Make series be ove
                    data: bgData
                },
                {
                    name:'',
                    type:'bar',
                    barWidth: '30%',
                    data:barData,
                    itemStyle: {
                        emphasis:{
                            barBorderRadius:6,
                        },
                        normal: {
                            barBorderRadius:6,
                            // color:color[0]
                            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                offset: 0,
                                color: color[1] // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: color[0] // 100% 处的颜色
                            }], false)
                        }
                    }
                }
            ],
            // legend: {
            //     x : '50%',
            //     y : '20%',
            //     type: 'scroll',
            //     orient: 'vertical',
            //     textStyle: {
            //         fontSize: num?num/this.rate:14,
            //         color:"white",
            //         fontFamily: "Microsoft YaHei",
            //     },
            //     data:barLabel
            // },
        }
        return option;
    },
    noBgBarChart:function (color,barLabel,barData,num) {
        var option = {
            title: {
                show:true,
                text: '',
                textStyle: {//主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
                    fontSize: num?num/this.titleRate:14,
                    fontStyle: 'normal',
                    fontWeight: 'bold',
                    color:this.titleColor,
                    fontFamily:'font_siyuan'
                },
                x:"5%",
                y:"8%"
            },
            color: color[0],
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '5%',
                right: '20%',
                top:"25%",
                bottom: '6%',
                containLabel: true
            },
            yAxis : [
                {
                    type: 'category',
                    data: barLabel,
                    axisTick: {
                        show:false,
                        // alignWithLabel: true
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#7c7b7c',  //坐标的字体颜色
                            fontSize: num ? num / this.rate : 14,
                            fontWeight: "bold",
                            fontFamily:'font_siyuan'
                        },
                        interval: 0,
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#7c7b7c',  //坐标的字体颜色
                        },
                        show: false
                    },
                    splitLine: {
                        show: false
                    },

                }
            ],
            xAxis : [
                {
                    type : 'value',
                    axisLabel: {
                        show: false,
                        textStyle:{
                            color:'#7c7b7c',  //坐标的字体颜色
                            fontSize: num?num/this.titleRate:14,
                            fontFamily:'font_siyuan'
                        },
                    },
                    splitLine: {
                        show: false,
                    },
                    axisLine: {
                        show: false,
                        lineStyle:{
                            color:'#0E3254',  //坐标的字体颜色
                        },
                    },
                    max:"dataMax",
                    axisTick: {
                        show:false,
                        // alignWithLabel: true
                    },
                }
            ],
            series : [
                {
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            barBorderRadius:6,
                            label: {
                                formatter:function(params){
                                   for(i=0;i<barData.length;i++){
                                        if(params.dataIndex==i){
                                            return barData[i];
                                        }
                                    }
                                },
                                show: true,
                                position: "right",
                                textStyle: {
                                  fontSize: num?num/this.legendRate*1.3:14,
                                  color: "#555656",
                                  fontFamily:"font_siyuan",
                                  Weight:"bold"
                    
                                }
                            },
                            color:"#e5e9ea",
                        }
                    },
                    silent: true,
                    barWidth: '30%',
                    barGap: '-100%', // Make series be ove
                    data: []
                },
                {
                    name:'',
                    type:'bar',
                    barWidth: '30%',
                    data:barData,
                    itemStyle: {
                        emphasis:{
                            barBorderRadius:6,
                        },
                        normal: {
                            barBorderRadius:6,
                            label: {
                                formatter:function(a){
                                    console.log(a)
                                },
                                show: false,		//开启显示
                                position: [200, 0],	//在上方显示
                                textStyle: {	    //数值样式
                                    color: '#fff',
                                    fontSize: num?num/this.legendRate:14
                                }
                            },
                            // color:color[0]
                            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                offset: 0,
                                color: color[0] // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: color[1] // 100% 处的颜色
                            }], false)
                        }
                    }
                },
                
            ],
            // legend: {
            //     x : '50%',
            //     y : '20%',
            //     type: 'scroll',
            //     orient: 'vertical',
            //     textStyle: {
            //         fontSize: num?num/this.rate:14,
            //         color:"white",
            //         fontFamily: "Microsoft YaHei",
            //     },
            //     data:barLabel
            // },
        }
        return option;
    },

    //柱状图-多柱状横向
    stackedBarChart:function (color,barLabel,barData,num) {
        var option = {
            title: {
                show:true,
                text: '',
                textStyle: {//主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
                    // fontFamily: 'monospace',
                    fontSize: num?num/this.titleRate:14,
                    fontStyle: 'normal',
                    fontWeight: 'bold',
                    color:this.titleColor,
                    fontFamily:"font_siyuan"
                },
                x:"6%",
                y:"6.5%"
            },
            color: color,
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '5%',
                right: '18%',
                top:"22%",
                bottom: '8%',
                containLabel: true
            },
            yAxis : [
                {
                    type: 'category',
                    data: barLabel,
                    axisTick: {
                        show:false,
                        // alignWithLabel: true
                    },
                    axisLabel: {
                        textStyle: {
                            color: this.titleColor,  //坐标的字体颜色
                            fontSize: num ? num / this.rate : 14,
                        },
                        interval: 0,
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#fff',  //坐标的字体颜色
                        },
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                    axisTick:{       //y轴刻度线
                        show:false
                    },
                }
            ],
            xAxis : [
                {
                    type : 'value',
                    axisLabel: {
                        show: false,
                        textStyle:{
                            color:'#fff',  //坐标的字体颜色
                        },
                    },
                    splitLine: {
                        show: false,
                    },
                    axisLine: {
                        show:false,
                        lineStyle:{
                            color:'#0E3254',  //坐标的字体颜色
                        },
                    },
                    max:"dataMax",
                    axisTick:{       //y轴刻度线
                        show:false
                    },
                }
            ],
            series : barData,
            legend: {
                right :"8%",
                top : '7%',
                // type: 'scroll',
                orient: 'horizontal',
                textStyle: {
                    fontSize: num?num/this.legendRate:14,
                    color:"white",
                    fontFamily: "font_siyuan",
                },
                // data:[barData[0].name,barData[1].name]
                data:[barData[0].name,barData[1].name],
                itemWidth:num?num/this.rate*1.5:14,
                itemHeight:num?num/this.rate:14,
            },
        }
        return option;
    },
    //折线图
    lineChart:function (color,lineLabel,lineData,num) {
        var option = {
            // color: color[0],
            title: {
                show:true,
                text: '',
                textStyle: {//主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
                    // fontFamily: 'monospace',
                    fontSize: num?num/this.titleRate:14,
                    fontStyle: 'normal',
                    fontWeight: 'bold',
                    color:this.titleColor,
                    fontFamily:"font_siyuan",
                    Weight:"bold"
                },
                x:"6%",
                y:"6%"
            },
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '4%',
                right: '8%',
                top:"22%",
                bottom: '8%',
                containLabel: true
            },
            xAxis : [
                {
                    boundaryGap: false, 
                    nameLocation:"center",
                    type : 'category',
                    data : lineLabel,
                    axisTick:{       //y轴刻度线
                        show:false
                    },
                    axisLabel: {
                        textStyle:{
                            color:'#555656',  //坐标的字体颜色
                            fontSize:num?num/this.rate:14,
                            fontFamily:"font_siyuan",
                        },
                        interval:0,
                        formatter : function(params){
                            var newParamsName = "";// 最终拼接成的字符串
                            var paramsNameNumber = params.length;// 实际标签的个数
                            var provideNumber = 2;// 每行能显示的字的个数
                            var rowNumber = Math.ceil(paramsNameNumber / provideNumber);// 换行的话，需要显示几行，向上取整
                            /**
                             * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
                             */
                            // 条件等同于rowNumber>1
                            if (paramsNameNumber > provideNumber) {
                                /** 循环每一行,p表示行 */
                                for (var p = 0; p < rowNumber; p++) {
                                    var tempStr = "";// 表示每一次截取的字符串
                                    var start = p * provideNumber;// 开始截取的位置
                                    var end = start + provideNumber;// 结束截取的位置
                                    // 此处特殊处理最后一行的索引值
                                    if (p == rowNumber - 1) {
                                        // 最后一次不换行
                                        tempStr = params.substring(start, paramsNameNumber);
                                    } else {
                                        // 每一次拼接字符串并换行
                                        tempStr = params.substring(start, end) + "\n";
                                    }
                                    newParamsName += tempStr;// 最终拼成的字符串
                                }

                            } else {
                                // 将旧标签的值赋给新标签
                                newParamsName = params;
                            }
                            //将最终的字符串返回
                            return newParamsName
                        }
                    },
                    axisLine: {
                        lineStyle:{
                            color:'#fff',  //坐标线颜色
                            width:'2'
                        },
                    },
                   

                }
            ],
            yAxis : [
                {
                    nameLocation:"center",
                    offset:1,
                    type : 'value',
                    axisLabel: {
                        textStyle:{
                            color:'#555656',  //坐标的字体颜色
                            fontSize:num?num/this.rate:14,
                            fontFamily:"font_siyuan",
                            Weight:"bold"
                        },
                    },
                    splitLine: {
                        show: true,
                        lineStyle:{
                            color: '#C6C6C6',
                            width: '1',
                            type: 'solid'
                        }
                    },
                    axisLine: {
                        lineStyle:{
                            color:'#fff',  //坐标的字体颜色
                            width:'2'
                        },
                    },
                    axisTick:{       //y轴刻度线
                        show:false
                    },
                }
            ],
            series : [
                {
                    name:'',
                    type:'line',
                    data:lineData,
                    smooth: true,
                    itemStyle: {
                        emphasis:{
                            barBorderRadius:7,
                        },
                        normal: {
                                            barBorderRadius:7,
                                            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                                offset: 0,
                                                color: color[1] // 0% 处的颜色
                                            }, {
                                                offset: 1,
                                                color: color[0] // 100% 处的颜色
                                            }], false)
                                        }
                    },
                    areaStyle:{
                        normal:{
                            //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: .4,
                                color: color[2]
                            }, {
                                offset: 1,
                                color: color[3]
                            }])
                        }
                    },
                }
            ],
            // series : [
            //     {
            //         name:'',
            //         type:'line',
            //         data:lineData,
            //         smooth: true,
            //         itemStyle: {
            //             emphasis:{
            //                 barBorderRadius:7,
            //             },
            //             normal: {
            //                 barBorderRadius:7,
            //                 color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
            //                     offset: 0,
            //                     color: color[1] // 0% 处的颜色
            //                 }, {
            //                     offset: 1,
            //                     color: color[0] // 100% 处的颜色
            //                 }], false)
            //             }
            //         },
            //         areaStyle:{
            //             normal:{
            //                 //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
            //                 color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            //                     offset: 0,
            //                     color: color[1]
            //                 }, {
            //                     offset: .8,
            //                     color: color[2]
            //                 }])

            //             }
            //         },
            //     }
            // ],
            legend: {
                x : '55%',
                y : '20%',
                type: 'scroll',
                orient: 'vertical',
                textStyle: {
                    fontSize: num?num/this.rate:14,
                    color:"white",
                    fontFamily: "font_siyuan",
                },
            },
        }
        return option;
    },
    
    //环形饼图
    pieChart:function(color,title_label,pieData,num){
        var option = {
            title: {
                text: '',
                left: 'left',
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            color: color||['#249CF9',"rgba(0,66,117,0.1)"],
            legend: {
                orient: 'vertical',
                // x:"20%",
                y: '75%',
                data:[title_label],
                textStyle: {
                    fontSize: num?num/this.rate:14,
                    color:"white",
                    fontFamily: "Microsoft YaHei",

                },
                itemWidth:num?num/this.rate*1.5:14,
                itemHeight:num?num/this.rate:14,
            },
            graphic:{
                type:'text',
                left:'center',
                top:'36%',
                style:{
                    text:pieData[0].name,
                    textAlign:'center',
                    fill:'white',
                    width:30,
                    height:30,
                    fontSize: num?num/this.rate/1.1:14,
                }
            },
            series : [
                {
                    name: title_label,
                    type: 'pie',
                    center : ['50%','40%'],
                    radius: ['50%', '55%'],
                    label: {
                        show:false
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    // hoverAnimation:false,
                    data:pieData,
                    hoverOffset:  num?num/this.rate/2.5:5,
                }
            ]
        };
        return option;
    },
    pieChartOther:function(color,label,pieData,num){
        var option = {
            title: {
                show:true,
                text: '',
                textStyle: {//主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
                    // fontFamily: 'monospace',
                    fontSize: num?num/this.titleRate:14,
                    fontStyle: 'normal',
                    fontWeight: 'bold',
                    color:this.titleColor,
                    fontFamily:"font_siyuan"
                },
                x:"6%",
                y:"7%"
            },
            legend: {
                orient: 'vertical',
                x:"55%",
                y: '20%',
                data:label,
                itemGap: num ? num / this.rate/1.6 : 7,
                textStyle: {
                    // fontSize: num?num/this.rate:14,
                    color:this.titleColor,
                    // fontFamily: "Microsoft YaHei",
                    fontWeight: 'bold',
                    rich:{
                        a:{
                            fontSize: num?num/this.rate:14,
                            padding:[0,5,0,0],
                            fontFamily: "font_siyuan",
                            fontWeight:"bold"
                        },
                        b:{
                            fontFamily: "font_siyuan",
                            fontSize: num?num/this.rate:14,
                        }
                    }
                },
                data:label,
                icon: "circle", 
                itemWidth:num?num/this.rate/1.3:14,
                itemHeight:num?num/this.rate/1.3:14,
                formatter: function(name) {
                    // 获取legend显示内容
                    var data = pieData;
                    var total = 0;
                    var tarValue = 0;
                    for (var i = 0, l = data.length; i < l; i++) {
                        total += parseInt(data[i].value);
                        if (data[i].name == name) {
                            tarValue = data[i].value;
                        }
                    }
                    var arr = [
                        '{a|'+name+'}',
                        '{b|'+((tarValue/total)*100).toFixed(2)+'%}'
                    ]
                    return arr.join('')
                },
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)",
            },
            color: color||['#249CF9',"rgba(0,66,117,0.1)"],

            graphic:{
                elements: [{
                    type: 'image',
                    style: {
                        image: '',
                        width: num?num*2.1:30,
                        height: num?num*2.1:30,
                    },
                    left: '10%',
                    top: '26.2%'
                }]
            },
            series : [
                {
                    name: "",
                    type: 'pie',
                    center : ['40%','50%'],
                    radius: ['45%', '55%'],
                    label: {        //展示文本设置
                        normal: {
                            show: false,     //展示
                            position: 'outside',      // outside表示文本显示位置为外部
                            textStyle: {    //文本样式
                                fontSize: num?num/this.rate:14,
                                fontWeight: '600',
                            },
                            formatter: '{a}{b}({d}%)',
                            // padding: [10,10],
                        },
                        emphasis: {    //文本样式
                            show: false,    //展示
                        }
                    },

                    labelLine: {    //引导线设置
                        normal: {
                            show: true,   //引导线显示
                        }
                    },
                    data:pieData,
                    hoverOffset:  num?num/this.rate/2.5:5,
                }
            ]
        };
        return option;
    },
    pieChartOtherOne:function(color,label,pieData,num){
        var option = {
            title: {
                show:true,
                text: '',
                textStyle: {//主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
                    // fontFamily: 'monospace',
                    fontSize: num?num/this.titleRate:14,
                    fontStyle: 'normal',
                    fontWeight: 'bold',
                    color:this.titleColor,
                    fontFamily:"font_siyuan"
                },
                x:"6%",
                y:"6%"
            },
            legend: {
                orient: 'horizontal',
                x:"72%",
                y: '7%',
                data:label,
                textStyle: {
                    fontSize: num?num/this.rate:14,
                    color:this.titleColor,
                    fontFamily: "font_siyuan",
                },
                data:label,
                icon: "circle", 
                itemWidth:num?num/this.rate/1.2:14,
                itemHeight:num?num/this.rate/1.2:14,
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            color: color||['#249CF9',"rgba(0,66,117,0.1)"],

            graphic:{
                elements: [{
                    type: 'image',
                    style: {
                        image: '',
                        width: num?num*2.3:30,
                        height: num?num*2.3:30,
                    },
                    left: '28%',
                    top: '28%'
                }]
            },
            series : [
                {
                    name: "",
                    type: 'pie',
                    center : ['50%','55%'],
                    radius: ['45%', '51%'],
                    label: {        //展示文本设置
                        normal: {
                            show: true,     //展示
                            position: 'outside',      // outside表示文本显示位置为外部
                            textStyle: {    //文本样式
                                fontSize: num?num/this.rate*1.2:14,
                                fontWeight: '600',
                            },
                            formatter: '{a}{b}({d}%)',
                            // padding: [10,10],
                        },
                        emphasis: {    //文本样式
                            show: false,    //展示
                        }
                    },

                    labelLine: {    //引导线设置
                        normal: {
                            show: true,   //引导线显示
                            lineStyle:{
                                width:2
                            }
                        }
                    },
                    data:pieData,
                    hoverOffset:  num?num/this.rate/2.5:5,
                }
            ]
        };
        return option;
    },
    //动态饼图
    dynamicChart:function (color,data,num) {
        var option ={
            // color:['#0aF447','#1B69FF','#FFB000','#8ABE78'],
            color:color,
            title: {
                show:true,
                text: '',
                textStyle: {//主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
                    // fontFamily: 'monospace',
                    fontSize: num?num/this.titleRate:14,
                    fontStyle: 'normal',
                    fontWeight: 'bold',
                    color:this.titleColor
                },
                x:"3%",
                y:"6%"
            },
            series: [
                {
                    name:'任务',
                    type:'pie',
                    radius: ['57%', '70%'],
                    center : ['55%', '52%'],
                    avoidLabelOverlap: true,
                    selectedOffset:15,
                    selectedMode:true,
                    hoverOffset:  num?num/this.rate:5,
                    label: {
                        normal: {
                            show: true,
                            position: 'outside',
                            // formatter: function(data){ // 设置圆饼图中间文字排版
                            //       return '{d}'+"\n"+data.name
                            // }
                            formatter:'{d|{d}}{d|%}'+"\n"+'{b|{b}}',
                            rich: {
                                d: {
                                    color: '#fff',
                                    fontSize: num?num/this.dynamicRate*1.3:30,
                                    lineHeight: 33,
                                    fontFamily:"Microsoft Yahei"

                                },
                                b: {
                                    color: '#fff',
                                    lineHeight: 30,
                                    align: 'center',
                                    fontSize: num?num/this.dynamicRate/1.1:20,
                                    fontFamily:"SimHei",
                                    fontWeight:"bold"
                                }
                            }
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: num?num/this.dynamicRate:40,
                                fontWeight: 'bold',
                                color:"#fff",
                            }
                        }
                    },
                    animationDurationUpdate:500,
                    labelLine: {
                        normal: {
                            show: true
                        }
                    },
                    data:data
                }
            ]
        }
        return option;
    },
    //热力图
    heatMapChart:function (data,num) {
        var option = {
            title: {
                text: '',
                left: 'left',
            },
            tooltip : {
                trigger: 'item',
                showDelay:1000,
                hideDelay:1000,
            },
            grid: {
                // left: '3%',
                // right: '4%',
                top:"5%",
                bottom: '15%',
                containLabel: true
            },
            geo: {
                type : 'map',
                map : 'china',
                label: {
                    emphasis: {
                        show: false
                    }
                },
                zoom: 1.2,
                roam:false,
                itemStyle: {
                    normal: {
                        areaColor: '#fff',
                        borderColor: '#435592',
                        // shadowColor: 'rgba(0,54,255, 1)',
                        // shadowBlur: 1,
                        borderWidth:2,
                    },
                    emphasis: {
                        areaColor: '#d1d1d1'
                    }
                },
                // regions: [
                //     {
                //       name: "南海诸岛",
                //       value: 0,
                //       itemStyle: {
                //         normal: {
                //           opacity: 0,
                //           label: {
                //             show: true
                //           }
                //         }
                //       }
                //     }
                // ]
            },
            visualMap: {
                show: false,
                top: 'top',
                min: 0,
                max: 5,
                seriesIndex: 1,
                calculable: true,
                inRange: {
                    color: "#4BB2A1" //热力点颜色
                }
            },
            series : [
                {
                    type: 'map',
                    map: 'china',
                    // geoIndex: 1,
                    // aspectScale: 0.75, //长宽比
                    showLegendSymbol: false, // 存在legend时显示
                    label: {
                        normal: {
                            show: false,
                        },
                        emphasis: {
                            show: false,
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    },
                    zoom: 1.2,
                    roam: false,
                    itemStyle: {
                        normal: {
                            areaColor: '#fff',
                            borderColor: '#435592',
                            borderWidth: 0.8,
                        },
                        emphasis: {
                            areaColor: '#01215c'
                        }
                    },
                    data:[]
                    
                },
                {
                    name: '终端数量',
                    type: 'heatmap',
                    coordinateSystem: 'geo',
                    data : data,
                    pointSize: num/this.rate/4,
                    blurSize: num/this.rate/12,
                    // blurSize: 0,
                    // markPoint: {//动态标记
                    //     large: true,//这个选项，悬浮自动失效
                    //     symbolSize:1,//闪烁点大小
                    //     itemStyle: {
                    //         normal: {
                    //             shadowBlur: 10,
                    //             shadowColor: '#333',
                    //             areaColor: '#00FFDB',
                    //         },
                    //         color:'#00FFDB'
                    //     },
                    //     zlevel: 1,
                    //     data: [],
                    // },
                },
                
            ]
        }
        return option;
    },
    //柱状图-普通竖向无背景
    normalBarChart:function (color,barLabel,barData,num) {
        var option = {
            color: [color[0]],
            title: {
                show:true,
                text: '',
                textStyle: {//主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
                    // fontFamily: 'monospace',
                    fontSize: num?num/this.titleRate:14,
                    fontStyle: 'normal',
                    fontWeight: 'bold',
                    color:this.titleColor,
                   
                },
                x:"3%",
                y:"6%"
            },
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '7%',
                right: '8%',
                top:"28%",
                bottom: '8%',
                containLabel: true
            },
            xAxis : [
                {
                    nameLocation:"center",
                    nameTextStyle:{
                        padding: [13, 14, 15, 10]
                    },
                    type : 'category',
                    data : barLabel,
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLabel: {
                        textStyle:{
                            color:'#fff',  //坐标的字体颜色
                            fontSize:num?num/this.rate:14,
                        },
                        interval:0,
                        formatter : function(params){
                            var newParamsName = "";// 最终拼接成的字符串
                            var paramsNameNumber = params.length;// 实际标签的个数
                            var provideNumber = 2;// 每行能显示的字的个数
                            var rowNumber = Math.ceil(paramsNameNumber / provideNumber);// 换行的话，需要显示几行，向上取整
                            /**
                             * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
                             */
                            // 条件等同于rowNumber>1
                            if (paramsNameNumber > provideNumber) {
                                /** 循环每一行,p表示行 */
                                for (var p = 0; p < rowNumber; p++) {
                                    var tempStr = "";// 表示每一次截取的字符串
                                    var start = p * provideNumber;// 开始截取的位置
                                    var end = start + provideNumber;// 结束截取的位置
                                    // 此处特殊处理最后一行的索引值
                                    if (p == rowNumber - 1) {
                                        // 最后一次不换行
                                        tempStr = params.substring(start, paramsNameNumber);
                                    } else {
                                        // 每一次拼接字符串并换行
                                        tempStr = params.substring(start, end) + "\n";
                                    }
                                    newParamsName += tempStr;// 最终拼成的字符串
                                }

                            } else {
                                // 将旧标签的值赋给新标签
                                newParamsName = params;
                            }
                            //将最终的字符串返回
                            return newParamsName
                        }
                    },
                    axisLine: {
                        lineStyle:{
                            color:'#fff',  //坐标的字体颜色
                        },
                    },

                }
            ],
            yAxis : [
                {
                    nameLocation:"center",
                    type : 'value',
                    axisLabel: {
                        textStyle:{
                            color:'#fff',  //坐标的字体颜色
                            fontSize:num?num/this.rate:14,
                        },
                    },
                    splitLine: {
                        show: true,
                        lineStyle:{
                            color: ['#0E3254'],
                            width: 1,
                            type: 'solid'
                        }
                    },
                    axisLine: {
                        lineStyle:{
                            color:'#fff',  //坐标的字体颜色
                        },
                    },
                }
            ],
            series : [
                {
                    name:'',
                    type:'bar',
                    barWidth: '40%',
                    data:barData,
                    itemStyle: {
                        emphasis:{
                            // barBorderRadius:"",
                        },
                        normal: {
                            // barBorderRadius:"",
                            // color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                            //     offset: 0,
                            //     color: color[1] // 0% 处的颜色
                            // }, {
                            //     offset: 1,
                            //     color: color[0] // 100% 处的颜色
                            // }], false),
                            label: {
                                show: false,		//开启显示
                                position: 'top',	//在上方显示
                                textStyle: {	    //数值样式
                                    color: '#fff',
                                    fontSize: num?num/this.legendRate:14
                                }
                            }
                        }
                    }
                }
            ],
            legend: {
                x : '50%',
                y : '20%',
                type: 'scroll',
                orient: 'vertical',
                textStyle: {
                    fontSize: num?num/this.rate:14,
                    color:"white",
                    fontFamily: "Microsoft YaHei",

                },
            },
        }
        return option;
    },
}