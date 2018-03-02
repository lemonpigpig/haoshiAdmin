const editButton = (vm, h, currentRow, index) => {
	return h('Button', {
		props: {
			type: currentRow.editting ? 'success' : 'primary',
			loading: currentRow.saving
		},
		style: {
			margin: '0 5px'
		},
		on: {
			'click': () => {
				if (!currentRow.editting) {
					if (currentRow.edittingCell) {
						for (let name in currentRow.edittingCell) {
							currentRow.edittingCell[name] = false;
							vm.edittingStore[index].edittingCell[name] = false;
						}
					}
					vm.edittingStore[index].editting = true;
					vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore));
				} else {
					vm.edittingStore[index].saving = true;
					vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore));
					let edittingRow = vm.edittingStore[index];
					edittingRow.editting = false;
					edittingRow.saving = false;
					vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore));
					vm.$emit('input', vm.handleBackdata(vm.thisTableData));
					vm.$emit('on-change', vm.handleBackdata(vm.thisTableData), index);
				}
			}
		}
	}, currentRow.editting ? '保存' : '编辑');
};
const deleteButton = (vm, h, currentRow, index) => {
	return h('Poptip', {
		props: {
			confirm: true,
			title: '您确定要删除这条数据吗?',
			transfer: true
		},
		on: {
			'on-ok': () => {
				vm.thisTableData.splice(index, 1);
				vm.$emit('input', vm.handleBackdata(vm.thisTableData));
				vm.$emit('on-delete', vm.handleBackdata(vm.thisTableData), index);
			}
		}
	}, [
		h('Button', {
			style: {
				margin: '0 5px'
			},
			props: {
				type: 'error',
				placement: 'top'
			}
		}, '删除')
	]);
};
const incellEditBtn = (vm, h, param) => {
	if (vm.hoverShow) {
		return h('div', {
			'class': {
				'show-edit-btn': vm.hoverShow
			}
		}, [
			h('i-button', {
				props: {
					type: 'text',
					icon: 'edit'
				},
				on: {
					click: (event) => {
						console.log('vm:', vm);
						vm.edittingStore[param.index].edittingCell[param.column.key] = true;
						vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore));
					}
				}
			})
		]);
	} else {
		return h('i-button', {
			props: {
				type: 'text',
				icon: 'edit'
			},
			on: {
				click: (event) => {
					vm.edittingStore[param.index].edittingCell[param.column.key] = true;
					vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore));
				}
			}
		});
	}
};
const saveIncellEditBtn = (vm, h, param) => {
	return h('i-button', {
		props: {
			type: 'text',
			icon: 'checkmark'
		},
		on: {
			click: (event) => {
				vm.edittingStore[param.index].edittingCell[param.column.key] = false;
				vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore));
				// vm.$emit('input', vm.handleBackdata(vm.thisTableData));
				// vm.$emit('on-cell-change', vm.handleBackdata(vm.thisTableData), param.index, param.column.key);
				vm.handleBackdata(vm.thisTableData);
				vm.handleCellChange(vm.handleBackdata(vm.thisTableData), param.index, param.column.key)
			}
		}
	});
};
const cellInput = (vm, h, param, item) => {
	return h('i-input', {
		props: {
			type: 'text',
			value: vm.edittingStore[param.index][item.key]
		},
		on: {
			'on-change'(event) {
				let key = item.key;
				vm.edittingStore[param.index][key] = event.target.value;
			}
		}
	});
};
const editTable = {
	editTableInit: function (vue, columnsList, value) {
		vue.editTableInit = this.init;
		vue.handleBackdata = this.handleBackdata;
		vue.handleCellChange = this.handleCellChange;
	},
	init: function (vue, columnsList, value) {
		let vm = vue;
		let editableCell = columnsList.filter(item => {
			console.log(item, item.editable);
			if (item.editable) {
				if (item.editable === true) {
					return item;
				}
			}
		});
		let cloneData = JSON.parse(JSON.stringify(value));
		let res = [];
		res = cloneData.map((item, index) => {
			let isEditting = false;
			if (this.thisTableData[index]) {
				if (this.thisTableData[index].editting) {
					isEditting = true;
				} else {
					for (const cell in this.thisTableData[index].edittingCell) {
						if (this.thisTableData[index].edittingCell[cell] === true) {
							isEditting = true;
						}
					}
				}
			}
			if (isEditting) {
				return this.thisTableData[index];
			} else {
				vm.$set(item, 'editting', false);
				let edittingCell = {};
				editableCell.forEach(item => {
					edittingCell[item.key] = false;
				});
				vm.$set(item, 'edittingCell', edittingCell);
				return item;
			}
		});
		this.thisTableData = res;
		this.edittingStore = JSON.parse(JSON.stringify(this.thisTableData));
		columnsList.forEach(item => {
			if (item.editable) {
				item.render = (h, param) => {
					let currentRow = this.thisTableData[param.index];
					if (!currentRow.editting) {
						if (this.editIncell) {
							return h('Row', {
								props: {
									type: 'flex',
									align: 'middle',
									justify: 'center'
								}
							}, [
								h('Col', {
									props: {
										span: '22'
									}
								}, [
									!currentRow.edittingCell[param.column.key] ? h('span', currentRow[item.key]) : cellInput(this, h, param, item)
								]),
								h('Col', {
									props: {
										span: '2'
									}
								}, [
									currentRow.edittingCell[param.column.key] ? saveIncellEditBtn(this, h, param) : incellEditBtn(this, h, param)
								])
							]);
						} else {
							return h('span', currentRow[item.key]);
						}
					} else {
						return h('i-input', {
							props: {
								type: 'text',
								value: currentRow[item.key]
							},
							on: {
								'on-change'(event) {
									let key = param.column.key;
									vm.edittingStore[param.index][key] = event.target.value;
								}
							}
						});
					}
				};
			}
		});
	},
	handleBackdata(data) {
		let clonedData = JSON.parse(JSON.stringify(data));
		clonedData.forEach(item => {
			delete item.editting;
			delete item.edittingCell;
			delete item.saving;
		});
		return clonedData;
	},
	handleCellChange(val, index, key) {
		// axios.get(`http://139.224.54.234:6002/mapjson/china.json`)
		// .then(res => {
		//     this.$Message.success('ok');
		//     console.log(val[index].test);
		// })
		var littlearea = val ? (val[index] ? val[index].littlearea : '') : '';
		$$get(`/users/check-permission?littleArea=${littlearea}`)
			.then(res => {
				if (res.data.code == 200) {
					if (res.data.data) {
						var info = [
							{
								"id": 0,
								"littleArea": "string",
								"hyperMarketProfit": 0,
								"supperMarketProfit": 0,
								"storeProfit": 0,
								"marketProfit": 0
							}
						];
						$$post(`province-view/profit-adjust`, JSON.stringify(info))
							.then(res => {

							});
						this.$Message.success('修改了第 ' + (index + 1) + ' 行列名为 ' + key + ' 的数据');
					} else {
						this.$Message.info('您没有权限修改该行数据！');
					}
				}
				console.log(res);
			});

		console.log('index:', index, 'val:', val);
	},
};

var dataobj = {
	tableHzColumns: [
		{
			title: '总利润值',
			align: 'center',
			key: 'value',
			width: 100
		},
		{
			title: '总利润率',
			align: 'center',
			key: 'rate',
			width: 100
		},
		{
			title: 'DT总数',
			align: 'center',
			key: 'dtcount',
			width: 80
		},
		{
			title: 'DT数量(P.>5%)',
			align: 'center',
			key: 'dtmore',
			width: 80
		},
		{
			title: 'DT数量(2%<P.<5%)',
			align: 'center',
			key: 'dtmiddle',
			width: 80
		},
		{
			title: 'DT数量(P.<5%)',
			align: 'center',
			key: 'dtsmall',
			width: 80
		}
	],
	tableColumns: [
		{
			title: '省份',
			align: 'center',
			key: 'name',
			width: 100
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
			key: 'dealer'
		},
		{
			title: '大卖场',
			align: 'center',
			width: 100,
			key: 'sales',
			sortable: true
		},
		{
			title: '大型超市',
			align: 'center',
			width: 140,
			key: 'supermarket',
			sortable: true
		},
		{
			title: '便利店',
			align: 'center',
			width: 140,
			key: 'store',
			sortable: true
		},
		{
			title: '中小超市',
			align: 'center',
			width: 140,
			key: 'market',
			sortable: true
		}
	],
	editTableColumns: [
		{
			title: '省份',
			align: 'center',
			key: 'name',
			width: 100
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
			key: 'dealer'
		},
		{
			title: '大卖场',
			align: 'center',
			width: 120,
			key: 'sales',
			editable: true
		},
		{
			title: '大型超市',
			align: 'center',
			width: 120,
			key: 'supermarket',
			editable: true
		},
		{
			title: '便利店',
			align: 'center',
			width: 120,
			key: 'store',
			editable: true
		},
		{
			title: '中小超市',
			align: 'center',
			width: 120,
			key: 'market',
			editable: true
		}
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
	tableDataPre: [
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