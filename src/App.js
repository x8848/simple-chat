import React, { useState } from 'react'
import Users from './Users'
import Contacts from './Contacts'
import Chats from './Chats'
import SimpleLogin from './SimpleLogin'

const App = () => {
  const [user, setUser] = useState()
  const [contacts, setContacts] = useState([])
  const [chats, setChats] = useState([])

  if (!user) {
    return <SimpleLogin setUser={setUser} />
  } else {
    return (
      <div>
        <h2>Wellcome, {user.name}</h2>
        <Users user={user} setContacts={setContacts} />
        <Contacts user={user} contacts={contacts} setContacts={setContacts} setChats={setChats} />
        <Chats user={user} chats={chats} setChats={setChats}/>
      </div>
    )
  }
}

export default App