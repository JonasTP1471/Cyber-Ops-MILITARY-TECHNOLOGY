# ◈ CYBER OPS // Military Technology

## 🛰️ Descrição

O **CYBER OPS** é um jogo de perguntas e respostas inspirado em programas de competição de conhecimentos gerais, mas com uma identidade visual baseada em interfaces futuristas, sistemas HUD e estética cyberpunk.

O tema escolhido para o projeto é **Tecnologia Militar**, abordando conhecimentos gerais sobre aeronaves, veículos blindados, navios, sistemas de defesa, radares, drones e outras tecnologias utilizadas no setor militar.

O objetivo do jogo é responder corretamente às perguntas e acumular pontos.

---

# 🎯 Tema

O tema principal do jogo é:

**Tecnologia Militar**

Entre os assuntos abordados estão:

- F-22 Raptor;
- F-35 Lightning II;
- F-16 Fighting Falcon;
- M1 Abrams;
- Humvee;
- AH-64 Apache;
- porta-aviões;
- sistemas de defesa naval;
- Phalanx CIWS;
- RIM-116 RAM;
- radares;
- drones;
- sistemas de lançamento de aeronaves;
- sensores e tecnologias relacionadas.

As perguntas possuem finalidade exclusivamente educacional e tratam das tecnologias em nível geral.

---

# 🎨 Identidade visual

A identidade visual foi inspirada em interfaces futuristas de computadores e sistemas HUD.

### Principais características:

- fundo escuro;
- ciano neon;
- roxo neon;
- verde para indicação de sistema ativo;
- linhas digitais;
- efeitos de brilho;
- grade futurista;
- painéis de informações;
- indicadores de sistema;
- aparência de terminal militar futurista.

O objetivo foi criar uma identidade própria em vez de simplesmente copiar a aparência do programa Show do Milhão.

---

# 🛠️ Tecnologias utilizadas

O projeto utiliza:

- HTML5;
- CSS3;
- JavaScript;
- Fetch API;
- Async/Await;
- Open Trivia Database;
- Git;
- GitHub;
- GitHub Pages.

---

# 📁 Estrutura do projeto

```text
CYBER-OPS/
│
├── index.html
├── style.css
├── script.js
└── README.md
# 🌐 API UTILIZADA — OPEN TRIVIA DATABASE

O projeto utiliza a **Open Trivia Database (OpenTDB)** como API externa para obtenção de perguntas de múltipla escolha.

A OpenTDB é uma API gratuita que disponibiliza perguntas de diferentes categorias em formato **JSON**. Ela foi escolhida para o projeto porque permite realizar requisições diretamente pelo JavaScript utilizando a função `fetch()`.

## 🔗 Open Trivia Database

Site oficial:

https://opentdb.com/

A API possui diferentes parâmetros que permitem definir a quantidade e o tipo de perguntas solicitadas.

Neste projeto, é utilizada a seguinte requisição:

```javascript
const response = await fetch(
    "https://opentdb.com/api.php?amount=20&type=multiple"
);
```

Nessa URL:

- `amount=20` solicita 20 perguntas;
- `type=multiple` solicita perguntas de múltipla escolha.

A API retorna os dados em formato JSON.

---

## 📡 Como o JavaScript consulta a API

A consulta é realizada dentro da função `startGame()` no arquivo `script.js`.

O primeiro passo é utilizar o `fetch()`:

```javascript
const response = await fetch(
    "https://opentdb.com/api.php?amount=20&type=multiple"
);
```

O `fetch()` realiza uma requisição HTTP para o endereço da Open Trivia Database.

Como a resposta da API não é recebida instantaneamente, a função utiliza `async` e `await`.

A função responsável pela consulta é declarada como:

```javascript
async function startGame() {
```

E o `await` é utilizado para aguardar a resposta:

```javascript
const response = await fetch(...);
```

Dessa forma, o código espera a resposta da API antes de continuar o processamento.

---

## 📦 Conversão da resposta para JSON

Depois que a API responde, o JavaScript verifica se a requisição foi realizada corretamente:

```javascript
if (!response.ok) {
    throw new Error("Falha na conexão com a API.");
}
```

Em seguida, os dados recebidos são convertidos para JSON:

```javascript
const data = await response.json();
```

O JSON contém informações como:

- texto da pergunta;
- categoria;
- resposta correta;
- respostas incorretas.

Um exemplo simplificado de uma resposta da API seria:

```json
{
    "question": "What is the capital of France?",
    "correct_answer": "Paris",
    "incorrect_answers": [
        "London",
        "Berlin",
        "Madrid"
    ]
}
```

---

## 🔎 Como os dados da API são utilizados

Os resultados recebidos são armazenados em:

```javascript
data.results
```

O projeto então utiliza:

```javascript
const apiQuestions =
    filterApiQuestions(data.results);
```

A função `filterApiQuestions()` analisa as perguntas recebidas e procura termos relacionados a tecnologia, ciência, engenharia, aeronaves, radares, satélites, veículos e outros assuntos relacionados.

Isso é importante porque a OpenTDB é uma API de conhecimentos gerais e não possui uma categoria específica chamada **Tecnologia Militar**.

---

## ⚠️ Por que a OpenTDB não fornece todas as perguntas do jogo?

A Open Trivia Database possui diversas categorias de conhecimento, porém não possui uma categoria específica dedicada a veículos militares e sistemas de defesa.

Por esse motivo, o projeto utiliza duas fontes de perguntas:

### 1. Open Trivia Database

A API é consultada durante o funcionamento do jogo.

As perguntas recebidas são processadas pelo JavaScript e aquelas que possuem conteúdo relacionado a tecnologia, ciência ou engenharia podem ser utilizadas.

### 2. Banco temático próprio

O projeto também possui um conjunto de perguntas específicas sobre tecnologia militar no arquivo `script.js`.

Esse banco contém perguntas sobre assuntos como:

- F-22 Raptor;
- F-35 Lightning II;
- F-16 Fighting Falcon;
- M1 Abrams;
- Humvee;
- AH-64 Apache;
- porta-aviões;
- sistemas de defesa naval;
- Phalanx CIWS;
- RIM-116 RAM;
- radares;
- drones;
- sistemas de lançamento de aeronaves.

Essa solução permite cumprir o requisito de utilização de uma API externa sem perder a identidade temática do jogo.

---

## 🔄 Como as duas fontes são combinadas

Depois que as perguntas da API são processadas, elas são combinadas com as perguntas do banco temático:

```javascript
const combinedQuestions = [
    ...apiQuestions,
    ...militaryQuestions
];
```

Depois disso, todas as perguntas são embaralhadas:

```javascript
shuffleArray(combinedQuestions);
```

E o jogo seleciona somente a quantidade necessária:

```javascript
questions =
    combinedQuestions.slice(
        0,
        TOTAL_QUESTIONS
    );
```

Dessa forma, o JavaScript trabalha com os dados recebidos pela API e com o banco temático para montar a partida.

---

## 🛡️ Tratamento de erros da API

O projeto também possui um sistema de tratamento de erros utilizando `try...catch`.

Caso a API esteja temporariamente indisponível ou ocorra algum problema na conexão, o código identifica o erro:

```javascript
catch (error) {

    console.error(
        "Erro na API:",
        error
    );

    questions =
        [...militaryQuestions];

}
```

Nesse caso, o jogo utiliza o banco temático local para que a aplicação continue funcionando.

Isso evita que uma falha temporária da API impeça completamente o jogador de iniciar a partida.

---

## 🧠 Fluxo completo da API

O funcionamento pode ser resumido da seguinte maneira:

```text
JOGADOR
   ↓
Clica em "INITIALIZE MISSION"
   ↓
JavaScript executa fetch()
   ↓
Open Trivia Database
   ↓
API retorna dados em JSON
   ↓
JavaScript utiliza response.json()
   ↓
Perguntas são processadas
   ↓
Perguntas compatíveis são filtradas
   ↓
Perguntas da API + perguntas temáticas
   ↓
Perguntas são embaralhadas
   ↓
10 perguntas são selecionadas
   ↓
Perguntas aparecem na interface
   ↓
Jogador responde
   ↓
JavaScript verifica a resposta
   ↓
Pontuação é atualizada
```

---

## 📚 O que foi aprendido com a utilização da API

A utilização da Open Trivia Database permitiu aplicar conhecimentos de desenvolvimento web, principalmente:

- requisições HTTP;
- utilização do `fetch()`;
- funções `async`;
- utilização do `await`;
- conversão de respostas para JSON;
- manipulação de objetos e arrays;
- filtragem de informações;
- utilização de dados externos dentro de uma aplicação;
- tratamento de erros com `try...catch`.

Assim, a API não é utilizada apenas como parte visual ou documental do projeto. O JavaScript realiza uma requisição real, recebe dados externos, processa essas informações e utiliza os resultados durante o funcionamento do jogo.