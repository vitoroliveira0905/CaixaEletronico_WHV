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

  // Preencher tabela de extrato
  const extrato = dados.extrato || [];
  const tbody = document.querySelector(".tabela-extrato tbody");
  tbody.innerHTML = ""; // Limpa conteúdo anterior

  extrato.forEach(item => {
    const tr = document.createElement("tr");
    const tdData = document.createElement("td");
    const tdDesc = document.createElement("td");
    const tdValor = document.createElement("td");

    tdData.textContent = item.data;
    tdDesc.textContent = item.descricao;
    tdValor.textContent = (item.valor < 0 ? "- " : "+ ") + "R$" + Math.abs(item.valor).toFixed(2);

    tr.appendChild(tdData);
    tr.appendChild(tdDesc);
    tr.appendChild(tdValor);
    tbody.appendChild(tr);
  });

  document.getElementById("voltar").onclick = function() {
    window.location.href = `../conta/conta_paginainicial.html?usuario=${encodeURIComponent(usuario)}`;
  };
});