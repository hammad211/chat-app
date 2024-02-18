var express = require('express');
var router = express.Router();
var User = require("../models/index");
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');

router.post('/signup', async (req, res) => {
  try {
    const user = new User(req.body );
    const { email  } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('Email already exists');
    }
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    await user.generateHashedPassword();
        const token = jwt.sign({ _id: user._id, name: user.name }, config.get('jwtPrivateKey'));
        let data = {
          name: user.name,
          email: user.email,
          password: user.password,
          token: token
        };
        user.token = token;
        user.save()
        .then(() => {
          return res.status(201).send(data);
        })
  } catch (error) {
    return res.status(500).send('Server error occur' );
  }
});


router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
    return res.status(400).send('User is not registered');}
    let isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid) return res.status(401).send("Invalid Password");  
    const token = jwt.sign({ _id: user._id, name: user.name}, config.get("jwtPrivateKey"));
    return res.status(200).send(token);
  }
    catch (err) {
    return res.status(500).send("Server error occurred");
  }
});


module.exports = router;
