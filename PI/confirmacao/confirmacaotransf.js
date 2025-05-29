import { dadosUsuarios, carregarDadosUsuarios } from '../dadosUsuarios.js';

function getParametro(nome) {
  const url = new URL(window.location.href);
  return url.searchParams.get(nome);
}

document.addEventListener("DOMContentLoaded", async () => {
  const usuario = getParametro("usuario");
  const valor = getParametro("valor");
  const conta = getParametro("conta");
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

  const valorNumerico = parseFloat(valor.replace("R$", "").replace(".", "").replace(",", ".").trim());

  const valorFormatado = valorNumerico.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
  document.getElementById("escolhavalor").textContent = valorFormatado;

  // Botão confirmar
  document.getElementById("btn-confirmar").addEventListener("click", () => {
    
     window.location.href = `../transf/transferiu.html?usuario=${usuario}&conta=${conta}&valor=${valor}`;
  });
  document.getElementById("btn2-confirmar").addEventListener("click", () => {
    
     window.location.href = `../transf/transferiu.html?usuario=${usuario}&conta=${conta}&valor=${valor}`;
  });

  document.getElementById("cancel").onclick = function() {
    window.location.href = `../transf/transf.html?usuario=${encodeURIComponent(usuario)}`;
  };

  document.getElementById("cancela").onclick = function() {
    window.location.href = `../transf/transf.html?usuario=${encodeURIComponent(usuario)}`;
  };
});