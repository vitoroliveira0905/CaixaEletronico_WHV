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
  const conta = getParametro("conta"); // Conta de destino
  await carregarDadosUsuarios();
  const dados = dadosUsuarios[conta]; // Busca os dados da conta de destino

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

  let valorTexto = getParametro("valor");
  valorTexto = decodeURIComponent(valorTexto);
  valorTexto = valorTexto.replace("R$", "").replace(/\s/g, "").replace(",", ".");
  const valorDeposito = parseFloat(valorTexto);

  // Atualiza o saldo localmente
  dados.saldo += valorDeposito;

  // Cria o novo lançamento do extrato
  const novoExtrato = {
    data: formatarDataHoje(),
    descricao: "Depósito em dinheiro",
    valor: +valorDeposito
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