import { carregarDadosUsuarios } from '../dadosUsuarios.js';

function getParametro(nome) {
  const url = new URL(window.location.href);
  return url.searchParams.get(nome);
}

document.addEventListener("DOMContentLoaded", async () => {
  const usuario = getParametro("usuario"); // Usuário conectado
  const conta = getParametro("conta"); // Conta de destino
  const valor = getParametro("valor");
  await carregarDadosUsuarios();

  const valorNumerico = parseFloat(valor.replace("R$", "").replace(".", "").replace(",", ".").trim());

  const valorFormatado = valorNumerico.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
  document.getElementById("escolhavalor").textContent = valorFormatado;

  document.getElementById("btn-confirmar").addEventListener("click", () => {
    window.location.href = `../valordeposito/depositou.html?usuario=${usuario}&conta=${conta}&valor=${valor}`;
  });

  document.getElementById("btn2-confirmar").addEventListener("click", () => {
    window.location.href = `../valordeposito/depositou.html?usuario=${usuario}&conta=${conta}&valor=${valor}`;
  });

  document.getElementById("cancel").onclick = function() {
    window.location.href = `../depositar/depositar.html?usuario=${encodeURIComponent(usuario)}`;
  };

  document.getElementById("cancela").onclick = function() {
    window.location.href = `../conta/conta_paginainicial.html?usuario=${encodeURIComponent(usuario)}`;
  };
});