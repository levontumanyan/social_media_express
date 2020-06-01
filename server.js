const express = require('express');
const mongoose = require('mongoose');
const { MongoClient } = require("mongodb");  // equivalent to // const MongoClient = require('mongodb').MongoClient;
var logger = require("morgan"); // for logging incoming requests

const addUserRouter = require("./routes/index.js"); // router responsible for /addUser

//for environment variables
const dotenv = require('dotenv');
dotenv.config();
//

const app = express();

// port variable 
const PORT = process.env.PORT;

//

app.use(logger('tiny'));
app.use("/addUser", addUserRouter);

//url  to mongodb atlas cluster
const mongo_db_uri = process.env.MONGODB_URI;

// const mongo_client = MongoClient(mongo_db_uri);

mongoose.connect(mongo_db_uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log("Database Connected Successfully"))
    .catch(err => console.log(err));

app.listen(PORT, () => { console.log(`Server is running on port: ${PORT}`) });


