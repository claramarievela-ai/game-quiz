const quizData = [
  {
    question: "Your local coffee order is:",
    options: [
      "An Americano: Good strong coffee — straight up!",
      "A latte: Yes to the oatmilk or maybe the soy. #Healthy",
      "A drip coffee: You don't splash out on coffee — and only you know how you like your cream and sugar.",
      "What coffee order? I make my own coffee with imported beans, a special grinder, and my beautiful Chemex!",
    ],
    answer: 0,
  },

  {
    question: "It's time to get serious about exercise. You go to: ",
    options: [
      "The big fancy gym: Equionox pays for itself in connections and mood boost.",
      "The nearest trail: Hiking and running in nature is the best medicine.",
      "A personal trainer: A professional will give you faster results.",
      "Why go to a gym? You already walk everywhere and take the stairs.",
    ],
    answer: 1,
  },

  {
    question:
      "You have two options for Friday night: small outdoor barbeque or lux evening at a swanky restaurant. You choose: ",
    options: [
      "Outdoor barbeque: Meat on the grill with friends is the best.",
      "Swanky restaurent: Feeling pampered with friends is the perfect reset.",
      "Both: You stop by the bbq before catching your dinner reservations. Double win!",
      "Neither: Your dog wants to cuddle, and you love take-out!",
    ],
    answer: 2,
  },

  {
    question: "It's time to get dressed for a wedding. You select: ",
    options: [
      "Something designer: You always know what's in style.",
      "Something vintage: You need something a little more personalized.",
      "Something casual: You need to be comfortable in order to truly celebrate.",
      "One of your tried-and-true-favorites — and you'll decide last minute, as always.",
    ],
    answer: 3,
  },
];

let currentQuestionIndex = 0;
let cityCount = {
  austin: 0,
  losAngeles: 0,
  newYork: 0,
  washingtonDC: 0,
};

const optionsContainer = document.getElementById("options-container");

function selectOption(selectedIndex, clickedButton) {
  const allButtons = optionsContainer.querySelectorAll("button");
  for (let i = 0; i < allButtons.length; i++) {
    allButtons[i].classList.remove("selected");
  }

  clickedButton.classList.add("selected");
  if (selectedIndex === 0) {
    cityCount.austin++;
  } else if (selectedIndex === 1) {
    cityCount.losAngeles++;
  } else if (selectedIndex === 2) {
    cityCount.newYork++;
  } else {
    cityCount.washingtonDC++;
  }
}

const questionContainer = document.getElementById("question-container");

const nextButton = document.getElementById("next-button");

const quizContainer = document.getElementById("quiz-container");
const scoreContainer = document.getElementById("score-container");
const scoreDisplay = document.getElementById("score");

function showResults() {
  quizContainer.classList.add("hidden");
  scoreContainer.classList.remove("hidden");

  let winningCity = "austin";
  if (cityCount.losAngeles > cityCount[winningCity]) winningCity = "losAngeles";
  if (cityCount.newYork > cityCount[winningCity]) winningCity = "newYork";
  if (cityCount.washingtonDC > cityCount[winningCity])
    winningCity = "washingtonDC";

  const cityNames = {
    austin: "Austin",
    losAngeles: "Los Angeles",
    newYork: "New York",
    washingtonDC: "Washington DC",
  };

  scoreDisplay.textContent =
    "Your dream city is: " + cityNames[winningCity] + "!";
}

const restartButton = document.getElementById("restart-button");

function loadQuestion() {
  const currentQuestion = quizData[currentQuestionIndex];
  questionContainer.textContent = currentQuestion.question;
  optionsContainer.innerHTML = "";

  for (let i = 0; i < currentQuestion.options.length; i++) {
    const button = document.createElement("button");
    button.textContent = currentQuestion.options[i];
    button.addEventListener("click", function () {
      selectOption(i, this);
    });
    optionsContainer.appendChild(button);
  }
}

nextButton.addEventListener("click", function () {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
    loadQuestion();
  } else {
    showResults();
  }
});

restartButton.addEventListener("click", function () {
  currentQuestionIndex = 0;
  cityCount = { austin: 0, losAngeles: 0, newYork: 0, washingtonDC: 0 };
  quizContainer.classList.remove("hidden");
  scoreContainer.classList.add("hidden");
  loadQuestion();
});

loadQuestion();
