var database = require("../database/config");

function buscarUltimasMedidas(idSensor, limite_linhas) {

     var instrucaoSql = `
        SELECT
            temperatura,
            umidade,
            dt_Hora,
            DATE_FORMAT(dt_Hora, '%H:%i:%s') AS momento_grafico
        FROM registro
        WHERE idSensor = ${idSensor}
        ORDER BY dt_Hora DESC
        LIMIT ${limite_linhas};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idSensor) {

    var instrucaoSql = `
        SELECT
            temperatura,
            umidade,
            DATE_FORMAT(dt_Hora, '%H:%i:%s') AS momento_grafico,
            idSensor
        FROM registro
        WHERE idSensor = ${idSensor}
        ORDER BY dt_Hora DESC
        LIMIT 1;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal
}
