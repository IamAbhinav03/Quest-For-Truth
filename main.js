document.addEventListener("DOMContentLoaded", function () {
  const questionText = document.getElementById("question-text");
  const trueButton = document.getElementById("true-button");
  const falseButton = document.getElementById("false-button");
  const scoreDisplay = document.getElementById("score");
  const timerDisplay = document.getElementById("timer");

  let questions = []; // Array to store questions
  let currentQuestionIndex = 0; // Index of the current question
  let score = 0; // Score
  let timerInterval; // Interval for timer

  // Fetch questions from CSV file
  fetch("questions.csv")
    .then((response) => response.text())
    .then((data) => {
      questions = parseCSV(data);
      displayQuestion();
    });

  // Parse CSV data into an array of objects
  function parseCSV(csvData) {
    const lines = csvData.split("\n");
    const headers = lines[0].split(",");
    const questionObjects = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(",");
      const questionObject = {};
      for (let j = 0; j < headers.length; j++) {
        questionObject[headers[j].trim()] = values[j].trim();
      }
      questionObjects.push(questionObject);
    }

    return questionObjects;
  }

  // Display current question
  function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    startTimer();
  }

  // Check user's answer
  function checkAnswer(answer) {
    clearInterval(timerInterval); // Stop the timer

    const currentQuestion = questions[currentQuestionIndex];
    if (answer === (currentQuestion.answer.toLowerCase() === "true")) {
      alert("Correct!");
      score++;
    } else {
      alert("Incorrect!");
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      displayQuestion();
    } else {
      endGame();
    }
  }

  // Start the timer
  function startTimer() {
    let time = 0;
    timerInterval = setInterval(() => {
      time++;
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      timerDisplay.textContent = `${minutes}:${
        seconds < 10 ? "0" : ""
      }${seconds}`;
    }, 1000);
  }

  // End the game
  function endGame() {
    clearInterval(timerInterval);
    alert(`Game Over! Your score is ${score}.`);
    // Additional logic for resetting the game or showing results can be added here
  }

  // Event listeners for buttons
  trueButton.addEventListener("click", () => checkAnswer(true));
  falseButton.addEventListener("click", () => checkAnswer(false));
});
