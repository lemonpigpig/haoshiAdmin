  
 function getMapData(url, chart, name, showrange) {
    if(name == 'undefined' || !name) name = false;
    if(showrange == 'undefined' || !showrange) showrange = false;
    $.get(url, function(res) {
      updateChart(res, chart, name, showrange);
    });
  }
function updateChart(data, chart, name, showrange) {
    title = name ? name : '全国';
    console.log(title);
    option = {
        backgroundColor: '#404a59',
        title: {
            text: `${title}视图1`,
            left: 'center',
            textStyle: {
                color: '#fff'
            }
        },
        // layoutCenter: ['50%', '30%'],
        tooltip: {
            trigger: 'item',
            formatter: function (params, ticket, callback) {
                console.log(params);
                var res = `${params.name}<br/>平均利润率：${params.value}%`;
                if (params.name) return res;
                return '';
            }
        },
        series: [
            {
                name: name ? name : 'china',
                type: 'map',
                zoom: 1,
                mapType: name ? name : 'china',
                roam: true,
                itemStyle: {
                    normal: {label: {show: true}},
                    emphasis: {label: {show: true}}
                },
                data: data
            }
        ]
    };
    if (showrange) {
        visualMap = {
            visualMap: {
            type : 'piecewise',
            pieces : [
                { min : -99 , max : 0 , color : 'grey'},
                { min : 0 , max : 2 ,color : 'red' },
                { min : 2 , max : 5 ,color : 'yellow'},
                { min : 5 ,color : 'green'},
            ]
        },
     }
        option = Object.assign({}, option, visualMap);
        console.log(option);
    }
  
    if(chart instanceof Array) {
        for(var i=0;i<chart.length;i++) {
            chart[i].setOption(option);
        }
    } else {
        chart.setOption({
            backgroundColor: '#404a59',
            title: {
                text: `${name}视图`,
                left: 'center',
                textStyle: {
                    color: '#fff'
                }
            },
            // layoutCenter: ['50%', '30%'],
            // layoutSize: 100,
            visualMap: {
                min: 0,
                max: 8,
                color:['orange','yellow'],
                x: 'left',
                y: 'bottom',
                text: ['高', '低'],
                calculable: true
            },
            tooltip: {
                trigger: 'item',
                formatter: function (params, ticket, callback) {
                    console.log(params);
                    var res = `${params.name}<br/>平均利润率：${params.value}%`;
                    if (params.name) return res;
                    return '';
                }
            },
            series: [
                {
                    name: name ? name : 'china',
                    type: 'map',
                    zoom: 1,
                    mapType: name ? name : 'china',
                    roam: true,
                    itemStyle: {
                        normal: {label: {show: true}},
                        emphasis: {label: {show: true}}
                    },
                    data: data
                }
            ]
        });
    }
    
   
  }
 