function digitar(caracter) {
    var input = document.getElementById("senha");
    input.value += caracter;
  }

  function limparCampo() {
    document.getElementById('senha').value = '';
  }