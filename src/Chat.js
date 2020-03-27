import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
const socket = io()

const Chat = (props) => {
    const [messages, setMessages] = useState([])
    const [text, setText] = useState()

    socket.on(props.chat.chat_id, message => {
        setMessages(messages.concat(message))
    })

    useEffect(() => {
        fetch(`/messages/${props.chat.chat_id}`)
            .then(res => res.json())
            .then(messages => setMessages(messages))
    }, [props.chat.chat_id])

    function sendMessage(event) {
        event.preventDefault()
        const message = { chat_id: props.chat.chat_id, user_id: props.user.id, user_name: props.user.name, text: text, created: Date.now() }
        fetch('/messages', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(message)
        })
        setText('')
    }

    function handleChange(event) {
        setText(event.target.value)
    }

    return (
        <div>
            <div>Chat with {props.chat.name}</div>
            <ul>
                {messages.map(message => (
                    <li key={message._id}>{message.user_name} at [{new Date(message.created).toString().slice(16, 21)}]: {message.text}</li>
                ))}
            </ul>
            <form onSubmit={sendMessage}>
                <input value={text} onChange={handleChange} /><button>Send</button>
            </form>
        </div>
    )
}

export default Chat