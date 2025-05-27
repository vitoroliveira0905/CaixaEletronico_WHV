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