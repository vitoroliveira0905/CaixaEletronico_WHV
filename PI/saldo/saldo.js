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
    alerta.textContent = "Usuário não encontrado.";
    alerta.style.display = "block";
    setTimeout(() => {
      alerta.style.display = "none";
  }, 3000);
    return;
  }

  let imagem = document.getElementById("foto");
  if (imagem) {
    imagem.src = dados.imagem;
    imagem.alt = dados.nome;
    imagem.style.display = "block";
  }

  document.getElementById("saldo").innerText = dados.saldo;

  document.getElementById("btn-voltar").onclick = function() {
    window.location.href = `../conta/conta_paginainicial.html?usuario=${encodeURIComponent(usuario)}`;
  };
  document.getElementById("btn2-voltar").onclick = function() {
    window.location.href = `../conta/conta_paginainicial.html?usuario=${encodeURIComponent(usuario)}`;
  };
});