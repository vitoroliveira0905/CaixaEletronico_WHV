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

  // Captura e conversão correta do valor com "R$ 200,00"
  let valorTexto = getParametro("valor");
  valorTexto = decodeURIComponent(valorTexto);
  valorTexto = valorTexto.replace("R$", "").replace(/\s/g, "").replace(",", ".");
  const valorSaque = parseFloat(valorTexto);

  if (isNaN(valorSaque)) {
    alert("Valor de saque inválido.");
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
    alert("Não é possível sacar esse valor com as notas disponíveis.");
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
      window.location.href = `../conta/conta_paginainicial.html?usuario=${usuario}`;
    }, 4000);

  }, 5000);
});