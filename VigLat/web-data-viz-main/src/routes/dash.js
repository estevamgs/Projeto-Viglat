var express = require("express");
var router = express.Router();

var dashController = require("../controllers/dashController");

router.get("/graficos/:idCamara", function (req, res) {
  dashController.buscarDadosGraficos(req, res);
});

module.exports = router;