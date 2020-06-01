const express = require('express');
const userModel = require('../models/user.js');
const bodyParser = require('body-parser');

// adding for form processing
const urlencodedParser = bodyParser.urlencoded({ extended: true });

const miniapp = express.Router();

miniapp.use(express.json());


miniapp.post('/', urlencodedParser, async function (req, res) {

    console.log(process.env);

    const user = new userModel({
        username: req.body.username,
        name: { first_name: req.body.name.firstName, last_name: req.body.name.lastName },
        email: req.body.email
    }
    );

    try {
        await user.save();
        res.send(req.body);
    } catch (err) {
        res.status(500).send(err);
    }
});


module.exports = miniapp;
