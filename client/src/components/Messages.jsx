import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { Message } from ".";

const Messages = ({ id, setRoomId }) => {
  const { chats: userChats, isLoading } = useSelector((state) => state.message);

  useEffect(() => {
    // get room id
    if (userChats?.length > 0) {
      setRoomId(userChats[0].roomId);
    }
  }, [roomId]);

  return (
    <div>
      {userChats?.length > 0 ? (
        <div className="flex flex-col-reverse">
          {userChats?.map((message) => (
            <div key={message._id}>
              <Message message={message} id={id} />
            </div>
          ))}
        </div>
      ) : (
        <p>No chats found.</p>
      )}
    </div>
  );
};

export default Messages;
