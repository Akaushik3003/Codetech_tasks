const questions = [
    {
        type: 'mcq',
        question: 'What symbol is used for single-line comments in JavaScript?',
        options: ['/*', '//', '<!--', '#'],
        correctAnswer: '//',
        feedback: '// is used for single-line comments in JavaScript.'
    },
    {
        type: 'input',
        question: 'What is the output of typeof null in JavaScript?',
        correctAnswer: 'object',
        feedback: 'Although it\'s a bug, typeof null returns \'object\'.'
    },
    {
        type: 'mcq',
        question: 'Which operator is used for strict equality comparison in JavaScript?',
        options: ['==', '===', '=', '!='],
        correctAnswer: '===',
        feedback: 'The === operator checks both value and type equality.'
    },
    {
        type: 'input',
        question: 'What method is used to add an element at the end of an array?',
        correctAnswer: 'push',
        feedback: 'The push() method adds one or more elements to the end of an array.'
    },
    {
        type: 'mcq',
        question: 'Which of these is not a JavaScript data type?',
        options: ['undefined', 'float', 'boolean', 'string'],
        correctAnswer: 'float',
        feedback: 'float is not a distinct data type in JavaScript. Numbers are represented by the Number type.'
    },
    {
        type: 'input',
        question: 'What keyword is used to declare a variable that cannot be reassigned?',
        correctAnswer: 'const',
        feedback: 'const is used to declare constants that cannot be reassigned.'
    },
    {
        type: 'mcq',
        question: 'What is the correct way to check if x is NOT equal to 5?',
        options: ['x <> 5', 'x != 5', 'x not 5', 'x !== 5'],
        correctAnswer: 'x !== 5',
        feedback: 'x !== 5 is the strict inequality operator, checking both value and type.'
    },
    {
        type: 'input',
        question: 'What method converts a string to all uppercase letters?',
        correctAnswer: 'toUpperCase',
        feedback: 'The toUpperCase() method returns the string converted to uppercase.'
    },
    {
        type: 'mcq',
        question: 'Which event occurs when a user clicks on an HTML element?',
        options: ['onmouseclick', 'onclick', 'onpress', 'ontouch'],
        correctAnswer: 'onclick',
        feedback: 'onclick is the correct event handler for click events in JavaScript.'
    },
    {
        type: 'input',
        question: 'What function is used to parse a JSON string?',
        correctAnswer: 'JSON.parse',
        feedback: 'JSON.parse() converts a JSON string into a JavaScript object.'
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options-container');
const inputContainer = document.getElementById('input-container');
const answerInput = document.getElementById('answer-input');
const feedbackElement = document.getElementById('feedback');
const nextButton = document.getElementById('next-btn');
const scoreDisplay = document.getElementById('score');
const restartButton = document.getElementById('restart-quiz-btn');

function displayQuestion() {
    const question = questions[currentQuestion];
    questionElement.textContent = question.question;
    feedbackElement.textContent = '';
    feedbackElement.className = 'feedback';
    answered = false;
    nextButton.disabled = true;

    if (question.type === 'mcq') {
        optionsContainer.style.display = 'flex';
        inputContainer.style.display = 'none';
        optionsContainer.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const label = document.createElement('label');
            label.className = 'option-label';
            
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'quiz-option';
            radio.value = option;
            radio.addEventListener('change', () => checkAnswer(option));
            
            label.appendChild(radio);
            label.appendChild(document.createTextNode(` ${option}`));
            optionsContainer.appendChild(label);
        });
    } else {
        optionsContainer.style.display = 'none';
        inputContainer.style.display = 'block';
        answerInput.value = '';
        answerInput.focus();
        
        answerInput.onkeyup = (e) => {
            if (e.key === 'Enter' && answerInput.value.trim() !== '') {
                checkAnswer(answerInput.value.trim());
            }
            nextButton.disabled = answerInput.value.trim() === '';
        };
    }
}

function checkAnswer(userAnswer) {
    if (answered) return;
    
    const question = questions[currentQuestion];
    const isCorrect = userAnswer.toLowerCase() === question.correctAnswer.toLowerCase();
    answered = true;
    nextButton.disabled = false;

    if (isCorrect) {
        score++;
        scoreDisplay.textContent = score;
        feedbackElement.textContent = `✅ Correct! ${question.feedback}`;
        feedbackElement.className = 'feedback correct';
    } else {
        feedbackElement.textContent = `❌ Incorrect. The correct answer is "${question.correctAnswer}". ${question.feedback}`;
        feedbackElement.className = 'feedback incorrect';
    }
}

function showFinalScore() {
    questionElement.textContent = 'Quiz Completed!';
    optionsContainer.style.display = 'none';
    inputContainer.style.display = 'none';
    feedbackElement.textContent = `Final Score: ${score} out of ${questions.length}`;
    feedbackElement.className = 'feedback';
    nextButton.style.display = 'none';
    restartButton.style.display = 'block'; // Show restart button
}

function initializeQuiz() {
    currentQuestion = 0;
    score = 0;
    answered = false;
    scoreDisplay.textContent = score;
    nextButton.style.display = 'block';
    restartButton.style.display = 'none';
    feedbackElement.textContent = '';
    feedbackElement.className = 'feedback';
    // Ensure quiz container is visible and title page is hidden
    document.getElementById('title-page').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block'; // Corrected ID here
    displayQuestion();
}

document.addEventListener('DOMContentLoaded', () => {
    const titlePage = document.getElementById('title-page');
    const quizContainer = document.getElementById('quiz-container'); // Corrected ID here
    const startButton = document.getElementById('start-quiz-btn'); // Corrected ID here

    startButton.addEventListener('click', () => {
        titlePage.style.display = 'none';
        quizContainer.style.display = 'block'; // Corrected ID here
        initializeQuiz();
    });

    restartButton.addEventListener('click', () => {
        initializeQuiz();
    });

    nextButton.addEventListener('click', () => {
        if (!answered && questions[currentQuestion].type === 'input') {
            checkAnswer(answerInput.value.trim());
            return;
        }
        
        currentQuestion++;
        if (currentQuestion < questions.length) {
            displayQuestion();
        } else {
            showFinalScore();
        }
    });
});