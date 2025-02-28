const express = require("express")
const router = express.Router();
const TeamControllers = require ("../controllers/TeamController");

router.post("/addTeam", TeamControllers.addTeam);
router.put("/:id", TeamControllers.updateTeam);
router.get("/getAllTeams", TeamControllers.getAllTeams);
router.get("/:id", TeamControllers.getOneTeam);
router.delete("/:id", TeamControllers.deleteTeam);

module.exports = router;