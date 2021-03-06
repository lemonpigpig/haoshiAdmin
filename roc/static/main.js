function getMapData(url, chart, name, showrange) {
	if (name == 'undefined' || !name) name = false;
	if (showrange == 'undefined' || !showrange) showrange = false;
	$.get(url, function (res) {
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
				type: 'piecewise',
				pieces: [
					{min: -99, max: 0, color: 'grey'},
					{min: 0, max: 2, color: 'red'},
					{min: 2, max: 5, color: 'yellow'},
					{min: 5, color: 'green'},
				]
			},
		}
		option = Object.assign({}, option, visualMap);
		console.log(option);
	}

	if (chart instanceof Array) {
		for (var i = 0; i < chart.length; i++) {
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
				color: ['orange', 'yellow'],
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

let cityMap = {
	"台湾": {},
	"河北": {
		"廊坊市": "廊坊市",
		"石家庄": "石家庄市",
		"秦皇岛": "秦皇岛市",
		"唐山": "唐山市"
	},
	"山西": {
		"朔州": "朔州市",
		"临汾": "临汾市",
		"太原市": "太原市",
		"太原": "太原市"
	},
	"内蒙古": {
		"包头": "包头市",
		"鄂尔多斯": "鄂尔多斯市",
		"呼和浩特": "呼和浩特市",
		"兴安盟": "兴安盟",
		"通辽市": "通辽市",
		"乌海市": "乌海市",
		"乌兰察布": "乌兰察布市"
	},
	"辽宁": {
		"鞍山": "鞍山市",
		"本溪": "本溪市",
		"大连": "大连市",
		"丹东": "丹东市",
		"抚顺": "抚顺市",
		"阜新": "阜新市",
		"葫芦岛": "葫芦岛市",
		"锦州": "锦州市",
		"盘锦": "盘锦市",
		"沈阳": "沈阳市",
		"铁岭": "铁岭市",
		"营口": "营口市"
	},
	"吉林": {
		"白山": "白山市",
		"吉林市": "吉林市",
		"长春": "长春市",
		"辽源": "辽源市",
		"松原": "松原市"
	},
	"黑龙江": {
		"双鸭山": "双鸭山市",
		"大庆市": "大庆市",
		"哈尔滨": "哈尔滨市",
		"鹤岗": "鹤岗市",
		"鸡西": "鸡西市",
		"佳木斯": "佳木斯市",
		"牡丹江": "牡丹江市",
		"齐齐哈尔": "齐齐哈尔市",
		"绥化市": "绥化市"
	},
	"江苏": {
		"合肥": "合肥",
		"芜湖": "芜湖",
		"马鞍山": "马鞍山",
		"淮北": "淮北",
		"镇江": "镇江市",
		"常熟市": "常熟市",
		"常州": "常州市",
		"连云港": "连云港市",
		"东台市": "东台市",
		"阜宁县": "阜宁县",
		"泰州": "泰州市",
		"淮安": "淮安市",
		"扬中市": "扬中市",
		"昆山市": "昆山市",
		"南京": "南京市",
		"南通": "南通市",
		"苏州": "苏州市",
		"兴化市": "兴化市",
		"无锡": "无锡市",
		"宿迁": "宿迁市",
		"睢宁县": "睢宁县",
		"徐州": "徐州市",
		"盐城": "盐城市",
		"扬州": "扬州市",
		"张家港市": "张家港市"
	},
	"浙江": {
		"苍南": "苍南",
		"杭州": "杭州市",
		"湖州": "湖州市",
		"眉山市": "眉山市",
		"兰溪市": "兰溪市",
		"金华": "金华市",
		"缙云市": "缙云市",
		"宁波": "宁波市",
		"慈溪": "慈溪",
		"衢州": "衢州市",
		"上虞市": "上虞市",
		"绍兴": "绍兴市",
		"北京": "北京",
		"温州": "温州市",
		"义乌": "义乌",
		"长兴市": "长兴市",
		"舟山": "舟山市"
	},
	"安徽": {
		"宣城": "宣城市",
		"阜阳": "阜阳市",
		"安庆": "安庆市",
		"滁州": "滁州市",
		"砀山县市": "砀山县市",
		"合肥": "合肥市",
		"蚌埠": "蚌埠市",
		"淮北": "淮北市",
		"淮南": "淮南市",
		"黄山": "黄山市",
		"界首市": "界首市",
		"宿州市": "宿州市",
		"六安": "六安市",
		"马鞍山": "马鞍山市",
		"铜陵": "铜陵市",
		"巢湖市": "巢湖市",
		"颍上县市": "颍上县市"
	},
	"福建": {
		"福州": "福州市",
		"泉州市": "泉州市",
		"泉州": "泉州市",
		"厦门": "厦门市",
		"莆田": "莆田市",
		"漳州": "漳州市"
	},
	"江西": {
		"抚州": "抚州市",
		"南昌": "南昌市",
		"九江市": "九江市",
		"上饶": "上饶市",
		"宜春": "宜春市"
	},
	"山东": {
		"潍坊": "潍坊市",
		"滨州": "滨州市",
		"菏泽": "菏泽市",
		"德州": "德州市",
		"泰安": "泰安市",
		"东营": "东营市",
		"淄博": "淄博市",
		"济南": "济南市",
		"济宁": "济宁市",
		"烟台": "烟台市",
		"聊城": "聊城市",
		"临沂": "临沂市",
		"青岛": "青岛市",
		"日照": "日照市",
		"莱芜": "莱芜市",
		"枣庄": "枣庄市"
	},
	"河南": {
		"安阳": "安阳市",
		"周口": "周口市",
		"郑州": "郑州市",
		"南阳市": "南阳市",
		"信阳市": "信阳市",
		"焦作": "焦作市",
		"开封市": "开封市",
		"平顶山": "平顶山市",
		"驻马店": "驻马店市",
		"濮阳": "濮阳市",
		"商丘市": "商丘市",
		"新乡市": "新乡市",
		"许昌": "许昌市"
	},
	"湖北": {
		"孝感市": "孝感市",
		"湖北其它": "湖北其它",
		"黄石市": "黄石市",
		"黄冈市": "黄冈市",
		"荆州市": "荆州市",
		"十堰市": "十堰市",
		"武汉": "武汉市",
		"襄阳市": "襄阳市",
		"宜昌": "宜昌市"
	},
	"湖南": {
		"常德": "常德市",
		"衡阳": "衡阳市",
		"长沙": "长沙市",
		"湘潭": "湘潭市",
		"怀化": "怀化市",
		"邵阳": "邵阳市",
		"岳阳": "岳阳市"
	},
	"广东": {
		"东莞": "东莞市",
		"潮州": "潮州市",
		"佛山": "佛山市",
		"广州": "广州市",
		"清远": "清远市",
		"深圳": "深圳市",
		"海丰县市": "海丰县市",
		"河源": "河源市",
		"江门": "江门市",
		"茂名": "茂名市",
		"梅州": "梅州市",
		"汕头": "汕头市",
		"韶关": "韶关市",
		"开平": "开平",
		"阳江": "阳江市",
		"湛江": "湛江市",
		"肇庆": "肇庆市",
		"鹤山": "鹤山",
		"恩平": "恩平"
	},
	"广西": {
		"南宁": "南宁市",
		"河池": "河池市"
	},
	"海南": {
		"海口": "海口市"
	},
	"四川": {
		"郑州": "郑州",
		"巴中市": "巴中市",
		"成都": "成都市",
		"达州市": "达州市",
		"广安市": "广安市",
		"广元市": "广元市",
		"资阳市": "资阳市",
		"乐山市": "乐山市",
		"凉山彝族自治州": "凉山彝族自治州",
		"泸州市": "泸州市",
		"眉山市": "眉山市",
		"绵阳市": "绵阳市",
		"南充市": "南充市",
		"内江市": "内江市",
		"攀枝花市": "攀枝花市",
		"遂宁市": "遂宁市",
		"雅安市": "雅安市",
		"宜宾市": "宜宾市",
		"自贡市": "自贡市"
	},
	"贵州": {
		"贵阳": "贵阳市"
	},
	"云南": {
		"昆明": "昆明市"
	},
	"西藏": {},
	"陕西": {
		"兰州": "兰州",
		"汉中市": "汉中市",
		"咸阳": "咸阳市",
		"西安": "西安市",
		"延安": "延安市"
	},
	"甘肃": {
		"嘉峪关": "嘉峪关市",
		"酒泉": "酒泉市",
		"兰州": "兰州市",
		"武威": "武威市",
		"陇南": "陇南市"
	},
	"青海": {
		"西宁": "西宁市"
	},
	"宁夏": {
		"乌海市": "乌海市",
		"吴忠市": "吴忠市",
		"银川": "银川市"
	},
	"新疆": {
		"阿克苏市": "阿克苏市",
		"昌吉": "昌吉回族自治州",
		"哈密": "哈密地区",
		"喀什": "喀什地区",
		"库尔勒": "库尔勒",
		"乌鲁木齐": "乌鲁木齐市",
		"伊犁": "伊犁哈萨克自治州"
	},
	"北京": {
		"北京": "北京"
	},
	"天津": {
		"天津": "天津"
	},
	"上海": {
		"上海": "上海"
	},
	"重庆": {
		"重庆": "重庆"
	},
	"香港": {},
	"澳门": {}
};

function $$getQueryParams(qs) {
	if (!qs) qs = document.location.search;
	qs = qs.split('+').join(' ');

	var params = {},
		tokens,
		re = /[?&]?([^=]+)=([^&]*)/g;

	while (tokens = re.exec(qs)) {
		params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
	}

	return params;
}

function $$getMap(url,params) {
	let root = '/map/';
	return axios.get(root + url, {params: params});
}

function $$get(url,params) {
	let root = '/api/';
	return axios.get(root + url,{params:params});
}


function $$post(url,params) {
	let root = '/api/';
	return axios.post(root + url,params);
}