var database = require("../database/config");

function buscarUltimasMedidas(idCamara, limite_linhas) {

     var instrucaoSql = `
              SELECT
            r.idSensor,
            r.temperatura,
            r.umidade,
            r.dt_Hora,
            DATE_FORMAT(r.dt_Hora, '%H:%i:%s') AS momento_grafico
        FROM registro r
        JOIN sensor s
            ON r.idSensor = s.idSensor
        WHERE s.camaraId = ${idCamara}
        ORDER BY r.idRegistro DESC
        LIMIT ${limite_linhas};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idCamara) {

       var instrucaoSql = `
        SELECT
            r.idSensor,
            r.temperatura,
            r.umidade,
            DATE_FORMAT(r.dt_Hora, '%H:%i:%s') AS momento_grafico
        FROM registro r
        JOIN sensor s
            ON r.idSensor = s.idSensor
        WHERE s.camaraId = ${idCamara}
        ORDER BY r.idRegistro DESC
        LIMIT 3;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal
}
