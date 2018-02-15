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
            'on-change' (event) {
                let key = item.key;
                vm.edittingStore[param.index][key] = event.target.value;
            }
        }
    });
};
const editTable = {
    editTableInit: function(vue, columnsList, value) {
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
                                'on-change' (event) {
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
    handleBackdata (data) {
    	let clonedData = JSON.parse(JSON.stringify(data));
    	clonedData.forEach(item => {
    		delete item.editting;
    		delete item.edittingCell;
    		delete item.saving;
    	});
    	return clonedData;
    },
    handleCellChange (val, index, key) {
    	this.$Message.success('修改了第 ' + (index + 1) + ' 行列名为 ' + key + ' 的数据');
    	console.log('index:', index, 'val:', val);
    },
};