```javascript
// ======================================================
// CYBER OPS // MILITARY TECHNOLOGY
// Quiz de tecnologia militar
// ======================================================

// Quantidade de perguntas da partida
const TOTAL_QUESTIONS = 10;

// Estado do jogo
let questions = [];
let currentQuestion = 0;
let score = 0;

// ======================================================
// BANCO DE PERGUNTAS MILITARES EM PORTUGUÊS
// ======================================================

const militaryQuestions = [
    {
        category: "AERONAVES",
        question: "Qual é a principal função do F-22 Raptor?",
        answers: [
            "Superioridade aérea",
            "Transporte de tropas",
            "Combate naval",
            "Transporte de carga"
        ],
        correct: "Superioridade aérea"
    },

    {
        category: "AERONAVES",
        question: "Qual característica é uma das principais do F-35 Lightning II?",
        answers: [
            "Baixa observabilidade e sensores avançados",
            "Transporte de tanques",
            "Operação exclusivamente terrestre",
            "Uso como submarino"
        ],
        correct: "Baixa observabilidade e sensores avançados"
    },

    {
        category: "VEÍCULOS BLINDADOS",
        question: "O M1 Abrams é classificado como:",
        answers: [
            "Carro de combate principal",
            "Veículo de transporte aéreo",
            "Helicóptero de ataque",
            "Navio de guerra"
        ],
        correct: "Carro de combate principal"
    },

    {
        category: "VEÍCULOS MILITARES",
        question: "O Humvee é conhecido principalmente como:",
        answers: [
            "Veículo militar leve e multifuncional",
            "Caça supersônico",
            "Tanque pesado",
            "Submarino nuclear"
        ],
        correct: "Veículo militar leve e multifuncional"
    },

    {
        category: "FORÇAS NAVAIS",
        question: "Qual é uma das principais funções de um porta-aviões?",
        answers: [
            "Servir como base móvel para aeronaves",
            "Transportar exclusivamente tanques",
            "Substituir radares terrestres",
            "Operar como submarino"
        ],
        correct: "Servir como base móvel para aeronaves"
    },

    {
        category: "DEFESA NAVAL",
        question: "O sistema Phalanx CIWS é projetado principalmente para:",
        answers: [
            "Defesa aproximada contra ameaças",
            "Transporte de tropas",
            "Reabastecimento de aeronaves",
            "Comunicação por satélite"
        ],
        correct: "Defesa aproximada contra ameaças"
    },

    {
        category: "DEFESA AÉREA",
        question: "O sistema RIM-116 RAM é utilizado principalmente para:",
        answers: [
            "Defesa contra ameaças aéreas e mísseis",
            "Transporte de combustível",
            "Comunicação entre soldados",
            "Reconhecimento terrestre"
        ],
        correct: "Defesa contra ameaças aéreas e mísseis"
    },

    {
        category: "SENSORES",
        question: "Qual é a principal função de um radar?",
        answers: [
            "Detectar e acompanhar objetos usando ondas de rádio",
            "Transportar soldados",
            "Abastecer aeronaves",
            "Produzir combustível"
        ],
        correct: "Detectar e acompanhar objetos usando ondas de rádio"
    },

    {
        category: "VEÍCULOS AÉREOS NÃO TRIPULADOS",
        question: "O que caracteriza um UAV, também conhecido como drone?",
        answers: [
            "Pode operar sem um piloto fisicamente dentro da aeronave",
            "É sempre controlado por uma pessoa dentro dele",
            "Funciona exclusivamente debaixo d'água",
            "É necessariamente um veículo terrestre"
        ],
        correct: "Pode operar sem um piloto fisicamente dentro da aeronave"
    },

    {
        category: "PORTA-AVIÕES",
        question: "Qual é a função do sistema EMALS em porta-aviões modernos?",
        answers: [
            "Auxiliar no lançamento de aeronaves",
            "Detectar submarinos",
            "Resfriar motores",
            "Transportar munição"
        ],
        correct: "Auxiliar no lançamento de aeronaves"
    },

    {
        category: "AERONAVES",
        question: "O F-16 é conhecido principalmente como:",
        answers: [
            "Caça multifunção",
            "Avião de transporte pesado",
            "Helicóptero de ataque",
            "Aeronave de treinamento civil"
        ],
        correct: "Caça multifunção"
    },

    {
        category: "HELICÓPTEROS",
        question: "O AH-64 Apache é conhecido como:",
        answers: [
            "Helicóptero de ataque",
            "Caça naval",
            "Avião de transporte",
            "Veículo blindado"
        ],
        correct: "Helicóptero de ataque"
    }
];

// ======================================================
// ELEMENTOS DA INTERFACE
// ======================================================

const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const resultScreen = document.getElementById("result-screen");

const startButton = document.getElementById("start-button");
const restartButton = document.getElementById("restart-button");

const questionNumber = document.getElementById("question-number");
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");

const scoreElement = document.getElementById("score");
const categoryElement = document.getElementById("category");

const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");

const feedbackElement = document.getElementById("feedback");

const finalScoreElement = document.getElementById("final-score");
const resultMessageElement = document.getElementById("result-message");

// ======================================================
// INICIAR O JOGO
// ======================================================

startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", startGame);

async function startGame() {

    currentQuestion = 0;
    score = 0;

    updateScore();

    showScreen(gameScreen);

    questionElement.textContent = "Conectando ao banco de dados...";
    answersElement.innerHTML = "";

    feedbackElement.textContent = "";

    /*
    ======================================================
    CONSUMO DA API
    ======================================================

    A função fetch() realiza uma requisição para a
    Open Trivia Database.

    async/await permite esperar a resposta da API
    antes de continuar a execução do código.
    */

    try {

        const response = await fetch(
            "https://opentdb.com/api.php?amount=20&type=multiple"
        );

        // Verifica se a resposta da API foi bem-sucedida
        if (!response.ok) {
            throw new Error("Erro ao acessar a API.");
        }

        /*
        Converte a resposta recebida para JSON.
        */

        const data = await response.json();

        /*
        Os resultados recebidos ficam dentro de
        data.results.
        */

        let apiQuestions = data.results || [];

        /*
        ==================================================
        TRADUÇÃO DAS PERGUNTAS DA API
        ==================================================

        A Open Trivia Database pode retornar perguntas
        em inglês.

        Por isso, cada pergunta compatível é traduzida
        para português antes de ser utilizada no jogo.
        */

        apiQuestions = await translateApiQuestions(apiQuestions);

        /*
        Filtra apenas perguntas que possuem relação
        com tecnologia, ciência, veículos, aeronaves,
        engenharia etc.
        */

        apiQuestions = filterApiQuestions(apiQuestions);

        /*
        Junta as perguntas recebidas da API com o
        banco de perguntas militares em português.
        */

        const combinedQuestions = [
            ...apiQuestions,
            ...militaryQuestions
        ];

        /*
        Embaralha todas as perguntas e seleciona
        somente a quantidade necessária para a partida.
        */

        questions = shuffleArray(combinedQuestions)
            .slice(0, TOTAL_QUESTIONS);

        /*
        Caso a API não forneça perguntas suficientes,
        o banco local garante que o jogo continue.
        */

        if (questions.length < TOTAL_QUESTIONS) {

            questions = shuffleArray([
                ...militaryQuestions,
                ...apiQuestions
            ]).slice(0, TOTAL_QUESTIONS);
        }

        showQuestion();

    } catch (error) {

        /*
        ==================================================
        TRATAMENTO DE ERRO DA API
        ==================================================

        Caso a API esteja indisponível, o jogo utiliza
        o banco local de perguntas militares em português.
        */

        console.error("Erro na API:", error);

        questions = shuffleArray([
            ...militaryQuestions
        ]).slice(0, TOTAL_QUESTIONS);

        showQuestion();
    }
}

// ======================================================
// TRADUZIR PERGUNTAS DA API
// ======================================================

async function translateApiQuestions(apiQuestions) {

    const translatedQuestions = [];

    for (const question of apiQuestions) {

        try {

            const translatedQuestion =
                await translateText(question.question);

            const translatedCorrect =
                await translateText(question.correct_answer);

            const translatedIncorrect = [];

            for (const answer of question.incorrect_answers) {

                const translated =
                    await translateText(answer);

                translatedIncorrect.push(translated);
            }

            translatedQuestions.push({
                category: "DADOS DA API",
                question: translatedQuestion,
                correct_answer: translatedCorrect,
                incorrect_answers: translatedIncorrect
            });

        } catch (error) {

            /*
            Se uma pergunta não puder ser traduzida,
            ela não será colocada no jogo.
            */

            console.warn(
                "Não foi possível traduzir uma pergunta da API."
            );
        }
    }

    return translatedQuestions;
}

// ======================================================
// TRADUÇÃO DE TEXTO
// ======================================================

async function translateText(text) {

    /*
    Serviço utilizado para traduzir o conteúdo recebido
    da Open Trivia Database.

    sl = idioma de origem
    tl = idioma de destino
    */

    const url =
        "https://translate.googleapis.com/translate_a/single" +
        "?client=gtx" +
        "&sl=en" +
        "&tl=pt" +
        "&dt=t" +
        "&q=" +
        encodeURIComponent(text);

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Erro na tradução.");
    }

    const data = await response.json();

    /*
    A resposta da tradução contém os trechos
    traduzidos dentro do primeiro elemento.
    */

    return data[0]
        .map(item => item[0])
        .join("");
}

// ======================================================
// FILTRAR PERGUNTAS DA API
// ======================================================

function filterApiQuestions(apiQuestions) {

    const keywords = [
        "technology",
        "computer",
        "science",
        "engineering",
        "aircraft",
        "radar",
        "satellite",
        "robot",
        "vehicle",
        "engine",
        "space",
        "electronic",
        "military",
        "physics"
    ];

    return apiQuestions.filter(question => {

        const text = (
            question.question +
            " " +
            question.category
        ).toLowerCase();

        return keywords.some(keyword =>
            text.includes(keyword)
        );
    });
}

// ======================================================
// MOSTRAR PERGUNTA
// ======================================================

function showQuestion() {

    feedbackElement.textContent = "";

    if (currentQuestion >= questions.length) {

        finishGame();
        return;
    }

    const question = questions[currentQuestion];

    questionNumber.textContent =
        String(currentQuestion + 1).padStart(2, "0");

    categoryElement.textContent =
        question.category || "MILITARY TECHNOLOGY";

    questionElement.textContent =
        decodeHTML(question.question);

    updateProgress();

    createAnswers(question);
}

// ======================================================
// CRIAR ALTERNATIVAS
// ======================================================

function createAnswers(question) {

    answersElement.innerHTML = "";

    let answers = [];

    /*
    Perguntas do banco local
    */

    if (question.answers) {

        answers = question.answers.map(answer => ({
            text: answer,
            correct: answer === question.correct
        }));

    }

    /*
    Perguntas recebidas da API
    */

    else {

        answers.push({
            text: question.correct_answer,
            correct: true
        });

        question.incorrect_answers.forEach(answer => {

            answers.push({
                text: answer,
                correct: false
            });

        });
    }

    answers = shuffleArray(answers);

    answers.forEach((answer, index) => {

        const button = document.createElement("button");

        button.classList.add("answer-button");

        button.innerHTML = `
            <span class="answer-letter">
                ${String.fromCharCode(65 + index)}
            </span>

            <span>
                ${decodeHTML(answer.text)}
            </span>
        `;

        button.addEventListener("click", () => {

            checkAnswer(answer.correct, button);
        });

        answersElement.appendChild(button);
    });
}

// ======================================================
// VERIFICAR RESPOSTA
// ======================================================

function checkAnswer(isCorrect, selectedButton) {

    const buttons =
        document.querySelectorAll(".answer-button");

    // Impede o jogador de clicar várias vezes
    buttons.forEach(button => {
        button.disabled = true;
    });

    if (isCorrect) {

        selectedButton.classList.add("correct");

        feedbackElement.textContent =
            "✓ RESPOSTA CORRETA // +100 PONTOS";

        feedbackElement.className =
            "feedback correct-feedback";

        score += 100;

        updateScore();

        setTimeout(() => {

            currentQuestion++;

            showQuestion();

        }, 1000);

    } else {

        selectedButton.classList.add("wrong");

        feedbackElement.textContent =
            "✕ RESPOSTA INCORRETA";

        feedbackElement.className =
            "feedback wrong-feedback";

        setTimeout(() => {

            finishGame();

        }, 1200);
    }
}

// ======================================================
// FINALIZAR JOGO
// ======================================================

function finishGame() {

    showScreen(resultScreen);

    finalScoreElement.textContent =
        formatScore(score);

    let message = "";

    if (score === 1000) {

        message =
            "EXCELENTE! Você demonstrou domínio dos sistemas e veículos militares.";

    } else if (score >= 700) {

        message =
            "ÓTIMO DESEMPENHO! Seu conhecimento tecnológico é avançado.";

    } else if (score >= 400) {

        message =
            "BOM TRABALHO! Você possui bons conhecimentos sobre tecnologia militar.";

    } else {

        message =
            "MISSÃO ENCERRADA. Continue estudando para melhorar seu desempenho.";
    }

    resultMessageElement.textContent = message;
}

// ======================================================
// ATUALIZAR PROGRESSO
// ======================================================

function updateProgress() {

    const progress =
        ((currentQuestion + 1) / TOTAL_QUESTIONS) * 100;

    progressBar.style.width = `${progress}%`;

    progressText.textContent =
        `${Math.round(progress)}%`;
}

// ======================================================
// ATUALIZAR PONTUAÇÃO
// ======================================================

function updateScore() {

    scoreElement.textContent =
        formatScore(score);
}

// ======================================================
// FORMATAR PONTUAÇÃO
// ======================================================

function formatScore(value) {

    return String(value).padStart(4, "0");
}

// ======================================================
// TROCAR TELA
// ======================================================

function showScreen(screen) {

    startScreen.classList.remove("active");
    gameScreen.classList.remove("active");
    resultScreen.classList.remove("active");

    screen.classList.add("active");
}

// ======================================================
// EMBARALHAR ARRAY
// ======================================================

function shuffleArray(array) {

    const newArray = [...array];

    for (
        let i = newArray.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(Math.random() * (i + 1));

        [
            newArray[i],
            newArray[j]
        ] = [
            newArray[j],
            newArray[i]
        ];
    }

    return newArray;
}

// ======================================================
// DECODIFICAR HTML DA API
// ======================================================

function decodeHTML(text) {

    const textarea =
        document.createElement("textarea");

    textarea.innerHTML = text;

    return textarea.value;
}
```