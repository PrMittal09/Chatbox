let express = require('express')
let app = express();

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  next();
});

let http = require('http');
const port = process.env.PORT;
app.set('port',port);

//use dict directory of angular project folder
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

app.use('/chatbox',function(req,res)
{
  res.send('/');
});
let server = http.createServer(app);

let io = require('socket.io').listen(server);

io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('message', (data) => {
      io.sockets.to(data.room).emit("message",{user:data.user.name,message:data.message});
      //socket.broadcast.emit("message",{data:data});
    });
    
    socket.on('join',function(data) {
      socket.join(data.room);
      socket.broadcast.to(data.room).emit("new user joined",{user:data.user, message:"has joined the Room"});
    });

    socket.on('leave',function(data) {
      socket.broadcast.to(data.room).emit("left room",{user:data.user, message:"has left the Room"});
      socket.leave(data.room);
    });

    socket.on("disconnect", function() {
      console.log("user disconnected");
    });
});

server.listen(port, () => {
    console.log(`started on port: ${port}`);
});