import React from "react";
import { useSelector } from "react-redux";

const Friends = () => {
  const { friends: userFriends } = useSelector((state) => state.message);

  return (
    <div>
      {userFriends ? (
        userFriends?.map((friend, key) => <h5 key={key}>{friend.name}</h5>)
      ) : (
        <h5>No friends yet.</h5>
      )}
    </div>
  );
};

export default Friends;
