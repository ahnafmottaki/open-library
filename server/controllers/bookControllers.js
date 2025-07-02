const { ObjectId } = require("mongodb");
const { db } = require("../src/mongodb/mongodb.init");
const booksCollection = db.collection("books");
exports.postAddBook = async (req, res) => {
  const bookDetails = req.body;
  bookDetails.borrowers = [];
  try {
    const result = await booksCollection.insertOne(bookDetails);
    res.send(result);
  } catch (err) {
    res.status(503).send({ message: "Service unavailable" });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const books = await booksCollection.find({}).toArray();
    res.send(books);
  } catch (err) {
    res.status(503).send({ message: "Service unavailable" });
  }
};

exports.getSingleBookById = async (req, res) => {
  const bookId = req.params?.bookId;
  if (!bookId)
    return res.status(404).send({ message: "Book Id isn't provided" });
  try {
    const book = await booksCollection.findOne({ _id: new ObjectId(bookId) });
    res.send(book);
  } catch (err) {
    res.status(503).send({ message: "Service unavailable" });
  }
};

exports.updateBookById = async (req, res) => {
  const bookId = req.params?.bookId;
  const bookDetails = req.body;
  if (!bookId || !bookDetails) {
    return res.status(404).send({ message: "Request has Invalid parameters" });
  }
  try {
    const result = await booksCollection.updateOne(
      { _id: new ObjectId(bookId) },
      {
        $set: bookDetails,
      }
    );
    res.send(result);
  } catch (err) {
    res.status(503).send({ message: "Service unavailable" });
  }
};

exports.getBooksByCategory = async (req, res) => {
  const { category } = req.params;
  if (!category) return res.status(501).json({ message: "Invalid parameter" });
  try {
    const books = await booksCollection
      .find({ category: category.trim() })
      .toArray();
    res.send(books);
  } catch (err) {
    if (err) {
      res.status(501).send({ message: "Something unexpected happened" });
    }
  }
};

exports.getBookDetailById = async (req, res) => {
  const { bookId } = req.params;
  if (!bookId) return res.status(501).send({ message: "Invalid parameters" });
  try {
    const bookDetail = await booksCollection.findOne({
      _id: new ObjectId(bookId),
    });
    res.send(bookDetail);
  } catch (err) {
    if (err) {
      res.status(501).send({ message: "Something unexpected happened" });
    }
  }
};

exports.borrowBookById = async (req, res) => {
  const bookId = req.params?.bookId;
  const borrowerDetails = req.body;
  if (!bookId) return res.status(501).send({ message: "Invalid Parameters" });
  try {
    // const result = await booksCollection.updateOne(
    //   {
    //     _id: new ObjectId(bookId),
    //     quantity: { $gt: 0 },
    //     "borrowers.email": { $ne: borrowerDetails.email },
    //   },
    //   {
    //     $push: {
    //       borrowers: borrowerDetails,
    //     },
    //     $inc: {
    //       quantity: -1,
    //     },
    //   }
    // );

    const bookDetails = await booksCollection.findOne({
      _id: new ObjectId(bookId),
    });

    if (bookDetails.quantity <= 0) {
      return res.send({ success: false, message: "Borrow Limit Reached" });
    }
    if (
      bookDetails.borrowers.findIndex(
        (borrower) => borrower.email === borrowerDetails.email
      ) !== -1
    ) {
      return res.send({ success: false, message: "Book Already borrowed" });
    }

    const newBorrowers = [...bookDetails.borrowers, borrowerDetails];
    const result = await booksCollection.updateOne(
      { _id: new ObjectId(bookId) },
      { $set: { borrowers: newBorrowers }, $inc: { quantity: -1 } }
    );

    if (result?.modifiedCount === 1) {
      return res.send({ success: true, message: "Book Borrowed Successfully" });
    } else {
      return res.send({ success: false, message: "Can't Borrow Books" });
    }
  } catch (err) {
    if (err) {
      res.status(501).send({ message: "Something unexpected happened" });
    }
  }
};

exports.getBorrowedBooks = async (req, res) => {
  const userEmail = req.query?.email;

  if (!userEmail) {
    return res.status(501).send({ message: "Invalid Parameters" });
  }

  try {
    const borrowedBooks = await booksCollection
      .find({
        "borrowers.email": userEmail,
      })
      .toArray();
    res.json(borrowedBooks);
  } catch (err) {
    if (err) {
      res.status(501).send({ message: "Something unexpected happened" });
    }
  }
};

exports.deleteReturnBook = async (req, res) => {
  const { email, bookId } = req.query;
  if (!bookId) return res.status(501).send({ message: "Invalid parameters" });
  try {
    const borrowedBook = await booksCollection.findOne({
      _id: new ObjectId(bookId),
    });
    const isBookBorrowedByUser =
      borrowedBook.borrowers.findIndex(
        (borrower) => borrower.email === email
      ) !== -1;
    if (!isBookBorrowedByUser)
      return res.send({
        success: false,
        message: 'User doesn"t own this book',
      });
    const newBorrowers = borrowedBook.borrowers.filter(
      (borrower) => borrower.email !== email
    );

    const result = await booksCollection.updateOne(
      { _id: new ObjectId(bookId) },
      {
        $set: {
          borrowers: newBorrowers,
        },
        $inc: {
          quantity: 1,
        },
      }
    );

    if (result.modifiedCount === 1) {
      return res.json({ success: true, message: "Book Returned Successfully" });
    }
    return res.json({ success: false, message: "Failed to Return Book" });
  } catch (err) {
    if (err) {
      res.status(501).send({ message: "Something unexpected happened" });
    }
  }
};
