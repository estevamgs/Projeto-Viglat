var database = require("../database/config");

function listarFazendas() {
    var instrucaoSql = `
        SELECT 
            f.idFazenda,
            f.nome AS nomeFazenda,
            CASE
                WHEN MAX(r.temperatura) > 26 OR MIN(r.temperatura) < 15 
                  OR MAX(r.umidade) > 95     OR MIN(r.umidade) < 70 THEN 'critico'
                WHEN MAX(r.temperatura) > 22 OR MIN(r.temperatura) < 18 
                  OR MAX(r.umidade) > 90     OR MIN(r.umidade) < 80 THEN 'alerta'
                ELSE 'ideal'
            END AS statusFazenda
        FROM fazenda f
        LEFT JOIN camara c ON c.fazendaId = f.idFazenda
        LEFT JOIN sensor s ON s.camaraId = c.idCamara
        LEFT JOIN (
            SELECT reg.idSensor, reg.temperatura, reg.umidade
            FROM registro reg
            JOIN (
                SELECT idSensor, MAX(idRegistro) AS maxId
                FROM registro
                GROUP BY idSensor
            ) agrupado ON reg.idRegistro = agrupado.maxId AND reg.idSensor = agrupado.idSensor
        ) r ON r.idSensor = s.idSensor
        GROUP BY f.idFazenda, f.nome;
    `;
    console.log("Executando SQL Status Dinâmico das Fazendas: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarCamaras(idFazenda) {
  var instrucaoSql = `
        SELECT
            c.idCamara,
            c.nomeCamara,

            r.temperatura,
            r.umidade,

            CASE

                WHEN
                    r.temperatura > 26
                    OR
                    r.temperatura < 15
                    OR
                    r.umidade > 95
                    OR
                    r.umidade < 70
                THEN 'critico'

                WHEN
                    r.temperatura > 22
                    OR
                    r.temperatura < 18
                    OR
                    r.umidade > 90
                    OR
                    r.umidade < 80
                THEN 'alerta'

                ELSE 'ideal'

            END AS statusCamara

        FROM camara c

        JOIN sensor s
            ON s.camaraId =
            c.idCamara

        JOIN registro r
            ON r.idSensor =
            s.idSensor

        WHERE
            c.fazendaId =
            ${idFazenda}

        AND r.idRegistro = (

            SELECT
                MAX(r2.idRegistro)

            FROM sensor s2

            JOIN registro r2
                ON r2.idSensor =
                s2.idSensor

            WHERE
                s2.camaraId =
                c.idCamara
        );
    `;

  console.log(instrucaoSql);

  return database.executar(instrucaoSql);
}

function buscarAlertas24h(idFazenda) {
    var instrucaoSql = `
        SELECT 
            c.nomeCamara AS camara,
            COUNT(a.idAlerta) AS qtd 
        FROM camara c
        LEFT JOIN sensor s ON s.camaraId = c.idCamara
        LEFT JOIN alerta a
            ON a.SensorId = s.idSensor
            AND a.dtHora >= NOW() - INTERVAL 1 DAY
        WHERE c.fazendaId = ${idFazenda}
        GROUP BY c.idCamara, c.nomeCamara
        ORDER BY c.idCamara ASC;
    `;
    console.log("Executando SQL Alertas por Camara 24h: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarAlertas7Dias(idFazenda) {
    var instrucaoSql = `
        SELECT
            dias.dia,
            COUNT(c.idCamara) AS qtd,
            dias.ordem AS dia_num
        FROM (
            SELECT 6 AS dias_atras, 'Dia 1' AS dia, 1 AS ordem
            UNION ALL SELECT 5, 'Dia 2', 2
            UNION ALL SELECT 4, 'Dia 3', 3
            UNION ALL SELECT 3, 'Dia 4', 4
            UNION ALL SELECT 2, 'Dia 5', 5
            UNION ALL SELECT 1, 'Dia 6', 6
            UNION ALL SELECT 0, 'Hoje', 7
        ) dias
        LEFT JOIN alerta a
            ON DATE(a.dtHora) = CURDATE() - INTERVAL dias.dias_atras DAY
        LEFT JOIN sensor s ON a.SensorId = s.idSensor
        LEFT JOIN camara c
            ON s.camaraId = c.idCamara
            AND c.fazendaId = ${idFazenda}
        GROUP BY dias.ordem, dias.dia
        ORDER BY dias.ordem ASC;
    `;
    console.log("Executando SQL 7 Dias: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarAlertasHojeCamara(idCamara) {
    var instrucaoSql = `
        SELECT COUNT(idAlerta) AS totalHoje 
        FROM alerta a
        JOIN sensor s ON a.SensorId = s.idSensor
        WHERE s.camaraId = ${idCamara} 
          AND DATE(a.dtHora) = CURDATE();
    `;
    console.log("Executando SQL Alertas Hoje Camara: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
  listarFazendas,
  listarCamaras,
  buscarAlertas24h,
  buscarAlertas7Dias,
  buscarAlertasHojeCamara
};
