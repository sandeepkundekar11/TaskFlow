import jwt from "jsonwebtoken";
import AsyncHandler from "express-async-handler";

const userAuth = AsyncHandler(async (req, res, next) => {
  try {
    let token = req.headers["authorization"].split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "provide the token" });
    }

    // validating the token

    let decodeInfo = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodeInfo) {
      return res.status(401).json({ message: "user is not authorized" });
    }
    // console.log(decodeInfo);
    req.userId = decodeInfo?.user?._id;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
export default userAuth;
