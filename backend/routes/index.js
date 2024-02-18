var express = require('express');
var router = express.Router();
var Message = require("../models/message");
var add = require("../models/addUser");
var auth = require("../middleWares/auth");

  router.delete("/:_id", async function(req, res, next) {
    try {
      const id = req.params._id;
      console.log(req.params._id)
      console.log("Attempting to delete record with ID:", id);

      const deletedMessage = await Message.findByIdAndDelete(id);
      if (!deletedMessage) {
        return res.status(404).send("Record not found");
      }
      console.log("Record deleted successfully:", deletedMessage);
      return res.status(200).send("Record deleted successfully");
    } catch (err) {
      console.error("Error deleting record:", err);
      return res.status(500).send("Error deleting record");
    }
  });
  
  router.get('/messageGet', async (req, res, next) =>{

    try{ let message = await Message.find();
     return res.send (message);
   }
      catch(err){
      console.log("err")
     }
   });

  router.post('/message', async function(req, res, next) {
    let message = new Message(req.body);
    await message.save();
    console.log("save the message");
    return res.send (message);
});

router.post('/add',auth,  async (req, res, next) =>{
  try{ 
    // const newAdd = new add({...req.body, tutor_id: req.user._id });

   const newAdd = new add(req.body);
   const { email  } = req.body;
   const existingUser = await add.findOne({ email });

   if (existingUser) {
     return res.status(400).send('Email already exists');
   }
   await newAdd.save();
   return res.status(201).send('Added Successfully');
 
 }
  catch(err){
   console.log("err")
 }
 });

 router.delete("/add/:_id", async function(req, res, next) {
  try {
    const id = req.params._id;
    console.log(req.params._id)
    console.log("Attempting to delete record with ID:", id);

    const deletedMessage = await add.findByIdAndDelete(id);
    if (!deletedMessage) {
      return res.status(404).send("Record not found");
    }
    console.log("Record deleted successfully:", deletedMessage);
    return res.status(200).send("Record deleted successfully");
  } catch (err) {
    console.error("Error deleting record:", err);
    return res.status(500).send("Error deleting record");
  }
});

 router.get('/addGet', async (req, res, next) =>{
  try{ let newAdd = await add.find();
  return res.send (newAdd);
 }
    catch(err){
    console.log("err")
   }
 });

module.exports = router;
