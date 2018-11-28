// 数据可视化
$(function () {
  //1.柱状图
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.querySelector('.left'));

  // 指定图表的配置项和数据
  var option = {
    title: {
      text: '2018年注册人数'
    },
    tooltip: {},
    legend: {
      data: ['人数','销量']
    },
    // x轴
    xAxis: {
      data: ["1月", "2月", "3月", "4月", "5月", "6月"]
    },
    // y轴，需要数据动态渲染
    yAxis: {},
    series: [{
        name: '人数',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      },{
        name: '销量',
        type: 'bar',
        data: [50, 40, 66, 30, 100, 40]
      }
    ]
};

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);


  //2.Bing图
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.querySelector('.right'));

  // 指定图表的配置项和数据
  option1 = {
    title : {
        text: '热门品牌图',
        subtext: '2018年11月',
        //x轴水平居中
        x:'left'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        x : 'center',
        y : 'bottom',
        data:['耐克','阿迪','乔丹','李宁','花花公子']
    },
    toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {
                show: true,
                type: ['pie', 'funnel'] //pie 饼状图
            },
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    series : [
        {
            name:'半径模式',
            type:'pie',
            //圆心位置 / 圆半径大小
            radius : [0, 80],
            center : ['25%', '50%'],
            roseType : 'radius',
            label: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: true
                }
            },
            lableLine: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: true
                }
            },
            data:[
                {value:40, name:'耐克'},
                {value:5, name:'阿迪'},
                {value:15, name:'乔丹'},
                {value:25, name:'李宁'},
                {value:20, name:'花花公子'}
            ]
        },
        {
            name:'面积模式',
            type:'pie',
            radius : [0, 80],
            center : ['75%', '50%'],
            roseType : 'area',
            data:[
              {value:40, name:'耐克'},
              {value:5, name:'阿迪'},
              {value:15, name:'乔丹'},
              {value:25, name:'李宁'},
              {value:20, name:'花花公子'}
          ]
        }
    ]
};


// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option1);






})