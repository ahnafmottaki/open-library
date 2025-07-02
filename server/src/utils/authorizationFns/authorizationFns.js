const admin = require("firebase-admin");
module.exports.verifyToken = async (req, res, next) => {
  const token = req.cookies?.accessToken;
  const email = req.query?.email;
  if (!token)
    return res.status(401).json({ error: "Authorization token required" });
  try {
    const tokenInformation = await admin.auth().verifyIdToken(token);
    if (tokenInformation.email !== email)
      return res.status(403).send({ error: "Forbidden Access" });
    next();
  } catch (err) {
    return res.status(403).send({ error: "Unauthorized Access" });
  }
};
