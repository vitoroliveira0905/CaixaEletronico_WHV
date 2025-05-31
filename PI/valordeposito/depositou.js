import { dadosUsuarios, carregarDadosUsuarios } from '../dadosUsuarios.js';

function getParametro(nome) {
  const url = new URL(window.location.href);
  return url.searchParams.get(nome);
}

document.addEventListener("DOMContentLoaded", async () => {
  const conta = getParametro("conta");
  await carregarDadosUsuarios();
  const dados = dadosUsuarios[conta];

  if (!dados) {
    alert("Conta de destino não encontrada.");
    return;
  }

  let imagem = document.getElementById("foto");
  if (imagem) {
    imagem.src = dados.imagem;
    imagem.alt = dados.nome;
    imagem.style.display = "block";
  }

  setTimeout(() => {
    document.getElementById('mensagem').textContent = "Envelope recebido!";
    const container = document.getElementById('saidaEnvelope');

    const envelope = document.createElement('div');
    envelope.classList.add('envelope');
    envelope.innerHTML = `<img src="../Imagens/envelope.png" alt="Envelope" style="width: 100%;">`;
    container.appendChild(envelope);

    setTimeout(() => {
      window.location.href = `../conta/conta_paginainicial.html?usuario=${getParametro("usuario")}`;
    }, 4000);

  }, 3000);
});