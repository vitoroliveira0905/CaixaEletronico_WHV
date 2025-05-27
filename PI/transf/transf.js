import { dadosUsuarios, carregarDadosUsuarios } from '../dadosUsuarios.js';

function getParametro(nome) {
  const url = new URL(window.location.href);
  return url.searchParams.get(nome);
}

let campoSelecionado = null;

document.addEventListener("DOMContentLoaded", async () => {
  const usuario = getParametro("usuario");
  await carregarDadosUsuarios();
  const dados = dadosUsuarios[usuario];

  if (!dados) {
    alert("Usuário não encontrado.");
    return;
  }

  let imagem = document.getElementById("foto");
  if (imagem) {
    imagem.src = dados.imagem;
    imagem.alt = dados.nome;
    imagem.style.display = "block";
  }

  document.getElementById("voltar").onclick = function() {
    window.location.href = `../conta/conta_paginainicial.html?usuario=${encodeURIComponent(usuario)}`;
  };

  // Funções para seleção e digitação
  window.selecionarCampo = function(idCampo) {
    campoSelecionado = document.getElementById(idCampo);
    document.getElementById("escolhaconta").style.border = "2px solid transparent";
    document.getElementById("escolhavalor").style.border = "2px solid transparent";
    campoSelecionado.style.border = "2px solid yellow";
  };

  window.digitar = function(caracter) {
    if (campoSelecionado && campoSelecionado.value.length < 12) {
      campoSelecionado.value += caracter;
    }
  };

  window.limparCampo = function() {
    if (campoSelecionado) {
      campoSelecionado.value = '';
    }
  };

  window.redirecionarConfirmacao = function() {
    let valor = document.getElementById("escolhavalor").value;
    window.location.href = `../confirmacao/confirmacaotransf.html?usuario=${encodeURIComponent(usuario)}&valor=${valor}`;
  };

  document.getElementById("confirmar").addEventListener("click", () => window.redirecionarConfirmacao());
});