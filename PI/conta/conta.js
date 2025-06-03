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
    imagem.src = dados.imagem;
    imagem.alt = dados.nome;
    imagem.style.display = "block";
    document.getElementById("nome").innerText = dados.nome;
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
});