const router = require('express').Router()
const db = require('diskdb')
const uuid = require('uuid/v4')

db.connect('\db', ['chats'])

router.get('/users/:id/chats', (req, res) => {
    res.status(200).send(db.chats.find({ id: req.params.id }))
})

router.post('/users/:id/chats', (req, res) => {
    const users = req.body
    chatId = uuid()
    names = users.map(user => user.name)
    for (user of users) {
        chatName = names.filter(name => name != user.name).toString()
        db.chats.save({ id: user.id, name: chatName, chat_id: chatId })
    }
    res.status(200).send(db.chats.find({ id: req.params.id }))
})

module.exports = router