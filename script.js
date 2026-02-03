// API Configuration
const API_BASE = window.location.origin + '/api';

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
                name: formData.get('name'),
                phone: formData.get('phone'),
                scout: formData.get('scout'),
                troop: formData.get('troop') || 'غير محدد',
                quiz: formData.get('quiz'),
                expectations: getQuizAnswer(formData.get('quiz'))
            };
            
            // Save to database via API
            saveParticipantToDatabase(participant);
        });
    }
});

// Save participant to database via API
async function saveParticipantToDatabase(participant) {
    try {
        const response = await fetch(`${API_BASE}/participants`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(participant)
        });
        
        if (response.ok) {
            // Show success message
            showSuccessMessage();
            
            // Reset form
            document.getElementById('registrationForm').reset();
        } else {
            alert('حدث خطأ أثناء حفظ البيانات. يرجى المحاولة مرة أخرى.');
        }
    } catch (error) {
        console.error('Error saving participant:', error);
        alert('حدث خطأ في الاتصال بالخادم. يرجى المحاولة مرة أخرى.');
    }
}

// Load and display participants - REMOVED for security
// Participants data is now only accessible through admin panel

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
    
    // Navigate to registration form section
    document.querySelector('.nav-link[href="#register"]').click();
}

// Phone number formatting
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            // Remove any non-digit characters
            let value = e.target.value.replace(/\D/g, '');
            
            // Format as phone number (you can adjust this based on your country's format)
            if (value.length > 0) {
                if (value.length <= 3) {
                    value = value;
                } else if (value.length <= 7) {
                    value = value.slice(0, 3) + '-' + value.slice(3);
                } else {
                    value = value.slice(0, 3) + '-' + value.slice(3, 7) + '-' + value.slice(7, 11);
                }
            }
            
            e.target.value = value;
        });
    }
});

// Add some animations on scroll
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe feature cards and quote cards
    document.querySelectorAll('.feature, .quote-card, .participant-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Add smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add print functionality for participants - REMOVED for security
// Participants data is now only accessible through admin panel

// Add export to CSV functionality - REMOVED for security
// Participants data is now only accessible through admin panel

// Add search functionality for participants - REMOVED for security
// Participants data is now only accessible through admin panel
