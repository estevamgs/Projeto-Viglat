var dashModel = require("../models/dashModel");

function buscarDadosGraficos(req, res) {
  var idCamara = req.params.idCamara;

  if (idCamara == undefined) {
    res.status(400).send("O idCamara está undefined!");
  } else {
    dashModel.buscarDadosGraficos(idCamara)
      .then(function (resultado) {
        if (resultado.length > 0) {
          res.status(200).json(resultado);
        } else {
          res.status(204).send("Nenhum resultado encontrado!");
        }
      })
      .catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar dados dos gráficos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      });
  }
}

module.exports = {
  buscarDadosGraficos
};