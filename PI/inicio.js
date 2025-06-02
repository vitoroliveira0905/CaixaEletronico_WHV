function iniciarTransicao(event) {
  const botao = event.currentTarget;
  const rect = botao.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const efeito = document.createElement('div');
  efeito.className = 'efeito-circulo';
  efeito.style.left = `${centerX}px`;
  efeito.style.top = `${centerY}px`;

  document.body.appendChild(efeito);

  setTimeout(() => {
    window.location.href = "pagina_inicial/paginainicial.html";
  }, 1500);
}

// Adiciona o evento a todos os botões invisíveis
document.querySelectorAll(".btn-invisivel").forEach(botao => {
  botao.addEventListener("click", iniciarTransicao);
});

document.querySelectorAll(".btn-invisivel2").forEach(botao => {
  botao.addEventListener("click", iniciarTransicao);
});

document.querySelectorAll(".btn-invisivel3").forEach(botao => {
  botao.addEventListener("click", iniciarTransicao);
});