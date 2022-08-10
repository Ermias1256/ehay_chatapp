const authError = [
  { code: 1001, message: "User doesn't exist." },
  { code: 1002, message: "Invalid credentials." },
  { code: 1003, message: "User already exists." },
  { code: 1004, message: "Password don't match." },
  { code: 1005, message: "Unauthenticated." },
  { code: 1006, message: "Unauthorized." },
];

const messageError = [
  { code: 2001, message: "Invalid user Id." },
  { code: 2002, message: "Invalid freind id." },
  { code: 2003, message: "Sender doesn't exist." },
  { code: 2004, message: "Receiver doesn't exist." },
  { code: 3005, message: "No message posted." },
  { code: 2006, message: "Message length limit." },
  { code: 2007, message: "Message ID doesn't exist." },
  { code: 2008, message: "The user is not the creator of the message." },
  { code: 2009, message: "No message found with that id." },
];

export const getError = (type, code, lang = "en") => {
  // TODO - Multilingual

  switch (type) {
    case "AUTH":
      const getAuthError = authError.find((error) => error.code === code);
      if (!getAuthError)
        return {
          code: 500,
          message: "something goes wrong in getting error type",
        };

      return getAuthError;

    case "MESSAGE":
      const getMessageError = messageError.find((error) => error.code === code);
      if (!getMessageError)
        return {
          code: 500,
          message: "something goes wrong in getting error type",
        };

      return getMessageError;
    default:
      return {
        code: 500,
        message: "something goes wrong in getting error type",
      };
  }
};
