// كلمة المرور الصحيحة - يمكنك تغييرها
const CORRECT_PASSWORD = 'admin123';

// التحقق من تسجيل الدخول عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
});

function checkLoginStatus() {
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn');
    if (isLoggedIn === 'true') {
        showAdminPanel();
    } else {
        showLoginPage();
    }
}

function handleLogin(event) {
    event.preventDefault();
    
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    
    if (password === CORRECT_PASSWORD) {
        sessionStorage.setItem('adminLoggedIn', 'true');
        showAdminPanel();
    } else {
        errorMessage.style.display = 'block';
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 3000);
    }
}

function showLoginPage() {
    document.getElementById('loginPage').style.display = 'flex';
    document.getElementById('adminContent').style.display = 'none';
    document.title = 'تسجيل الدخول - لوحة التحكم';
}

function showAdminPanel() {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('adminContent').style.display = 'block';
    document.title = 'لوحة التحكم - أسبوع صاحب العصر والزمان';
    
    // تحميل البيانات بعد إظهار لوحة التحكم
    loadParticipants();
    updateStats();
}

function logout() {
    sessionStorage.removeItem('adminLoggedIn');
    showLoginPage();
    document.getElementById('password').value = '';
}

// Load participants from localStorage
function loadParticipants() {
    const participants = JSON.parse(localStorage.getItem('mahdiWeekParticipants') || '[]');
    const tableBody = document.getElementById('dataTableBody');
    
    if (participants.length === 0) {
        tableBody.innerHTML = '<div style="text-align: center; padding: 2rem; color: #666;">لا يوجد مشاركون حتى الآن</div>';
        return;
    }
    
    tableBody.innerHTML = participants.map(participant => `
        <div class="table-row">
            <div class="table-cell" data-label="الاسم">${participant.name}</div>
            <div class="table-cell" data-label="الهاتف">${participant.phone}</div>
            <div class="table-cell" data-label="النوع">
                ${participant.scout === 'yes' 
                    ? '<span class="scout-badge">🎯 كشفي</span>' 
                    : '<span class="non-scout-badge">👤 غير كشفي</span>'}
            </div>
            <div class="table-cell" data-label="الفوج">${participant.troop || 'غير محدد'}</div>
            <div class="table-cell" data-label="التاريخ">${participant.registrationDate}</div>
            <div class="table-cell" data-label="المسابقة">${participant.quiz || 'لم يجب'}</div>
            <div class="table-cell" data-label="التوقعات">${participant.expectations || 'لا يوجد'}</div>
        </div>
    `).join('');
}

// Update statistics from localStorage
function updateStats() {
    const participants = JSON.parse(localStorage.getItem('mahdiWeekParticipants') || '[]');
    const today = new Date().toLocaleDateString('ar-SA');
    
    document.getElementById('totalCount').textContent = participants.length;
    document.getElementById('scoutCount').textContent = participants.filter(p => p.scout === 'yes').length;
    document.getElementById('nonScoutCount').textContent = participants.filter(p => p.scout === 'no').length;
    document.getElementById('todayCount').textContent = participants.filter(p => p.registrationDate === today).length;
}

// Export to JSON from localStorage
function exportToJSON() {
    const participants = JSON.parse(localStorage.getItem('mahdiWeekParticipants') || '[]');
    
    const dataStr = JSON.stringify(participants, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `مشاركون_أسبوع_صاحب_العصر_${new Date().toLocaleDateString('ar-SA')}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

// Export to CSV from localStorage
function exportToCSV() {
    const participants = JSON.parse(localStorage.getItem('mahdiWeekParticipants') || '[]');
    
    if (participants.length === 0) {
        alert('لا يوجد مشاركون للتصدير');
        return;
    }
    
    let csvContent = '\ufeff'; // BOM for UTF-8
    csvContent += 'الاسم,رقم الهاتف,النوع,الفوج,المسابقة,التوقعات,تاريخ التسجيل,العام\n';
    
    participants.forEach(participant => {
        csvContent += `"${participant.name}","${participant.phone}","${participant.scout === 'yes' ? 'كشفي' : 'غير كشفي'}","${participant.troop || 'غير محدد'}","${participant.quiz || 'لم يجب'}","${participant.expectations || ''}","${participant.registrationDate}","${participant.year || '2026'}"\n`;
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

// Print data from localStorage
function printData() {
    const participants = JSON.parse(localStorage.getItem('mahdiWeekParticipants') || '[]');
    
    if (participants.length === 0) {
        alert('لا يوجد مشاركون للطباعة');
        return;
    }
    
    let printContent = `
        <html dir="rtl">
        <head>
            <title>تقرير المشاركين - أسبوع صاحب العصر والزمان</title>
            <style>
                body { font-family: 'Tajawal', sans-serif; direction: rtl; padding: 20px; }
                h1 { text-align: center; color: #333; margin-bottom: 30px; }
                .stats { display: flex; justify-content: space-around; margin-bottom: 30px; }
                .stat { text-align: center; }
                .stat-number { font-size: 24px; font-weight: bold; color: #667eea; }
                .participant { margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 8px; }
                .name { font-weight: bold; font-size: 18px; margin-bottom: 10px; }
                .info { margin-bottom: 5px; color: #666; }
                .expectations { margin-top: 10px; font-style: italic; color: #555; }
                @media print { .no-print { display: none; } }
            </style>
        </head>
        <body>
            <h1>تقرير المشاركين في أسبوع صاحب العصر والزمان</h1>
            <p>تاريخ الطباعة: ${new Date().toLocaleDateString('ar-SA')}</p>
            
            <div class="stats">
                <div class="stat">
                    <div class="stat-number">${participants.length}</div>
                    <div>إجمالي المشاركين</div>
                </div>
                <div class="stat">
                    <div class="stat-number">${participants.filter(p => p.scout === 'yes').length}</div>
                    <div>المرشدون</div>
                </div>
                <div class="stat">
                    <div class="stat-number">${participants.filter(p => p.scout === 'no').length}</div>
                    <div>غير المرشدين</div>
                </div>
            </div>
            <hr>
    `;
    
    participants.forEach(participant => {
        printContent += `
            <div class="participant">
                <div class="name">${participant.name}</div>
                <div class="info">الهاتف: ${participant.phone}</div>
                <div class="info">النوع: ${participant.scout === 'yes' ? 'كشفي' : 'غير كشفي'}</div>
                <div class="info">الفوج: ${participant.troop || 'غير محدد'}</div>
                <div class="info">المسابقة: ${participant.quiz || 'لم يجب'}</div>
                <div class="info">تاريخ التسجيل: ${participant.registrationDate}</div>
                <div class="info">العام: ${participant.year || '2026'}</div>
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

// Clear all data from localStorage
function clearAllData() {
    if (confirm('هل أنت متأكد من حذف جميع البيانات؟ هذا الإجراء لا يمكن التراجع عنه!')) {
        localStorage.removeItem('mahdiWeekParticipants');
        loadParticipants();
        updateStats();
        alert('تم حذف جميع البيانات بنجاح');
    }
}

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', handleLogin);
