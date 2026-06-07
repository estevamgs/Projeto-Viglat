var database = require("../database/config");

function listarAlertasPorCamara(idCamara) {

    var instrucaoSql = `
        SELECT 
            a.idAlerta,
            a.SensorId,
            a.registroId,
            a.dtHora,
            s.nome AS nomeSensor,
            c.nomeCamara,
            r.temperatura,
            r.umidade
        FROM alerta a
        INNER JOIN sensor s ON a.SensorId = s.idSensor
        INNER JOIN camara c ON s.camaraId = c.idCamara
        INNER JOIN registro r ON a.registroId = r.idRegistro
        WHERE c.idCamara = ${idCamara}
        ORDER BY a.dtHora DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listarAlertasPorCamara
};