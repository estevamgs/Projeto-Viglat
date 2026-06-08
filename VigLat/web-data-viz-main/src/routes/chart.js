var express = require("express");
var router = express.Router();

var chartController = require("../controllers/chartController");

router.get("/listarFazendas", chartController.listarFazendas);

router.get("/listarCamaras/:idFazenda", chartController.listarCamaras);

router.get("/dados-fazenda/:idFazenda", function (req, res) {
    chartController.buscarDadosFazenda(req, res);
});

router.get("/alertas-hoje/:idCamara", function (req, res) {
    chartController.buscarAlertasHojeCamara(req, res);
});

module.exports = router;
