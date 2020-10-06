var express = require("express");
var router = express.Router();

const roleController = require("../controllers/role.controller");

// Role Routes
router.post("/addNewRole", roleController.addRole);
router.get("/getAllRoutes", roleController.listRole);
router.get("/getRoleById/:id", roleController.getRoleById);

module.exports = router;
