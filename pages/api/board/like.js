const fs = require('fs')

async function dataSave(data, name) {
    const datastr = JSON.stringify(data, null, '\t');
    fs.writeFileSync(`./pages/data/${name}.json`, datastr);
}

export default async function handler(req, res) {
    const { name, id } = req.query

    var dataBuffer = fs.readFileSync('./pages/data/boardData.json')
    var dataJSON = dataBuffer.toString()
    var data = JSON.parse(dataJSON)

    if(data.board[data.ids[id]].like.includes(name)) {
        data.board[data.ids[id]].like.splice(data.board[data.ids[id]].like.indexOf(name), 1)
    } else {
        data.board[data.ids[id]].like.push(name)
    }

    dataSave(data, 'boardData')
    
    res.status(200).json({
        "message" : "ok"
    })
}