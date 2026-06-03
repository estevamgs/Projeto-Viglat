var express = require("express");
var router = express.Router();

var dashController = require("../controllers/dashController");

router.get("/dash/:fazendaId/:idFazenda", function (req, res) {
  dashController.formarDashboard(req, res);
});

router.post("/cadastrar", function (req, res) {
  dashController.cadastrar(req, res);
})

module.exports = router;