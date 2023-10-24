const fs = require('fs')

export default async function handler(req, res) {
    var { type, start, cnt } = req.query

    start = Number(start)
    cnt = Number(cnt)
    
    var dataBuffer = fs.readFileSync('./pages/data/boardData.json')
    var dataJSON = dataBuffer.toString()
    var data = JSON.parse(dataJSON)

    if(type == "all") {
        var result = []
        var a = (data.board.length - 1)
        var b = 0

        while(a >= 0) {
            if(data.board[a].visible) {
                if(b >= start + cnt) {
                    break;
                }
                if(b >= start){
                    result.push({
                        type: data.board[a].boardType,
                        title: data.board[a].cxt.title,
                        author: data.board[a].authorInfo.author,
                        time: data.board[a].authorInfo.time,
                        img: data.board[a].img,
                        like: data.board[a].like.length,
                        comment: data.board[a].comments.length,
                        id: data.board[a].id
                    })
                }
                b += 1
            }
            a -= 1
        }

        res.status(200).json({
            "message" : "success",
            "data" : result,
            "lastPos": b
        })
    }
    else if(type == "free") {
        var result = []
        var a = (data.board.length - 1)
        var b = 0

        while(a >= 0) {
            if(data.board[a].boardType == "잡담 게시판" && data.board[a].visible) {
                if(b >= start + cnt) {
                    break;
                }
                if(b >= start){
                    result.push({
                        title: data.board[a].cxt.title,
                        author: data.board[a].authorInfo.author,
                        time: data.board[a].authorInfo.time,
                        img: data.board[a].img,
                        like: data.board[a].like.length,
                        comment: data.board[a].comments.length,
                        id: data.board[a].id
                    })
                }
                b += 1
            }
            a -= 1
        }

        res.status(200).json({
            "message" : "success",
            "data" : result,
            "lastPos": b
        })
    }else if(type == "study") {
        var result = []
        var a = (data.board.length - 1)
        var b = 0

        while(a >= 0) {
            if(data.board[a].boardType == "공부 게시판" && data.board[a].visible) {
                if(b >= start + cnt) {
                    break;
                }
                if(b >= start){
                    result.push({
                        title: data.board[a].cxt.title,
                        author: data.board[a].authorInfo.author,
                        time: data.board[a].authorInfo.time,
                        img: data.board[a].img,
                        like: data.board[a].like.length,
                        comment: data.board[a].comments.length,
                        id: data.board[a].id
                    })
                }
                b += 1
            }
            a -= 1
        }

        res.status(200).json({
            "message" : "success",
            "data" : result,
            "lastPos": b
        })
    }else if(type == "notice") {
        var result = []
        var a = (data.board.length - 1)
        var b = 0

        while(a >= 0) {
            if(data.board[a].boardType == "공지 게시판" && data.board[a].visible) {
                if(b >= start + cnt) {
                    break;
                }
                if(b >= start){
                    result.push({
                        title: data.board[a].cxt.title,
                        author: data.board[a].authorInfo.author,
                        time: data.board[a].authorInfo.time,
                        img: data.board[a].img,
                        like: data.board[a].like.length,
                        comment: data.board[a].comments.length,
                        id: data.board[a].id
                    })
                }
                b += 1
            }
            a -= 1
        }

        res.status(200).json({
            "message" : "success",
            "data" : result,
            "lastPos": b
        })
    }

}