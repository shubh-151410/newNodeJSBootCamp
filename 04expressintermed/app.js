const express = require('express');
const app = express();

//Middleware in NodeJs
var myconsolelog = function (req, res, next) {
    console.log("I am a middleware");
    next();
};
var servertime = function (req, res, next) {
    req.requestTime = Date.now();
    next();
};

app.use(servertime);
app.get("/", (req, res) => {
    res.send("Hello World" + req.requestTime);
    console.log("Hello world from /");
});

app.listen(6000, () => console.log("Server is running at port 3000..."));