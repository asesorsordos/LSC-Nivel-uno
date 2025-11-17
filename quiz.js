const quizForm = document.getElementById('quiz-form');
quizForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const correctAnswers = {
        q1: 'c',
        q2: 'b',
        q3: 'c',
        q4: 'b',
        q5: 'b'
    };

    let score = 0;
    const totalQuestions = Object.keys(correctAnswers).length;

    for (const question in correctAnswers) {
        const selectedOption = quizForm.querySelector(`input[name="${question}"]:checked`);
        const userAnswer = selectedOption ? selectedOption.value : undefined;
        const questionElement = quizForm.querySelector(`input[name="${question}"]`).closest('.quiz-question');
        
        // Reset styles
        questionElement.classList.remove('correct', 'incorrect');

        if (userAnswer === correctAnswers[question]) {
            score++;
            questionElement.classList.add('correct');
        } else if (userAnswer) {
            questionElement.classList.add('incorrect');
        }
    }

    const resultsContainer = document.getElementById('quiz-results');
    const percentage = (score / totalQuestions) * 100;

    resultsContainer.innerHTML = `
        <h3>Resultados del Quiz</h3>
        <p>Has acertado ${score} de ${totalQuestions} preguntas.</p>
        <p>Tu puntuación es: ${percentage.toFixed(0)}%</p>
    `;

    document.getElementById('retry-quiz-btn').style.display = 'block';
    document.querySelector('.quiz-submit-btn').style.display = 'none';
});

document.getElementById('retry-quiz-btn').addEventListener('click', resetQuiz);

function resetQuiz() {
    // Ocultar resultados y botón de reintentar
    document.getElementById('quiz-results').innerHTML = '';
    document.getElementById('retry-quiz-btn').style.display = 'none';
    document.querySelector('.quiz-submit-btn').style.display = 'block';

    // Limpiar selecciones del formulario
    quizForm.reset();

    // Quitar clases de 'correct' e 'incorrect'
    const questionElements = quizForm.querySelectorAll('.quiz-question');
    questionElements.forEach(question => {
        question.classList.remove('correct', 'incorrect');
    });

    document.getElementById('quiz-interactivo').scrollIntoView({ behavior: 'smooth' });
}