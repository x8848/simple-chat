const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const cors = require('cors')
const db = require('diskdb')
const path = require('path')
const bodyParser = require('body-parser')
const userRouter = require('./routes/userRouter')
const contactRouter = require('./routes/contactRouter')
const chatRouter = require('./routes/chatRouter')
const port = process.env.PORT || 8080

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(userRouter)
app.use(contactRouter)
app.use(chatRouter)

app.use(express.static(__dirname))
app.use(express.static(path.join(__dirname, 'build')))
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'build', 'index.html')))

// Messages Routing & Websocket

db.connect('\db', ['messages'])

app.get('/messages/:id', (req, res) => {
    res.status(200).send(db.messages.find({ chat_id: req.params.id }))
})

app.post('/messages', (req, res) => {
    const { chat_id, user_id, user_name, text, created } = req.body
    const message = { chat_id: chat_id, user_id: user_id, user_name: user_name, text: text, created: created }
    db.messages.save(message)
    io.emit(chat_id, message)
    res.status(200).send()
})

io.on('connection', socket => {
    console.log('user connected')

    socket.on("disconnect", () => {
        console.log("user disconnected")
    });
})

server.listen(port, () => console.log(`App started on port ${port}!`))