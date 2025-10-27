for (let i = 1; i <= totalPerguntas; i++) {
  perguntasDiv.innerHTML += `
    <div class="pergunta">
      <label for="q${i}">Pergunta ${i}:</label>
      <select id="q${i}" name="q${i}" required>
        <option value="">Selecione</option>
        <option value="0">Nunca</option>
        <option value="1">Raramente</option>
        <option value="2">Às vezes</option>
        <option value="3">Frequentemente</option>
        <option value="4">Sempre</option>
      </select>
    </div>
  `;
}

document.getElementById('formulario').addEventListener('submit', function(e) {
  e.preventDefault();
  let respostas = [];

  for (let i = 1; i <= totalPerguntas; i++) {
    const valor = parseInt(document.getElementById(`q${i}`).value);
    respostas.push(valor);
  }

  localStorage.setItem('respostas', JSON.stringify(respostas));
  window.location.href = "resultado.html";
});
const respostas = JSON.parse(localStorage.getItem('respostas')) || [];
let soma = respostas.reduce((acc, val) => acc + val, 0);
let media = soma / respostas.length;
let resultadoTexto = "";

if (media < 1.5) {
  resultadoTexto = "Seu resultado indica baixo risco de complicações. Continue com sua rotina e mantenha o acompanhamento médico.";
} else if (media < 3) {
  resultadoTexto = "Atenção: alguns sinais requerem observação. Mantenha atividades físicas leves e evite ficar muito tempo sentado.";
} else {
  resultadoTexto = "Alerta: indicativos de edema severo. Procure um profissional de saúde imediatamente e evite esforço físico.";
}

const rotina = `
  <h2>Rotina Sugerida:</h2>
  <ul>
    <li>✔️ Caminhada leve de 20 a 30 minutos por dia</li>
    <li>🧘‍♀️ Elevação das pernas por 15 minutos, 3x ao dia</li>
    <li>🥗 Alimentação com pouco sal e rica em potássio</li>
    <li>💧 Ingestão adequada de líquidos (salvo contraindicação médica)</li>
    <li>🦶 Uso de meias de compressão, se recomendado</li>
    <li>📆 Consultas regulares com geriatra ou cardiologista</li>
  </ul>
`;

document.getElementById('resultado').innerHTML = `
  <h2>Resultado:</h2>
  <p>${resultadoTexto}</p>
  ${rotina}
`;
