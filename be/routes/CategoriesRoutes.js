const express = require("express");
const router = express.Router();
const CategoriesController = require('../controllers/CategoriesController')

router.post("/addCategories", CategoriesController.addEvent);
router.put("/:id", CategoriesController.updateCategories);
router.get("/getAllCategories", CategoriesController.getAllCategories);
router.get("/:id", CategoriesController.getOneCategories);
router.delete("/:id", CategoriesController.deleteCategories);

module.exports = router