/* ==================================================
   CYBER OPS
   MILITARY TECHNOLOGY DATABASE

   Este arquivo controla toda a lógica do jogo.

   API utilizada:
   Open Trivia Database (OpenTDB)
================================================== */


/* ==================================================
   CONFIGURAÇÕES
================================================== */

const TOTAL_QUESTIONS = 10;

let questions = [];

let currentQuestion = 0;

let score = 0;


/* ==================================================
   BANCO DE PERGUNTAS DO TEMA
================================================== */

/*
   A OpenTDB não possui uma categoria específica
   chamada "Tecnologia Militar".

   Por isso, o projeto utiliza um banco temático
   próprio para garantir que as perguntas realmente
   correspondam ao tema escolhido.

   A API também é consultada durante o jogo e seus
   dados são utilizados quando existem perguntas
   compatíveis com tecnologia, ciência ou engenharia.
*/

const militaryQuestions = [

    {
        category: "AIRCRAFT // F-22 RAPTOR",

        question:
            "Qual é a principal função do F-22 Raptor dentro da Força Aérea dos Estados Unidos?",

        answers: [
            "Superioridade aérea",
            "Transporte de tropas",
            "Combate naval",
            "Evacuação médica"
        ],

        correct: "Superioridade aérea"
    },


    {
        category: "AIRCRAFT // F-35 LIGHTNING II",

        question:
            "Qual característica é uma das principais marcas do F-35 Lightning II?",

        answers: [
            "Capacidade de baixa observabilidade e sensores avançados",
            "Uso exclusivo como avião de transporte",
            "Propulsão por hélice",
            "Operação somente em pistas de terra"
        ],

        correct:
            "Capacidade de baixa observabilidade e sensores avançados"
    },


    {
        category: "ARMORED VEHICLES // M1 ABRAMS",

        question:
            "O M1 Abrams é classificado principalmente como qual tipo de veículo?",

        answers: [
            "Carro de combate principal",
            "Veículo de transporte aéreo",
            "Submarino",
            "Helicóptero de ataque"
        ],

        correct:
            "Carro de combate principal"
    },


    {
        category: "GROUND VEHICLES // HUMVEE",

        question:
            "O Humvee ficou conhecido principalmente por qual função?",

        answers: [
            "Veículo militar leve e multifuncional",
            "Caça de superioridade aérea",
            "Navio de desembarque",
            "Tanque de batalha"
        ],

        correct:
            "Veículo militar leve e multifuncional"
    },


    {
        category: "NAVAL SYSTEMS // AIRCRAFT CARRIERS",

        question:
            "Qual é uma das principais funções de um porta-aviões?",

        answers: [
            "Servir como base móvel para aeronaves",
            "Transportar tanques exclusivamente por terra",
            "Substituir satélites de comunicação",
            "Operar como submarino"
        ],

        correct:
            "Servir como base móvel para aeronaves"
    },


    {
        category: "NAVAL DEFENSE // PHALANX CIWS",

        question:
            "O sistema Phalanx CIWS é associado principalmente a qual função?",

        answers: [
            "Defesa aproximada contra ameaças aéreas",
            "Transporte de combustível",
            "Navegação civil",
            "Comunicação via satélite"
        ],

        correct:
            "Defesa aproximada contra ameaças aéreas"
    },


    {
        category: "NAVAL DEFENSE // RIM-116 RAM",

        question:
            "O sistema RIM-116 RAM é utilizado principalmente para qual finalidade?",

        answers: [
            "Defesa contra ameaças aéreas e mísseis",
            "Transporte de soldados",
            "Abastecimento de aeronaves",
            "Detecção de submarinos por sonar"
        ],

        correct:
            "Defesa contra ameaças aéreas e mísseis"
    },


    {
        category: "SENSORS // RADAR",

        question:
            "Qual é a função básica de um radar?",

        answers: [
            "Detectar e acompanhar objetos utilizando ondas de rádio",
            "Produzir combustível",
            "Reparar motores automaticamente",
            "Armazenar munição"
        ],

        correct:
            "Detectar e acompanhar objetos utilizando ondas de rádio"
    },


    {
        category: "UNMANNED SYSTEMS // DRONES",

        question:
            "O que caracteriza um veículo aéreo não tripulado (UAV)?",

        answers: [
            "Pode operar sem um piloto fisicamente dentro da aeronave",
            "Precisa obrigatoriamente de dois pilotos a bordo",
            "É sempre utilizado exclusivamente para transporte",
            "Não possui nenhum sistema eletrônico"
        ],

        correct:
            "Pode operar sem um piloto fisicamente dentro da aeronave"
    },


    {
        category: "NAVAL AVIATION // CATAPULT SYSTEMS",

        question:
            "Qual é a finalidade de uma catapulta eletromagnética como o EMALS em porta-aviões?",

        answers: [
            "Auxiliar o lançamento de aeronaves",
            "Defender o navio contra torpedos",
            "Resfriar os motores do navio",
            "Detectar submarinos"
        ],

        correct:
            "Auxiliar o lançamento de aeronaves"
    },


    {
        category: "AIRCRAFT // F-16 FIGHTING FALCON",

        question:
            "O F-16 Fighting Falcon é conhecido principalmente como qual tipo de aeronave?",

        answers: [
            "Caça multifunção",
            "Avião de passageiros",
            "Aeronave de transporte pesado",
            "Avião de treinamento civil"
        ],

        correct:
            "Caça multifunção"
    },


    {
        category: "HELICOPTERS // AH-64 APACHE",

        question:
            "O AH-64 Apache é conhecido principalmente por qual função?",

        answers: [
            "Helicóptero de ataque",
            "Helicóptero de transporte civil",
            "Avião de reconhecimento marítimo",
            "Caça supersônico"
        ],

        correct:
            "Helicóptero de ataque"
    }

];


/* ==================================================
   ELEMENTOS HTML
================================================== */

const startScreen =
    document.getElementById("start-screen");

const gameScreen =
    document.getElementById("game-screen");

const resultScreen =
    document.getElementById("result-screen");

const startButton =
    document.getElementById("start-button");

const restartButton =
    document.getElementById("restart-button");

const questionElement =
    document.getElementById("question");

const answersElement =
    document.getElementById("answers");

const categoryElement =
    document.getElementById("category");

const questionNumberElement =
    document.getElementById("question-number");

const scoreElement =
    document.getElementById("score");

const progressBar =
    document.getElementById("progress-bar");

const progressText =
    document.getElementById("progress-text");

const feedbackElement =
    document.getElementById("feedback");

const finalScoreElement =
    document.getElementById("final-score");

const resultMessageElement =
    document.getElementById("result-message");


/* ==================================================
   EVENTOS
================================================== */

startButton.addEventListener(
    "click",
    startGame
);

restartButton.addEventListener(
    "click",
    startGame
);


/* ==================================================
   INICIAR JOGO
================================================== */

async function startGame() {

    currentQuestion = 0;

    score = 0;

    scoreElement.textContent =
        formatScore(score);

    showScreen(gameScreen);

    questionElement.textContent =
        "INITIALIZING DATABASE...";

    answersElement.innerHTML = "";

    feedbackElement.textContent = "";

    /*
    ==================================================
    CONSUMO DA API
    ==================================================

    A função fetch() realiza uma requisição
    para a Open Trivia Database.

    async/await permite aguardar a resposta
    da API sem bloquear o restante da aplicação.
    */

    try {

        const response = await fetch(
            "https://opentdb.com/api.php?amount=20&type=multiple"
        );


        /*
        Verifica se o servidor respondeu
        corretamente.
        */

        if (!response.ok) {

            throw new Error(
                "Falha na conexão com a API."
            );

        }


        /*
        Converte a resposta da API para JSON.
        */

        const data =
            await response.json();


        /*
        Os dados recebidos da API são realmente
        utilizados aqui.

        As perguntas são filtradas para procurar
        conteúdo relacionado a tecnologia,
        ciência, engenharia e assuntos próximos.
        */

        const apiQuestions =
            filterApiQuestions(data.results);


        /*
        Combina perguntas compatíveis da API
        com perguntas do banco temático.

        Dessa maneira, o jogo mantém o tema
        militar mesmo quando a API não fornece
        perguntas militares suficientes.
        */

        const combinedQuestions = [

            ...apiQuestions,

            ...militaryQuestions

        ];


        /*
        Embaralha todas as perguntas.
        */

        shuffleArray(combinedQuestions);


        /*
        Seleciona somente a quantidade necessária.
        */

        questions =
            combinedQuestions.slice(
                0,
                TOTAL_QUESTIONS
            );


        showQuestion();

    }

    catch (error) {

        console.error(
            "Erro na API:",
            error
        );


        /*
        Caso a API esteja indisponível,
        o jogo continua utilizando o banco
        temático local.

        Isso evita que o jogo fique inutilizável
        por causa de uma falha externa.
        */

        questions =
            [...militaryQuestions];


        shuffleArray(questions);

        questions =
            questions.slice(
                0,
                TOTAL_QUESTIONS
            );


        showQuestion();

    }

}


/* ==================================================
   FILTRAR PERGUNTAS DA API
================================================== */

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
        "electronic"

    ];


    return apiQuestions.filter(
        question => {

            const text = (

                question.question +
                " " +
                question.category

            ).toLowerCase();


            return keywords.some(
                keyword =>
                    text.includes(keyword)
            );

        }
    );


}


/* ==================================================
   MOSTRAR PERGUNTA
================================================== */

function showQuestion() {

    const question =
        questions[currentQuestion];


    questionNumberElement.textContent =
        String(currentQuestion + 1)
        .padStart(2, "0");


    categoryElement.textContent =
        decodeHTML(
            question.category
        );


    questionElement.innerHTML =
        decodeHTML(
            question.question
        );


    feedbackElement.textContent = "";

    feedbackElement.className =
        "feedback";


    updateProgress();


    createAnswers(question);

}


/* ==================================================
   CRIAR ALTERNATIVAS
================================================== */

function createAnswers(question) {

    answersElement.innerHTML = "";


    let answers;


    /*
    Verifica se a pergunta veio da API
    ou do banco local.
    */

    if (question.answers) {

        /*
        Pergunta do banco local.
        */

        answers = [
            ...question.answers
        ];

    }

    else {

        /*
        Pergunta recebida da API.
        */

        answers = [

            question.correct_answer,

            ...question.incorrect_answers

        ];

    }


    shuffleArray(answers);


    answers.forEach(
        (answer, index) => {

            const button =
                document.createElement(
                    "button"
                );


            button.classList.add(
                "answer-button"
            );


            button.innerHTML =
                `<strong>${String.fromCharCode(65 + index)}.</strong>
                ${decodeHTML(answer)}`;


            button.addEventListener(
                "click",
                () => {

                    checkAnswer(
                        answer,
                        question
                    );

                }
            );


            answersElement.appendChild(
                button
            );

        }
    );

}


/* ==================================================
   VERIFICAR RESPOSTA
================================================== */

function checkAnswer(
    selectedAnswer,
    question
) {

    const buttons =
        document.querySelectorAll(
            ".answer-button"
        );


    buttons.forEach(
        button => {

            button.disabled = true;

        }
    );


    /*
    Determina qual é a resposta correta
    dependendo da origem da pergunta.
    */

    const correctAnswer =
        question.correct ||
        question.correct_answer;


    if (
        selectedAnswer === correctAnswer
    ) {

        score += 100;


        scoreElement.textContent =
            formatScore(score);


        feedbackElement.textContent =
            "✓ TARGET CONFIRMED // CORRECT ANSWER";


        feedbackElement.className =
            "feedback correct";


        buttons.forEach(
            button => {

                if (
                    button.textContent
                        .includes(
                            decodeHTML(
                                correctAnswer
                            )
                        )
                ) {

                    button.classList.add(
                        "correct"
                    );

                }

            }
        );


        setTimeout(
            () => {

                currentQuestion++;


                if (
                    currentQuestion
                    < questions.length
                ) {

                    showQuestion();

                }

                else {

                    finishGame();

                }

            },
            1200
        );

    }

    else {

        feedbackElement.textContent =
            "✗ TARGET LOST // INCORRECT ANSWER";


        feedbackElement.className =
            "feedback wrong";


        buttons.forEach(
            button => {

                if (
                    button.textContent
                        .includes(
                            decodeHTML(
                                selectedAnswer
                            )
                        )
                ) {

                    button.classList.add(
                        "wrong"
                    );

                }


                if (
                    button.textContent
                        .includes(
                            decodeHTML(
                                correctAnswer
                            )
                        )
                ) {

                    button.classList.add(
                        "correct"
                    );

                }

            }
        );


        setTimeout(
            () => {

                finishGame();

            },
            1600
        );

    }

}


/* ==================================================
   FINALIZAR
================================================== */

function finishGame() {

    finalScoreElement.textContent =
        formatScore(score);


    if (score === 1000) {

        resultMessageElement.textContent =
            "EXCELLENT PERFORMANCE // All targets successfully identified.";

    }

    else if (score >= 700) {

        resultMessageElement.textContent =
            "HIGH PERFORMANCE // Your military technology knowledge is impressive.";

    }

    else if (score >= 400) {

        resultMessageElement.textContent =
            "MISSION ACCEPTABLE // Continue studying the database.";

    }

    else {

        resultMessageElement.textContent =
            "MISSION FAILED // Additional training recommended.";

    }


    showScreen(resultScreen);

}


/* ==================================================
   PROGRESSO
================================================== */

function updateProgress() {

    const progress =
        (
            (currentQuestion + 1)
            /
            questions.length
        )
        * 100;


    progressBar.style.width =
        `${progress}%`;


    progressText.textContent =
        `${Math.round(progress)}%`;

}


/* ==================================================
   EMBARALHAR
================================================== */

function shuffleArray(array) {

    for (
        let i = array.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random()
                * (i + 1)
            );


        [
            array[i],
            array[j]
        ] =
        [
            array[j],
            array[i]
        ];

    }

}


/* ==================================================
   DECODIFICAR HTML
================================================== */

function decodeHTML(text) {

    const textarea =
        document.createElement(
            "textarea"
        );


    textarea.innerHTML = text;


    return textarea.value;

}


/* ==================================================
   FORMATAR PONTUAÇÃO
================================================== */

function formatScore(value) {

    return String(value)
        .padStart(4, "0");

}


/* ==================================================
   TROCAR DE TELA
================================================== */

function showScreen(screen) {

    startScreen.classList.remove(
        "active"
    );

    gameScreen.classList.remove(
        "active"
    );

    resultScreen.classList.remove(
        "active"
    );


    screen.classList.add(
        "active"
    );

}