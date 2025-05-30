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

let dados; // Variável global para os dados do remetente
let valor; // Variável global para o valor da transação

function debito(valorDebito) {
  dados.saldo -= valorDebito;

  const novoExtrato = {
    data: formatarDataHoje(),
    descricao: "transferência enviada",
    valor: -valorDebito
  };

  if (!Array.isArray(dados.extrato)) {
    dados.extrato = [];
  }
  dados.extrato.push(novoExtrato);
}

async function credito() {
  console.log("Iniciando crédito...");
  const contaDestino = getParametro("conta");
  console.log("Conta destino:", contaDestino);
  if (!contaDestino) {
    alert("Conta de destino não especificada.");
    return;
  }

  const destino = dadosUsuarios[contaDestino];
  console.log("Dados do destino:", destino);
  if (!destino) {
    alert("Usuário de destino não encontrado.");
    return;
  }

  // Atualiza saldo e extrato do destino
  destino.saldo += valor;

  const novoExtratoDestino = {
    data: formatarDataHoje(),
    descricao: "transferência recebida",
    valor: valor
  };

  if (!Array.isArray(destino.extrato)) {
    destino.extrato = [];
  }
  destino.extrato.push(novoExtratoDestino);

  // Salva os dados atualizados do destinatário
  const resultadoDestino = await atualizarUsuario(contaDestino, {
    saldo: destino.saldo,
    extrato: destino.extrato
  });

  if (!resultadoDestino.sucesso) {
    alert("Erro ao atualizar o saldo do destinatário!");
  }
}




document.addEventListener("DOMContentLoaded", async () => {
  const usuario = getParametro("usuario");

  await carregarDadosUsuarios();
  dados = dadosUsuarios[usuario];

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
  // Verifica se a transferência já foi feita nesta sessão
  const chaveTransferencia = `transferenciaFeita_${usuario}`;
  if (sessionStorage.getItem(chaveTransferencia)) {
    console.log("Transferência já executada nesta sessão.");
    window.location.href = `../conta/conta_paginainicial.html?usuario=${usuario}`;
    return;
  }


  let valorTexto = getParametro("valor");
  valorTexto = decodeURIComponent(valorTexto);
  valorTexto = valorTexto.replace("R$", "").replace(/\s/g, "").replace(",", ".");
  valor = parseFloat(valorTexto);

  if (isNaN(valor) || valor <= 0) {
    alert("Valor inválido.");
    return;
  }

  debito(valor);

  const resultado = await atualizarUsuario(usuario, {
    saldo: dados.saldo,
    extrato: dados.extrato
  });
  console.log("Resultado do remetente:", resultado);

  if (!resultado.sucesso) {
    alert("Erro ao atualizar saldo!");
    return;
  }

  await credito();

  // Marca como feito para evitar repetição
  sessionStorage.setItem(chaveTransferencia, "true");

   
});