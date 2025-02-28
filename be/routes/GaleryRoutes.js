const express = require("express")
const router = express.Router();
const GaleryController = require ("../controllers/GaleryController");

router.post("/addGalery", GaleryController.addImage);
router.put("/:id", GaleryController.updateImage);
router.get("/getAllGalery", GaleryController.getAllImages);
router.get("/:id", GaleryController.getOneImage);
router.delete("/:id", GaleryController.deleteImage);

module.exports = router;