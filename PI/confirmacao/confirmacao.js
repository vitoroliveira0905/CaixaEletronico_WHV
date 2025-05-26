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

  const valor = getParametro("valor");

  const valorFormatado = parseFloat(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
  document.getElementById("valorSaque").textContent = valorFormatado;


  // Botão confirmar
  document.getElementById("confirmar").addEventListener("click", () => {
    // Aqui você pode redirecionar para uma tela de sucesso ou finalizar o saque
    alert(`Saque de ${valorFormatado} confirmado!`);
    // Exemplo de redirecionamento:
    // window.location.href = `sucesso.html?usuario=${usuario}&valor=${valor}`;
  });

  // Botão confirmar2
  document.getElementById("confirm").addEventListener("click", () => {
    alert(`Saque de ${valorFormatado} confirmado!`);
  });

  document.getElementById("cancel").onclick = function() {
    window.location.href = `../saque/saque.html?usuario=${encodeURIComponent(usuario)}`;
    };
  
  document.getElementById("cancela").onclick = function() {
    window.location.href = `../saque/saque.html?usuario=${encodeURIComponent(usuario)}`;
    };
  