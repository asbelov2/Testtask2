var express = require("express");
const jsonParser = express.json();

var router = express.Router();

var pgp = require("pg-promise")(/*options*/);
var db = pgp("postgres://postgres:12345@localhost:5432/test");

router.get("/",async function(req, res) {
    try {
        res.send(await db.any("SELECT * FROM records;"));
    } 
    catch(error) {
        res.send(error);
        // error
    }  
    res.send("ok");
});

router.get("/day",async function(req, res) {
    try {
        res.send(await db.any("SELECT * FROM records WHERE start_date >= NOW()  and start_date < NOW() + INTERVAL '1 day';"));
    } 
    catch(error) {
        res.send(error);
        // error
    }  
    res.send("ok");
});

router.get("/week",async function(req, res) {
    try {
        res.send(await db.any("SELECT * FROM records WHERE start_date >= NOW()  and start_date < NOW() + INTERVAL '7 days';"));
    } 
    catch(error) {
        res.send(error);
        // error
    }  
    res.send("ok");
});

router.get("/month",async function(req, res) {
    try {
        res.send(await db.any("SELECT * FROM records WHERE start_date >= NOW()  and start_date < NOW() + INTERVAL '1 month';"));
    } 
    catch(error) {
        res.send(error);
        // error
    } 
    res.send("ok");
});

router.post("/filter", jsonParser, async function(req, res) {
    if(!req.body) return res.sendStatus(400);
    const begin = req.body.begin;
    const end = req.body.end;
    const type = req.body.type;
    try {
        res.send(await db.any("SELECT * FROM records WHERE start_date >= $1  and start_date < $2 and type=$3;",[begin,end,type]));
    } 
    catch(error) {
        res.send(error);
        // error
    } 
});

router.post("/search", jsonParser, async function(req, res) {
    if(!req.body) return res.sendStatus(400);
    const searchText = req.body.searchText + "%";
    try {
        res.send(await db.any("SELECT * FROM records WHERE type LIKE $1 OR place LIKE $1 OR theme LIKE $1;",[searchText]));
    } 
    catch(error) {
        res.send(error);
        // error
    }
});

router.post("/", jsonParser, async function(req, res) {
    if(!req.body) return res.sendStatus(400);
    const type = req.body.type;
    const start_date = req.body.start_date;
    const end_date = req.body.end_date;
    const place = req.body.place;
    const theme = req.body.theme;
    const completed = false;
    db.none("INSERT INTO records(type, start_date, end_date, place, theme, completed) VALUES($1, $2, $3, $4, $5, $6);", [type,start_date,end_date,place,theme,completed])
    .then(() => {
        res.send("ok");
    })
});

router.patch("/:id", jsonParser,function(req, res) {
    const id = req.params.id;
    if(!req.body) return res.sendStatus(400);
    const type = req.body.type;
    const start_date = req.body.start_date;
    const end_date = req.body.end_date;
    const place = req.body.place;
    const theme = req.body.theme;
    const completed = req.body.completed;

    const sql = "UPDATE records SET type=$1, start_date=$2, end_date=$3, place=$4, theme=$5, completed=$6 WHERE record_id=$7;";
    db.none(sql, [type,start_date,end_date,place,theme,completed,id])
    .then(() => {
        res.send("ok");
    })
});

router.patch("/complete/:id", jsonParser,function(req, res) {
    const id = req.params.id;
    if(!req.body) return res.sendStatus(400);
    const completed = true;

    const sql = "UPDATE records SET completed=$1 WHERE record_id=$2;";
    db.none(sql, [completed,id])
    .then(() => {
        res.send("ok");
    })
});

router.patch("/uncomplete/:id", jsonParser,function(req, res) {
    const id = req.params.id;
    if(!req.body) return res.sendStatus(400);
    const completed = false;

    const sql = "UPDATE records SET completed=$1 WHERE record_id=$2;";
    db.none(sql, [completed,id])
    .then(() => {
        res.send("ok");
    })
});

router.delete("/:id", function(req, res, next) {
    const id = req.params.id;
    db.none("DELETE FROM records WHERE record_id=$1;", [id])
    .then(() => {
        res.send("ok");
    })
});


module.exports = router;