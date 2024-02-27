document.addEventListener('DOMContentLoaded', function () {
  const questions = document.querySelectorAll('.question');
  const nextButton = document.getElementById('nextButton');
  let currentQuestionIndex = 0;

  function showNextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
      questions[currentQuestionIndex].classList.add('is-hidden');
      currentQuestionIndex++;
      questions[currentQuestionIndex].classList.remove('is-hidden');
    } else {
      // Last question reached, hide form and calculate cheating likelihood
      document.getElementById('cheatingForm').classList.add('is-hidden');
      calculateCheatingLikelihood();
    }
  }

  nextButton.addEventListener('click', showNextQuestion);
});

document.getElementById('cheatingForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form submission

  // Show first question
  document.getElementById('question1').classList.remove('is-hidden');
});

function calculateCheatingLikelihood() {
  // Show loading icon
  document.querySelector('.loading-wrapper').classList.add('show');

  // Get form inputs
  var inputs = {
    trust: parseInt(document.getElementById('trust').value),
    behavior: parseInt(document.getElementById('behavior').value),
    response: parseInt(document.getElementById('response').value),
    attention: parseInt(document.getElementById('attention').value),
    affection: parseInt(document.getElementById('affection').value),
    arguments: parseInt(document.getElementById('arguments').value),
    time: parseInt(document.getElementById('time').value),
    social: parseInt(document.getElementById('social').value)
  };

  // Validation to ensure inputs are within the expected ranges
  for (var key in inputs) {
    if (isNaN(inputs[key]) || inputs[key] < 1 || inputs[key] > 4) {
      alert("Please enter valid values for all fields.");
      // Hide loading icon
      document.querySelector('.loading-wrapper').classList.remove('show');
      return;
    }
  }

  // Calculate weighted scores for each factor
  var weights = {
    trust: 0.1,
    behavior: 0.1,
    response: 0.1,
    attention: 0.1,
    affection: 0.1,
    arguments: 0.1,
    time: 0.1,
    social: 0.1
  };
  var totalScore = 0;
  for (var key in inputs) {
    totalScore += inputs[key] * weights[key];
  }

  // Calculate cheating likelihood
  var cheatingLikelihood = Math.min(totalScore * 10, 100);

  // Determine result message based on cheating likelihood
  var resultMessage = getResultMessage(cheatingLikelihood);

  // Display result and message
  displayResult(cheatingLikelihood, resultMessage);
}

function getResultMessage(cheatingLikelihood) {
  if (cheatingLikelihood < 20) {
    return "Congratulations! Your partner seems very trustworthy.";
  } else if (cheatingLikelihood < 50) {
    return "Your partner might be trustworthy, but stay vigilant.";
  } else if (cheatingLikelihood < 80) {
    return "There's a chance your partner is being dishonest. Keep an eye out.";
  } else {
    return "Warning! Your partner's behavior raises serious concerns.";
  }
}

function displayResult(cheatingLikelihood, resultMessage) {
  // Hide loading icon
  document.querySelector('.loading-wrapper').classList.remove('show');
  
  var resultText = `Based on your input, there is a <strong>${cheatingLikelihood.toFixed(2)}%</strong> chance of being cheated on.`;
  var resultElement = document.getElementById('result');
  resultElement.innerHTML = `<p class="result-text">${resultText}</p><p class="result-message">${resultMessage}</p>`;
}

function resetForm() {
  document.getElementById('cheatingForm').reset();
  document.getElementById('result').innerHTML = ""; // Clear result display
}
