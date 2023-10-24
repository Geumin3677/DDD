const fs = require('fs')

async function dataSave(data, name) {
    const datastr = JSON.stringify(data, null, '\t');
    fs.writeFileSync(`./pages/data/${name}.json`, datastr);
}
function createId(data) {
    var id = Math.random().toString(36).substr(2, 16)
    while(id in data)
    {
        id = Math.random().toString(36).substr(2, 16)
    }
    return id
}

export default async function handler(req, res) {
    const { body } = req
    
    var dataBuffer = fs.readFileSync('./pages/data/boardData.json')
    var dataJSON = dataBuffer.toString()
    var data = JSON.parse(dataJSON)

    var id = createId(data.ids)

    data.board.push({
        id: id,
        boardType: body.boardType,
        img: body.img,
        cxt: {
            title: body.cxt.title,
            data: body.cxt.data
        },
        authorInfo:{
            author: body.authorInfo.author,
            authorImg: body.authorInfo.authorImg,
            time: body.authorInfo.time
        },
        views: 0,
        like: [],
        comments : [],
        visible: true
    })

    data.ids[id] = (Number(data.board.length) - 1)

    dataSave(data, 'boardData')

    res.status(200).json({
        "message" : "success"
    })
}
export const config = {
    api: {
      bodyParser: {
        sizeLimit: '10mb',
      },
    },
  }