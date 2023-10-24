const fs = require('fs')

export default function handler(req, res) {
    const { id } = req.query
    var dataBuffer = fs.readFileSync('./pages/data/boardData.json')
    var dataJSON = dataBuffer.toString()
    var data = JSON.parse(dataJSON)

    if(id in data.ids)
    {
       
        const pos = data.ids[id]
    
        res.status(200).json({
            "message" : "success",
            "data" : data.board[pos]
        })
    }
    else
    {
        console.log('asdf')
        res.status(404).json({
            "message" : "notFound"
        })
    }
    
}