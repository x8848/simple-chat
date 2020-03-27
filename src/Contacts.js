import React, { useState, useEffect } from 'react'

const Contacts = (props) => {
  const [selected, setSelected] = useState(false)

  useEffect(() => {
    fetch(`/users/${props.user.id}/contacts`)
      .then(res => res.json())
      .then(contacts => props.setContacts(contacts))
  }, [props.user.id])

  function deleteContact() {
    fetch(`/users/${props.user.id}/contacts/${this.id}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(contacts => props.setContacts(contacts))
  }

  function selectContact(event) {
    this.selected = event.target.checked
    setSelected(props.contacts.map(contact => contact.selected).includes(true))
  }

  function createChat() {
    const users = [props.user].concat(props.contacts.filter(contact => contact.selected))
    fetch(`/users/${props.user.id}/chats/`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(users)
    })
      .then(res => res.json())
      .then(chats => props.setChats(chats))
  }

  return (
    <div>
      <h3>Contacts</h3>
      <ul>
        {props.contacts.map(contact => {
          return (<div key={contact.id}>
            <input onChange={selectContact.bind(contact)} type="checkbox"></input>
            <label>{contact.name}<button style={{ color: 'red' }} onClick={deleteContact.bind(contact)}>X</button></label>
          </div>)
        })}
      </ul>
      <button disabled={!selected} onClick={createChat}>Create Chat</button>
    </div>
  )
}

export default Contacts