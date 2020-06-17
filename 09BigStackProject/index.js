var express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000

//bring all routes
const auth = require('./routes/api/auth');
const profile = require('./routes/api/profile');
const question = require('./routes/api/question');


var app = express();

//middleware for bodyparser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//mongoDB configuration
const db = require('./setup/myurl').mongoUrl

//Attempt to
mongoose.connect(db)
    .then(() => console.log('MongoDB connection successful'))
    .catch(err => console.log(err));


//tesitng -> route
app.get("/", (req, res) => {
    res.send("Server is running hello world");
});

//actual route

app.use('/api/auth',auth);

app.use('/api/profile',profile);
app.use('/api/questions',question);

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));