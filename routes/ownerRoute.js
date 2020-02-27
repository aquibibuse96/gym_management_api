const express = require('express');
const db = require('../database');
const utils = require('../utils');
var machine = require('../model/machineModel');
var plan = require('../model/planModel');
var trainer = require('../model/trainerModule');

var router = express.Router();

router.get('/gymId/:id', (request, response) => {
    try {
        var id = request.params.id;
        var connection = db.connect();
        var statement = `select p.person_id,p.first_name,g.gym_name,g.gym_loc,g.gym_id,g.person_id from person_tb p 
        inner join gym_tb g on 
        g.person_id = p.person_id where p.person_id=${id};`;
        connection.query(statement, (error, dbResult) => {
            response.send(utils.createResponse(error, dbResult));
        });
    } catch (ex) {
        response.send({
            status: 'error',
        });
    }
})

router.get('/gymMember/:id', (request, response) => {
    try {
        var id = request.params.id;
        var connection = db.connect();
        var statement = `SELECT *
        FROM member_reg_tb m
            INNER JOIN subscriber_tb s ON m.subscriber_id = s.subscriber_id
            INNER JOIN gym_tb g ON m.gym_id  = g.gym_id
            INNER JOIN person_tb o ON s.person_id = o.person_id
            INNER JOIN plan_tb p ON m.plan_id = p.plan_id where m.gym_id=${id};`;
        connection.query(statement, (error, dbResult) => {
            response.send(utils.createResponse(error, dbResult));
        });
    } catch (ex) {
        response.send({
            status: 'error',
        });
    }
});

router.get('/gymMachines/:id', (request, response) => {
    try {
        var id = request.params.id;
        var connection = db.connect();
        var statement = `select * from person_tb inner join gym_tb on person_tb.person_id = gym_tb.person_id inner join machine_tb on machine_tb.gym_id = gym_tb.gym_id  where (person_tb.person_id=${id});`;
        connection.query(statement, (error, dbResult) => {
            response.send(utils.createResponse(error, dbResult));
        });
    } catch (ex) {
        response.send({
            status: 'error',
        });
    }
});

router.get('/gymPlans/:id', (request, response) => {
    try {
        var id = request.params.id;
        var connection = db.connect();
        var statement = `select * from person_tb inner join gym_tb on person_tb.person_id = gym_tb.person_id inner join plan_tb on plan_tb.gym_id = gym_tb.gym_id  where (person_tb.person_id=${id});`;
        connection.query(statement, (error, dbResult) => {
            response.send(utils.createResponse(error, dbResult));
        });
    } catch (ex) {
        response.send({
            status: 'error',
        });
    }
});

router.get('/gymTrainers/:id', (request, response) => {
    try {
        var id = request.params.id;
        var connection = db.connect();
        var statement = `select * from person_tb inner join gym_tb on person_tb.person_id = gym_tb.person_id inner join trainer_tb on trainer_tb.gym_id = gym_tb.gym_id  where (person_tb.person_id=${id});`;
        // var statement = `select t.trainer_id,t.first_name,t.last_name,t.age,t.Gender,t.phone_no,t.salary,t.trainer_type,t.address,t.join_date from person_tb p inner join gym_tb g on p.person_id = g.person_id inner join trainer_tb t on t.gym_id = g.gym_id  where (p.person_id=${id});`;
        connection.query(statement, (error, dbResult) => {
            response.send(utils.createResponse(error, dbResult));
        });
    } catch (ex) {
        response.send({
            status: 'error',
        });
    }
});
//----------------------------------------------------------------------------------------------------
router.post('/addMachine', (request, response) => {
    try {
        machine = request.body;
        var connection = db.connect();
        var statement = `insert into machine_tb set ? `;
        connection.query(statement, machine, (error, dbResult) => {
            response.send(utils.createResponse(error, dbResult));
        });
    } catch (ex) {
        response.send({
            status: 'error',
        });
    }
});

router.post('/addPlan', (request, response) => {
    try {
        plan = request.body;
        var connection = db.connect();
        var statement = `insert into plan_tb set ? `;
        connection.query(statement, plan, (error, dbResult) => {
            response.send(utils.createResponse(error, dbResult));
        });
    } catch (ex) {
        response.send({
            status: 'error',
        });
    }
});

router.post('/addTrainer', (request, response) => {
    try {
        trainer = request.body;
        var connection = db.connect();
        var statement = `insert into trainer_tb set ? `;
        connection.query(statement, trainer, (error, dbResult) => {
            response.send(utils.createResponse(error, dbResult));
        });
    } catch (ex) {
        response.send({
            status: 'error',
        });
    }
});
//----------------------------------------------------------------------------------------------------
router.delete('/deleteMachine/:id', (request, response) => {
    var connection = db.connect();
    var id = request.params.id;

    var statement = `delete from machine_tb where machine_id = ${id}`;
    connection.query(statement, (error, dbResult) => {
        connection.end();
        response.send(utils.createResponse(error, dbResult));
    });
});

router.delete('/deletePlan/:id', (request, response) => {
    var connection = db.connect();
    var id = request.params.id;

    var statement = `delete from plan_tb where plan_id = ${id}`;
    connection.query(statement, (error, dbResult) => {
        connection.end();
        response.send(utils.createResponse(error, dbResult));
    });
});

router.delete('/deleteTrainer/:id', (request, response) => {
    var connection = db.connect();
    var id = request.params.id;

    var statement = `delete from trainer_tb where trainer_id = ${id}`;
    connection.query(statement, (error, dbResult) => {
        connection.end();
        response.send(utils.createResponse(error, dbResult));
    });
});
//----------------------------------------------------------------------------------------------------
router.put('/updateMachine/:id', (request, response) => {
    try {
        var id = request.params.id;
        machine = request.body;
        var connection = db.connect();
        var statement = `update machine_tb set ? where machine_id = ${id};`;
        connection.query(statement, machine, (error, dbResult) => {
            response.send(utils.createResponse(error, dbResult));
        });
    } catch (ex) {
        response.send({
            status: 'error',
        });
    }
});
module.exports = router;
