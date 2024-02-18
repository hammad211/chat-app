var express = require('express');
var router = express.Router();
var Contact = require("../models/contact");



router.post('/contact', async function(req, res, next) {
   try{ let message = new Contact(req.body);
    await message.save();
    console.log("save the contact");
    return res.status(201).send('Message sent Successfully');
 } catch (error) {
    return res.status(500).send('Server error occur' );
  }});

  module.exports = router;