function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const numeroAleatorioEntreZeroECinco = getRndInteger(0, 5);

let jogaParXImpar = (escolhaDeTipo, num) => {
  let soma = numeroAleatorioEntreZeroECinco + num;
  let par = soma % 2 == 0;
  let impar = soma % 2 != 0;

  // console.log(par, impar, soma, escolhaDeTipo, num);

  if (escolhaDeTipo === "par" && soma % 2 === 0) {
    console.log(`seu numero foi ${num} e o pc ${numeroAleatorioEntreZeroECinco}
     Você escolheu par e o computador escolheu impar. O resultado foi ${soma}. Você ganhou! `);
  } else if (escolhaDeTipo == "impar" && soma % 2 != 0) {
    console.log(`seu numero foi ${num} e o pc ${numeroAleatorioEntreZeroECinco}
     Você escolheu impar e o computador escolheu par. O resultado foi ${soma}. Vc ganhou `);
  } else {
    console.log("Vc perdeu");
  }
};

jogaParXImpar(process.argv[2], process.argv[3]);
