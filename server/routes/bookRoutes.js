const express = require("express");
const bookControllers = require("../controllers/bookControllers");
const {
  verifyToken,
} = require("../src/utils/authorizationFns/authorizationFns");

const router = express.Router();

router.post("/addbook", verifyToken, bookControllers.postAddBook);

router.get("/allbooks", bookControllers.getAllBooks);

router.get("/edit/:bookId", verifyToken, bookControllers.getSingleBookById);

router.post("/edit/:bookId", verifyToken, bookControllers.updateBookById);

router.get("/category/:category", bookControllers.getBooksByCategory);

router.get("/bookdetail/:bookId", bookControllers.getBookDetailById);

router.post("/borrow/:bookId", verifyToken, bookControllers.borrowBookById);

router.get("/borrowedbooks", verifyToken, bookControllers.getBorrowedBooks);

router.delete("/returnbook", verifyToken, bookControllers.deleteReturnBook);

module.exports = router;
