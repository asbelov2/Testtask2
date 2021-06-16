var express = require("express");
const jsonParser = express.json();

var router = express.Router();

var pgp = require("pg-promise")(/*options*/);
var db = pgp("postgres://postgres:12345@localhost:5432/postgres");

router.get("/",async function(req, res, next) {
    try {
        res.send(await db.any("SELECT * FROM records"));
    } 
    catch(e) {
        res.send("DB error");
        // error
    }  
});

router.get("/day",async function(req, res, next) {
    try {
        res.send(await db.any("SELECT * FROM records WHERE start_date >= NOW()  and start_date < NOW() + INTERVAL '1 day'"));
    } 
    catch(e) {
        res.send("DB error");
        // error
    }  
});

router.get("/week",async function(req, res, next) {
    try {
        res.send(await db.any("SELECT * FROM records WHERE start_date >= NOW()  and start_date < NOW() + INTERVAL '7 days'"));
    } 
    catch(e) {
        res.send("DB error");
        // error
    }  
});

router.get("/month",async function(req, res, next) {
    try {
        res.send(await db.any("SELECT * FROM records WHERE start_date >= NOW()  and start_date < NOW() + INTERVAL '1 month'"));
    } 
    catch(e) {
        res.send("DB error");
        // error
    }  
});

router.post("/filter", jsonParser, async function(req, res, next) {
    if(!req.body) return res.sendStatus(400);
    const begin = req.body.begin;
    const end = req.body.end;
    const type = req.body.type;
    try {
        res.send(await db.any("SELECT * FROM records WHERE start_date >= $1  and start_date < $2 and type=$3",[begin,end,type]));
    } 
    catch(e) {
        res.send("DB error");
        // error
    } 
});

router.post("/", jsonParser, async function(req, res, next) {
    if(!req.body) return res.sendStatus(400);
    const type = req.body.type;
    const start_date = req.body.start_date;
    const end_date = req.body.end_date;
    const place = req.body.place;
    const theme = req.body.theme;
    const completed = req.body.completed;
    db.none("INSERT INTO records (type, start_date, end_date, place, theme, completed) VALUES($1, $2, $3, $4, $5, $6)", [type,start_date,end_date,place,theme,completed])
    .then(() => {
        // success;
    })
    .catch(error => {
        res.send("DB error");
        // error;
    });
});

router.patch("/:id", jsonParser,function(req, res, next) {
    const id = req.params.id;
    if(!req.body) return res.sendStatus(400);
    const type = req.body.type;
    const start_date = req.body.start_date;
    const end_date = req.body.end_date;
    const place = req.body.place;
    const theme = req.body.theme;
    const completed = req.body.completed;

    const sql = "UPDATE records SET type=$1, start_date=$2, end_date=$3, place=$4, theme=$5, completed=$6 WHERE record_id=$7";
    db.none(sql, [type,start_date,end_date,place,theme,completed,id]);
});

router.patch("/complete/:id", jsonParser,function(req, res, next) {
    const id = req.params.id;
    if(!req.body) return res.sendStatus(400);
    const completed = true;

    const sql = "UPDATE records SET completed=$1 WHERE record_id=$2";
    db.none(sql, [completed,id]);
});

router.patch("/uncomplete/:id", jsonParser,function(req, res, next) {
    const id = req.params.id;
    if(!req.body) return res.sendStatus(400);
    const completed = false;

    const sql = "UPDATE records SET completed=$1 WHERE record_id=$2";
    db.none(sql, [completed,id]);
});

router.delete("/:id", function(req, res, next) {
    const id = req.params.id;
    db.none("DELETE FROM records WHERE record_id=$1", [id]);
});


module.exports = router;