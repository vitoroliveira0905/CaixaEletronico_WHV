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
  return;
  }

  let imagem = document.getElementById("foto");
  if (imagem) {
    imagem.src = dados.imagem;
    imagem.alt = dados.nome;
    imagem.style.display = "block";
  }

  function redirecionarConfirmacao(valor) {
    if(valor > dados.saldo){
        alerta.textContent = "Valor de saque maior que o saldo disponível.";
        alerta.style.display = "block";
        setTimeout(() => {
          alerta.style.display = "none";
      }, 3000);
      return;
    }
    window.location.href = `saque-confirmacao.html?usuario=${encodeURIComponent(usuario)}&valor=${valor}`;
  }

  function redirecionarOutroValor() {
    window.location.href = `saque-valor.html?usuario=${encodeURIComponent(usuario)}`;
  }

  document.getElementById("saque20").addEventListener("click", () => redirecionarConfirmacao(20));
  document.getElementById("saque50").addEventListener("click", () => redirecionarConfirmacao(50));
  document.getElementById("saque100").addEventListener("click", () => redirecionarConfirmacao(100));
  document.getElementById("saque200").addEventListener("click", () => redirecionarConfirmacao(200));
  document.getElementById("outrovalor").addEventListener("click", redirecionarOutroValor);

  document.getElementById("btn-voltar").onclick = function() {
    window.location.href = `../conta/conta.html?usuario=${encodeURIComponent(usuario)}`;
  };
  document.getElementById("btn2-voltar").onclick = function() {
    window.location.href = `../conta/conta.html?usuario=${encodeURIComponent(usuario)}`;
  };
});