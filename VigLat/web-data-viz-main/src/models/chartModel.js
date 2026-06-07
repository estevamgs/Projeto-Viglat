var database = require("../database/config");

function listarFazendas() {
  var instrucaoSql = `
        SELECT
            f.idFazenda,
            f.nome,

            CASE

                WHEN
                    MAX(ultimos.temperatura) > 26
                    OR
                    MIN(ultimos.temperatura) < 15
                    OR
                    MAX(ultimos.umidade) > 95
                    OR
                    MIN(ultimos.umidade) < 70
                THEN 'critico'

                WHEN
                    MAX(ultimos.temperatura) > 22
                    OR
                    MIN(ultimos.temperatura) < 18
                    OR
                    MAX(ultimos.umidade) > 90
                    OR
                    MIN(ultimos.umidade) < 80
                THEN 'alerta'

                ELSE 'ideal'

            END AS statusFazenda

        FROM fazenda f

        JOIN camara c
            ON c.fazendaId =
            f.idFazenda

        JOIN sensor s
            ON s.camaraId =
            c.idCamara

        JOIN (

            SELECT
                r1.idSensor,
                r1.temperatura,
                r1.umidade

            FROM registro r1

            JOIN (

                SELECT
                    idSensor,
                    MAX(dt_Hora)
                    AS ultimaData

                FROM registro

                GROUP BY
                    idSensor

            ) ultimoRegistro

            ON r1.idSensor =
            ultimoRegistro.idSensor

            AND r1.dt_Hora =
            ultimoRegistro.ultimaData

        ) ultimos

        ON ultimos.idSensor =
        s.idSensor

        GROUP BY
            f.idFazenda,
            f.nome;
    `;

  console.log(instrucaoSql);

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

module.exports = {
  listarFazendas,
  listarCamaras,
};
