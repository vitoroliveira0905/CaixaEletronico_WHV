

// Função para obter o parâmetro da URL
function getParametro(nome) {
    const url = new URL(window.location.href);
    return url.searchParams.get(nome);
  }
  
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

let imagem = document.getElementById("foto");
imagem.src = dados.imagem;
imagem.alt = dados.nome;
imagem.style.display = "block";
document.getElementById("nome").innerText = dados.nome
document.getElementById("descricao").innerText = dados.desc;

document.getElementById("saldo").onclick = function() {
  window.location.href = `../saldo/saldo.html?usuario=${encodeURIComponent(usuario)}`;
};

document.getElementById("extrato").onclick = function() {
  window.location.href = `../extrato/extrato.html?usuario=${encodeURIComponent(usuario)}`;
};

document.getElementById("sair").onclick = function() {
  window.location.href = `../sair/sair.html?usuario=${encodeURIComponent(usuario)}`;
};

document.getElementById("deposito").onclick = function() {
  window.location.href = `../depositar/depositar.html?usuario=${encodeURIComponent(usuario)}`;
};

document.getElementById("saque").onclick = function() {
  window.location.href = `../saque/saque.html?usuario=${encodeURIComponent(usuario)}`;
};

document.getElementById("transferir").onclick = function() {
  window.location.href = `../transf/transf.html?usuario=${encodeURIComponent(usuario)}`;
};