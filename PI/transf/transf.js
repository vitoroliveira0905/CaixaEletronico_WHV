//dados dos usuários
let dadosUsuarios = {   
    claudia: {
      nome: "Cláudia Santos",
      desc: "! Bem-vinda de volta!",
      imagem: "../Imagens/cartao1.png",
      senha: "1234",
      saldo: "1400"
    },
    tux: {
      nome: "Tux da Silva",
      desc: "! Preparado para novas aventuras bancárias?",
      imagem: "../Imagens/cartao2.png",
      senha: "4321",
      saldo: "1500"
    },
    willian: {
      nome: "Willian Reis",
      desc: "! Sua conta está atualizada.",
      imagem: "../Imagens/cartao3.png",
      senha: "2025",
      saldo: "1600"
    },
  };

  function getParametro(nome) {
    const url = new URL(window.location.href);
    return url.searchParams.get(nome);
  }
  
const usuario = getParametro("usuario");
const dados = dadosUsuarios[usuario];

console.log(usuario)
console.log(dados)

document.addEventListener("DOMContentLoaded", () => {
  let imagem = document.getElementById("foto");
  if (imagem) {
    imagem.src = dados.imagem;
    imagem.alt = dados.nome;
    imagem.style.display = "block";
  }
});

document.getElementById("voltar").onclick = function() {
  window.location.href = `../conta/conta_paginainicial.html?usuario=${encodeURIComponent(usuario)}`;
  };

  let campoSelecionado = null;

  function selecionarCampo(idCampo) {
    campoSelecionado = document.getElementById(idCampo);
    // opcional: indicar visualmente qual campo está ativo
    document.getElementById("escolhaconta").style.border = "2px solid transparent";
    document.getElementById("escolhavalor").style.border = "2px solid transparent";
    
    campoSelecionado.style.border = "2px solid yellow"; // destaque o campo selecionado
  }

  function digitar(caracter) {
    if (campoSelecionado && campoSelecionado.value.length < 12) {
      campoSelecionado.value += caracter;
    }
  }

  function limparCampo() {
    if (campoSelecionado) {
      campoSelecionado.value = '';
    }
  }
  
  function redirecionarConfirmacao() {
    let valor = document.getElementById("escolhavalor")
    window.location.href = `../confirmacao/confirmacaotransf.html?usuario=${encodeURIComponent(usuario)}&valor=${valor}`;
  }

  document.getElementById("confirmar").addEventListener("click", () => redirecionarConfirmacao());
