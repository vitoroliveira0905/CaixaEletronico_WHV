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
  const usuario = getParametro("usuario"); // Usuário conectado
  const conta = getParametro("conta"); // Conta de destino
  const valor = getParametro("valor");
  await carregarDadosUsuarios();

  const dados = dadosUsuarios[conta];

  let imagem = document.getElementById("foto");
  if (imagem && dados && dados.imagem) {
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

  async function processarDepositoERedirecionar() {
    // Atualiza o saldo localmente
    dados.saldo += valorNumerico;

    // Cria o novo lançamento do extrato
    const novoExtrato = {
      data: formatarDataHoje(),
      descricao: "Depósito em dinheiro",
      valor: +valorNumerico
    };

    // Atualiza o extrato localmente
    if (!Array.isArray(dados.extrato)) {
      dados.extrato = [];
    }
    dados.extrato.push(novoExtrato);

    // Salva no backend via função centralizada
    const resultado = await atualizarUsuario(conta, { saldo: dados.saldo, extrato: dados.extrato });
    if (!resultado.sucesso) {
      alert("Erro ao atualizar saldo!");
      return;
    }

    window.location.href = `../valordeposito/depositou.html?usuario=${usuario}&conta=${conta}&valor=${valor}`;
  }

  document.getElementById("btn-confirmar").addEventListener("click", processarDepositoERedirecionar);
  document.getElementById("btn2-confirmar").addEventListener("click", processarDepositoERedirecionar);

  document.getElementById("cancel").onclick = function() {
    window.location.href = `../depositar/depositar.html?usuario=${encodeURIComponent(usuario)}`;
  };

  document.getElementById("cancela").onclick = function() {
    window.location.href = `../conta/conta_paginainicial.html?usuario=${encodeURIComponent(usuario)}`;
  };
});