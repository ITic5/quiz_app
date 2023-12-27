const questions = [
    {
        question: "Naslov 25-og filma o James Bond-u je:",
        answers: [
            {text: "Licence to kill", correct: false},
            {text: "No time to die", correct: true},
            {text: "Die another day", correct: false},
            {text: "Skyfall", correct: false}
        ]
    },
    {
        question: "Prva tramvajska linija u Beogradu, koja je bila od Kalemegdana do Slavije, počela je sa radom?",
        answers: [
            {text: "1912. godine", correct: false},
            {text: "1902. godine", correct: false},
            {text: "1892. godine", correct: true},
            {text: "1922. godine", correct: false}
        ]
    },
    {
        question: "U kojem od navedenih gangsterskih filmova NIJE glumio Robert De Niro?",
        answers: [
            {text: "Kum", correct: false},
            {text: "Kasino", correct: false},
            {text: "Lice sa oziljkom", correct: true},
            {text: "Dzeki Braun", correct: false}
        ]
    },
    {
        question: "Puno ime Ane Frank je?",
        answers: [
            {text: "Anet Mari Frank", correct: false},
            {text: "Anelis Mari Frank", correct: true},
            {text: "Anabel Mari Frank", correct: false},
            {text: "Anisa Mari Frank", correct: false}
        ]
    },
    {
        question: "Koje godine je počeo Prvi svjetski rat?",
        answers: [
            {text: "1914. godine", correct: true},
            {text: "1913. godine", correct: false},
            {text: "1916. godine", correct: false},
            {text: "1915. godine", correct: false}
        ]
    },
    {
        question: "Više od polovine Novozelanđana se izjašnjava kao?",
        answers: [
            {text: "Hriscani", correct: true},
            {text: "Budisti", correct: false},
            {text: "Muslimani", correct: false},
            {text: "Ateisti", correct: false}
        ]
    },
    {
        question: "Koje godine je osnovana Narodna Republika Kina?",
        answers: [
            {text: "1949. godine", correct: true},
            {text: "1946. godine", correct: false},
            {text: "1947. godine", correct: false},
            {text: "1945. godine", correct: false}
        ]
    },
    {
        question: "Sa kojom od navedenih država Španija ne graniči?",
        answers: [
            {text: "Portugalija", correct: false},
            {text: "Andora", correct: false},
            {text: "Svajcarska", correct: true},
            {text: "Francuska", correct: false}
        ]
    },
    {
        question: "Crkva Santa Marija dela Gracije, poznata po fresci Tajna večera, autora Leonarda da Vinčija, nalazi se u?",
        answers: [
            {text: "Veroni", correct: false},
            {text: "Djenovi", correct: false},
            {text: "Milanu", correct: true},
            {text: "Firenci", correct: false}
        ]
    },
    {
        question: "Glavni grad Japana je?",
        answers: [
            {text: "Osaka", correct: false},
            {text: "Kjoto", correct: false},
            {text: "Hirosima", correct: false},
            {text: "Tokio", correct: true}
        ]
    },
    
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex =  0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0; 
    nextButton.innerHTML = "Next";
    shuffleArray(questions);
    showQuestion();
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Vas rezultat je ${score} od ${questions.length}.`;
    nextButton.innerHTML = "Igraj ponovo"
    nextButton.style.display = "block"
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();