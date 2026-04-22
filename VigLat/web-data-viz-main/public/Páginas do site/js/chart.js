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
        data: [0, 1, 0, 4],
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
        text: "Quantidade de Alertas",
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

const dadosSensorA = {
  horas: [
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
  ],
  temperatura: [22, 21, 20, 22, 22, 21, 20, 22],
  umidade: [80, 82, 80, 85, 80, 82, 80, 85],
};

const dadosSensorB = {
  horas: dadosSensorA.horas,
  temperatura: [20, 20, 26, 22, 15, 27, 26, 32],
  umidade: [60, 67, 72, 65, 60, 67, 72, 85],
};

const dadosSensorC = {
  horas: dadosSensorA.horas,
  temperatura: [18, 22, 20, 21, 18, 22, 20, 21],
  umidade: [90, 87, 90, 80, 80, 87, 90, 80],
};
const tempMaxIdeal = {
  horas: dadosSensorA.horas,
  temperatura: [22, 22, 22, 22, 22, 22, 22, 22],
  umidade: [95, 95, 95, 95, 95, 95, 95, 95],
};
const tempMinIdeal = {
  horas: dadosSensorA.horas,
  temperatura: [18, 18, 18, 18, 18, 18, 18, 18],
  umidade: [80, 80, 80, 80, 80, 80, 80, 80],
};

new Chart(graficoTemp, {
  type: "line",
  data: {
    labels: dadosSensorA.horas,
    datasets: [
      {
        label: "Sensor A",
        data: dadosSensorA.temperatura,
        borderColor: "purple",
        backgroundColor: "purple",
      },
      {
        label: "Sensor B",
        data: dadosSensorB.temperatura,
        borderColor: "orange",
        backgroundColor: "orange",
      },
      {
        label: "Sensor C",
        data: dadosSensorC.temperatura,
        borderColor: "gray",
        backgroundColor: "gray",
      },
      {
        label: "Faixa Ideal",
        data: tempMaxIdeal.temperatura,
        borderColor: "#459aea4a",
        backgroundColor: "#459aea4a",
      },
      {
        label: "tempMinIdeal",
        data: tempMinIdeal.temperatura,
        borderColor: "#459aea4a",
        backgroundColor: "#459aea4a",
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
          filter: function (item, chart) {
            return item.text !== "Faixa Ideal" && item.text !== "tempMinIdeal";
          },
        },
      },
    },
  },
});

new Chart(graficoUmidade, {
  type: "line",
  data: {
    labels: dadosSensorA.horas,
    datasets: [
      {
        label: "Sensor A",
        data: dadosSensorA.umidade,
        borderColor: "purple",
        backgroundColor: "purple",
      },
      {
        label: "Sensor B",
        data: dadosSensorB.umidade,
        borderColor: "orange",
        backgroundColor: "orange",
      },
      {
        label: "Sensor C",
        data: dadosSensorC.umidade,
        borderColor: "gray",
        backgroundColor: "gray",
      },
      {
        label: "FaixaMinIdeal",
        data: tempMaxIdeal.umidade,
        borderColor: "#459aea4a",
        backgroundColor: "#459aea4a",
      },
      {
        label: "FaixaMaxIdeal",
        data: tempMinIdeal.umidade,
        borderColor: "#459aea4a",
        backgroundColor: "#459aea4a",
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
          filter: function (item, chart) {
            return (
              item.text !== "FaixaMaxIdeal" && item.text !== "FaixaMinIdeal"
            );
          },
        },
      },
    },
  },
});
