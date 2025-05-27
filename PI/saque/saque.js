import { dadosUsuarios, carregarDadosUsuarios } from '../dadosUsuarios.js';

function getParametro(nome) {
  const url = new URL(window.location.href);
  return url.searchParams.get(nome);
}

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

  function redirecionarConfirmacao(valor) {
    window.location.href = `../confirmacao/confirmacao.html?usuario=${encodeURIComponent(usuario)}&valor=${valor}`;
  }

  function redirecionarOutroValor() {
    window.location.href = `../outrovalor/outrovalor.html?usuario=${encodeURIComponent(usuario)}`;
  }

  document.getElementById("saque20").addEventListener("click", () => redirecionarConfirmacao(20));
  document.getElementById("saque50").addEventListener("click", () => redirecionarConfirmacao(50));
  document.getElementById("saque100").addEventListener("click", () => redirecionarConfirmacao(100));
  document.getElementById("saque200").addEventListener("click", () => redirecionarConfirmacao(200));
  document.getElementById("outrovalor").addEventListener("click", redirecionarOutroValor);

  document.getElementById("voltar").onclick = function() {
    window.location.href = `../conta/conta_paginainicial.html?usuario=${encodeURIComponent(usuario)}`;
  };
});