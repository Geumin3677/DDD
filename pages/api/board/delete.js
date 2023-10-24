const fs = require('fs')

async function dataSave(data, name) {
    const datastr = JSON.stringify(data, null, '\t');
    fs.writeFileSync(`./pages/data/${name}.json`, datastr);
}

export default async function handler(req, res) {
    const { id } = req.query

    var dataBuffer = fs.readFileSync('./pages/data/boardData.json')
    var dataJSON = dataBuffer.toString()
    var data = JSON.parse(dataJSON)

    data.board[data.ids[id]].visible = false

    dataSave(data, 'boardData')
    
    res.status(200).json({
        "message" : "ok"
    })
}