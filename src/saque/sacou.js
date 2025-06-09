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
    alerta.textContent = "Usuário não encontrado.";
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

  // Captura e conversão correta do valor com "R$ 200,00"
  let valorTexto = getParametro("valor");
  valorTexto = decodeURIComponent(valorTexto);
  valorTexto = valorTexto.replace("R$", "").replace(/\s/g, "").replace(",", ".");
  const valorSaque = parseFloat(valorTexto);

  if (isNaN(valorSaque)) {
    alerta.textContent = "Valor de saque inválido.";
    alerta.style.display = "block";
    setTimeout(() => {
      alerta.style.display = "none";
  }, 3000);
    return;
  }

  const notasDisponiveis = [200, 100, 50, 20, 10];
  const notas = [];
  let restante = Math.round(valorSaque); // Arredonda para inteiro

  for (let nota of notasDisponiveis) {
    while (restante >= nota) {
      notas.push(nota);
      restante -= nota;
    }
  }

  if (restante > 0) {
    alerta.textContent = "Não é possível sacar esse valor com as notas disponíveis.";
    alerta.style.display = "block";
    setTimeout(() => {
      alerta.style.display = "none";
  }, 3000);
    return;
  }

  setTimeout(() => {
    document.getElementById('mensagem-saque').textContent = "Notas entregues:";
    const container = document.getElementById('saidaNotas');

    notas.forEach((valor, index) => {
      const nota = document.createElement('div');
      nota.classList.add('nota');
      nota.style.animationDelay = `${index * 0.5}s`;
      nota.innerHTML = `<img src="../Imagens/nota${valor}.png" alt="Nota de R$${valor}" style="width: 500%;">`;
      container.appendChild(nota);
    });

    setTimeout(() => {
      window.location.href = `../conta/conta.html?usuario=${usuario}`;
    }, 4000);

  }, 5000);
});