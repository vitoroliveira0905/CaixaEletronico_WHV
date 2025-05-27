import { dadosUsuarios, carregarDadosUsuarios } from '../dadosUsuarios.js';

function getParametro(nome) {
  const url = new URL(window.location.href);
  return url.searchParams.get(nome);
}

document.addEventListener("DOMContentLoaded", async () => {
  const usuario = getParametro("usuario");
  const valor = getParametro("valor");
  await carregarDadosUsuarios();
  const dados = dadosUsuarios[usuario];

  if (!dados) {
    alert("Usuário não encontrado.");
    return;
  }

  let imagem = document.getElementById("foto");
  if (imagem) {
    imagem.src = dados.imagem;
    imagem.alt = dados.nome;
    imagem.style.display = "block";
  }

  const valorFormatado = parseFloat(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
  document.getElementById("valorSaque").textContent = valorFormatado;

  // Botão confirmar
  document.getElementById("confirmar").addEventListener("click", () => {
    alert(`Saque de ${valorFormatado} confirmado!`);
    // window.location.href = `sucesso.html?usuario=${usuario}&valor=${valor}`;
  });

  // Botão confirmar2
  document.getElementById("confirm").addEventListener("click", () => {
    alert(`Saque de ${valorFormatado} confirmado!`);
  });

  document.getElementById("cancel").onclick = function() {
    window.location.href = `../saque/saque.html?usuario=${encodeURIComponent(usuario)}`;
  };

  document.getElementById("cancela").onclick = function() {
    window.location.href = `../saque/saque.html?usuario=${encodeURIComponent(usuario)}`;
  };
});