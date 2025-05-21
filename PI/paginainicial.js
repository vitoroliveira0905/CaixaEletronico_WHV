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

function redirecionarComDelay() {
    const img = document.getElementById("tux da silva");
    img.style.pointerEvents = "none"; // impede múltiplos cliques
    img.style.opacity = "0.5"; // visualmente desativa

    setTimeout(() => {
      window.location.href = "conta_paginainicial.html"; // substitua pela URL desejada
    }, 3000);
  }