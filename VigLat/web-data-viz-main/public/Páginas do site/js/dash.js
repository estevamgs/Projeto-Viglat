function showView(viewId) {
  let telas = document.querySelectorAll(".tela-monitoramento");
  for (var i = 0; i < telas.length; i++) {
    telas[i].style.display = "none";
  }
  document.getElementById(viewId).style.display = "block";
}

function abrirDetalhes(elemento) {
  let nome = elemento.dataset.nome;

  document.getElementById("titulo-camara").innerText = nome;

  showView("view-camara");
}

async function carregarKPISensores(idCamara) {
  var resposta = await fetch(`/dash/graficos/${idCamara}`);
  var dados = await resposta.json();

  var sensor1 = null;
  var sensor2 = null;
  var sensor3 = null;

  var idSensor1 = 0;
  var idSensor2 = 0;
  var idSensor3 = 0;

  for (var i = 0; i < dados.length; i++) {
    var registro = dados[i];

    if (idSensor1 == 0) {
      idSensor1 = registro.idSensor;
      sensor1 = registro;
    } else if (registro.idSensor == idSensor1) {
      sensor1 = registro;
    } else if (idSensor2 == 0) {
      idSensor2 = registro.idSensor;
      sensor2 = registro;
    } else if (registro.idSensor == idSensor2) {
      sensor2 = registro;
    } else if (idSensor3 == 0) {
      idSensor3 = registro.idSensor;
      sensor3 = registro;
    } else if (registro.idSensor == idSensor3) {
      sensor3 = registro;
    }
  }

  var sensores = [sensor1, sensor2, sensor3];

  var container = document.querySelector(".grid-sensores-kpi");
  container.innerHTML = "";

  for (var i = 0; i < sensores.length; i++) {
    var sensorAtual = sensores[i];

    if (sensorAtual != null) {
      var status = "status-ideal";

      if (
        sensorAtual.temperatura > 26 ||
        sensorAtual.temperatura < 15 ||
        sensorAtual.umidade > 95 ||
        sensorAtual.umidade < 70
      ) {
        status = "status-critico";
      } else if (
        sensorAtual.temperatura > 22 ||
        sensorAtual.temperatura < 18 ||
        sensorAtual.umidade > 90 ||
        sensorAtual.umidade < 80
      ) {
        status = "status-alerta";
      }

      container.innerHTML += `
        <div class="sensor-box">
          <div class="sensor-topo">
            <span class="sensor-nome">Sensor ${String.fromCharCode(65 + i)}</span>
            <span class="bolinha-status ${status}"></span>
          </div>
          <p>T: ${sensorAtual.temperatura}°C</p>
          <p>U: ${sensorAtual.umidade}%</p>
        </div>
      `;
    }
  }
}

function carregarAlertasDoBanco(idCamara) {
    fetch(`/dash/alertas/camara/${idCamara}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                var container = document.getElementById("lista-alertas");
                container.innerHTML = "<p class='sem-alertas'>Nenhum alerta registrado para esta câmara.</p>";
                return;
            }

            resposta.json().then(function (alertas) {
                console.log("Alertas recebidos:", alertas);

                var container = document.getElementById("lista-alertas");
                container.innerHTML = "";
                for (var i = 0; i < alertas.length; i++) {
                    var alertaAtual = alertas[i];
                    var dataFormatada = new Date(alertaAtual.dtHora).toLocaleString('pt-BR');
                    container.innerHTML += `
                        <div class="card-alerta-critico">
                            <div class="alerta-header">
                                <strong>⚠️ Alerta: ${alertaAtual.nomeSensor}</strong>
                                <span>${dataFormatada}</span>
                            </div>
                            <p>A <b>${alertaAtual.nomeCamara}</b> registrou valores fora dos limites ideais.</p>
                            <div class="alerta-valores">
                                <span><b>Temperatura:</b> ${alertaAtual.temperatura}°C</span>
                                <span><b>Umidade:</b> ${alertaAtual.umidade}%</span>
                            </div>
                        </div>
                    `;
                }
            });
        } else {
            console.log("Erro na resposta do servidor:", resposta.status);
            alert("Houve um erro ao tentar buscar os alertas do servidor.");
        }
    })
    .catch(function (erro) {
        console.log("Erro de conexão:", erro);
        alert("Erro de conexão com o servidor ao carregar alertas.");
    });
}