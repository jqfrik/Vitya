import React from "react";
import MessageItem from "./MessageItem";
import { Base64 } from 'js-base64';

function ChatList({ allMessages }) {
  console.log(allMessages)
  return (
    <div class="chat-list">
      <ul>
        {allMessages &&
          allMessages.length != 0 &&
          allMessages.map((message) => <MessageItem name={message.user.name} message={Base64.decode(message.text)} time={new Date(message.createdDate).toLocaleDateString({},{hour:"numeric",minute:"numeric",second:"numeric"})} />)}
      </ul>
    </div>
  );
}
export default ChatList;
