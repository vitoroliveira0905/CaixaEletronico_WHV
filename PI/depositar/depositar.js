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

  document.getElementById("btn-voltar").onclick = function () {
    window.location.href = `../conta/conta_paginainicial.html?usuario=${encodeURIComponent(usuario)}`;
  };
  document.getElementById("btn2-voltar").onclick = function () {
    window.location.href = `../conta/conta_paginainicial.html?usuario=${encodeURIComponent(usuario)}`;
  };

  // Funções para seleção e digitação
  window.digitar = function (caracter) {
    const input = document.getElementById("escolhaconta");
    if (input && input.value.length < 4) {
      input.value += caracter;
    }
  };
  window.limparCampo = function () {
    const input = document.getElementById("escolhaconta");
    if (input) input.value = '';
  };


  window.redirecionarConfirmacao = function () {
    let conta = document.getElementById("escolhaconta").value;
    if (conta == "") {
      alert("Insira uma conta");
      return false;
    }
    window.location.href = `../valordeposito/valordeposito.html?usuario=${encodeURIComponent(usuario)}&destino=${encodeURIComponent(conta)}`;
  };

  document.getElementById("btn-confirmar").addEventListener("click", () => window.redirecionarConfirmacao());
  document.getElementById("btn2-confirmar").addEventListener("click", () => window.redirecionarConfirmacao());



});