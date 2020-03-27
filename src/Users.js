import React, { useState, useEffect } from 'react'

const Users = (props) => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('/users')
      .then(res => res.json())
      .then(users => setUsers(users.filter(user => user.id !== props.user.id)))
  }, [props.user.id])

  function addContact() {
    fetch(`/users/${props.user.id}/contacts`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this)
    })
      .then(res => res.json())
      .then(contacts => props.setContacts(contacts))
  }

  return (
    <div>
      <h3>All Users</h3>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}<button style={{ color: 'green' }}
            onClick={addContact.bind(user)}>V</button></li>
        ))}
      </ul>
    </div >
  )
}

export default Users