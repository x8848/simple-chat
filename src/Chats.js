import React, { useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import Chat from './Chat'

const Chats = (props) => {

    useEffect(() => {
        fetch(`/users/${props.user.id}/chats`)
            .then(res => res.json())
            .then(chats => props.setChats(chats))
    }, [props.user.id])

    return (
        <div>
            <BrowserRouter>
                <h3>All Chats</h3>
                <ul>
                    {props.chats.map(chat => (
                        <li key={chat.chat_id}>
                            <Link to={`/${chat.chat_id}`}>{chat.name}</Link>
                        </li>
                    ))}
                </ul>
                <hr />
                <Switch>
                    {props.chats.map(chat => (
                        <Route exact path={`/${chat.chat_id}`}>
                            <Chat chat={chat} user={props.user} />
                        </Route>
                    ))}
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default Chats