const { Socket } = require('dgram');
var express=require('express');
var app=express();
var http=require('http').createServer(app);
var io=require('socket.io')(http);


app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/public/board.html");

})

app.get("/admin",(req,res)=>{
    res.sendFile(__dirname+"/public/admin.html");

})

io.on("connection",(socket)=>{
    console.log("new connection established");
    socket.on("disconnect",()=>{
        console.log("connection closed");
    })
    socket.on("notice",(text)=>{
        console.log(text);
        io.emit("board_content",text);
    })

})


http.listen(3000,()=>{
    console.log("server started...");
})