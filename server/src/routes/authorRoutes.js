const express = require("express");
const router = express.Router();
const fileUpload = require("../middlewares/multer");

const { getAuthors, getAuthor, findAuthor, addAuthor, deleteAuthor, editAuthor } = require("../controllers/authorControllers");

router.get("/", getAuthors);
router.post("/add-author", fileUpload.single("img"), addAuthor);
router.get("/:id", getAuthor);
router.get("/edit-author/:id", getAuthor);
router.patch("/edit-author/:id", fileUpload.single("img"), editAuthor);
router.post("/find", findAuthor);
router.patch("/:id", deleteAuthor); //soft delete

module.exports = router;
