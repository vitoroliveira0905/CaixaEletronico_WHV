// dadosUsuarios.js

export let dadosUsuarios = {}; // Objeto compartilhado

export async function carregarDadosUsuarios() {
    try {
        const response = await fetch('http://localhost:3000/api/dados');
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }
        dadosUsuarios = await response.json();
    } catch (error) {
        console.error('Erro ao carregar os dados dos usuários:', error);
    }
}

export async function atualizarUsuario(usuario, novosDados) {
    try {
        console.log("Enviando dados para atualização:", usuario, novosDados);

        const response = await fetch(`http://localhost:3000/api/usuario/${usuario}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novosDados)
        });

        if (!response.ok) {
            const texto = await response.text();
            throw new Error(`Erro ${response.status}: ${texto}`);
        }

        const data = await response.json();

        if (data.sucesso) {
            dadosUsuarios[usuario] = { ...dadosUsuarios[usuario], ...novosDados };
        }

        return data;
    } catch (error) {
        console.error('Erro ao atualizar o usuário:', error);
        return { sucesso: false, erro: error.message };
    }
}