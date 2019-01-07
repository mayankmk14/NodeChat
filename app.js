const express = require('express')
const app = express()


app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
	res.render('index')
})

server = app.listen(3000)

const io = require("socket.io")(server)

users = [];

io.on('connection', (socket) => {
	console.log('New user connected')

	socket.username = "Anonymous"
    socket.on('change_username', (data) => {
        console.log(data.username)
        if(users.indexOf(data.username) == -1){
            console.log("if")
            socket.username = data.username
            users.push(data.username)
        }else{
            console.log("else")
            data.value = "Username already in use"
            socket.emit('userExists', {message : data.value, username : data.username});
        }
    })

    socket.on('new_message', (data) => {
        io.sockets.emit('new_message', {message : data.message, username : socket.username});
    })

   
})


