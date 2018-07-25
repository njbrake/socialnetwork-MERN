const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

//Load input validation

const validateRegisterInput = require('../../validation/register.js');

//Load user model

const User = require('../../models/User.js');

// @route   get request to api/users/test
// @desc    tests users route
// @access  Public

router.get('/test', (req, res) => res.json({
  msg: "users works"
}));

// @route   get request to api/users/register
// @desc    register user
// @access  Public

router.post('/register', (req,res) => {
  const {errors, isValid} = validateRegisterInput(req.body);

  //Check validation
  if(!isValid){
    return res.status(400).json(errors);
  }

  User.findOne({email: req.body.email})
    .then(user => {
      if (user){
        errors.email = 'Email already exists';
        return res.status(400).json(errors);
      } else{
        const avatar = gravatar.url(req.body.email, {
          s: '200', //size
          r: 'pg', //rating
          d: 'mm' //default
        });
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar,
          password: req.body.password
        });

        bcrypt.genSalt(10, (err,salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
            });
          });
        }
    })
});


// @route   get api/users/login
// @desc    login user / returning jwt
// @access  Public
router.post('/login',(req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  //Find the user by Email
  User.findOne({email})
    .then(user => {
    //check for user
    if(!user){
      return res.status(404).json({email: 'User not found'});
    }
    //Check password
    bcrypt
      .compare(password, user.password)
      .then(isMatch => {
        if(isMatch){
          //User Matched
          const payload = {
            id: user.id,
            name: user.name,
            avatar: user.avatar
          }; //Create jwt payload
          //Sign the jsonwebtoken
          jwt.sign(
            payload,
            keys.secretOrKey,
            {expiresIn: 3600},
            (err, token) => {
              res.json({
                success: true,
                token: 'Bearer ' + token
              })
          });

        } else{
          return res.status(400).json({password: 'Password Incorrect'});
        }
      });
  });
});

// @route   get request to api/users/current
// @desc    return current user
// @access  Private
router.get(
  '/current',
  passport.authenticate('jwt',{session: false}),
  (req,res) =>{
    res.json({
      id: req.user._id,
      name: req.user.name,
      email: req.user.email
    });

});




module.exports = router;
