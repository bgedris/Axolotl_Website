// ==========================================================================
// BEGINNER'S GUIDE & TECHNICAL TERMS:
// - JavaScript (JS): A programming language that adds interactivity and logic to web pages (handling clicks, storing data, changing what's on screen). Think of it as the nervous system of the website.
// - Variable: A named container used to store data values in memory (created using keywords like 'let').
// - Function: A reusable block of code designed to perform a specific task when called.
// - localStorage: A built-in web browser database feature that lets websites save data locally on your computer so it stays saved even if you refresh or close the browser window.
// ==========================================================================

// Creates a variable to keep track of how many quiz questions the user answers correctly
let score = 0;

// Checks localStorage when the web page loads to see if a past score was saved
window.addEventListener('DOMContentLoaded', () => {
  const savedScore = localStorage.getItem('axolotl_quiz_score');
  if (savedScore !== null) {
    // Outputs a message to the browser's developer console if a previous score exists
    console.log(`Welcome back! Your last saved quiz score was ${savedScore} out of 4.`);
  }
});

// Function that runs whenever a user clicks an answer button in the quiz
function checkAnswer(button, isCorrect, slideNum, feedbackId, nextBtnId) {
  const feedbackDiv = document.getElementById(feedbackId);
  const parentOptions = button.parentElement;
  
  // Disables all option buttons for this question so the user can't change their answer
  const buttons = parentOptions.querySelectorAll('button');
  buttons.forEach(btn => btn.disabled = true);

  // Checks if the chosen answer is correct or incorrect, then updates styles and text
  if (isCorrect) {
    button.style.backgroundColor = '#c8e6c9';
    button.style.borderColor = '#2e7d32';
    feedbackDiv.textContent = 'Correct! Great job!';
    feedbackDiv.className = 'feedback correct';
    score++; // Increases the score variable by 1
  } else {
    button.style.backgroundColor = '#ffcdd2';
    button.style.borderColor = '#c62828';
    feedbackDiv.textContent = 'Not quite!';
    feedbackDiv.className = 'feedback incorrect';
  }

  // Reveals the 'Next' button so the user can proceed to the next question
  document.getElementById(nextBtnId).style.display = 'inline-block';
}

// Function to switch which slide is visible on the screen
function nextSlide(slideNum) {
  document.querySelectorAll('.quiz-slide').forEach(slide => {
    slide.classList.remove('active');
  });
  document.getElementById('slide-' + slideNum).classList.add('active');
}

// Function that runs when the user finishes all questions to show their final score
function showResults() {
  document.querySelectorAll('.quiz-slide').forEach(slide => {
    slide.classList.remove('active');
  });
  document.getElementById('slide-results').classList.add('active');
  document.getElementById('final-score-text').textContent = `You scored ${score} out of 4 correct!`;
  
  // Saves the final score into browser localStorage so it persists across page refreshes
  localStorage.setItem('axolotl_quiz_score', score);
  document.getElementById('storage-saved-msg').textContent = '💾 Your score has been saved to your browser!';
}

// Function that resets the quiz back to question 1 when clicking 'Retake Quiz'
function restartQuiz() {
  score = 0;
  // Clears the saved score from browser storage when starting over
  localStorage.removeItem('axolotl_quiz_score');

  // Resets all option buttons back to their default enabled state and appearance
  document.querySelectorAll('.quiz-slide button:not(.next-btn)').forEach(btn => {
    btn.disabled = false;
    btn.style.backgroundColor = 'white';
    btn.style.borderColor = '#ff9a9e';
  });
  // Clears all feedback text messages
  document.querySelectorAll('.feedback').forEach(fb => {
    fb.textContent = '';
  });
  // Hides all next buttons again
  document.querySelectorAll('.next-btn').forEach(nb => {
    nb.style.display = 'none';
  });
  nextSlide(1); // Jumps back to slide 1
}
