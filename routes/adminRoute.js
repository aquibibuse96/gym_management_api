const express = require('express');
const db = require('../database');
const utils = require('../utils');

var router = express.Router();

router.get('/gym',(request,response)=>{
    try {
        var connection = db.connect();
        var statement = `select * from person_tb inner join gym_tb on person_tb.person_id = gym_tb.person_id;`;
        connection.query(statement, (error, dbResult) => {
            response.send(utils.createResponse(error, dbResult));
        });
    } catch(ex) {
        
        response.send({
            status: 'error',
        });
    }

});

router.get('/member',(request,response)=>{
    try {
        var connection = db.connect();
        var statement = `select * from person_tb inner join subscriber_tb on person_tb.person_id = subscriber_tb.person_id;`;
        connection.query(statement, (error, dbResult) => {
            response.send(utils.createResponse(error, dbResult));
        });
    } catch(ex) {
        
        response.send({
            status: 'error',
        });
    }

});


module.exports = router;