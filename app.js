const express = require('express');
const path = require('path');
const web = require('./web.js');
const app = express();
const http = require('http').createServer(app);
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(process.cwd(), 'public')));

app.set("view engine", "ejs");
app.use('/', web);

//server



http.listen(PORT, ()=>{
    console.log(`server listening at http://localhost:${PORT}`);
});

const io = require('socket.io')(http);

io.on('connection', (server)=>{
    console.log('connected.....');
    server.on('message', (msg)=>{
        server.broadcast.emit('message', msg);
    })
})