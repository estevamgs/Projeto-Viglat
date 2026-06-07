var chartModel = require("../models/chartModel");

function listarFazendas(req, res) {
  chartModel
    .listarFazendas()
    .then((resultado) => {
      res.json(resultado);
    })
    .catch((erro) => {
      console.log(erro);
      res.status(500).json(erro);
    });
}

function listarCamaras(req, res) {
  const idFazenda = req.params.idFazenda;

  chartModel
    .listarCamaras(idFazenda)
    .then((resultado) => {
      res.json(resultado);
    })
    .catch((erro) => {
      console.log(erro);
      res.status(500).json(erro);
    });
}

module.exports = {
  listarFazendas,
  listarCamaras,
};
