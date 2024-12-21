const quizData = [
  {
    question: 'What is the capital of India?',
    options: ['Kolkata', 'Delhi', 'Bengaluru', 'Hyderabad'],
    answer: 'Delhi',
  },
  {
    question: 'What does HTML stand For?',
    options: ['Hyper Text Markup Language', 'Hyper Tool Markup Language', 'Hyperlinks and Text Markup Language', 'None the Above'],
    answer: 'Hyper Text Markup Language',
  },
  {
    question: 'Which country won the ICC  Cricket T20 World Cup in 2024?',
    options: ['Australia', 'India', 'Pakistan', 'Sauth Africa'],
    answer: 'India',
  },
  {
    question: 'Which of the following is used to define a hyperlink in HTML??',
    options: ['<href>', '<ul>', '<link>', '<a>'],
    answer: '<a>',
  },
  {
    question: 'How do you create an ordered list in HTML?',
    options: [
      '<ol>',
      '<ul>',
      '<li>',
      '<dl>',
    ],
    answer: '<ol>',
  },
  {
    question: ' Which attribute is used to provide an alternate text for an image if it cannot be displayed?',
    options: ['src', 'href', 'alt', 'title'],
    answer: 'alt',
  },
  {
    question: 'What does the <div> tag in HTML represent?',
    options: [
      'A division or section',
      'A link',
      'A Form',
      'A Image',
    ],
    answer: 'A division or section',
  },
  {
    question: 'Which of the following is NOT a valid HTML element?',
    options: ['<title>', '<header>', '<footer>', '<body>', '<main>','<start>'],
    answer: '<start>',
  },
  {
    question: 'Which HTML tag is used to define the largest heading?',
    options: [
      '<head>',
      '<p>',
      '<h1>',
      '<h6>',
    ],
    answer: '<h1>',
  },
  {
    question: 'What is the default value of the position property in CSS?',
    options: ['Fixed', 'absolute', 'relative', 'static'],
    answer: 'static',
  },
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement('label');
    option.className = 'option';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'quiz';
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

function displayResult() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'inline-block';
  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
  showAnswerButton.style.display = 'none';
  resultContainer.innerHTML = '';
  displayQuestion();
}

function showAnswer() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'none';

  let incorrectAnswersHtml = '';
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
      <p>
        <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
        <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
        <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
      </p>
    `;
  }

  resultContainer.innerHTML = `
    <p>You scored ${score} out of ${quizData.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `;
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();