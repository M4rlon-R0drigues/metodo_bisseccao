function start() {
  a = parseFloat(document.getElementById("inputA").value);
  b = parseFloat(document.getElementById("inputB").value);
  err = parseFloat(document.getElementById("inputErro").value);
  var resposta = document.getElementById("output1");
  var Niteracao = document.getElementById("output2");
  var contador = 1;

  //teste e troca de elementos A e B
  if (a > b) {
    var aux = b;
    b = a;
    a = aux;
  }

  //Funções que fazem a derivada  / DIFF È A DERIVADA RESOLVIDA
  var expr = document.getElementById("inputFunc").value;
  var diff = nerdamer
    .getCore()
    .Calculus.diff(nerdamer(expr).symbol)
    .text();

  var res = b - a;
  if (res < 0) {
    res = res * -1;
  }
  if (err > res) {
    resposta.innerHTML = "Melhor Aproximacao: " + res;
    Niteracao.innerHTML = "Quantidade de Iterações: " + contador;
  } else {
    //Começo do Laço de repetiçao
    do {
      //Primieiro passo da calculo
      p = (a + b) / 2;

      //Calculando as Funçes depois de trocar os valores de X pelas variaveis
      var DA = eval(diff.replace("x", a));
      var DB = eval(diff.replace("x", b));
      var DP = eval(diff.replace("x", p));

      //Toca de A ou B pelo P encontrado na formula
      if (DA < 0 && DP < 0) {
        a = p;
      } else if (DB > 0 && DP > 0) {
        b = p;
      }

      //Alterando os valore para que seja sempre positivo, como Modulo da função
      res = b - a;
      if (res < 0) {
        res = res * -1;
      }

      contador++;
    } while (err < res);

    //Impressão dos resuldatos na tela
    if (err > res) {
      resposta.innerHTML = "Melhor Aproximacao: " + res;
      Niteracao.innerHTML = "Quantidade de Iteraçoes: " + contador;
    }
  }
}

function reload() {
  //Funço para recarregar a pagina
  document.location.reload(true);
}
