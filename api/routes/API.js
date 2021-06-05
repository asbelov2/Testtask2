var express = require("express");
var mysql = require("mysql2");
const jsonParser = express.json();

var router = express.Router();
const pool = mysql.createPool({
    connectionLimit: 99,
    connectTimeout: 1800,
    host: "localhost",
    user: "root",
    password: "Tee!96BK"
}).promise();

router.get("/", function(req, res, next) {
    res.send("Get records");
});

router.post("/", jsonParser,function(req, res, next) {
    if(!req.body) return res.sendStatus(400);
    const type = req.body.type;
    const start_date = req.body.start_date;
    const end_date = req.body.end_date;
    const place = req.body.place;
    const theme = req.body.theme;
    const completed = req.body.completed;

    const sql = "INSERT INTO records (type, start_date, end_date, place, theme, completed) VALUES(?, ?, ?, ?, ?, ?)";
    pool.execute(sql, [type,start_date,end_date,place,theme,completed]);
});

router.patch("/", jsonParser,function(req, res, next) {
    if(!req.body) return res.sendStatus(400);
    const type = req.body.type;
    const start_date = req.body.start_date;
    const end_date = req.body.end_date;
    const place = req.body.place;
    const theme = req.body.theme;
    const completed = req.body.completed;

    const sql = "INSERT INTO records (type, start_date, end_date, place, theme, completed) VALUES(?, ?, ?, ?, ?, ?)";
    pool.execute(sql, [type,start_date,end_date,place,theme,completed]);
});

router.delete("/:id", function(req, res, next) {
    const id = req.params.id;
    pool.execute("DELETE FROM records WHERE record_id=?",id);
});


module.exports = router;