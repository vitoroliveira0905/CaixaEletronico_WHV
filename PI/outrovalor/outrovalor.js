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

  // Habilitar botão confirmar somente com valor
  const btnConfirmar = document.getElementById("btn-confirmar");
  const btn2Confirmar = document.getElementById("btn2-confirmar");
  const input = document.getElementById("valorinserido");

  input.addEventListener("input", () => {
    const valorStr = input.value.replace("R$", "").replace("0,00", "").trim();
    const valorNum = parseFloat(valorStr.replace(",", "."));

    const valorValido = !isNaN(valorNum) && valorNum >= 10 && valorNum <= 1000;

    if (btnConfirmar) btnConfirmar.disabled = !valorValido;
    if (btn2Confirmar) btn2Confirmar.disabled = !valorValido;
  });


  // Adiciona evento ao botão confirmar
  btnConfirmar.addEventListener("click", () => {
    enviarValor();
  });
  btn2Confirmar.addEventListener("click", () => {
    enviarValor();
  });

  // Evento do botão cancelar
  const btnCancelar = document.getElementById("btn-cancelar");
  btnCancelar.addEventListener("click", () => {
    window.location.href = `../saque/saque.html?usuario=${encodeURIComponent(usuario)}`;
  });
  const btn2Cancelar = document.getElementById("btn2-cancelar");
  btn2Cancelar.addEventListener("click", () => {
    window.location.href = `../saque/saque.html?usuario=${encodeURIComponent(usuario)}`;
  });
});

let valorNumerico = ""; // Apenas os dígitos (em dezenas). Ex: "2" => 20, "25" => 250

function atualizarInputFormatado() {
  const input = document.getElementById("valorinserido");

  let valor = parseInt(valorNumerico || "0") * 10; // transforma dezenas em reais

  if (valor > 1000) {
    valor = 1000;
    valorNumerico = "100"; // 100 * 10 = 1000
  }

  input.value = `R$ ${valor},00`;

  const btn1 = document.getElementById("btn-confirmar");
  const btn2 = document.getElementById("btn2-confirmar");

  const valorValido = valor >= 10 && valor <= 1000;

  if (btn1) btn1.disabled = !valorValido;
  if (btn2) btn2.disabled = !valorValido;
}

window.digitar = function (caracter) {
  if (isNaN(caracter)) return;

  if (valorNumerico.length >= 3) return; // Limite: 3 dígitos (até 1000 reais)

  valorNumerico += caracter;
  atualizarInputFormatado();
};

window.limparCampo = function () {
  valorNumerico = "";
  atualizarInputFormatado();
};

window.enviarValor = function () {
  const usuario = getParametro("usuario");
  const valorFinal = parseInt(valorNumerico || "0") * 10;
  if (valorFinal < 10 || valorFinal > 1000) {
    alerta.textContent = "Insira um valor entre R$ 10,00 e R$ 1000,00.";
      alerta.style.display = "block";
      setTimeout(() => {
        alerta.style.display = "none";
    }, 3000);
    return ;
  }

  const dados = dadosUsuarios[usuario];
  
  if (valorFinal > dados.saldo) {
      alerta.textContent = "Valor de saque maior que o saldo disponível.";
      alerta.style.display = "block";
      setTimeout(() => {
        alerta.style.display = "none";
    }, 3000);
    return;
  }

  const valorFormatado = `R$ ${valorFinal},00`;
  window.location.href = `../confirmacao/confirmacao.html?usuario=${encodeURIComponent(usuario)}&valor=${encodeURIComponent(valorFormatado)}`;
  return false;
};

