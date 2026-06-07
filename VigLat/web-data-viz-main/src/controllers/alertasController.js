var alertasModel = require("../models/alertasModel");

function buscarAlertasPorCamara(req, res) {
    var idCamara = req.params.idCamara;

    alertasModel.listarAlertasPorCamara(idCamara)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum alerta registrado para esta câmara!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    buscarAlertasPorCamara
};