var express = require('express');
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;
var port = process.env.PORT || 3000;

passport.use(new Strategy({
        clientID: "309966299968763",
        clientSecret: "72d4f528509324132173ce060f3b808e",
        callbackURL: "http://localhost:3000/login/facebook/return"
    },
    function (accessToken, refreshToken, cb) {
        return cb(null, profile)
    }
), );

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

// create express app

var app = express();

//Set view directory
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");


app.use(require('morgan')('combined'));

app.use(require('cookie-parser'));

app.use(require('body-parser').urlencoded({
    extended: true
}));

app.use(require('express-session')({
    secret: 'lco app',
    resave: true,
    saveUninitialized: true
}));

//@route  - GET /
//@desc   - a route to home pages
//@access  - PUBLIC

app.get("/", (req, res) => {
    res.render("home", {
        user: req.user
    });
});

//@route  - GET /login
//@desc   - a route to login 
//@access  - PUBLIC

app.get("/login", (req, res) => {
    res.render("login");
});

//@route  - GET /login/facebook
//@desc   - a route to facebook auth
//@access  - PUBLIC

app.get('/login/facebook', passport.authenticate('facebook'));



app.get('/login/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/login'
    }),(req, res) => {
        res.redirect('/')
    });



//@route  - GET /PROFILE
//@desc   - a route to profile of user
//@access  - PRIVATE

app.get('/profile',require('connect-ensure-login').ensureLoggedIn(),(req,res) => {
    res.render('profile',{user:req.user});
});

app.listen(port);