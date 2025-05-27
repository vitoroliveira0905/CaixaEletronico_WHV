import { dadosUsuarios, carregarDadosUsuarios } from '../dadosUsuarios.js';

function getParametro(nome) {
  const url = new URL(window.location.href);
  return url.searchParams.get(nome);
}

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
});

window.digitar = function(caracter) {
  var input = document.getElementById("valorinserido");
  if (input && input.value.length < 5) {
    input.value += caracter;
  }
};

window.limparCampo = function() {
  const input = document.getElementById('valorinserido');
  if (input) input.value = '';
};

window.enviarValor = function() {
  const valor = document.getElementById("valorinserido").value;
  const usuario = getParametro("usuario");

  if (valor === "") {
    alert("Por favor, insira um valor antes de confirmar.");
    return false;
  }

  // Redireciona para a página de confirmação com o valor e usuário como parâmetros
  window.location.href = `../confirmacao/confirmacao.html?usuario=${encodeURIComponent(usuario)}&valor=${encodeURIComponent(valor)}`;
  return false; // evita o envio real do formulário
};