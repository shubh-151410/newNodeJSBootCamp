const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jsonwt = require('jsonwebtoken');
const key = require('../../setup/myurl');



// @type    Get
// @route   /api/auth
// @desc    just for testing
// @access  PUBLIC
router.get("/", (req, res) => res.json({
    test: "Auth is Success"
}));

//Import Schema for Person to register
const Person = require('../../models/Person');

// @type    POST
// @route   /api/auth/register
// @desc    route for registration user
// @access  PUBLIC

router.post('/register', (req, res) => {
    Person.findOne({
            email: req.body.email
        })
        .then(
            person => {
                if (person) {
                    return res.status(400).json({
                        emailerror: "Email is already registered"
                    });
                } else {
                    const newperson = new Person({
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password,
                    });

                    //Encrypt Password using bcrypt

                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newperson.password, salt, (err, hash) => {
                            // Store hash in your password DB.
                            if (err) throw err;
                            newperson.password = hash;
                            newperson
                                .save()
                                .then(person => res.json(person))
                                .catch(err => console.log(error))
                        });
                    });
                }
            }
        )
        .catch(err => console.log(err));
});


// @type    POST
// @route   /api/auth/login
// @desc    route for login user
// @access  PUBLIC

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    Person.findOne({
            email
        })
        .then(
            person => {
                if (!person) {
                    throw res.status(400).json({
                        emailerror: 'email Error'
                    });
                }
                bcrypt.compare(password,person.password)
                .then(isCorrect =>{
                    if(isCorrect){
                        res.json({success:'User is able to login successfully'})
                    }else{
                        res.status(400).json({passworderror:'Password is not correct'});
                    }
                })
                .catch(err => console.log(err));
                if(person){

                }
            }
        )
        .catch(err => console.log(err));
})

module.exports = router;