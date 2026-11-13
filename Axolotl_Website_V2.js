let score = 0;

// Check localStorage on page load to see if a previous score exists
window.addEventListener('DOMContentLoaded', () => {
  const savedScore = localStorage.getItem('axolotl_quiz_score');
  if (savedScore !== null) {
    // Optionally, you can alert or display past score info
    console.log(`Welcome back! Your last saved quiz score was ${savedScore} out of 4.`);
  }
});

function checkAnswer(button, isCorrect, slideNum, feedbackId, nextBtnId) {
  const feedbackDiv = document.getElementById(feedbackId);
  const parentOptions = button.parentElement;
  
  const buttons = parentOptions.querySelectorAll('button');
  buttons.forEach(btn => btn.disabled = true);

  if (isCorrect) {
    button.style.backgroundColor = '#c8e6c9';
    button.style.borderColor = '#2e7d32';
    feedbackDiv.textContent = 'Correct! Great job!';
    feedbackDiv.className = 'feedback correct';
    score++;
  } else {
    button.style.backgroundColor = '#ffcdd2';
    button.style.borderColor = '#c62828';
    feedbackDiv.textContent = 'Not quite!';
    feedbackDiv.className = 'feedback incorrect';
  }

  document.getElementById(nextBtnId).style.display = 'inline-block';
}

function nextSlide(slideNum) {
  document.querySelectorAll('.quiz-slide').forEach(slide => {
    slide.classList.remove('active');
  });
  document.getElementById('slide-' + slideNum).classList.add('active');
}

function showResults() {
  document.querySelectorAll('.quiz-slide').forEach(slide => {
    slide.classList.remove('active');
  });
  document.getElementById('slide-results').classList.add('active');
  document.getElementById('final-score-text').textContent = `You scored ${score} out of 4 correct!`;
  
  // Save the score to localStorage
  localStorage.setItem('axolotl_quiz_score', score);
  document.getElementById('storage-saved-msg').textContent = '💾 Your score has been saved to your browser!';
}

function restartQuiz() {
  score = 0;
  // Clear saved score from localStorage if desired, or keep it. Let's remove it on retake:
  localStorage.removeItem('axolotl_quiz_score');

  document.querySelectorAll('.quiz-slide button:not(.next-btn)').forEach(btn => {
    btn.disabled = false;
    btn.style.backgroundColor = 'white';
    btn.style.borderColor = '#ff9a9e';
  });
  document.querySelectorAll('.feedback').forEach(fb => {
    fb.textContent = '';
  });
  document.querySelectorAll('.next-btn').forEach(nb => {
    nb.style.display = 'none';
  });
  nextSlide(1);
}
