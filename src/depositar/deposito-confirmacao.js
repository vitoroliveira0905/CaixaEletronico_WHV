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

  const remetente = dadosUsuarios[usuario];
  const destinatario = dadosUsuarios[conta];

  let imagem = document.getElementById("foto");
  if (imagem && remetente && remetente.imagem) {
    imagem.src = remetente.imagem;
    imagem.alt = remetente.nome;
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
    destinatario.saldo += valorNumerico;

    // Cria o novo lançamento do extrato
    let descricao;
    if (remetente === destinatario) {
      descricao = "Depósito em dinheiro"
    }
    else {
      descricao = `Depósito em dinheiro de ${remetente.nome}`
    }
    const novoExtrato = {
      data: formatarDataHoje(),
      descricao: descricao,
      valor: +valorNumerico
    };

    // Atualiza o extrato localmente
    if (!Array.isArray(destinatario.extrato)) {
      destinatario.extrato = [];
    }
    destinatario.extrato.unshift(novoExtrato);

    // Salva no backend via função centralizada
    const resultado = await atualizarUsuario(conta, { saldo: destinatario.saldo, extrato: destinatario.extrato });
    if (!resultado.sucesso) {
      alerta.textContent = "Erro ao atualizar saldo!";
      alerta.style.display = "block";
      setTimeout(() => {
        alerta.style.display = "none";
    }, 3000);
      return;
    }

    window.location.href = `depositou.html?usuario=${usuario}&conta=${conta}&valor=${valor}`;
  }

  document.getElementById("btn-confirmar").addEventListener("click", processarDepositoERedirecionar);
  document.getElementById("btn2-confirmar").addEventListener("click", processarDepositoERedirecionar);

  document.getElementById("cancel").onclick = function () {
    window.location.href = `depositar.html?usuario=${encodeURIComponent(usuario)}`;
  };

  document.getElementById("cancela").onclick = function () {
    window.location.href = `../conta/conta.html?usuario=${encodeURIComponent(usuario)}`;
  };
});