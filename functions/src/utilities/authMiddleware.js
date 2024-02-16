const admin = require("../config/firebaseConfig");

class AuthenticationMiddleware {
  async decodeToken(req, res, next) {
    if (req.path.startsWith("/docs")) return next();

    if (!req.headers.authorization)
      return res.status(401).json({ message: "Unauthorized " });

    const token = req.headers.authorization.split(" ")[1];

    try {
      const decodeValue = await admin.auth().verifyIdToken(token);
      if (decodeValue) {
        req.user = decodeValue;
        return next();
      }
      return res.status(401).json({ message: "Unauthorized " });
    } catch (e) {
      return res
        .status(500)
        .json({ message: "Internal Server Error: " + e.message });
    }
  }
}

module.exports = new AuthenticationMiddleware();
