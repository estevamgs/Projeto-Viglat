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
  const resposta = await fetch(`/dash/graficos/${idCamara}`);
  const dados = await resposta.json();

  // pega último registro de cada sensor
  const ultimoPorSensor = {};

  for (let i = 0; i < dados.length; i++) {
    const r = dados[i];
    ultimoPorSensor[r.idSensor] = r; // sobrescreve, então fica o último
  }

  const sensores = Object.values(ultimoPorSensor);

  const container = document.querySelector(".grid-sensores-kpi");
  container.innerHTML = "";

  sensores.forEach((s, index) => {
    const status =
      s.temperatura > 26 ||
      s.temperatura < 15 ||
      s.umidade > 95 ||
      s.umidade < 70
        ? "status-critico"
        : s.temperatura > 22 ||
            s.temperatura < 18 ||
            s.umidade > 90 ||
            s.umidade < 80
          ? "status-alerta"
          : "status-ideal";

    container.innerHTML += `
      <div class="sensor-box">
        <div class="sensor-topo">
          <span class="sensor-nome">Sensor ${String.fromCharCode(65 + index)}</span>
          <span class="bolinha-status ${status}"></span>
        </div>
        <p>T: ${s.temperatura}°C</p>
        <p>U: ${s.umidade}%</p>
      </div>
    `;
  });
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