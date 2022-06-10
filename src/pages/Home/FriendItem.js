import React from "react";

function FriendItem(props) {
  const onClickFriend = (e) => {
      props.onClickFriendAndCreateChat()
  };
  return (
    <div className="friend-item" onMouseDown={onClickFriend}>
      <p className="name">{props.name}</p>
      <p className="active">{props.active ? "в сети" : "не в сети"}</p>
    </div>
  );
}

export default FriendItem;
