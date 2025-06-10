import { dadosUsuarios, carregarDadosUsuarios } from '../dadosUsuarios.js';

function getParametro(nome) {
  const url = new URL(window.location.href);
  return url.searchParams.get(nome);
}

let campoSelecionado = null;

document.addEventListener("DOMContentLoaded", async () => {
  const campoConta = document.getElementById("escolhaconta");
  const campoValor = document.getElementById("escolhavalor");
  if (campoValor) {
    campoValor.value = "R$ 0,00";
    campoValor.readOnly = true;
  }

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

  document.getElementById("btn-voltar").onclick = function () {
    window.location.href = `../conta/conta.html?usuario=${encodeURIComponent(usuario)}`;
  };

  document.getElementById("btn2-voltar").onclick = function () {
    window.location.href = `../conta/conta.html?usuario=${encodeURIComponent(usuario)}`;
  };

  // Funções para seleção e digitação
  window.selecionarCampo = function (idCampo) {
    campoSelecionado = document.getElementById(idCampo);
    document.getElementById("escolhaconta").style.border = "2px solid transparent";
    document.getElementById("escolhavalor").style.border = "2px solid transparent";
    campoSelecionado.style.border = "2px solid yellow";
  };


  let valorDigitado = ""; // valor que o usuário digitou (só números)

  window.digitar = function (caracter) {
    if (!campoSelecionado) return;

    if (campoSelecionado.id === "escolhavalor") {
      if (valorDigitado.length >= 5) return; // limite de 5 dígitos, ex: 99999

      valorDigitado += caracter;

      let valorFormatado = Math.abs(valorDigitado).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
      campoSelecionado.value = valorFormatado;
    } else {
      // Para qualquer outro campo (ex: escolhaconta)
      if (campoSelecionado.value.length < 4) {
        campoSelecionado.value += caracter;
      }
    }
  };

  window.limparCampo = function () {
    if (campoSelecionado && campoSelecionado.id === "escolhavalor") {
      valorDigitado = "";
      campoSelecionado.value = "R$ 0,00";
    } else if (campoSelecionado) {
      campoSelecionado.value = '';
    }
  };

  window.redirecionarConfirmacao = function () {
    let conta = document.getElementById("escolhaconta").value;
    let valor = document.getElementById("escolhavalor").value;

    
    //Tratamento de exceçoes

    if (conta === "") {
      alerta.textContent = "Insira a conta";
      alerta.style.display = "block";
      setTimeout(() => {
        alerta.style.display = "none";
      }, 3000);
      return;
    }

    if (conta.length !== 4 || !/^\d{4}$/.test(conta)) {
      alerta.textContent = "A conta deve conter exatamente 4 dígitos.";
      alerta.style.display = "block";
      setTimeout(() => {
        alerta.style.display = "none";
      }, 3000);
      return;
    }

    if (conta === usuario) {
      alerta.textContent = "Você não pode realizar transferências para si mesmo.";
      alerta.style.display = "block";
      setTimeout(() => {
        alerta.style.display = "none";
      }, 3000);
      return;
    }

    const destinatario = dadosUsuarios[conta];
    if (!destinatario) {
      alerta.textContent = "A conta inserida não existe";
      alerta.style.display = "block";
      setTimeout(() => {
        alerta.style.display = "none";
      }, 3000);
      return;
    }

    if (valor === "R$ 0,00") {
      alerta.textContent = "Insira um valor";
      alerta.style.display = "block";
      setTimeout(() => {
        alerta.style.display = "none";
      }, 3000);
      return;
    }
    const valorNumerico = parseFloat(valor.replace("R$", "").replace(".", "").replace(",", ".").trim());

    if (valorNumerico > dados.saldo) {
      alerta.textContent = "Valor de transferência maior que o saldo disponível.";
      alerta.style.display = "block";
      setTimeout(() => {
        alerta.style.display = "none";
      }, 3000);
      return;
    }

    window.location.href = `transf-confirmacao.html?usuario=${encodeURIComponent(usuario)}&conta=${conta}&valor=${valor}`;
  };

  document.getElementById("btn-confirmar").addEventListener("click", () => window.redirecionarConfirmacao());
  document.getElementById("btn2-confirmar").addEventListener("click", () => window.redirecionarConfirmacao());
});