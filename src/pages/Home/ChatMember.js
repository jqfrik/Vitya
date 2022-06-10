import React from "react";

function ChatMember(props) {
  const onClickItem = e => {
    props.onClickChatMember()
  }
  console.log(props)
  return (
    <li class="item" onClick={onClickItem}>
      <a href="#">
        <i class="fa fa-list-alt"></i>
        <span>{props.name}</span>
      </a>
    </li>
  );
}
export default ChatMember;
