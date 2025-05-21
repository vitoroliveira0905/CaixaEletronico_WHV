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
  setTimeout(showSlides, 3000); // troca a cada 3 segundos
}

let indiceCartao = 0;
const cartoes = document.querySelectorAll(".cartao");

function mostrarCartao(indice) {
  cartoes.forEach(c => {
    c.classList.remove("ativo", "inserido");
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

// Inserir cartão ao clicar
document.querySelector(".cartoes-container").addEventListener("click", () => {
  cartoes[indiceCartao].classList.toggle("inserido");
});

function redirecionarComDelay(usuario) {
  const img = cartoes[indiceCartao].src;
  // img.classList.add("desativado"); // Aplica opacidade se quiser

  setTimeout(() => {
    // Redireciona com o nome na URL
    window.location.href = `conta_paginainicial.html?usuario=${encodeURIComponent(usuario)}&img=${encodeURIComponent(img)}`;
  }, 3000);
}