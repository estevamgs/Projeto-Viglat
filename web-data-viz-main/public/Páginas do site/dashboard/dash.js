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
    let abas = document.querySelectorAll('.aba-unidade');
    for (let i = 0; i < abas.length; i++) {
        abas[i].classList.remove('ativa');
    }
    botao.classList.add('ativa');
    document.getElementById('titulo-fazenda').innerText = "Visão Geral: Fazenda " + id;
    showView('view-fazenda');
}