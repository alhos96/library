const { Publisher } = require("../models/publisherModel");
const { Book } = require("../models/bookModel");

exports.addPublisher = async (req, res, next) => {
  const { name, road, zipcode, city, country } = req.body;

  let existingPublisher = await Publisher.findOne({ name });

  if (existingPublisher) {
    res.status(400).json({ message: "Publisher already exists!" });

    const error = new Error("Publisher already exists!");
    return next(error);
  }

  let publisher = new Publisher({
    name,
    road,
    zipcode,
    city,
    country,
  });

  await publisher.save();

  res.status(200).json({ message: "Success!" });
};

exports.getPublishers = async (req, res, next) => {
  let publishers = await Publisher.find();

  let notDeletedPublishers = [];
  publishers.forEach((publisher) => !publisher.isDeleted && notDeletedPublishers.push(publisher));

  res.status(200).json({ data: notDeletedPublishers });
};

exports.getPublisher = async (req, res, next) => {
  let { id } = req.params;

  let publisher = await Publisher.findById(id);

  let books = await Book.find({ publisher: id });

  if (publisher) {
    res.status(200).json({ data: { publisher, books } });
  } else {
    const error = new Error("Something went wrong");
    console.log(error.message);
    res.json(error.message);
  }
};

exports.findPublisher = async (req, res, next) => {
  let { search } = req.body;

  let publisher = await Publisher.find({ nameForSearch: search.toLowerCase() });

  if (publisher && publisher.isDeleted === false) {
    res.status(200).json({ data: publisher });
  } else {
    const error = new Error("No publishers found");
    console.log(error.message);
    res.json({ data: [] });
    return next(error);
  }
};

exports.editPublisher = async (req, res, next) => {
  const { id } = req.params;
  const { name, road, zipcode, city, country } = req.body;

  let existingPublisher = await Publisher.findOne({ name });

  if (existingPublisher && existingPublisher._id !== parseInt(id)) {
    res.status(400).json({ message: "Publisher already exists!" });

    const error = new Error("Publisher already exists!");
    return next(error);
  }

  await Publisher.findByIdAndUpdate(id, { name, road, zipcode, city, country });

  res.json({ message: "Success!" });
};

exports.deletePublisher = async (req, res, next) => {
  const { id } = req.params;

  await Publisher.findByIdAndUpdate(id, { isDeleted: true });

  let publishers = await Publisher.find();

  let notDeletedPublishers = [];
  publishers.forEach((publisher) => !publisher.isDeleted && notDeletedPublishers.push(publisher));

  res.json({ data: notDeletedPublishers });
};
