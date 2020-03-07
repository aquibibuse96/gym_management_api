const express = require('express');
const db = require('../database');
const utils = require('../utils');
var router = express.Router();
router.get('/gym', (request, response) => {
    try {
        var connection = db.connect();
        var statement = `select * from person_tb inner join gym_tb on person_tb.person_id = gym_tb.person_id;`;
        connection.query(statement, (error, dbResult) => {
            response.send(utils.createResponse(error, dbResult));
        });
    } catch (ex) {
        response.send({
            status: 'error',
        });
    }

});

router.get('/member', (request, response) => {
    try {
        var connection = db.connect();
        var statement = ` SELECT *
        FROM person_tb o
            LEFT JOIN subscriber_tb s ON s.person_id = o.person_id
            LEFT JOIN member_reg_tb m ON m.subscriber_id = s.subscriber_id
            LEFT JOIN gym_tb g ON m.gym_id  = g.gym_id
            LEFT JOIN plan_tb p ON m.plan_id = p.plan_id where o.role = 'member';`;
        connection.query(statement, (error, dbResult) => {
            response.send(utils.createResponse(error, dbResult));
        });
    } catch (ex) {
        response.send({
            status: 'error',
        });
    }
});

module.exports = router;