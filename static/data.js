var dataobj = {
    tableHzColumns: [
        {
            title: '总利润值',
            align: 'center',
            key: 'totalProfitValue'
        },
        {
            title: '总利润率',
            align: 'center',
            key: 'totalProfit',
            width: 100
        },
        {
            title: 'DT总数',
            align: 'center',
            key: 'dtTotalCount',
            width: 80
        },
        {
            title: 'DT数量(P.>5%)',
            align: 'center',
            key: 'dtFiveMoreCount',
            width: 180
        },
        {
            title: 'DT数量(2%<P.<5%)',
            align: 'center',
            key: 'dtTwoMoreCount',
            width: 180
        },
         {
            title: 'DT数量(P.<5%)',
            align: 'center',
            key: 'dtZeroMoreCount',
            width: 180
        }
    ],
    tableColumns: [
        {
            title: '省份',
            align: 'center',
            key: 'province',
        },
        {
            title: '城市',
            align: 'center',
            key: 'city',
            width: 100
        },
        {
            title: '经销商',
            align: 'center',
            width: 180,
            key: 'dealerName'
        },
        {
            title: '大卖场',
            align: 'center',
            width: 100,
            key: 'hyperMarketProfitValue',
            sortable: true
        },
        {
            title: '大型超市',
            align: 'center',
            width: 140,
            key: 'supperMarketProfitValue',
            sortable: true
        },
        {
            title: '便利店',
            align: 'center',
            width: 140,
            key: 'storeProfitValue',
            sortable: true
        },
        {
            title: '中小超市',
            align: 'center',
            width: 140,
            key: 'marketProfitValue',
            sortable: true
        }
    ],
    editTableColumns: [
        {
            title: '省份',
            align: 'center',
            key: 'province'
        },
        {
            title: '城市',
            align: 'center',
            key: 'city',
            width: 100
        },
        {
            title: '经销商',
            align: 'center',
            width: 180,
            key: 'dealername'
        },
        {
            title: '大卖场',
            align: 'center',
            width: 120,
            key: 'hyperMarketProfit',
            editable: true
        },
        {
            title: '大型超市',
            align: 'center',
            width: 120,
            key: 'supperMarketProfit',
            editable: true
        },
        {
            title: '便利店',
            align: 'center',
            width: 120,
            key: 'storeProfit',
            editable: true
        },
        {
            title: '中小超市',
            align: 'center',
            width: 120,
            key: 'marketProfit',
            editable: true
        },
    ],
    tableColumnsPre: [
        {
            type: 'selection',
            width: 60,
            align: 'center',
            fixed: 'left'
        },

        {
            title: '城市',
            align: 'center',
            key: 'city',
            width: 100,
            fixed: 'left'
        },
        {
            title: '经销商',
            align: 'center',
            key: 'dealer',
            width: 180
        },
        {
            title: '门店数',
            align: 'center',
            width: 80,
            key: 'mds'
        },
        {
            title: '利润率',
            align: 'center',
            width: 100,
            key: 'rate',
            sortable: true
        },
        {
            title: '利润值',
            align: 'center',
            width: 100,
            key: 'value',
            sortable: true
        }
    ],
    tableRateData: [
        {
            name: '河北',
            city: '石家庄市',
            dealer: '石家庄绿颂',
            sales: '3.2%',
            supermarket: '3.0%',
            store: '2.1%',
            market: '5.0%'
        },
        {
            name: '河北',
            city: '石家庄市',
            dealer: '石家庄润禾粮油',
            sales: '2.4%',
            supermarket: '4.0%',
            store: '3.2%',
            market: '6.0%'
        },
        {
            name: '河北',
            city: '石家庄市',
            dealer: '石家庄喜上梅',
            sales: '2.3%',
            supermarket: '3.0%',
            store: '4.5%',
            market: '5.3%'
        },
        {
            name: '河北',
            city: '沧州市',
            dealer: '霸州跃升糖果',
            sales: '1.5%',
            supermarket: '4.3%',
            store: '10.0%',
            market: '6.5%'
        }
    ],
    tableColumnsAfter: [
        {
            type: 'selection',
            width: 60,
            align: 'center',
            fixed: 'left'
        },

        {
            title: '城市',
            align: 'center',
            key: 'city',
            width: 100,
            fixed: 'left'
        },
        {
            title: '经销商',
            align: 'center',
            key: 'dealer',
            width: 180
        },
        {
            title: '门店数',
            align: 'center',
            width: 80,
            key: 'mds'
        },
        {
            title: '利润率',
            align: 'center',
            width: 100,
            key: 'rate',
            sortable: true
        },
        {
            title: '利润值',
            align: 'center',
            width: 100,
            key: 'value',
            sortable: true
        }
    ],
    tableDataAfter: [
        {
            city: '保定市',
            dealer: '荆门业利',
            mds: 7,
            rate: '2.1%',
            value: 304530.3,
            _checked: false
        },
        {
            city: '衡水市',
            dealer: '荆门恒润',
            mds: 8,
            rate: '3.2%',
            value: 499270,
            _checked: false
        },
        {
            city: '保定市',
            dealer: '世昌贸易',
            mds: 2,
            supermarket: '3.0%',
            rate: '4.5%',
            value: 4733.75,
            _checked: false
        }
    ],
    tableDataPre:[
        {
            city: '保定市',
            dealer: '荆门业利',
            mds: 7,
            rate: '2.1%',
            value: 304530.3
        },
        {
            city: '衡水市',
            dealer: '荆门恒润',
            mds: 8,
            rate: '3.2%',
            value: 499270
        },
        {
            city: '保定市',
            dealer: '世昌贸易',
            mds: 2,
            supermarket: '3.0%',
            rate: '4.5%',
            value: 4733.75
        }
    ]
}