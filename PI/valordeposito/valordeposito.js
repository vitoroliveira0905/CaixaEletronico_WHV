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
    window.location.href = `../depositar/depositar.html?usuario=${encodeURIComponent(usuario)}`;
  };

  // Funções para seleção e digitação
  window.digitar = function(caracter) {
    const input = document.getElementById('escolhavalor');
    if (input && input.value.length < 4) {
      input.value += caracter;
    }
  };
  window.limparCampo = function() {
    const input = document.getElementById('escolhavalor');
    if (input) input.value = '';
  };
  
  window.redirecionarConfirmacao = function() {
    let valor = document.getElementById("escolhavalor").value;
    if (valor == "" ) {
      alert("Insira um valor");
      return false;
    }
  
    window.location.href = `../confirmacao/confirmacaodeposito.html?usuario=${encodeURIComponent(usuario)}&valor=${valor}`;
  };

  document.getElementById("confirmar").addEventListener("click", () => window.redirecionarConfirmacao());

  
});