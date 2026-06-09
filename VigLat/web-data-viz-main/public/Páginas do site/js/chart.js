var graficoTemperatura = null;
var graficoUmidade = null;
var grafico24h = null;
var grafico7dias = null;

function carregarGraficosFazenda(idFazenda) {
    fetch(`/chart/dados-fazenda/${idFazenda}`)
    .then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (dados) {
                console.log("Dados recebidos para a visão geral:", dados);
                var ctx24h = document.getElementById('chart');
                if (ctx24h) {
                    if (grafico24h != null) {
                        grafico24h.destroy();
                    }

                    grafico24h = new Chart(ctx24h.getContext('2d'), {
                        type: 'bar',
                        data: {
                            labels: dados.labels24h,
                            datasets: [{
                                label: 'Alertas nas últimas 24h',
                                data: dados.alertas24h,
                                backgroundColor: '#7a5208',
                                borderWidth: 1
                            }]
                        },
                        options: {
                            responsive: true,
                             maintainAspectRatio: false,
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    max: 12,
                                    ticks: {
                                        stepSize: 1
                                    }
                                }
                            }
                        }
                    });
                }
                var ctx7dias = document.getElementById('grafico-alerta');
                if (ctx7dias) {
                    if (grafico7dias != null) {
                        grafico7dias.destroy();
                    }

                    grafico7dias = new Chart(ctx7dias.getContext('2d'), {
                        type: 'line',
                        data: {
                            labels: dados.labels7dias,
                            datasets: [{
                                label: 'Alertas nos últimos 7 dias',
                                data: dados.alertas7dias,
                                borderColor: '#7a5208',
                                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                fill: true,
                                tension: 0.3
                            }]
                        },
                        options: {
                            responsive: true,
                             maintainAspectRatio: false,
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    max: 12,
                                    ticks: {
                                        stepSize: 1
                                    }
                                }
                            }
                        }
                    });
                }

            });
        } else {
            console.error("Erro ao buscar dados dos gráficos da fazenda.");
        }
    })
    .catch(function (erro) {
        console.error("Erro de conexão nos gráficos da visão geral:", erro);
    });
}

async function carregarGraficos(idCamara) {
  try {
    var resposta = await fetch(`/dash/graficos/${idCamara}`);

    if (!resposta.ok) {
      throw new Error("Erro ao buscar dados");
    }

    var dados = await resposta.json();

    console.log("Dados gráficos:", dados);

    montarGraficos(dados);
  } catch (erro) {
    console.log("Erro gráfico:", erro);
  }
}

function montarGraficos(dados) {
  var sensor1 = [];
  var sensor2 = [];
  var sensor3 = [];

  var idSensor1 = 0;
  var idSensor2 = 0;
  var idSensor3 = 0;

  var corSensorA = "purple";
  var corSensorB = "#4b48ec";
  var corSensorC = "gray";

  for (var i = 0; i < dados.length; i++) {
    var registro = dados[i];

    if (idSensor1 == 0) {
      idSensor1 = registro.idSensor;
      sensor1.push(registro);
    } else if (registro.idSensor == idSensor1) {
      sensor1.push(registro);
    } else if (idSensor2 == 0) {
      idSensor2 = registro.idSensor;
      sensor2.push(registro);
    } else if (registro.idSensor == idSensor2) {
      sensor2.push(registro);
    } else if (idSensor3 == 0) {
      idSensor3 = registro.idSensor;
      sensor3.push(registro);
    } else if (registro.idSensor == idSensor3) {
      sensor3.push(registro);
    }
  }

  var horas = sensor1.map(function (item) {
    return item.dt_Hora.substring(11, 19);
  });

  var temperaturaSensor1 = sensor1.map(function (item) {
    return item.temperatura;
  });

  var temperaturaSensor2 = sensor2.map(function (item) {
    return item.temperatura;
  });

  var temperaturaSensor3 = sensor3.map(function (item) {
    return item.temperatura;
  });

  var umidadeSensor1 = sensor1.map(function (item) {
    return item.umidade;
  });

  var umidadeSensor2 = sensor2.map(function (item) {
    return item.umidade;
  });

  var umidadeSensor3 = sensor3.map(function (item) {
    return item.umidade;
  });

  // =========================
  // FAIXAS
  // =========================

  var tempMaxIdeal = horas.map(() => 22);
  var tempMinIdeal = horas.map(() => 18);

  var tempMinAlerta = horas.map(() => 22.1);
  var tempMaxAlerta = horas.map(() => 26);

  var tempMinAlerta2 = horas.map(() => 17.9);
  var tempMaxAlerta2 = horas.map(() => 15);

  var tempMinCritico = horas.map(() => 26.1);
  var tempMaxCritico = horas.map(() => 32);

  var tempMinCritico2 = horas.map(() => 14.9);
  var tempMaxCritico2 = horas.map(() => 0);

  var umiMaxIdeal = horas.map(() => 90);
  var umiMinIdeal = horas.map(() => 80);

  var umiMinAlerta = horas.map(() => 90.1);
  var umiMaxAlerta = horas.map(() => 95);

  var umiMinAlerta2 = horas.map(() => 79.9);
  var umiMaxAlerta2 = horas.map(() => 70);

  var umiMinCritico = horas.map(() => 95.1);
  var umiMaxCritico = horas.map(() => 100);

  var umiMinCritico2 = horas.map(() => 69.9);
  var umiMaxCritico2 = horas.map(() => 0);

  var canvasTemp = document.getElementById("grafico-temp");
  var canvasUmidade = document.getElementById("grafico-umidade");

  if (graficoTemperatura != null) {
    graficoTemperatura.destroy();
  }

  if (graficoUmidade != null) {
    graficoUmidade.destroy();
  }

  graficoTemperatura = new Chart(canvasTemp, {
    type: "line",
    data: {
      labels: horas,
      datasets: [
        {
          label: "Sensor A",
          data: temperaturaSensor1,
          borderColor: corSensorA,
          backgroundColor: corSensorA,
        },
        {
          label: "Sensor B",
          data: temperaturaSensor2,
          borderColor: corSensorB,
          backgroundColor: corSensorB,
        },
        {
          label: "Sensor C",
          data: temperaturaSensor3,
          borderColor: corSensorC,
          backgroundColor: corSensorC,
        },

        {
          label: "Faixa Ideal",
          data: tempMaxIdeal,
          borderColor: "#45ea8a59",
          backgroundColor: "#45ea8a59",
        },
        {
          label: "tempMinIdeal",
          data: tempMinIdeal,
          borderColor: "#45ea8a59",
          backgroundColor: "#45ea8a59",
          fill: "-1",
        },

        {
          label: "Faixa Alerta",
          data: tempMinAlerta,
          borderColor: "#eab20859",
          backgroundColor: "#eab20859",
        },
        {
          label: "tempMinAlerta",
          data: tempMaxAlerta,
          borderColor: "#eab20859",
          backgroundColor: "#eab20859",
          fill: "-1",
        },

        {
          label: "Faixa Alerta",
          data: tempMinAlerta2,
          borderColor: "#eab20859",
          backgroundColor: "#eab20859",
        },
        {
          label: "tempMinAlerta",
          data: tempMaxAlerta2,
          borderColor: "#eab20859",
          backgroundColor: "#eab20859",
          fill: "-1",
        },

        {
          label: "Faixa Critica",
          data: tempMinCritico,
          borderColor: "#ef444454",
          backgroundColor: "#ef444454",
        },
        {
          label: "tempMinCritica",
          data: tempMaxCritico,
          borderColor: "#ef444454",
          backgroundColor: "#ef444454",
          fill: "-1",
        },

        {
          label: "Faixa Critica",
          data: tempMinCritico2,
          borderColor: "#ef444454",
          backgroundColor: "#ef444454",
        },
        {
          label: "tempMinCritica",
          data: tempMaxCritico2,
          borderColor: "#ef444454",
          backgroundColor: "#ef444454",
          fill: "-1",
        },
      ],
    },
    options: {
      tension: 0.25,
      maintainAspectRatio: false,
      scales: {
        y: {
          min: 8,
          max: 32,
        },
        x: {
          ticks: {
            font: {
              size: 16,
            },
          },
        },
      },
      plugins: {
        title: {
          display: true,
          text: "Gráfico de Temperatura",
          font: {
            size: 20,
          },
        },
        legend: {
          labels: {
            filter: function (item) {
              return (
                item.text !== "Faixa Ideal" &&
                item.text !== "tempMinIdeal" &&
                item.text !== "Faixa Alerta" &&
                item.text !== "tempMinAlerta" &&
                item.text !== "Faixa Critica" &&
                item.text !== "tempMinCritica"
              );
            },
            font: {
              size: 18,
            },
          },
        },
      },
    },
  });

  graficoUmidade = new Chart(canvasUmidade, {
    type: "line",
    data: {
      labels: horas,
      datasets: [
        {
          label: "Sensor A",
          data: umidadeSensor1,
          borderColor: corSensorA,
          backgroundColor: corSensorA,
        },
        {
          label: "Sensor B",
          data: umidadeSensor2,
          borderColor: corSensorB,
          backgroundColor: corSensorB,
        },
        {
          label: "Sensor C",
          data: umidadeSensor3,
          borderColor: corSensorC,
          backgroundColor: corSensorC,
        },

        {
          label: "FaixaMinIdeal",
          data: umiMaxIdeal,
          borderColor: "#45ea8a59",
          backgroundColor: "#45ea8a59",
        },
        {
          label: "FaixaMaxIdeal",
          data: umiMinIdeal,
          borderColor: "#45ea8a59",
          backgroundColor: "#45ea8a59",
          fill: "-1",
        },

        {
          label: "FaixaMinAlerta",
          data: umiMinAlerta,
          borderColor: "#eab20859",
          backgroundColor: "#eab20859",
        },
        {
          label: "FaixaMaxAlerta",
          data: umiMaxAlerta,
          borderColor: "#eab20859",
          backgroundColor: "#eab20859",
          fill: "-1",
        },

        {
          label: "FaixaMinAlerta",
          data: umiMinAlerta2,
          borderColor: "#eab20859",
          backgroundColor: "#eab20859",
        },
        {
          label: "FaixaMaxAlerta",
          data: umiMaxAlerta2,
          borderColor: "#eab20859",
          backgroundColor: "#eab20859",
          fill: "-1",
        },

        {
          label: "FaixaMinCritica",
          data: umiMinCritico,
          borderColor: "#ef444454",
          backgroundColor: "#ef444454",
        },
        {
          label: "FaixaMaxCritica",
          data: umiMaxCritico,
          borderColor: "#ef444454",
          backgroundColor: "#ef444454",
          fill: "-1",
        },

        {
          label: "FaixaMinCritica",
          data: umiMinCritico2,
          borderColor: "#ef444454",
          backgroundColor: "#ef444454",
        },
        {
          label: "FaixaMaxCritica",
          data: umiMaxCritico2,
          borderColor: "#ef444454",
          backgroundColor: "#ef444454",
          fill: "-1",
        },
      ],
    },
    options: {
      tension: 0.25,
      maintainAspectRatio: false,
      scales: {
        y: {
          min: 5,
          max: 100,
        },
      },
      plugins: {
        title: {
          display: true,
          text: "Gráfico de Umidade",
          font: {
            size: 20,
          },
        },
        legend: {
          labels: {
            filter: function (item) {
              return (
                item.text !== "FaixaMaxIdeal" &&
                item.text !== "FaixaMinIdeal" &&
                item.text !== "FaixaMaxAlerta" &&
                item.text !== "FaixaMinAlerta" &&
                item.text !== "FaixaMaxCritica" &&
                item.text !== "FaixaMinCritica"
              );
            },
            font: {
              size: 18,
            },
          },
        },
      },
    },
  });
}
