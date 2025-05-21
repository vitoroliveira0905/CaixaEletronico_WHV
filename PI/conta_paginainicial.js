  // Pega os parâmetros da URL
  const params = new URLSearchParams(window.location.search);
  const nomeUsuario = params.get("usuario");

  // Mapeamento entre nomes e imagens
  const cartoes = {
    "claudia": "cartao1.png",
    "tux": "cartao2.png",
    "willian": "cartao3.png"
  };

  // Define o nome e imagem do cartão, se existir
  if (nomeUsuario && cartoes[nomeUsuario.toLowerCase()]) {
    document.getElementById("nome-cartao").textContent = nomeUsuario.toUpperCase();
    document.getElementById("img-cartao").src = `Imagens/${cartoes[nomeUsuario.toLowerCase()]}`;
  } else {
    document.getElementById("nome-cartao").textContent = "Cartão não encontrado";
  }