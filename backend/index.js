// To connect with your mongoDB database
const mongoose = require('mongoose');
const express = require('express');
const cors = require("cors");
var index = require('./routes/index');
var users = require('./routes/users');
var contact = require('./routes/contact');
const cookieParser = require("cookie-parser");
const app = express();

const { Server } = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const io = new Server(server);

mongoose.connect("mongodb://localhost/index",
{ useNewUrlParser: true})
.then(()=>console.log("mongo db is connected"))
.catch((error)=>console.log(error.message));

app.use(cors());
app.use(express.json());

app.use('/index', index);
app.use('/users', users);
app.use('/contact', contact);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

//  io.on('connection', (socket) => {
// 	socket.on('send name', (username) => {
//     console.log(username);
// 		io.emit('send name', username);
// 	});

// 	socket.on('send message', (chat) => {
//     console.log(chat);
// 		io.emit('send message', chat);
// 	});
// });

server.listen(5000, () => {
	console.log(`Server is listening at the port: ${5000}`);
});