const express = require("express")
const router = express.Router();
const PositionController = require ("../controllers/PositionController");

router.post("/addPosition", PositionController.addPosition);
router.put("/:id", PositionController.updatePosition);
router.get("/getAllPosition", PositionController.getAllPosition);
router.get("/:id", PositionController.getOnePosition);
router.delete("/:id", PositionController.deletePosition);

module.exports = router;