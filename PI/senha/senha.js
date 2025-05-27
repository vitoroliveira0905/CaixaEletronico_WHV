import { dadosUsuarios, carregarDadosUsuarios } from '../dadosUsuarios.js';

let usuario = null;
let dados = null;
let senhaCorreta = null;
let tentativas = 0;
const maxTentativas = 3;

function getParametro(nome) {
  const url = new URL(window.location.href);
  return url.searchParams.get(nome);
}

// Funções globais acessam as variáveis acima
window.digitar = function(caracter) {
  const input = document.getElementById("senhainserida");
  if (input && input.value.length < 4) {
    input.value += caracter;
  }
};

window.limparCampo = function() {
  const input = document.getElementById('senhainserida');
  if (input) input.value = '';
};

window.verificarSenha = function() {
  const inputSenha = document.getElementById("senhainserida");
  const senhaInserida = inputSenha ? inputSenha.value : "";
  const mensagem = document.getElementById("mensagem");

  if (!senhaCorreta) {
    mensagem.textContent = "Erro ao carregar dados do usuário.";
    mensagem.style.display = "block";
    return;
  }

  if (senhaInserida === senhaCorreta) {
    window.location.href = `../conta/conta_paginainicial.html?usuario=${encodeURIComponent(usuario)}`;
  } else {
    tentativas++;
    if (tentativas >= maxTentativas) {
      window.location.href = "../pagina_inicial/paginainicial.html?bloqueado=true";
    } else {
      mensagem.textContent = `Senha incorreta. Tentativa ${tentativas} de ${maxTentativas}.`;
      mensagem.style.display = "block";
      setTimeout(() => {
        mensagem.style.display = "none";
        if (inputSenha) inputSenha.value = "";
      }, 3000);
    }
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  usuario = getParametro("usuario");
  await carregarDadosUsuarios();
  dados = dadosUsuarios[usuario];

  const mensagem = document.getElementById("mensagem");

  if (!dados) {
    mensagem.textContent = "Usuário não encontrado.";
    mensagem.style.display = "block";
    return;
  }

  senhaCorreta = dados.senha;

  const imagem = document.getElementById("foto");
  if (imagem) {
    imagem.src = dados.imagem;
    imagem.alt = dados.nome;
    imagem.style.display = "block";
  }

  // Mensagem de bloqueio, se necessário
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("bloqueado") === "true") {
    mensagem.textContent = "Conta bloqueada por excesso de tentativas.";
    mensagem.style.display = "block";
  }
});