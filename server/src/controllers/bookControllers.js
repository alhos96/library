const { Book } = require("../models/bookModel");
const { Publisher } = require("../models/publisherModel");
const { Author } = require("../models/authorModel");

exports.getBooks = async (req, res, next) => {
  let books = await Book.find();

  let notDeletedBooks = [];
  books.forEach((book) => !book.isDeleted && notDeletedBooks.push(book));

  res.status(200).json({ data: notDeletedBooks });
};

exports.getBook = async (req, res, next) => {
  let { id } = req.params;

  let book = await Book.findById(id).populate("publisher");
  let authors = await Author.find({ books: id });

  if (book) {
    res.status(200).json({ data: { book, authors } });
  } else {
    const error = new Error("Something went wrong");
    return next(error);
  }
};

exports.findBook = async (req, res, next) => {
  let { search } = req.body;
  console.log(req.body);

  let book = await Book.find({ titleForSearch: search.toLowerCase() });

  if (book && book.isDeleted !== false) {
    res.status(200).json({ data: book });
  } else {
    const error = new Error("No books found..");
    console.log(error);
    res.json({ data: [] });

    return next(error);
  }
};

exports.addBook = async (req, res, next) => {
  const { title, description, authors, price, pages, publishers } = req.body;
  const image = req.file.filename;

  let parsedPublisher = JSON.parse(publishers);
  const newBook = new Book({
    title,
    titleForSearch: title.toLowerCase().trim(),
    description,
    price,
    pages,
    publisher: parsedPublisher[0].id,
    image,
  });

  await newBook.save();

  // put this book to its authors
  let parsedAuthors = JSON.parse(authors);

  parsedAuthors.forEach(async (author) => {
    let bookAuthor = await Author.findById(author.id);
    bookAuthor.books.push(newBook._id);

    await bookAuthor.save();
  });

  res.json(newBook);
};

exports.editBook = async (req, res, next) => {
  const bookId = req.params.id;
  const { title, description, price, pages, authors, publishers, img } = req.body;

  let parsedPublisher = JSON.parse(publishers);
  await Book.findByIdAndUpdate(bookId, {
    title,
    titleForSearch: title.toLowerCase().trim(),
    description,
    price,
    pages,
    publisher: parsedPublisher[0].id,
    image: req.file ? req.file.filename : img,
  });

  // put this book to its authors
  let parsedAuthors = JSON.parse(authors);

  parsedAuthors.forEach(async (author) => {
    let bookAuthor = await Author.findById(author.id);

    bookAuthor && bookAuthor.books.push(bookId);

    bookAuthor && (await bookAuthor.save());
  });

  res.json({ message: "Success!" });
};

exports.deleteBook = async (req, res, next) => {
  const { id } = req.params;

  await Book.findByIdAndUpdate(id, { isDeleted: true });

  let books = await Book.find();

  let notDeletedBooks = [];
  books.forEach((book) => !book.isDeleted && notDeletedBooks.push(book));

  res.json({ data: notDeletedBooks });
};
