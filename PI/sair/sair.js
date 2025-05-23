let indiceCartao = 0;
const cartoes = document.querySelectorAll(".cartao");

function mostrarCartao(indice) {
  cartoes.forEach(c => {
    c.classList.remove("ativo", "inserido", "bloqueado", "retirado");
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
  cartaoAtual.classList.add("bloqueado");  // Impede mais interações
  cartaoAtual.classList.add("retirado");   // Animação de retirada

  // 🔒 Desativa botões de navegação se existirem
  // const botoesCarrossel = document.querySelectorAll(".botao-cartao-navegar");
  // botoesCarrossel.forEach(botao => botao.disabled = true);

  setTimeout(() => {
    // Redireciona para a página da senha com o nome do usuário
    window.location.href = `../pagina_inicial/paginainicial.html?usuario=${encodeURIComponent(usuario)}`;
  }, 1000);
}

// Exemplo de execução automática ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  const usuario = "usuarioExemplo"; // Substitua pelo valor real
  redirecionarComDelay(usuario);
});