const express = require('express');
let bodyParser = require('body-parser')
let fs = require("fs")

const app = express();

function saveData(data){
    fs.writeFileSync("data.json", JSON.stringify(data))
}

function getData(){
    let data = fs.readFileSync("data.json")
    return JSON.parse(data)
}

app.use(express.static('./dist'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.all('*', function (req, res, next) {
    if (!req.get('Origin')) return next();
    // use "*" here to accept any origin
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET');
    res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    // res.set('Access-Control-Allow-Max-Age', 3600);
    if ('OPTIONS' === req.method) return res.send(200);
    next();
});

app.get('/', (req, res) => {
    res.send('<p style="color:red">服务已启动</p>');
})

app.get('/chart/address', (req, res) => {
    let listData = getData().listData
    let result = []
    if (req.query === '') {
        result = listData
    } else {
        listData.forEach((item) => {
            if (item.address.indexOf(req.query.params) !== -1) {
                result.push(item)
            }
        })
    }
    res.json({
        code: 200,
        message: 'success',
        data: result.length
    });
})

app.get('/chart/name', (req, res) => {
    let listData = getData().listData
    let result = []
    if (req.query === '') {
        result = listData
    } else {
        listData.forEach((item) => {
            if (item.name.indexOf(req.query.params) !== -1) {
                result.push(item)
            }
        })
    }
    res.json({
        code: 200,
        message: 'success',
        data: result.length
    });
})

app.get('/list', (req, res) => {
    let listData = getData().listData
    let result = []
    let searchVal = JSON.parse(req.query.search)
    if (searchVal.name === '' && searchVal.address === '') {
        result = listData
    } else {
        if (searchVal.address === ''){
            listData.forEach((item) => {
                Object.keys(item).forEach(() => {
                    if (item.name.toString().indexOf(searchVal.name) !== -1 ) {
                        result.push(item)
                    }
                })
            })
        }else if (searchVal.name === '') {
            listData.forEach((item) => {
                Object.keys(item).forEach(() => {
                    if (item.address.toString().indexOf(searchVal.address) !== -1) {
                        result.push(item)
                    }
                })
            })
        }else {
            listData.forEach((item) => {
                Object.keys(item).forEach(() => {
                    if (item.name.toString().indexOf(searchVal.name) !== -1 && item.address.toString().indexOf(searchVal.address) !== -1) {
                        result.push(item)
                    }
                })
            })
        }
    }
    const page = req.query.page || 1
    const pageSize = req.query.pageSize || 10
    let list = result.slice((page - 1) * pageSize, page * pageSize)
    res.json({
        code: 200,
        message: 'success',
        data: {
            list: list,
            total: result.length
        }
    });
})
app.post('/edit', (req, res) => {
    let listData = getData().listData
    listData.forEach((item,index) => {
        if (item.id === req.body.id) {
            listData[index] = req.body
        }
    })
    saveData({
        listData
    })
    res.json({
        code: 200,
        message: 'success',
    });
})

app.post('/add', (req, res) => {
    let listData = getData().listData
    let id = listData.length + 1
    listData.push({
        id,
        name: req.body.name,
        address: req.body.address,
        date: req.body.date,
    })
    saveData({
        listData
    })
    res.json({
        code: 200,
        message: 'success',
    });
})

app.post('/delete', (req, res) => {
    let listData = getData().listData
    listData.forEach((item,index) => {
        if (item.id === req.body.id) {
            listData.splice(index,1)
        }
    })
    saveData({
        listData
    })
    res.json({
        code: 200,
        message: 'success',
    });
})

app.listen(1080, () => {
    console.log('listen:1080');
})
