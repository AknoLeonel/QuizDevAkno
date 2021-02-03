const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Qual a Fórmula da água ?',
        choice1: 'H²O',
        choice2: 'H³O²',
        choice3: 'H²so4',
        choice4: 'Fórmula? ',
        answer: 1,
    },
    {
        question: 'Qual é o triângulo que tem todos os lados diferentes',
        choice1: 'Equilátero',
        choice2: 'Isóceles',
        choice3: 'Escaleno',
        choice4: 'Trapézio',
        answer: 3,
    },
    { 
        question: 'Que nome se dá à purificação por meio da água',
        choice1: 'Abolição',
        choice2: 'Abnegação',
        choice3: 'Ablução',
        choice4: 'Abrupção',
        answer: 3,
    },
    {
        question: 'Uma pessoa que é cleptomaníaca é',
        choice1: 'Colecionadora',
        choice2: 'Decoradora',
        choice3: 'Médica',
        choice4: 'Doente',
        answer: 4,
    },
    {
        question: 'De onde era natural o pintor Picasso?',
        choice1: 'Espanha',
        choice2: 'Holanda',
        choice3: 'França',
        choice4: 'Bélgica',
        answer: 1,
    },
    {
        question: 'Quem compôs o concerto As Quatro Estações?',
        choice1: 'Antonio Vivaldi',
        choice2: 'Antonio Carlos Jobim',
        choice3: 'Richard Wagner',
        choice4: 'Richard Dreyfuss',
        answer: 1,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 6

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()