const express = require("express");
const router = express.Router();

const {
  getPublishers,
  findPublisher,
  getPublisher,
  addPublisher,
  deletePublisher,
  editPublisher,
} = require("../controllers/publishercontrollers");

router.get("/", getPublishers);
router.post("/add-publisher", addPublisher);
router.get("/edit-publisher/:id", getPublisher);
router.patch("/edit-publisher/:id", editPublisher);

router.get("/:id", getPublisher);
router.post("/find", findPublisher);
router.patch("/:id", deletePublisher); //soft delete

module.exports = router;
