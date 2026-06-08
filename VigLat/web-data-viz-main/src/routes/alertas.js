var express = require("express");
var router = express.Router();

var alertasController = require("../controllers/alertasController");

router.get("/alertas/camara/:idCamara", function (req, res) {
    alertasController.buscarAlertasPorCamara(req, res);
});

module.exports = router;