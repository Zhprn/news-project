const express = require("express")
const router = express.Router();
const PostController = require ("../controllers/PostController");

router.post("/addPost", PostController.addPost);
router.put("/:id", PostController.updatePost);
router.get("/getAllPost", PostController.getAllPost);
router.get("/:id", PostController.getOnePost);
router.delete("/:id", PostController.deletePost);

module.exports = router;