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
});

// Torna a função global para funcionar com onclick no HTML
window.redirecionarComDelay = function() {
  const cartao = document.querySelector(".cartao");
  cartao.classList.add("retirando"); // Faz o cartão descer

  setTimeout(() => {
    window.location.href = "../pagina_inicial/paginainicial.html";
  }, 2000);

 
};