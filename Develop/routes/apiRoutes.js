const db = require('../db/db.json');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const { json } = require('express');

module.exports = function (app) {
    app.get('/notes', function (req, res) {
        fs.readFile(`./db/db.json`, (err, data) => {
            if (err) throw err;
            res.writeHead(200, { 'Content-Type': 'text/json' });
            res.write(data);
            res.end();
        });
    });

    app.post('/notes', function (req, res) {
         const id = uuidv4();
        return fs.readFile(`./db/db.json`, (err, data) => {
            const json = JSON.parse(data);
            req.body.id = id;
            console.log(req.body);
            json.push(req.body);
            fs.writeFile(`./db/db.json`, JSON.stringify(json, null, 1), (err) => {
                if (err) throw err;
            });
            res.send("A new note has been created");
        });
    });


    app.delete('/notes/:id', (req, res) => {
        
        fs.readFile(`./db/db.json`, (err, data) => {
            if (err) throw err;
            const update = data.filter(note => note.id !== req.params.id);
            console.log(update);
             

        });
        
    });
};
