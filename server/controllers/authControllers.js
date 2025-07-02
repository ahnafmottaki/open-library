const admin = require("firebase-admin");

module.exports.postSetCookie = async (req, res) => {
  const token = req.body?.accessToken;
  if (!token)
    return res.status(401).send({ message: "Authorization token required" });
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    res.status(200).send({ message: "Login successful" });
  } catch (err) {
    res.status(401).send({ message: "Invalid token" });
  }
};
