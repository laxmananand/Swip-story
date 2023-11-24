const jwt = require("jsonwebtoken");
const verifyJwt = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const tokenData = authorizationHeader.split(" ");
    const token = tokenData[1];
    console.log({ token });
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    //   if (err) {
    //     console.log(err);
    //     return res
    //       .status(401)
    //     .json({ message: "user is unauthorised", success: false });
    console.log({ decoded });
    req.locals = {};
    req.locals = decoded;
    console.log("set user data to request");
    //});
    return next();
  } catch (err) {
    console.log("error while verifying token", err);
    return res
      .status(500)
      .json({ message: "Something went wrong", success: false });
  }
};

module.exports = { verifyJwt };
