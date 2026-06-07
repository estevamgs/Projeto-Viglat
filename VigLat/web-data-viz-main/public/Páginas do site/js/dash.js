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
