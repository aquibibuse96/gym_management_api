const express = require('express');
const bodyParser = require('body-parser');
const user = require('./routes/user');
const adminRoute = require('./routes/adminRoute');
const ownerRoute = require('./routes/ownerRoute');
const memberRoute = require('./routes/memberRoute');


var app = express();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    res.header("Access-Control-Expose-Headers", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(user);
app.use(adminRoute);
app.use(ownerRoute);
app.use(memberRoute);

app.listen(4000, () => {
    console.log('server started on port 4000');
});