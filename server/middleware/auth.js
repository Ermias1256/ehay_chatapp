import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, "test");

      req.userId = decodedData.id;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData.sub;
    }

    if (!req.userId) {
      res.status(401).json({ code: "1005", message: "Unauthenticated" });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Error1" });
  }
};

export default auth;
