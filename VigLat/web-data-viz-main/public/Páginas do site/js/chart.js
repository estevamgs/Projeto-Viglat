const alertas = document.getElementById("chart");
const alertaSemana = document.getElementById("grafico-alerta");
const graficoTemp = document.getElementById("grafico-temp");
const graficoUmidade = document.getElementById("grafico-umidade");

new Chart(alertas, {
  type: "bar",
  data: {
    labels: ["CÂMARA 01", "CÂMARA 02", "CÂMARA 03", "CÂMARA 04"],
    datasets: [
      {
        label: "Alertas",
        data: [0, 1, 0, 12],
        borderColor: "#7a5208",
        backgroundColor: "#7a5208",
      },
    ],
  },
  options: {
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Quantidade de Alertas (últimas 24 horas)",
        font: {
          size: 24,
        },
      },
    },
    scales: {
      y: {
        stacked: true,
        grid: {
          display: true,
          color: "rgba(255,99,132,0.2)",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  },
});

new Chart(alertaSemana, {
  type: "bar",
  data: {
    labels: [
      "Segunda-Feira",
      "Terça-Feira",
      "Quarta-Feira",
      "Quinta-Feira",
      "Sexta-Feira",
      "Sabado",
      "Domingo",
    ],
    datasets: [
      {
        label: "Total de Alertas Semanais",
        data: [1, 1, 0, 3, 4, 1, 1],
        borderColor: "#7a5208",
        backgroundColor: "#7a5208",
      },
    ],
  },
  options: {
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Quantidade de Alertas (últimos 7 dias)",
        font: {
          size: 24,
        },
      },
    },
    scales: {
      y: {
        stacked: true,
        grid: {
          display: true,
          color: "rgba(255,99,132,0.2)",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  },
});

fetch("/dash/graficos/1")
  .then(function (resposta) {
    return resposta.json();
  })
  .then(function (dados) {
    console.log("Dados do banco:", dados);

    var sensor1 = dados.filter(function (item) {
      return item.idSensor == 1;
    });

    var sensor2 = dados.filter(function (item) {
      return item.idSensor == 2;
    });

    var sensor3 = dados.filter(function (item) {
  return item.idSensor == 6;
});

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

    var tempMinAlerta = {
      temperatura: horas.map(function () { return 22.1; }),
      umidade: horas.map(function () { return 90.1; }),
    };

    var tempMaxAlerta = {
      temperatura: horas.map(function () { return 26; }),
      umidade: horas.map(function () { return 95; }),
    };

    var tempMinAlerta2 = {
      temperatura: horas.map(function () { return 17.9; }),
      umidade: horas.map(function () { return 79.9; }),
    };

    var tempMaxAlerta2 = {
      temperatura: horas.map(function () { return 15; }),
      umidade: horas.map(function () { return 70; }),
    };

    var tempMaxIdeal = {
      temperatura: horas.map(function () { return 22; }),
      umidade: horas.map(function () { return 90; }),
    };

    var tempMinIdeal = {
      temperatura: horas.map(function () { return 18; }),
      umidade: horas.map(function () { return 80; }),
    };

    var tempMinCritico = {
      temperatura: horas.map(function () { return 26.1; }),
      umidade: horas.map(function () { return 95.1; }),
    };

    var tempMaxCritico = {
      temperatura: horas.map(function () { return 32; }),
      umidade: horas.map(function () { return 100; }),
    };

    var tempMinCritico2 = {
      temperatura: horas.map(function () { return 14.9; }),
      umidade: horas.map(function () { return 69.9; }),
    };

    var tempMaxCritico2 = {
      temperatura: horas.map(function () { return 0; }),
      umidade: horas.map(function () { return 0; }),
    };

    new Chart(graficoTemp, {
      type: "line",
      data: {
        labels: horas,
        datasets: [
          {
            label: "Sensor A",
            data: temperaturaSensor1,
            borderColor: "purple",
            backgroundColor: "purple",
          },
          {
            label: "Sensor B",
            data: temperaturaSensor2,
            borderColor: "#ec4899",
            backgroundColor: "#ec4899",
          },
          {
  label: "Sensor C",
  data: temperaturaSensor3,
  borderColor: "gray",
  backgroundColor: "gray",
},
          {
            label: "Faixa Ideal",
            data: tempMaxIdeal.temperatura,
            borderColor: "#45ea8a59",
            backgroundColor: "#45ea8a59",
          },
          {
            label: "tempMinIdeal",
            data: tempMinIdeal.temperatura,
            borderColor: "#45ea8a59",
            backgroundColor: "#45ea8a59",
            fill: "-1",
          },
          {
            label: "Faixa Alerta",
            data: tempMinAlerta.temperatura,
            borderColor: "#eab20859",
            backgroundColor: "#eab20859",
          },
          {
            label: "tempMinAlerta",
            data: tempMaxAlerta.temperatura,
            borderColor: "#eab20859",
            backgroundColor: "#eab20859",
            fill: "-1",
          },
          {
            label: "Faixa Alerta",
            data: tempMinAlerta2.temperatura,
            borderColor: "#eab20859",
            backgroundColor: "#eab20859",
          },
          {
            label: "tempMinAlerta",
            data: tempMaxAlerta2.temperatura,
            borderColor: "#eab20859",
            backgroundColor: "#eab20859",
            fill: "-1",
          },
          {
            label: "Faixa Crítica",
            data: tempMinCritico.temperatura,
            borderColor: "#ef444454",
            backgroundColor: "#ef444454",
          },
          {
            label: "tempMinCrítica",
            data: tempMaxCritico.temperatura,
            borderColor: "#ef444454",
            backgroundColor: "#ef444454",
            fill: "-1",
          },
          {
            label: "Faixa Crítica",
            data: tempMinCritico2.temperatura,
            borderColor: "#ef444454",
            backgroundColor: "#ef444454",
          },
          {
            label: "tempMinCrítica",
            data: tempMaxCritico2.temperatura,
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
        },
        plugins: {
          title: {
            display: true,
            text: "Gráfico de Temperatura",
          },
          legend: {
            labels: {
              filter: function (item) {
                return (
                  item.text !== "Faixa Ideal" &&
                  item.text !== "tempMinIdeal" &&
                  item.text !== "Faixa Alerta" &&
                  item.text !== "tempMinAlerta" &&
                  item.text !== "Faixa Crítica" &&
                  item.text !== "tempMinCrítica"
                );
              },
            },
          },
        },
      },
    });

    new Chart(graficoUmidade, {
      type: "line",
      data: {
        labels: horas,
        datasets: [
          {
            label: "Sensor A",
            data: umidadeSensor1,
            borderColor: "purple",
            backgroundColor: "purple",
          },
          {
            label: "Sensor B",
            data: umidadeSensor2,
            borderColor: "#ec4899",
            backgroundColor: "#ec4899",
          },
          {
  label: "Sensor C",
  data: umidadeSensor3,
  borderColor: "gray",
  backgroundColor: "gray",
},
          {
            label: "FaixaMinIdeal",
            data: tempMaxIdeal.umidade,
            borderColor: "#45ea8a59",
            backgroundColor: "#45ea8a59",
          },
          {
            label: "FaixaMaxIdeal",
            data: tempMinIdeal.umidade,
            borderColor: "#45ea8a59",
            backgroundColor: "#45ea8a59",
            fill: "-1",
          },
          {
            label: "FaixaMinAlerta",
            data: tempMinAlerta.umidade,
            borderColor: "#eab20859",
            backgroundColor: "#eab20859",
          },
          {
            label: "FaixaMaxAlerta",
            data: tempMaxAlerta.umidade,
            borderColor: "#eab20859",
            backgroundColor: "#eab20859",
            fill: "-1",
          },
          {
            label: "FaixaMinAlerta",
            data: tempMinAlerta2.umidade,
            borderColor: "#eab20859",
            backgroundColor: "#eab20859",
          },
          {
            label: "FaixaMaxAlerta",
            data: tempMaxAlerta2.umidade,
            borderColor: "#eab20859",
            backgroundColor: "#eab20859",
            fill: "-1",
          },
          {
            label: "FaixaMinCrítica",
            data: tempMinCritico.umidade,
            borderColor: "#ef444454",
            backgroundColor: "#ef444454",
          },
          {
            label: "FaixaMaxCrítica",
            data: tempMaxCritico.umidade,
            borderColor: "#ef444454",
            backgroundColor: "#ef444454",
            fill: "-1",
          },
          {
            label: "FaixaMinCrítica",
            data: tempMinCritico2.umidade,
            borderColor: "#ef444454",
            backgroundColor: "#ef444454",
          },
          {
            label: "FaixaMaxCrítica",
            data: tempMaxCritico2.umidade,
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
            min: 50,
            max: 100,
            grid: {
              display: true,
              color: "rgba(255,99,132,0.2)",
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
        plugins: {
          title: {
            display: true,
            text: "Gráfico de Umidade",
          },
          legend: {
            labels: {
              filter: function (item) {
                return (
                  item.text !== "FaixaMaxIdeal" &&
                  item.text !== "FaixaMinIdeal" &&
                  item.text !== "FaixaMaxAlerta" &&
                  item.text !== "FaixaMinAlerta" &&
                  item.text !== "FaixaMaxCrítica" &&
                  item.text !== "FaixaMinCrítica"
                );
              },
            },
          },
        },
      },
    });
  });