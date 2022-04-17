let data0 = [{
    id: 1,
    date: '2016-05-02',
    name: '王一虎',
    address: '上海市普陀区金沙江路 1518 弄'
}, {
    id: 2,
    date: '2016-05-04',
    name: '王二虎',
    address: '上海市普陀区金沙江路 1517 弄'
}, {
    id: 3,
    date: '2016-05-01',
    name: '王三虎',
    address: '上海市普陀区金沙江路 1519 弄'
}, {
    id: 4,
    date: '2016-05-03',
    name: '王四虎',
    address: '上海市普陀区金沙江路 1516 弄'
}, {
    id: 5,
    date: '2016-05-08',
    name: '王五虎',
    address: '上海市普陀区金沙江路 1515 弄'
}, {
    id: 6,
    date: '2016-05-06',
    name: '王六虎',
    address: '上海市普陀区金沙江路 1514 弄'
}, {
    id: 7,
    date: '2016-05-07',
    name: '王七虎',
    address: '上海市普陀区金沙江路 1513 弄'
}, {
    id: 8,
    date: '2016-05-05',
    name: '王八虎',
    address: '上海市普陀区金沙江路 1512 弄'
}, {
    id: 9,
    date: '2016-05-09',
    name: '王九虎',
    address: '上海市普陀区金沙江路 1511 弄'
}, {
    id: 10,
    date: '2016-05-10',
    name: '王十虎',
    address: '上海市普陀区金沙江路 1510 弄'
}, {
    id: 11,
    date: '2016-05-10',
    name: '王十一虎',
    address: '上海市普陀区金沙江路 1509 弄'
}, {
    id: 12,
    date: '2016-05-10',
    name: '王十二虎',
    address: '上海市普陀区金沙江路 1508 弄'
}, {
    id: 13,
    date: '2016-05-10',
    name: '王十三虎',
    address: '上海市普陀区金沙江路 1507 弄'
}, {
    id: 14,
    date: '2016-05-10',
    name: '王十四虎',
    address: '上海市普陀区金沙江路 1506 弄'
},];

if (!localStorage.getItem('data')) {
    localStorage.setItem('data', JSON.stringify(data0));
}

function saveData(data) {
    localStorage.setItem('data', JSON.stringify(data));
}

let data = JSON.parse(localStorage.getItem('data'));

let res = {
    code: 200,
    msg: 'success',
}

function addData(params) {
    return new Promise((resolve) => {
        data.push(params)
        resolve(res)
    });

}

function editData(params) {
    return new Promise((resolve) => {
        data.forEach((item, index) => {
            if (item.id === params.id) {
                console.log('get!', params)
                data[index] = params
            }
        })
        saveData(data)
        console.log({
            type: 'editData',
            params: params,
        })
        resolve(res)
    });

}

function getData(params) {
    return new Promise((resolve) => {
        let data1 = JSON.parse(localStorage.getItem('data'))
        let out = []
        if (params.search === '') {
            out = data1
        } else {
            data1.forEach((item) => {
                Object.keys(item).forEach((key) => {
                    if (item[key].toString().indexOf(params.search) !== -1) {
                        out.push(item)
                    }
                })
            })
        }
        res.data = out
        console.log({
            type: 'getData',
            params: params,
            out: out
        })
        resolve(res)
    })

}


export {
    addData,
    editData,
    getData
}
