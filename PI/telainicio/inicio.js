function iniciarTransicao(event) {
    const botao = event.currentTarget;
    const rect = botao.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const efeito = document.createElement('div');
    efeito.className = 'efeito-circulo';
    efeito.style.left = `${centerX}px`;
    efeito.style.top = `${centerY}px`;

    document.body.appendChild(efeito);

    setTimeout(() => {
      window.location.href = "../pagina_inicial/paginainicial.html";
    }, 2500);
  }