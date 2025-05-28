import { dadosUsuarios, carregarDadosUsuarios } from '../dadosUsuarios.js';

const usuario = getParametro("usuario"); // quem está logado
const destino = getParametro("destino"); // para quem vai transferir


function getParametro(nome) {
  const url = new URL(window.location.href);
  return url.searchParams.get(nome);
}

let campoSelecionado = null;

document.addEventListener("DOMContentLoaded", async () => {
  const usuario = getParametro("usuario");
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

  document.getElementById("btn-voltar").onclick = function() {
    window.location.href = `../depositar/depositar.html?usuario=${encodeURIComponent(usuario)}`;
  };

  document.getElementById("btn2-voltar").onclick = function() {
    window.location.href = `../depositar/depositar.html?usuario=${encodeURIComponent(usuario)}`;
  };

  let valorReais = "";

  window.digitar = function(caracter) {
    if (valorReais.length >= 4) return;
  
    valorReais += caracter;
    atualizarCampo();
  };
  
  window.limparCampo = function() {
    valorReais = "";
    atualizarCampo();
  };
  
  function atualizarCampo() {
    const input = document.getElementById('escolhavalor');
  
    let valorNumerico = parseInt(valorReais || "0", 10);
  
    if (valorNumerico > 1000) {
      valorNumerico = 1000;
      valorReais = "1000";
    }
  
    input.value = `R$ ${valorNumerico},00`;
  }
  
  window.redirecionarConfirmacao = function() {
    const valorNumerico = parseInt(valorReais || "0", 10);
  
    if (valorNumerico < 10 || valorNumerico > 1000) {
      alert("Insira um valor entre R$ 10,00 e R$ 1000,00");
      return false;
    }
  
    const valorFinal = `${valorNumerico},00`;
    window.location.href = `../confirmacao/confirmacaodeposito.html?usuario=${encodeURIComponent(usuario)}&valor=${valorFinal}`;
  };

  document.getElementById("btn-confirmar").addEventListener("click", () => window.redirecionarConfirmacao());
  document.getElementById("btn2-confirmar").addEventListener("click", () => window.redirecionarConfirmacao());

  
});