var database = require("../database/config");

function buscarDadosGraficos(idCamara) {
  var instrucaoSql = `
    SELECT 
      s.idSensor,
      s.nome,
      r.temperatura,
      r.umidade,
      r.dt_Hora
    FROM registro r
    INNER JOIN sensor s
      ON r.idSensor = s.idSensor
    WHERE s.camaraId = ${idCamara}
    ORDER BY r.dt_Hora ASC;
  `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  buscarDadosGraficos
};