import { dadosUsuarios, carregarDadosUsuarios, atualizarUsuario } from '../dadosUsuarios.js';

function getParametro(nome) {
  const url = new URL(window.location.href);
  return url.searchParams.get(nome);
}

function formatarDataHoje() {
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, '0');
  const dia = String(hoje.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}

document.addEventListener("DOMContentLoaded", async () => {
  const usuario = getParametro("usuario");
  const valor = getParametro("valor");
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

  const valorNumerico = parseFloat(valor.replace("R$", "").replace(".", "").replace(",", ".").trim());
  const valorFormatado = valorNumerico.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
  document.getElementById("valorSaque").textContent = valorFormatado;

  const valorInteiro = Math.floor(valorNumerico);

  async function processarSaqueERedirecionar() {
    // Atualiza o saldo localmente
    dados.saldo -= valorInteiro;

    // Cria o novo lançamento do extrato
    const novoExtrato = {
      data: formatarDataHoje(),
      descricao: "Saque em dinheiro",
      valor: -valorInteiro
    };

    // Atualiza o extrato localmente
    if (!Array.isArray(dados.extrato)) {
      dados.extrato = [];
    }
    dados.extrato.unshift(novoExtrato);

    // Salva no backend via função centralizada
    const resultado = await atualizarUsuario(usuario, { saldo: dados.saldo, extrato: dados.extrato });
    if (!resultado.sucesso) {
      alerta.textContent = "Erro ao atualizar saldo!";
      alerta.style.display = "block";
      setTimeout(() => {
        alerta.style.display = "none";
    }, 3000);
      return;
    }

    window.location.href = `sacou.html?usuario=${encodeURIComponent(usuario)}&valor=${encodeURIComponent(valorInteiro)}`;
  }

  document.getElementById("confirmar").addEventListener("click", processarSaqueERedirecionar);
  document.getElementById("confirm").addEventListener("click", processarSaqueERedirecionar);

  document.getElementById("cancel").onclick = function() {
    window.location.href = `saque.html?usuario=${encodeURIComponent(usuario)}`;
  };

  document.getElementById("cancela").onclick = function() {
    window.location.href = `saque.html?usuario=${encodeURIComponent(usuario)}`;
  };
});