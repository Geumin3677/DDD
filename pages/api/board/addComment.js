const fs = require('fs')

async function dataSave(data, name) {
    const datastr = JSON.stringify(data, null, '\t');
    fs.writeFileSync(`./pages/data/${name}.json`, datastr);
}

export default async function handler(req, res) {
    const { type, index, cxt, id } = req.body

    var dataBuffer = fs.readFileSync('./pages/data/boardData.json')
    var dataJSON = dataBuffer.toString()
    var data = JSON.parse(dataJSON)

    if(type) {
        data.board[data.ids[id]].comments.push(cxt)
        
        dataSave(data, 'boardData')
        
        res.status(200).json({
            "message" : "ok"
        })
    } else {
        data.board[data.ids[id]].comments[index].cocomment.push({
            user: {
                img: cxt.user.img,
                name: cxt.user.name
            },
            data: cxt.data,
            time: cxt.time
        })
        dataSave(data, 'boardData')
        
        res.status(200).json({
            "message" : "ok"
        })
    }
}