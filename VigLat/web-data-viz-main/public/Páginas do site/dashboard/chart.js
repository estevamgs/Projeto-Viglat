const alertas = document.getElementById("chart");
const graficoTemp = document.getElementById("grafico-temp");
const graficoUmidade = document.getElementById("grafico-umidade");

new Chart(alertas, {
  type: "bar",
  data: {
    labels: [
      "Segunda feira",
      "Terça Feira",
      "Quarta Feira",
      "Quinta Feira",
      "Sexta Feira",
      "Sábado",
      "Domingo",
    ],
    datasets: [
      {
        label: "Alertas",
        data: [1, 3, 1, 0, 5, 3, 2],
        borderColor: "#CD1C18",
        backgroundColor: "#CD1C18",
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
  horas: ["12:02", "12:04", "12:06", "12:08"],
  temperatura: [25, 21, 20, 22],
  umidade: [80, 82, 80, 85],
};

const dadosSensorB = {
  horas: dadosSensorA.horas,
  temperatura: [15, 27, 26, 32],
  umidade: [60, 67, 72, 65],
};

const dadosSensorC = {
  horas: dadosSensorA.horas,
  temperatura: [18, 22, 20, 21],
  umidade: [97, 87, 90, 80],
};
const tempMaxIdeal = {
  horas: dadosSensorA.horas,
  temperatura: [22, 22, 22, 22],
  umidade: [95, 95, 95, 95],
};
const tempMinIdeal = {
  horas: dadosSensorA.horas,
  temperatura: [18, 18, 18, 18],
  umidade: [80, 80, 80, 80],
};

new Chart(graficoTemp, {
  type: "line",
  data: {
    labels: dadosSensorA.horas,
    datasets: [
      {
        label: "Sensor A",
        data: dadosSensorA.temperatura,
        borderColor: "green",
        backgroundColor: "green"
      },
      {
        label: "Sensor B",
        data: dadosSensorB.temperatura,
        borderColor: "orange",
        backgroundColor: "orange"
      },
      {
        label: "Sensor C",
        data: dadosSensorC.temperatura,
        borderColor: "#CD1C18",
        backgroundColor: "#CD1C18"
      },
      {
        label: "Faixa Ideal",
        data: tempMaxIdeal.temperatura,
        borderColor: "#459aea4a",
        backgroundColor: "#459aea4a"
      },
      {
        label: "tempMinIdeal",
        data: tempMinIdeal.temperatura,
        borderColor: "#459aea4a",
        backgroundColor: "#459aea4a",
        fill: '-1'

      },
    ],
  },
  options: {
    tension:0.25,
    maintainAspectRatio: false,
    scales: {
      y:{
        min: 8,
        max: 32
      }
    },
    plugins: {
      legend: {
        labels: {
          filter: function (item, chart) {
            return item.text !== "Faixa Ideal" && item.text !== "tempMinIdeal";
          }
        }
      }
    }

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
        borderColor: "green",
        backgroundColor: "green",
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
        borderColor: "#CD1C18",
        backgroundColor: "#CD1C18",
      },
      {
        label: "FaixaMinIdeal",
        data: tempMaxIdeal.umidade,
       borderColor: "#459aea4a",
        backgroundColor: "#459aea4a",
        fill: '-1'
      },
      {
        label: "FaixaMaxIdeal",
        data: tempMinIdeal.umidade,
       borderColor: "#459aea4a",
        backgroundColor: "#459aea4a",
        fill: '-1'
      },
    ],
  },
  options: {
    tension:0.25,
    maintainAspectRatio: false,
     
    scales: {
      y: {
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
      legend: {
        labels: {
          filter: function (item, chart) {
            return item.text !== "FaixaMaxIdeal" && item.text !== "FaixaMinIdeal";
          }
        }
      }
    }
  },
});
