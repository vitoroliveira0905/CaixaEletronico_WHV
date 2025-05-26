  // Dados dos usuários
  let dadosUsuarios = {   
    claudia: {
      nome: "Cláudia Santos",
      desc: "! Bem-vinda de volta!",
      imagem: "../Imagens/cartao1.png",
      senha: "1234"
    },
    tux: {
      nome: "Tux da Silva",
      desc: "! Preparado para novas aventuras bancárias?",
      imagem: "../Imagens/cartao2.png",
      senha: "4321"
    },
    willian: {
      nome: "Willian Reis",
      desc: "! Sua conta está atualizada.",
      imagem: "../Imagens/cartao3.png",
      senha: "2025"
    }
  };
  
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

function digitar(caracter) {
    var input = document.getElementById("valorinserido");
    if(input.value.length < 5){
      input.value += caracter;
    }
  }

  function limparCampo() {
    document.getElementById('valorinserido').value = '';
  }

  function getParametro(nome) {
    const url = new URL(window.location.href);
    return url.searchParams.get(nome);
  }
  
  function enviarValor() {
    const valor = document.getElementById("valorinserido").value;
  
    if (valor === "") {
      alert("Por favor, insira um valor antes de confirmar.");
      return false;
    }
  
    // Redireciona para a página de confirmação com o valor como parâmetro
    window.location.href = `../confirmacao/confirmacao.html?valor=${encodeURIComponent(valor)}`;
    return false; // evita o envio real do formulário
  }


  