document.addEventListener("DOMContentLoaded", function () {
  const questionText = document.getElementById("question-text");
  const trueButton = document.getElementById("true-button");
  const falseButton = document.getElementById("false-button");
  const scoreDisplay = document.getElementById("score");
  const timerDisplay = document.getElementById("timer");

  let questions = []; // Array to store questions
  let score = 0; // Score
  let timerInterval; // Interval for timer
  let currentQuestionIndex = 0;

  // Fetch questions from the API
  fetch("http://127.0.0.1:8000/questions")
    .then((response) => response.json())
    .then((data) => {
      questions = data; // Get the first 10 questions
      displayQuestion();
      console.log("Got questions");
    })
    .catch((error) => {
      console.error("Error fetching questions:", error);
    });

  // Display current question
  function displayQuestion() {
    // scoreDisplay.textContent = score;
    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = currentQuestion.Question;
    startTimer();
  }

  // Function to display modal
  function showModal(text) {
    const modal = document.getElementById("modal");
    const modalText = document.getElementById("modal-text");
    const span = document.getElementsByClassName("close")[0];

    modalText.textContent = text;
    modal.style.display = "block";

    // Close the modal when the user clicks on the 'x' button
    span.onclick = function () {
      modal.style.display = "none";
    };

    // Close the modal when the user clicks outside of it
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  }

  function pointsToInstruction(point) {
    console.log("Input type:");
    console.log(typeof point);
    console.log(point);
    if (point === "-2") {
      return "Move two step back";
    } else if (point === "-1") {
      return "Move one step back";
    } else if (point === "1") {
      return "Move one step forward";
    } else if (point === "2") {
      return "Move two step forward";
    }
  }
  // Check user's answer
  function checkAnswer(answer) {
    clearInterval(timerInterval); // Stop the timer
    // (6) ['Question', 'CorrectAnswer', 'NoExplanation', 'NoPoints', 'YesExplanation', 'YesPoints']
    const currentQuestion = questions[currentQuestionIndex];
    const currentQuestionAnswer = currentQuestion.CorrectAnswer.toLowerCase();
    let explanation = "";

    if (answer === currentQuestionAnswer) {
      explanation = "Correct! ";
      if (answer === "yes") {
        explanation = explanation.concat(
          currentQuestion.YesExplanation,
          ". ",
          pointsToInstruction(currentQuestion.YesPoints)
        );
      } else {
        explanation = explanation.concat(
          currentQuestion.NoExplanation,
          ". ",
          pointsToInstruction(currentQuestion.NoPoints)
        );
      }
    } else {
      explanation = "Incorrect! ";
      if (answer === "yes") {
        explanation = explanation.concat(
          currentQuestion.YesExplanation,
          ". ",
          pointsToInstruction(currentQuestion.YesPoints)
        );
      } else {
        explanation = explanation.concat(
          currentQuestion.NoExplanation,
          ". ",
          pointsToInstruction(currentQuestion.NoPoints)
        );
      }
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      // Display custom modal with answer explanation
      showModal(explanation);
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
  trueButton.addEventListener("click", () => checkAnswer("yes"));
  falseButton.addEventListener("click", () => checkAnswer("no"));
});
