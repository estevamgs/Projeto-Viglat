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
        JOIN sensor s ON a.SensorId = s.idSensor
        JOIN camara c ON s.camaraId = c.idCamara
        JOIN registro r ON a.registroId = r.idRegistro
        WHERE c.idCamara = ${idCamara}
          AND a.dtHora >= NOW() - INTERVAL 1 DAY
        ORDER BY a.dtHora DESC;
    `;
    console.log("Executando a instruÃ§Ã£o SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listarAlertasPorCamara
};
