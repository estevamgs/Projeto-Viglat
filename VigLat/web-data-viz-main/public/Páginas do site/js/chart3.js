var camara3Carregada = false;

function carregarGraficosCamara3() {
  if (camara3Carregada) {
    return;
  }
  camara3Carregada = true;

  var graficoTemp = document.getElementById("grafico-temp-3");
  var graficoUmidade = document.getElementById("grafico-umidade-3");

  fetch("/dash/graficos/3")
    .then(function (resposta) {
      return resposta.json();
    })
    .then(function (dados) {
      montarGraficosCamara3(dados, graficoTemp, graficoUmidade);
    });
}

function montarGraficosCamara3(dados, graficoTemp, graficoUmidade) {
  var sensor1 = [];
  var sensor2 = [];
  var sensor3 = [];
  var idSensor1 = 0;
  var idSensor2 = 0;
  var idSensor3 = 0;

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

  var tempMinAlerta = {
    temperatura: horas.map(function () {
      return 22.1;
    }),
    umidade: horas.map(function () {
      return 90.1;
    }),
  };
  var tempMaxAlerta = {
    temperatura: horas.map(function () {
      return 26;
    }),
    umidade: horas.map(function () {
      return 95;
    }),
  };
  var tempMinAlerta2 = {
    temperatura: horas.map(function () {
      return 17.9;
    }),
    umidade: horas.map(function () {
      return 79.9;
    }),
  };
  var tempMaxAlerta2 = {
    temperatura: horas.map(function () {
      return 15;
    }),
    umidade: horas.map(function () {
      return 70;
    }),
  };
  var tempMaxIdeal = {
    temperatura: horas.map(function () {
      return 22;
    }),
    umidade: horas.map(function () {
      return 90;
    }),
  };
  var tempMinIdeal = {
    temperatura: horas.map(function () {
      return 18;
    }),
    umidade: horas.map(function () {
      return 80;
    }),
  };
  var tempMinCritico = {
    temperatura: horas.map(function () {
      return 26.1;
    }),
    umidade: horas.map(function () {
      return 95.1;
    }),
  };
  var tempMaxCritico = {
    temperatura: horas.map(function () {
      return 32;
    }),
    umidade: horas.map(function () {
      return 100;
    }),
  };
  var tempMinCritico2 = {
    temperatura: horas.map(function () {
      return 14.9;
    }),
    umidade: horas.map(function () {
      return 69.9;
    }),
  };
  var tempMaxCritico2 = {
    temperatura: horas.map(function () {
      return 0;
    }),
    umidade: horas.map(function () {
      return 0;
    }),
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
  borderColor: "#4b48ec",
  backgroundColor: "#4b48ec",
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
  label: "Faixa Critica",
  data: tempMinCritico.temperatura,
  borderColor: "#ef444454",
  backgroundColor: "#ef444454",
},
        {
  label: "tempMinCritica",
  data: tempMaxCritico.temperatura,
  borderColor: "#ef444454",
  backgroundColor: "#ef444454",
  fill: "-1",
},
        {
  label: "Faixa Critica",
  data: tempMinCritico2.temperatura,
  borderColor: "#ef444454",
  backgroundColor: "#ef444454",
},
        {
  label: "tempMinCritica",
  data: tempMaxCritico2.temperatura,
  borderColor: "#ef444454",
  backgroundColor: "#ef444454",
  fill: "-1",
},
      ],
    },
    options: { tension: 0.25, maintainAspectRatio: false, scales: { y: { min: 8, max: 32 }, x: { ticks: { font: { size: 16 } } } }, plugins: { title: { display: true, text: "Grafico de Temperatura", font: { size: 20 } }, legend: { labels: { filter: function (item) { return item.text !== "Faixa Ideal" && item.text !== "tempMinIdeal" && item.text !== "Faixa Alerta" && item.text !== "tempMinAlerta" && item.text !== "Faixa Critica" && item.text !== "tempMinCritica"; }, font: { size: 18 } } } } }
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
  label: "FaixaMinCritica",
  data: tempMinCritico.umidade,
  borderColor: "#ef444454",
  backgroundColor: "#ef444454",
},
        {
  label: "FaixaMaxCritica",
  data: tempMaxCritico.umidade,
  borderColor: "#ef444454",
  backgroundColor: "#ef444454",
  fill: "-1",
},
        {
  label: "FaixaMinCritica",
  data: tempMinCritico2.umidade,
  borderColor: "#ef444454",
  backgroundColor: "#ef444454",
},
        {
  label: "FaixaMaxCritica",
  data: tempMaxCritico2.umidade,
  borderColor: "#ef444454",
  backgroundColor: "#ef444454",
  fill: "-1",
},
      ],
    },
    options: { tension: 0.25, maintainAspectRatio: false, scales: { y: { min: 50, max: 100, grid: { display: true, color: "rgba(255,99,132,0.2)" } }, x: { grid: { display: false }, ticks: { font: { size: 16 } } } }, plugins: { title: { display: true, text: "Grafico de Umidade", font: { size: 20 } }, legend: { labels: { filter: function (item) { return item.text !== "FaixaMaxIdeal" && item.text !== "FaixaMinIdeal" && item.text !== "FaixaMaxAlerta" && item.text !== "FaixaMinAlerta" && item.text !== "FaixaMaxCritica" && item.text !== "FaixaMinCritica"; }, font: { size: 18 } } } } }
  });
}


