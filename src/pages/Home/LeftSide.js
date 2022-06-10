import React from "react";
import ChatMember from "./ChatMember";
import { DataContextProvider } from "../../App";
import endpoints from "../../services/api/endpoints/user";
import endpointsChat from "../../services/api/endpoints/chat";
import FriendItem from "./FriendItem";

function LeftSide(props) {
  const [chatMembers, setChatMembers] = React.useState([]);
  const [chats, setChats] = React.useState([]);
  const [findFriend, setFindFriends] = React.useState("");
  const [showFriends, setShowFriends] = React.useState(false);
  let dataProvider = React.useContext(DataContextProvider);

  React.useEffect(()=> {
    const userId = localStorage.getItem("userId")
    debugger
    endpointsChat.getAllChatsByUserId(userId).then(resp => {
      console.log(resp.data)
      setChats(resp.data)
    }).catch(reason => {
      
    })
  },[])

  const onInputFindFriends = (e) => {
    setFindFriends(e.target.value);
    let payload = {
      searchString: findFriend,
      currentUserId: localStorage.getItem("userId"),
    };
    endpoints
      .getAllUsersBySearchString(payload)
      .then((resp) => {
        setChatMembers(resp.data);
      })
      .catch((reason) => {
      });
  };
  const onBlur = (e) => {
    setShowFriends(false);
  };
  const onMouseDown = (e) => {
    setShowFriends(true);
  };

  const onClickFriendAndCreateChat = (userId) => {
    debugger
    let payload = {
      currentUserId: localStorage.getItem("userId"),
      friendUserId: userId,
    };
    endpointsChat
      .createChat(payload)
      .then((resp) => {
        const createdChatId = resp.data.data;
        endpointsChat
          .getChatById(createdChatId)
          .then((resp) => {
            let currentChatInfo = resp.data.data;
            const friendId = currentChatInfo.users.filter(x => x.id !== localStorage.getItem("userId"))[0].id
            currentChatInfo.friendId = friendId; 
            setChats((charsArgs) => [...charsArgs, currentChatInfo]);
            localStorage.setItem("chats", JSON.stringify(chats));
          })
          .catch((reason) => {
          });
      })
      .catch((reason) => {});
  };

  const onClickChatMember = (chatId) => {
    endpointsChat
      .getChatById(chatId)
      .then((resp) => {
        let currentChat = resp.data.data;
        props.setCurrentChat(currentChat)
        let payload = {
          chatId,
        };
        endpointsChat
          .getMessagesByChatId(payload)
          .then((resp) => {
            debugger
            props.setAllMessages(resp.data)
          })
          .catch((reason) => {});
      })
      .catch((reason) => {});
  };

  return (
    <div class="conversation-list">
      <input
        placeholder="Поиск друзей"
        value={findFriend}
        onMouseDown={onMouseDown}
        onBlur={onBlur}
        onInput={onInputFindFriends}
      />
      {showFriends && (
        <div className="friends">
          {chatMembers &&
            chatMembers.map((member) => (
              <FriendItem
                onClickFriendAndCreateChat={() =>
                  onClickFriendAndCreateChat(member.id)
                }
                name={member.name}
                active={member.active}
              />
            ))}
        </div>
      )}

      <ul class="">
        {chats &&
          chats.map(chat => {
            console.log(chat)
            return (
              <ChatMember
                onClickChatMember={() => onClickChatMember(chat.id)}
                name={chat.title}
                photoUrl={chat.photoUrl}
                id={chat.id}
              />
            )
          }
          )
        }
      </ul>
    </div>
  );
}

export default LeftSide;
