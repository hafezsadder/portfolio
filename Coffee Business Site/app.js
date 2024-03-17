
document.addEventListener("DOMContentLoaded", function() {
    const questions = document.querySelectorAll('.faq-question');

    questions.forEach(question => {
        question.addEventListener('click', function() {
            this.nextElementSibling.style.display = this.nextElementSibling.style.display === 'block' ? 'none' : 'block';
        });
    });
});

