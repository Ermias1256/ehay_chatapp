import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

const NewMessage = ({
  receiverId,
  newMessage,
  setNewMessage,
  handleSubmit,
}) => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setNewMessage({
      ...newMessage,
      receiverId: receiverId,
      messageText: e.target.value,
    });
  };

  const sendMessage = (e) => {
    e.preventDefault();

    handleSubmit();

    // e.input["messageText"].value = "";
  };

  return (
    <div>
      <form onSubmit={sendMessage}>
        <>
          <div className="mb-3">
            <input
              type="text"
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="messageText"
              name="messageText"
              placeholder="Send message"
              onChange={handleChange}
            />
          </div>
        </>

        <div className="text-center pt-1 mb-4 pb-1">
          <button
            className="inline-block px-6 py-2.5 text-white bg-blue-400 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
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
