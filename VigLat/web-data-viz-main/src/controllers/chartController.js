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

async function buscarDadosFazenda(req, res) {
    var idFazenda = req.params.idFazenda;

    try {
        var resultado24h = await chartModel.buscarAlertas24h(idFazenda);
        var resultado7dias = await chartModel.buscarAlertas7Dias(idFazenda);

        var dadosFormatados = {
            labels24h: [],
            alertas24h: [],
            labels7dias: [],
            alertas7dias: []
        };
        for (var i = 0; i < resultado24h.length; i++) {
            dadosFormatados.labels24h.push(resultado24h[i].camara);
            dadosFormatados.alertas24h.push(resultado24h[i].qtd);
        }
        for (var j = 0; j < resultado7dias.length; j++) {
            dadosFormatados.labels7dias.push(resultado7dias[j].dia);
            dadosFormatados.alertas7dias.push(resultado7dias[j].qtd);
        }
        if (dadosFormatados.labels24h.length == 0) {
            dadosFormatados.labels24h = ["Sem Alertas"];
            dadosFormatados.alertas24h = [0];
        }
        if (dadosFormatados.labels7dias.length == 0) {
            dadosFormatados.labels7dias = ["Sem Alertas"];
            dadosFormatados.alertas7dias = [0];
        }

        res.status(200).json(dadosFormatados);

    } catch (erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage || "Erro interno no servidor");
    }
}

function buscarAlertasHojeCamara(req, res) {
    var idCamara = req.params.idCamara;

    chartModel.buscarAlertasHojeCamara(idCamara)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json({ total: resultado[0].totalHoje });
            } else {
                res.status(200).json({ total: 0 });
            }
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
  listarFazendas,
  listarCamaras,
  buscarDadosFazenda,
  buscarAlertasHojeCamara
};

