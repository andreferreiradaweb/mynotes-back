var express = require('express');
var router = express.Router();
const User = require('../models/user');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_TOKEN;


router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const user = new User({ name, email, password });

  try {
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({error: 'Error registering new user'});
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    let user = await User.findOne({ email });
    if(!user)
      res.status(401).json({error: 'Incorrect email or passowrd'});
    else {
      user.isCorrectPassword(password, function(err, same) {
        if(!same)
        res.status(401).json({error: 'Incorrect email or passowrd'});
        else {
          const token = jwt.sign({email}, secret, {expiresIn: '10d'});
          res.json({user: user, token: token});
        }
      })
    }
  } catch (error) {
    res.status(500).json({error: 'Internal error, please try again!'});
  }
});

router.get('/', async (req, res) => {
  const users = await User.find({});

  try {
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({error: 'A problem ocurred find the users'});
  }

})

module.exports = router;
