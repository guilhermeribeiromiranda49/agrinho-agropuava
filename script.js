document.addEventListener("DOMContentLoaded", function() {
    
    // --- 1. LÓGICA DO MENU (SIDEBAR) ---
    const sidebar = document.getElementById("sidebar");
    const btnMenu = document.getElementById("btn-menu");
    const btnFechar = document.getElementById("btn-fechar");

    function interagirSidebar() {
        sidebar.style.width = (sidebar.style.width === "300px") ? "0" : "300px";
    }

    if (btnMenu) btnMenu.addEventListener("click", interagirSidebar);
    if (btnFechar) btnFechar.addEventListener("click", interagirSidebar);


    // --- 2. ÉPOCA DE PLANTIO ---
    const selectPlantio = document.getElementById("select-plantio");
    const resPlantio = document.getElementById("txt-plantio");

    if (selectPlantio) {
        selectPlantio.addEventListener("change", function() {
            const val = selectPlantio.value;
            if (val === "verao") resPlantio.innerText = "🌱 Outubro a Dezembro: Soja, Milho e Feijão.";
            else if (val === "inverno") resPlantio.innerText = "🌾 Maio a Julho: Trigo, Cevada e Aveia.";
            else resPlantio.innerText = "";
        });
    }


    // --- 3. DESAFIO AGROPUAVA (QUIZ) ---
    const perguntas = [
        { p: "Guarapuava é líder nacional em qual produção?", options: ["Café", "Cevada e Batata", "Laranja", "Arroz"], correct: 1 },
        { p: "Qual fundação impulsiona a tecnologia local?", options: ["EMBRAPA", "IAPAR", "FAPA", "ABC"], correct: 2 },
        { p: "O Paraná é pioneiro em qual sistema?", options: ["Plantio Direto", "Aragem", "Hidroponia", "Queima"], correct: 0 },
        { p: "Qual a principal cooperativa de malte local?", options: ["Coamo", "Agrária", "Lar", "C.Vale"], correct: 1 },
        { p: "O que significa VBP?", options: ["Venda de Bens", "Valor Bruto da Produção", "Volume de Bioinsumos", "Verba de Base"], correct: 1 }
    ];

    let atual = 0;
    let pontos = 0;

    function carregarQuiz() {
        const questao = perguntas[atual];
        const textoPergunta = document.getElementById("texto-pergunta");
        const statusQuiz = document.getElementById("quiz-status");
        const box = document.getElementById("opcoes-respostas");

        if (!textoPergunta || !box) return;

        textoPergunta.innerText = questao.p;
        statusQuiz.innerText = `Pergunta ${atual + 1} de 5`;
        box.innerHTML = "";

        questao.options.forEach((opt, i) => {
            const btn = document.createElement("button");
            btn.innerText = opt;
            // Uso de EventListener para evitar JS Inline (Edital 6.1.15)
            btn.addEventListener("click", function() {
                if (i === questao.correct) pontos++;
                atual++;
                if (atual < perguntas.length) carregarQuiz();
                else mostrarFim();
            });
            box.appendChild(btn);
        });
    }

    function mostrarFim() {
        const container = document.getElementById("quiz-container");
        container.innerHTML = `
            <div style="text-align:center">
                <h4>Fim do Quiz!</h4>
                <p>Você acertou <strong>${pontos}</strong> de 5.</p>
                <button id="btn-reiniciar" class="btn" style="border:none; cursor:pointer">Refazer Quiz</button>
            </div>`;
        
        document.getElementById("btn-reiniciar").addEventListener("click", () => {
            location.reload();
        });
    }

    // Inicia o quiz
    carregarQuiz();


    // --- 4. ACESSIBILIDADE (VLIBRAS) ---
    if (window.VLibras) {
        new window.VLibras.Widget('https://vlibras.gov.br/app');
    }
});