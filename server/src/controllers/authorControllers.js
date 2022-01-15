const { Author } = require("../models/authorModel");

exports.getAuthors = async (req, res, next) => {
  let authors = await Author.find();

  let notDeletedAuthors = [];
  authors.forEach((author) => !author.isDeleted && notDeletedAuthors.push(author));

  res.status(200).json({ data: notDeletedAuthors });
};

//view-author
exports.getAuthor = async (req, res, next) => {
  let { id } = req.params;

  let author = await Author.findById(id);

  if (author) {
    let books = await author.populate("books");
    res.status(200).json({ data: author });
  } else {
    const error = new Error("Something went wrong");
    console.log(error.message);
    res.json({ data: [] });
    return next(error);
  }
};

//author-search
exports.findAuthor = async (req, res, next) => {
  let { search } = req.body;

  let author = await Author.find({ nameForSearch: search.toLowerCase() });

  if (author && author.isDeleted !== false) {
    res.status(200).json({ data: author });
  } else {
    const error = new Error("No authors in database...");
    console.log(error);
    res.json({ data: [] });
    return next(error);
  }
};

exports.addAuthor = async (req, res, next) => {
  const { name, email, books, birthday, biography } = req.body;
  const image = req.file.filename;

  let parsedBooks = JSON.parse(books);
  let booksIds = [];
  parsedBooks.forEach((book) => booksIds.push(book.id));

  let newAuthor = new Author({
    name,
    nameForSearch: name.toLowerCase().trim(),
    email,
    books: booksIds,
    birthday,
    biography,
    image,
  });

  await newAuthor.save();

  res.json(newAuthor);
};

exports.deleteAuthor = async (req, res, next) => {
  const { id } = req.params;

  await Author.findByIdAndUpdate(id, { isDeleted: true });

  let authors = await Author.find();

  let notDeletedAuthors = [];
  authors.forEach((author) => !author.isDeleted && notDeletedAuthors.push(author));

  res.json({ data: notDeletedAuthors });
};

exports.editAuthor = async (req, res, next) => {
  const { id } = req.params;
  const { name, biography, email, books, img } = req.body;

  let parsedBooks = JSON.parse(books);
  let booksIds = [];
  parsedBooks.forEach((book) => booksIds.push(book.id));

  console.log(req.body);

  await Author.findByIdAndUpdate(id, { name, biography, email, books: booksIds, image: req.file ? req.file.filename : img });

  res.json({ message: "Success!" });
};
