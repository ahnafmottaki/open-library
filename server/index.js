require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const initializeApp = require("./src/firebase/firebase-admin");
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");

const app = express();
// const port = process.env.PORT || 5000;

initializeApp();

app.use(
  cors({
    origin: [
      "https://openlibrary-31653.web.app",
      "https://openlibrary-31653.firebaseapp.com",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json({ success: true, message: "Server Started Successfully" });
});
app.use(authRoutes);
app.use(bookRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Page Not Found" });
});

app.listen(process.env.PORT, () => {
  console.log("server started", process.env.PORT);
});
