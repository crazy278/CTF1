// API Configuration
const API_BASE = window.location.origin + '/api';

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

// Load participants from database
async function loadParticipants() {
    try {
        const response = await fetch(`${API_BASE}/participants`);
        const participants = await response.json();
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
                <div class="table-cell" data-label="العام">${participant.year || '2026'}</div>
                <div class="table-cell" data-label="التوقعات">${participant.quiz ? `${participant.expectations} (${participant.quiz})` : (participant.expectations || 'لا يوجد')}</div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading participants:', error);
        document.getElementById('dataTableBody').innerHTML = '<div style="text-align: center; padding: 2rem; color: #dc3545;">حدث خطأ في تحميل البيانات</div>';
    }
}

// Update statistics from database
async function updateStats() {
    try {
        const response = await fetch(`${API_BASE}/stats`);
        const stats = await response.json();
        
        document.getElementById('totalCount').textContent = stats.total;
        document.getElementById('scoutCount').textContent = stats.scouts;
        document.getElementById('nonScoutCount').textContent = stats.nonScouts;
        document.getElementById('todayCount').textContent = stats.today;
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

// Export to JSON from database
async function exportToJSON() {
    try {
        const response = await fetch(`${API_BASE}/participants`);
        const participants = await response.json();
        
        const dataStr = JSON.stringify(participants, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = `مشاركون_أسبوع_صاحب_العصر_${new Date().toLocaleDateString('ar-SA')}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    } catch (error) {
        console.error('Error exporting JSON:', error);
        alert('حدث خطأ أثناء تصدير البيانات');
    }
}

// Export to CSV from database
async function exportToCSV() {
    try {
        const response = await fetch(`${API_BASE}/participants`);
        const participants = await response.json();
        
        if (participants.length === 0) {
            alert('لا يوجد مشاركون للتصدير');
            return;
        }
        
        let csvContent = '\ufeff'; // BOM for UTF-8
        csvContent += 'الاسم,رقم الهاتف,النوع,الفوج,التوقعات,تاريخ التسجيل,العام\n';
        
        participants.forEach(participant => {
            csvContent += `"${participant.name}","${participant.phone}","${participant.scout === 'yes' ? 'كشفي' : 'غير كشفي'}","${participant.troop || 'غير محدد'}","${participant.expectations || ''}","${participant.registrationDate}","${participant.year || '2026'}"\n`;
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
    } catch (error) {
        console.error('Error exporting CSV:', error);
        alert('حدث خطأ أثناء تصدير البيانات');
    }
}

// Print data from database
async function printData() {
    try {
        const response = await fetch(`${API_BASE}/participants`);
        const participants = await response.json();
        
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
    } catch (error) {
        console.error('Error printing data:', error);
        alert('حدث خطأ أثناء طباعة البيانات');
    }
}

// Clear all data from database
async function clearAllData() {
    if (confirm('هل أنت متأكد من حذف جميع البيانات؟ هذا الإجراء لا يمكن التراجع عنه!')) {
        try {
            const response = await fetch(`${API_BASE}/participants`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                loadParticipants();
                updateStats();
                alert('تم حذف جميع البيانات بنجاح');
            } else {
                alert('حدث خطأ أثناء حذف البيانات');
            }
        } catch (error) {
            console.error('Error clearing data:', error);
            alert('حدث خطأ أثناء حذف البيانات');
        }
    }
}
