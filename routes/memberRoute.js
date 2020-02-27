const express = require('express');
const db = require('../database');
const utils = require('../utils');
var mem_reg = require('../model/member_reg');
var router = express.Router();

router.get('/getAllGyms', (request, response) => {
    try {
        var connection = db.connect();
        var statement = `select * from gym_tb;`;
        connection.query(statement, (error, dbResult) => {
            response.send(utils.createResponse(error, dbResult));
        });
    } catch (ex) {
        response.send({
            status: 'error',
        });
    }

});

router.get('/getGymDetails/:id', (request, response) => {
    try {
        var id = request.params.id;
        var connection = db.connect();
        var statement = `select * from person_tb p inner join gym_tb g on p.person_id = g.person_id where g.gym_id= ${id};`;
        connection.query(statement, (error, dbResult) => {
            response.send(utils.createResponse(error, dbResult));
        });
    } catch (ex) {
        response.send({
            status: 'error',
        });
    }
});

router.get('/getGymPlans/:id', (request, response) => {
    try {
        var id = request.params.id;
        var connection = db.connect();
        var statement = `select * from gym_tb g inner join plan_tb p on g.gym_id = p.gym_id where g.gym_id= ${id};`;
        connection.query(statement, (error, dbResult) => {
            response.send(utils.createResponse(error, dbResult));
        });
    } catch (ex) {
        response.send({
            status: 'error',
        });
    }

});


router.get('/getGymTrainers/:id', (request, response) => {
    try {
        var id = request.params.id;
        var connection = db.connect();
        var statement = `select * from gym_tb g inner join trainer_tb t on g.gym_id = t.gym_id where g.gym_id= ${id};`;
        connection.query(statement, (error, dbResult) => {
            response.send(utils.createResponse(error, dbResult));
        });
    } catch (ex) {
        response.send({
            status: 'error',
        });
    }

});

router.get('/getGymMachines/:id', (request, response) => {
    try {
        var id = request.params.id;
        var connection = db.connect();
        var statement = `select * from gym_tb g inner join machine_tb m on g.gym_id = m.gym_id where g.gym_id= ${id};`;
        connection.query(statement, (error, dbResult) => {
            response.send(utils.createResponse(error, dbResult));
        });
    } catch (ex) {
        response.send({
            status: 'error',
        });
    }

});

router.get('/getSubscriberDetails/:id', (request, response) => {
    try {
        var id = request.params.id;
        var connection = db.connect();
        // var statement = `select * from person_tb p inner join subscriber_tb s on s.person_id = p.person_id where p.person_id = ${id}`;
       
        var statement = `SELECT *
        FROM member_reg_tb m
            INNER JOIN subscriber_tb s ON m.subscriber_id = s.subscriber_id
            INNER JOIN gym_tb g ON m.gym_id  = g.gym_id
            INNER JOIN person_tb o ON s.person_id = o.person_id
            INNER JOIN plan_tb p ON m.plan_id = p.plan_id where o.person_id=${id};`;
       
        connection.query(statement, (error, dbResult) => {
            response.send(utils.createResponse(error, dbResult));
        });
    } catch (ex) {
        response.send({
            status: 'error',
        });
    }

});

router.post('/memberRegister', (request, response) => {
    try {
        mem_reg = request.body;
        var connection = db.connect();
        var statement = `insert into member_reg_tb set ? `;
        connection.query(statement, mem_reg, (error, dbResult) => {
            response.send(utils.createResponse(error, dbResult));
        });
    } catch (ex) {
        response.send({
            status: 'error',
        });
    }
})

module.exports = router;