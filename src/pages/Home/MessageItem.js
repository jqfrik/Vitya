import React from 'react'

function MessageItem(props){
    return (
        <li class="me">
          <div class="name">
            <span class="">{props.name}</span>
          </div>
          <div class="message">
            <p>
              {props.message}
            </p>
            <span class="msg-time">{props.time ? props.time : "Время не указано"}</span>
          </div>
        </li>
    );
}
export default MessageItem;