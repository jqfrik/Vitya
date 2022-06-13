import React from "react";
import { DataContextProvider } from "../../App";
import LeftSide from "./LeftSide";
import ChatList from "./ChatList";
import {
  HubConnection,
  HubConnectionBuilder,
  HttpTransportType,
} from "@microsoft/signalr";
import endpoints from "../../services/api/endpoints/auth";
import endpointsChat from "../../services/api/endpoints/chat";

function Home() {
  const context = React.useContext(DataContextProvider);
  const [currentChat, setCurrentChat] = React.useState({});
  const [allMessages, setAllMessages] = React.useState([])
  const [message, setMessage] = React.useState("");
  const [connection, setConnection] = React.useState(null);

  const onInputMessage = (e) => {
    setMessage(e.target.value);
  };
  const onClickSendMessage = async (e) => {
    debugger;
    const friendId = currentChat.users.filter(
      (user) => user.id !== localStorage.getItem("userId")
    )?.[0]?.id;
    await sendMessage(friendId);
  };

  React.useEffect(() => {
    const connect = new HubConnectionBuilder()
      .withUrl("http://localhost:5000/chatHub", {
        accessTokenFactory: () => {
          const authToken = localStorage.getItem("authToken");
          return authToken;
        },
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
      })
      .withAutomaticReconnect()
      .build();
      connect.onreconnecting((e => {
        console.log("Reconnection")
      }))
      connect.onreconnecting(e => {
        console.log("Reconnection")
      });

    setConnection(connect);
  }, []);

  React.useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          connection.send("UpdateSignalId", localStorage.getItem("userId"));
          connection.on("sendMessageClientStatus", (successObject) => {
            if (successObject.success) {
              let payload = {
                chatId:successObject.chatId
              }
              endpointsChat
                .getMessagesByChatId(payload)
                .then((resp) => {
                  const newMessages = resp.data;
                  console.log("СИГНАЛ ЕСТЬ")
                  setAllMessages(newMessages)
                })
                .catch((reason) => {});
            }
          });
        })
        .catch((error) => console.log(error));
    }
  }, [connection]);

  const sendMessage = async (friendId) => {
    if (connection)
    debugger
      await connection.send(
        "SendMessageClient",
        message,
        localStorage.getItem("userId"),
        friendId
      );
    setMessage("");
  };

  if (!context.userLogined && !localStorage.getItem("userId")) return <></>;
  return (
    <div class="window-wrapper">
      <div class="window-title">
        <div class="dots">
          <i class="fa fa-circle"></i>
          <i class="fa fa-circle"></i>
          <i class="fa fa-circle"></i>
        </div>
        <div class="title">
          <span>Чат</span>
        </div>
        <div class="expand">
          <i class="fa fa-expand"></i>
        </div>
      </div>
      <div class="window-area">
        <LeftSide currentChat={currentChat} setAllMessages={setAllMessages} setCurrentChat={setCurrentChat} />
        <div class="chat-area">
          <div class="title">
            <b>Переписка</b>
            <i class="fa fa-search"></i>
          </div>
          <ChatList allMessages={allMessages} />
          <div class="input-area">
            <div class="input-wrapper">
              <input
                type="text"
                value={message}
                onInput={onInputMessage}
              ></input>
              <i class="fa fa-smile-o"></i>
              <i class="fa fa-paperclip"></i>
            </div>
            <input
              type="button"
              value="Ввод"
              class="send-btn"
              onClick={onClickSendMessage}
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
