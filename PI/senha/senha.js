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
    var input = document.getElementById("senhainserida");
    if(input.value.length < 4){
      input.value += caracter;
    }
  }

  function limparCampo() {
    document.getElementById('senhainserida').value = '';
  }

  function getParametro(nome) {
    const url = new URL(window.location.href);
    return url.searchParams.get(nome);
  }
  

  const senhaCorreta = dados.senha;
  let tentativas = 0;
  const maxTentativas = 3;

  function verificarSenha() {
  
    const inputSenha = document.getElementById("senhainserida");
    const senhaInserida = inputSenha.value;
    const mensagem = document.getElementById("mensagem");


    if (senhaInserida === senhaCorreta) {
      window.location.href = `../conta/conta_paginainicial.html?usuario=${encodeURIComponent(usuario)}`;
    } else {
      tentativas++;   
        if (tentativas >= maxTentativas) {
          window.location.href = "../pagina_inicial/paginainicial.html?bloqueado=true";
        } else {
          mensagem.textContent = `Senha incorreta. Tentativa ${tentativas} de ${maxTentativas}.`;
          mensagem.style.display = "block";
          
          setTimeout(() => {
            mensagem.style.display = "none";
            inputSenha.value = "";
          }, 3000);

        }
    }
  }

  window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("bloqueado") === "true") {
      const mensagem = document.getElementById("mensagem");
      mensagem.textContent = "Conta bloqueada por excesso de tentativas.";
      mensagem.style.display = "block";
    }
  }

  