// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Load participants from localStorage
    loadParticipants();
    
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
    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const participant = {
            id: Date.now(),
            name: formData.get('name'),
            phone: formData.get('phone'),
            scout: formData.get('scout'),
            expectations: formData.get('expectations'),
            registrationDate: new Date().toLocaleDateString('ar-SA')
        };
        
        // Save to localStorage
        saveParticipant(participant);
        
        // Show success message
        showSuccessMessage();
        
        // Reset form
        this.reset();
        
        // Update participants list
        loadParticipants();
    });
});

// Save participant to localStorage
function saveParticipant(participant) {
    let participants = JSON.parse(localStorage.getItem('participants') || '[]');
    participants.push(participant);
    localStorage.setItem('participants', JSON.stringify(participants));
}

// Load and display participants
function loadParticipants() {
    const participants = JSON.parse(localStorage.getItem('participants') || '[]');
    const participantsList = document.getElementById('participantsList');
    
    if (participants.length === 0) {
        participantsList.innerHTML = '<p class="no-participants">لا يوجد مشاركون حتى الآن</p>';
        return;
    }
    
    participantsList.innerHTML = participants.map(participant => `
        <div class="participant-card">
            <div class="participant-name">${participant.name}</div>
            <div class="participant-info">
                <span class="info-item">📞 ${participant.phone}</span>
                <span class="info-item">${participant.scout === 'yes' ? '🎯 كشفي' : '👤 غير كشفي'}</span>
                <span class="info-item">📅 ${participant.registrationDate}</span>
            </div>
            ${participant.expectations ? `
                <div class="participant-expectations">
                    <strong>توقعاته:</strong> ${participant.expectations}
                </div>
            ` : ''}
        </div>
    `).join('');
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
    
    // Navigate to participants section
    document.querySelector('.nav-link[href="#participants"]').click();
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

// Add print functionality for participants list
function printParticipants() {
    const participants = JSON.parse(localStorage.getItem('participants') || '[]');
    if (participants.length === 0) {
        alert('لا يوجد مشاركون للطباعة');
        return;
    }
    
    let printContent = `
        <html dir="rtl">
        <head>
            <title>قائمة المشاركين - أسبوع صاحب العصر والزمان</title>
            <style>
                body { font-family: 'Tajawal', sans-serif; direction: rtl; padding: 20px; }
                h1 { text-align: center; color: #333; margin-bottom: 30px; }
                .participant { margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 8px; }
                .name { font-weight: bold; font-size: 18px; margin-bottom: 10px; }
                .info { margin-bottom: 5px; color: #666; }
                .expectations { margin-top: 10px; font-style: italic; color: #555; }
                @media print { .no-print { display: none; } }
            </style>
        </head>
        <body>
            <h1>قائمة المشاركين في أسبوع صاحب العصر والزمان</h1>
            <p>تاريخ الطباعة: ${new Date().toLocaleDateString('ar-SA')}</p>
            <hr>
    `;
    
    participants.forEach(participant => {
        printContent += `
            <div class="participant">
                <div class="name">${participant.name}</div>
                <div class="info">الهاتف: ${participant.phone}</div>
                <div class="info">النوع: ${participant.scout === 'yes' ? 'كشفي' : 'غير كشفي'}</div>
                <div class="info">تاريخ التسجيل: ${participant.registrationDate}</div>
                ${participant.expectations ? `<div class="expectations">التوقعات: ${participant.expectations}</div>` : ''}
            </div>
        `;
    });
    
    printContent += '</body></html>';
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
}

// Add export to CSV functionality
function exportToCSV() {
    const participants = JSON.parse(localStorage.getItem('participants') || '[]');
    if (participants.length === 0) {
        alert('لا يوجد مشاركون للتصدير');
        return;
    }
    
    let csvContent = '\ufeff'; // BOM for UTF-8
    csvContent += 'الاسم,رقم الهاتف,نوع المشارك,توقعات,تاريخ التسجيل\n';
    
    participants.forEach(participant => {
        csvContent += `"${participant.name}","${participant.phone}","${participant.scout === 'yes' ? 'كشفي' : 'غير كشفي'}","${participant.expectations || ''}","${participant.registrationDate}"\n`;
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `المشاركون_أسبوع_صاحب_العصر_${new Date().toLocaleDateString('ar-SA')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Add search functionality for participants
function searchParticipants() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const participants = JSON.parse(localStorage.getItem('participants') || '[]');
    const participantsList = document.getElementById('participantsList');
    
    const filteredParticipants = participants.filter(participant => 
        participant.name.toLowerCase().includes(searchTerm) ||
        participant.phone.includes(searchTerm) ||
        (participant.expectations && participant.expectations.toLowerCase().includes(searchTerm))
    );
    
    if (filteredParticipants.length === 0) {
        participantsList.innerHTML = '<p class="no-participants">لا توجد نتائج للبحث</p>';
        return;
    }
    
    participantsList.innerHTML = filteredParticipants.map(participant => `
        <div class="participant-card">
            <div class="participant-name">${participant.name}</div>
            <div class="participant-info">
                <span class="info-item">📞 ${participant.phone}</span>
                <span class="info-item">${participant.scout === 'yes' ? '🎯 كشفي' : '👤 غير كشفي'}</span>
                <span class="info-item">📅 ${participant.registrationDate}</span>
            </div>
            ${participant.expectations ? `
                <div class="participant-expectations">
                    <strong>توقعاته:</strong> ${participant.expectations}
                </div>
            ` : ''}
        </div>
    `).join('');
}
