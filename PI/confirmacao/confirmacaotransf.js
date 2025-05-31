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
  const conta = getParametro("conta");
  await carregarDadosUsuarios();

  const remetente = dadosUsuarios[usuario];
  const destinatario = dadosUsuarios[conta];

  if (!remetente) {
    alert("Usuário não encontrado.");
    return;
  }
  if (!destinatario) {
    alert("Conta de destino não encontrada.");
    return;
  }

  let imagem = document.getElementById("foto");
  if (imagem) {
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

  async function processarTransferenciaERedirecionar() {
    // Débito do remetente
    remetente.saldo -= valorNumerico;
    if (!Array.isArray(remetente.extrato)) remetente.extrato = [];
    remetente.extrato.push({
      data: formatarDataHoje(),
      descricao: "transferência enviada",
      valor: -valorNumerico
    });

    // Crédito do destinatário
    destinatario.saldo += valorNumerico;
    if (!Array.isArray(destinatario.extrato)) destinatario.extrato = [];
    destinatario.extrato.push({
      data: formatarDataHoje(),
      descricao: "transferência recebida",
      valor: valorNumerico
    });

    // Atualiza backend remetente
    const resultadoRemetente = await atualizarUsuario(usuario, {
      saldo: remetente.saldo,
      extrato: remetente.extrato
    });
    if (!resultadoRemetente.sucesso) {
      alert("Erro ao atualizar saldo do remetente!");
      return;
    }

    // Atualiza backend destinatário
    const resultadoDestinatario = await atualizarUsuario(conta, {
      saldo: destinatario.saldo,
      extrato: destinatario.extrato
    });
    if (!resultadoDestinatario.sucesso) {
      alert("Erro ao atualizar saldo do destinatário!");
      return;
    }

    window.location.href = `../transf/transferiu.html?usuario=${usuario}&conta=${conta}&valor=${valor}`;
  }

  document.getElementById("btn-confirmar").addEventListener("click", processarTransferenciaERedirecionar);
  document.getElementById("btn2-confirmar").addEventListener("click", processarTransferenciaERedirecionar);

  document.getElementById("cancel").onclick = function() {
    window.location.href = `../transf/transf.html?usuario=${encodeURIComponent(usuario)}`;
  };

  document.getElementById("cancela").onclick = function() {
    window.location.href = `../transf/transf.html?usuario=${encodeURIComponent(usuario)}`;
  };
});