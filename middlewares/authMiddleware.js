import jwt from "jsonwebtoken";

// Decrypt token and check if Valid Token

export const authMiddleware = (req, res, next) => {
  try {
    // token contains Bearer and the Token
    // we only want the Token so split ..converts to array
    // and accesing only the encrypted token
    const token = req.headers.authorization.split(" ")[1];

    // Now Decode the encrypted token and validate Token
    // in the Loign controller process we had encrypted user id (jwt.sign)
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;

    req.body.userId = userId;
    next();
  } catch (error) {
    res.status(401).send({
      message: "You are not Authenticated",
      data: error,
      success: false,
    });
  }
};
