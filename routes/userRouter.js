const router = require('express').Router()
const uuid = require('uuid/v4')
const db = require('diskdb')

db.connect('\db', ['users'])

router.get('/users', (req, res) => {
  res.status(200).send(db.users.find())
})

router.post('/users/login', (req, res) => {
  name = req.body.name
  user = db.users.findOne({ name: name })
  if (!user) {
      user = { id: uuid(), name: name }
      db.users.save(user)
  }
  res.status(200).send(user)
})

module.exports = router