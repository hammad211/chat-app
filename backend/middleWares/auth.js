const jwt = require("jsonwebtoken");
const config = require("config");
const User  = require("../models/index");
async function auth(req, res, next) {
  const token = req.header("authorization")
  if (!token) return res.status(400).send("Token Not Provided");
  try {
    let user = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = await User.findById(user._id);
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  next();
}
module.exports = auth;