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
                quiz1: formData.get('quiz1'),
                quiz2: formData.get('quiz2'),
                quiz3: formData.get('quiz3'),
                quiz4: formData.get('quiz4'),
                expectations: getQuizAnswers(formData),
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

// Get quiz answers text
function getQuizAnswers(formData) {
    const answers = {
        quiz1: {
            '255': '255 هجرية ✅',
            '260': '260 هجرية',
            '250': '250 هجرية',
            '265': '265 هجرية'
        },
        quiz2: {
            'hasan': 'الحسن العسكري ✅',
            'ali': 'علي النقي',
            'muhammad': 'محمد الجواد',
            'musa': 'موسى الكاظم'
        },
        quiz3: {
            'narcissus': 'نرجس خاتون ✅',
            'fatima': 'فاطمة المعصومة',
            'zainab': 'زينب الكبرى',
            'maryam': 'مريم بنت شقيل'
        },
        quiz4: {
            'mahdi': 'المهدي المنتظر ✅',
            'qaem': 'القائم آل محمد',
            'hujja': 'الحجة بن الحسن',
            'baqiyallah': 'بقية الله'
        }
    };
    
    let result = 'المسابقة:\n';
    result += `1. ${answers.quiz1[formData.get('quiz1')] || 'لم يجب'}\n`;
    result += `2. ${answers.quiz2[formData.get('quiz2')] || 'لم يجب'}\n`;
    result += `3. ${answers.quiz3[formData.get('quiz3')] || 'لم يجب'}\n`;
    result += `4. ${answers.quiz4[formData.get('quiz4')] || 'لم يجب'}`;
    
    return result;
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
