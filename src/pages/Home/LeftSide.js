import React from "react";
import ChatMember from "./ChatMember";
import { DataContextProvider } from "../../App";
import endpoints from "../../services/api/endpoints/user";
import endpointsChat from "../../services/api/endpoints/chat";
import FriendItem from "./FriendItem";
import { Snackbar } from "@material-ui/core";

function LeftSide(props) {
  const [chatMembers, setChatMembers] = React.useState([]);
  const [chats, setChats] = React.useState([]);
  const [findFriend, setFindFriends] = React.useState("");
  const [showFriends, setShowFriends] = React.useState(false);
  const [currentUserInfo, setCurrentUserInfo] = React.useState({});
  const [snackBarOpen, setSnackBarOpen] = React.useState(false);
  const [snackBarMessage, setSnackBarMessage] = React.useState(
    "Не удалось загрузить фото"
  );
  const inputRef = React.useRef();
  const photoHref = React.useRef();

  React.useEffect(() => {
    const userId = localStorage.getItem("userId");
    debugger;
    endpointsChat
      .getAllChatsByUserId(userId)
      .then((resp) => {
        console.log(resp.data);
        setChats(resp.data);
      })
      .catch((reason) => {});

    let payload = {
      id: localStorage.getItem("userId"),
    };
    endpoints
      .getUserById(payload)
      .then((resp) => {
        debugger;
        var userInfo = resp.data;
        setCurrentUserInfo(userInfo);
      })
      .catch((reason) => {});
  }, []);

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
      .catch((reason) => {});
  };
  const onBlur = (e) => {
    setShowFriends(false);
  };
  const onMouseDown = (e) => {
    setShowFriends(true);
  };

  const onClickFriendAndCreateChat = (userId) => {
    let payload = {
      currentUserId: localStorage.getItem("userId"),
      friendUserId: userId,
    };
    endpointsChat
      .createChat(payload)
      .then((resp) => {
        const createdChatId = resp.data.data;
        if (createdChatId === "00000000-0000-0000-0000-000000000000") {
          return;
        }
        endpointsChat
          .getChatById(createdChatId)
          .then((resp) => {
            let currentChatInfo = resp.data.data;
            const friendId = currentChatInfo.users.filter(
              (x) => x.id !== localStorage.getItem("userId")
            )[0].id;
            currentChatInfo.friendId = friendId;
            setChats((charsArgs) => [...charsArgs, currentChatInfo]);
            localStorage.setItem("chats", JSON.stringify(chats));
          })
          .catch((reason) => {});
      })
      .catch((reason) => {});
  };

  const onClickChatMember = (chatId) => {
    endpointsChat
      .getChatById(chatId)
      .then((resp) => {
        let currentChat = resp.data.data;
        props.setCurrentChat(currentChat);
        let payload = {
          chatId,
        };
        endpointsChat
          .getMessagesByChatId(payload)
          .then((resp) => {
            debugger;
            props.setAllMessages(resp.data);
          })
          .catch((reason) => {});
      })
      .catch((reason) => {});
  };

  const onClickImage = async (e) => {
    inputRef.current.click();
  };

  const onChangeInputFile = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onloadend = (e) => {
      let payload = {
        src: e.target.result,
        userId: localStorage.getItem("userId"),
      };
      endpoints
        .uploadPhoto(payload)
        .then((resp) => {
          if (!resp.data.data) {
            setSnackBarOpen(true);
            setTimeout(() => {
              setSnackBarOpen(false);
            }, 4000);
          }
          setSnackBarMessage("Фото успешно загружено");
          setSnackBarOpen(true);
          let userPayload = {
            id: localStorage.getItem("userId"),
          };
          endpoints
            .getUserById(userPayload)
            .then((responseData) => {
              let userInformation = responseData.data;
              setCurrentUserInfo(userInformation);
            })
            .catch((reason) => {});
          setTimeout(() => {
            setSnackBarOpen(false);
          }, 4000);
        })
        .catch((reason) => {
          setSnackBarOpen(true);
          setTimeout(() => {
            setSnackBarOpen(false);
          }, 4000);
        });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div class="conversation-list">
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={6000}
        message={snackBarMessage}
      />
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
          chats.map((chat) => {
            console.log(chat);
            return (
              <ChatMember
                onClickChatMember={() => onClickChatMember(chat.id)}
                name={chat.title}
                photoUrl={chat.photoUrl}
                id={chat.id}
              />
            );
          })}
      </ul>
      <div class="my-account">
        <div class="image" style={{ cursor: "pointer" }} onClick={onClickImage}>
          <img photoSrc={photoHref} src={currentUserInfo.photoBase64} />
          <input
            onChange={onChangeInputFile}
            ref={inputRef}
            type="file"
            style={{ display: "none" }}
          />
          <i class="fa fa-circle online"></i>
        </div>
        <div class="name">
          <span>{currentUserInfo.name && currentUserInfo.name}</span>
          <i class="fa fa-angle-down"></i>
          <span class="availability">
            {currentUserInfo.active ? "В сети" : "Не в сети"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default LeftSide;
