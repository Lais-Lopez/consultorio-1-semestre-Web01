var pacientes = [];
var chamado = "";

// -----------------------------
// Adicionar paciente normal
// -----------------------------
function adicionarPaciente() {
    var inPaciente = document.getElementById("inPaciente");
    var outLista = document.getElementById("outLista");
    var nome = inPaciente.value.trim();

    if (nome === "") {
        alert("Informe o nome do paciente");
        inPaciente.focus();
        return;
    }

    pacientes.push(nome);

    atualizarLista();
    inPaciente.value = "";
    inPaciente.focus();
}

document.getElementById("btAdicionar").addEventListener("click", adicionarPaciente);

// -----------------------------
// Adicionar com urgência
// -----------------------------
function adicionarUrgencia() {
    var inPaciente = document.getElementById("inPaciente");
    var nome = inPaciente.value.trim();

    if (nome === "") {
        alert("Informe o nome do paciente");
        inPaciente.focus();
        return;
    }

    pacientes.unshift(nome);

    atualizarLista();
    inPaciente.value = "";
    inPaciente.focus();
}

document.getElementById("btUrgencia").addEventListener("click", adicionarUrgencia);

// -----------------------------
// Atender paciente
// -----------------------------
function atenderPaciente() {
    if (pacientes.length === 0) {
        alert("Não há pacientes na lista de espera");
        return;
    }

    var outAtendimento = document.getElementById("outAtendimento");
    var outChamado = document.getElementById("outChamado");

    var atender = pacientes.shift();
    chamado = atender;

    outAtendimento.textContent = atender;

    var agora = new Date().toLocaleString("pt-BR");
    outChamado.textContent += atender + " - " + agora + "\n";

    atualizarLista();
    speak();
}

document.getElementById("btAtender").addEventListener("click", atenderPaciente);

// -----------------------------
// Atualizar lista de espera
// -----------------------------
function atualizarLista() {
    var outLista = document.getElementById("outLista");
    var lista = "";

    for (var i = 0; i < pacientes.length; i++) {
        lista += (i + 1) + ". " + pacientes[i] + "\n";
    }

    outLista.textContent = lista;
}

// -----------------------------
// Voz: anunciar paciente
// -----------------------------
function speak() {
    const utterance = new SpeechSynthesisUtterance(chamado);
    const voices = speechSynthesis.getVoices();
    if (voices.length > 0) {
        utterance.voice = voices[0];
    }
    speechSynthesis.speak(utterance);
}
