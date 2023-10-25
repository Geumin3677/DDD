const Timetable = require('comcigan-parser')
const timetable = new Timetable();

export default async function handler(req, res) {
    const { grade, cls } = req.query
    await timetable.init()
    timetable.setSchool(98749)
    var result = await timetable.getTimetable()
    res.status(200).json({
        "message" : "done",
        "result" : result[grade][cls]
    })
}