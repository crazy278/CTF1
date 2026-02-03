// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });
    
    // Registration form handling
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const participant = {
                id: Date.now(),
                name: formData.get('name'),
                phone: formData.get('phone'),
                scout: formData.get('scout'),
                troop: formData.get('troop') || 'غير محدد',
                quiz: formData.get('quiz'),
                expectations: getQuizAnswer(formData.get('quiz')),
                registrationDate: new Date().toLocaleDateString('ar-SA'),
                year: '2026',
                createdAt: new Date().toISOString()
            };
            
            // Save to localStorage
            saveParticipant(participant);
            
            // Show success message
            showSuccessMessage();
            
            // Reset form
            this.reset();
        });
    }
});

// Save participant to localStorage
function saveParticipant(participant) {
    let participants = JSON.parse(localStorage.getItem('mahdiWeekParticipants') || '[]');
    participants.push(participant);
    localStorage.setItem('mahdiWeekParticipants', JSON.stringify(participants));
}

// Get quiz answer text
function getQuizAnswer(quizValue) {
    const answers = {
        'justice': 'حكومة العدل الإلهي والمساواة ✅',
        'power': 'حكومة القوة والسيطرة',
        'wealth': 'حكومة الثراء المادي',
        'technology': 'حكومة التكنولوجيا المتقدمة'
    };
    return answers[quizValue] || 'لم يجب';
}

// Show success message
function showSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    successMessage.classList.add('show');
}

// Close success message
function closeSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    successMessage.classList.remove('show');
    // Navigate to registration form
    document.querySelector('[href="#register"]').click();
}
