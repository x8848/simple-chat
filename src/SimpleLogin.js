import React, { useState } from 'react'

const SimpleLogin = (props) => {
  const [name, setName] = useState()

  function login(event) {
    event.preventDefault()
    if (!name) { alert(`Name can't be empty !!`) } else {
      fetch('/users/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name })
      })
        .then(res => res.json())
        .then(user => props.setUser(user))
    }
  }
  function handleChange(event) {
    setName(event.target.value)
  }

  return (
      <form onSubmit={login}>
        <label>Your Name: </label><input type='text' value={name} onChange={handleChange}></input><button>LogIn</button>
      </form>
  )
}

export default SimpleLogin