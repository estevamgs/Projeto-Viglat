function showView(viewId) {
  let telas = document.querySelectorAll('.tela-monitoramento');
  for (var i = 0; i < telas.length; i++) {
    telas[i].style.display = 'none';
  }
  document.getElementById(viewId).style.display = 'block';
}

function abrirDetalhes(elemento) {
  let nome = elemento.dataset.nome;
  let temp = elemento.dataset.temp;
  let umi = elemento.dataset.umi;
  let alertas = elemento.dataset.alertas;

  document.getElementById('titulo-camara').innerText = nome;
  document.getElementById('kpi-temp').innerText = temp + "°C";
  document.getElementById('kpi-umi').innerText = umi + "%";
  document.getElementById('kpi-alertas').innerText = alertas;

  showView('view-camara');
  renderizarGraficosDetalhes();
}

function renderizarGraficosDetalhes() {
}

function trocarFazenda(id, botao) {
  if (id == '2') {
    aplicarFazenda2();
  } else {
    aplicarFazenda1();
  }

  
  botao.classList.add('ativa');
  document.getElementById('titulo-fazenda').innerText = "Visão Geral: Fazenda " + id;
  showView('view-fazenda');
}

function aplicarFazenda2() {
  const cards = document.querySelectorAll(".card-dispositivo");

  cards[0].className = "card-dispositivo status-ideal";
  cards[1].className = "card-dispositivo status-ideal";
  cards[2].className = "card-dispositivo status-ideal";
  cards[3].className = "card-dispositivo status-ideal";
  
  cards[0].querySelector("p").innerText = "Ideal";
  cards[1].querySelector("p").innerText = "Ideal";
  cards[2].querySelector("p").innerText = "Ideal";
  cards[3].querySelector("p").innerText = "Ideal";


}

function aplicarFazenda1() {
  const cards = document.querySelectorAll(".card-dispositivo");


  cards[0].className = "card-dispositivo status-ideal";
  cards[1].className = "card-dispositivo status-alerta";
  cards[2].className = "card-dispositivo status-ideal";
  cards[3].className = "card-dispositivo status-critico";


  cards[0].querySelector("p").innerText = "Ideal";
  cards[1].querySelector("p").innerText = "Alerta";
  cards[2].querySelector("p").innerText = "Ideal";
  cards[3].querySelector("p").innerText = "CRÍTICO!";
}