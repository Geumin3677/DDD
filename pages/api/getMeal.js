const cheerio = require('cheerio');

export default async function handler(req, res) {
    var url = "https://imae-h.goesn.kr/imae-h/main.do";

    const response = await fetch(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
            'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7'
        }
    });

    const $ = cheerio.load(await response.text())
    const data = $('.meal_list').text()
    res.status(200).json({
        "message" : "done",
        "result": data
    })
}