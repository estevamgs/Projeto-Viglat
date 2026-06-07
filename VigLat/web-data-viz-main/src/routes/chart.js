var express = require("express");
var router = express.Router();

var chartController = require("../controllers/chartController");

router.get("/listarFazendas", chartController.listarFazendas);

router.get("/listarCamaras/:idFazenda", chartController.listarCamaras);

module.exports = router;
