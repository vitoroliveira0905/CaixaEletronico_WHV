let slideIndex = 0;
showSlides();

function showSlides() {
  const slides = document.getElementsByClassName("slides");
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1 }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 6000); // troca a cada 3 segundos
}

let indiceCartao = 0;
const cartoes = document.querySelectorAll(".cartao");

function mostrarCartao(indice) {
  cartoes.forEach(c => {
    c.classList.remove("ativo", "inserido", "bloqueado");
  });
  cartoes[indice].classList.add("ativo");
}

function proximoCartao() {
  indiceCartao = (indiceCartao + 1) % cartoes.length;
  mostrarCartao(indiceCartao);
}

function anteriorCartao() {
  indiceCartao = (indiceCartao - 1 + cartoes.length) % cartoes.length;
  mostrarCartao(indiceCartao);
}

function redirecionarComDelay(usuario) {
  const cartaoAtual = cartoes[indiceCartao];
  cartaoAtual.classList.add("bloqueado"); // Desabilita clique no cartão
  cartaoAtual.classList.add("inserido");  // Animação de inserção

  // 🔒 Desativa as setas do carrossel
  const botoesCarrossel = document.querySelectorAll(".botao-cartao-navegar");
  botoesCarrossel.forEach(botao => botao.disabled = true);

  setTimeout(() => {
    // Redireciona após 1 segundo
    window.location.href = `../senha/paginasenha.html?usuario=${encodeURIComponent(usuario)}`;
  }, 1000);
}


