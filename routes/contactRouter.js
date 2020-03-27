const router = require('express').Router()
const db = require('diskdb')

db.connect('\db', ['contacts'])

router.get('/users/:id/contacts', (req, res) => {
    res.status(200).send(db.contacts.find({ user_id: req.params.id }))
})

router.post('/users/:id/contacts', (req, res) => {
    const contact = { user_id: req.params.id, id: req.body.id, name: req.body.name }
    db.contacts.save(contact)
    res.status(200).send(db.contacts.find({ user_id: req.params.id }))
})

router.delete('/users/:id/contacts/:contact_id', (req, res) => {
    db.contacts.remove({ user_id: req.params.id, id: req.params.contact_id }, false)
    res.status(200).send(db.contacts.find({ user_id: req.params.id }))
})

module.exports = router