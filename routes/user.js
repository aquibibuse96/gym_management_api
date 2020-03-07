const express = require('express');
const db = require('../database');
const utils = require('../utils');

var router = express.Router();

router.post('/login', (request, response) => {
    var username = request.body.username;
    var password = request.body.password;
    var connection = db.connect();
    var statement = `select person_id, user_name , password, role from person_tb where user_name = '${username}' and password = '${password}';`;
    connection.query(statement, (error, dbResult) => {
        connection.end();

        if (dbResult.length == 0) {
            // error
            response.send({ status: 'error' });
        } else {
            // success
            // console.log(dbResult);
            var user = dbResult[0];
            var data = user.person_id;
            var tokenrole = user.role;
            var tokenname = user.user_name;
            var token = data;
            response.header({ 'x-auth-token': token });
            response.header({ 'y-auth-token': tokenrole });
            response.header({ 'z-auth-token': tokenname });
            response.send({
                status: 'success',
                data: {
                    email: user.email,
                    password: user.password,
                    role: user.role
                }
            });
        }
    });
});

router.get('/memberRegisterationValidation/:id',(request,response)=>{
    try {
        var id = request.params.id;
        var connection = db.connect();
        var statement = `select m.pay_amount , m.subscriber_id from member_reg_tb m
        where m.subscriber_id = (select s.subscriber_id from subscriber_tb s
        inner join person_tb p on  s.person_id = p.person_id
        where p.person_id = ${id});`;
        connection.query(statement, (error, dbResult) => {
            response.send(utils.createResponse(error, dbResult));
        });
    } catch (ex) {
        response.send({
            status: 'error',
        });
    }
});
router.post('/app-register', (request, response) => {
    try {
        person = request.body;
        var connection = db.connect();
        var statement = `insert into person_tb set ? `;
        connection.query(statement, person, (error, dbResult) => {
            response.send(utils.createResponse(error, dbResult));
        });
    } catch (ex) {
        response.send({
            status: 'error',
        });
    }
});

module.exports = router;