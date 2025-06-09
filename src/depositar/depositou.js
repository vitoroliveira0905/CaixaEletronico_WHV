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
      alerta.textContent = "Conta de destino não encontrada.";
      alerta.style.display = "block";
      setTimeout(() => {
        alerta.style.display = "none";
    }, 3000);
  return;
 
  }

  let imagem = document.getElementById("foto");
  if (imagem) {
    imagem.src = dados.imagem;
    imagem.alt = dados.nome;
    imagem.style.display = "block";
  }

  setTimeout(() => {
    document.getElementById('mensagem-deposito').textContent = "Envelope recebido!";
    const container = document.getElementById('saidaEnvelope');

    const envelope = document.createElement('div');
    envelope.classList.add('envelope');
    envelope.innerHTML = `<img src="../Imagens/envelope.png" alt="Envelope" style="width: 100%;">`;
    container.appendChild(envelope);

    setTimeout(() => {
      window.location.href = `../conta/conta.html?usuario=${getParametro("usuario")}`;
    }, 4000);

  }, 3000);
});