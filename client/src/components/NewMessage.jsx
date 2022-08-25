import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createMessage } from "../app/actions/message";

const initialMessage = {
  roomId: "",
  receiverId: "",
  messageText: "",
};

const NewMessage = ({ receiverId, socket }) => {
  const dispatch = useDispatch();
  const { chats, isLoading } = useSelector((state) => state.message);

  let roomId = null;
  let msgText = "";

  if (!isLoading && chats.length) {
    roomId = chats[0].roomId;
    socket.emit("join room", roomId);
  }
  console.log(roomId);

  const saveMessage = (newMessage, dispatch) =>
    new Promise((resolve, reject) => {
      const msg = dispatch(createMessage(newMessage));
      resolve(msg);
    });

  const sendMessage = async (e) => {
    e.preventDefault();

    let newMessage = {
      ...initialMessage,
      roomId: roomId,
      receiverId: receiverId,
      messageText: msgText,
    };

    saveMessage(newMessage, dispatch).then((msg) => {
      if (!roomId) {
        roomId = msg.roomId;
      }
      if (roomId) {
        socket.emit("join room", roomId);
        socket.emit("send message", msg);
      }
    });

    // clear input
    let inputText = document.getElementById("messageText");
    inputText.value = "";
  };

  return (
    <div>
      <form onSubmit={sendMessage}>
        <div className="p-3 flex mb-3 gap-1 items-center">
          <input
            type="text"
            className="form-control w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="messageText"
            name="messageText"
            placeholder="Send message"
            onChange={(e) => {
              msgText = e.target.value;
            }}
          />

          <button
            className="px-6 py-2.5 text-white bg-blue-400 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out  "
            type="submit"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewMessage;
