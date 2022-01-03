const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
var con = 0;
io.on("connection", (socket) => {
  con++;
  socket.on("user", (p) => {
    console.log(p + " connected our server");
  });

  io.emit("con", con);

  socket.on("message", (mes) => {
    io.emit("message", mes);
  });

  socket.on("disconnect", () => {
    console.log("disconnect our server");
    con--;
  });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

server.listen(8080, () => {
  console.log(__dirname);
  console.log("server on *http://192.168.0.102:8080");
});
