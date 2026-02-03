const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0'; // Allow connections from any IP
const DB_FILE = path.join(__dirname, 'database.json');

// Middleware
app.use(cors({
    origin: '*', // Allow all origins for development
    methods: ['GET', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));
app.use(express.json());
app.use(express.static('.'));

// Helper function to read database
function readDatabase() {
    try {
        const data = fs.readFileSync(DB_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return { participants: [], settings: { adminPassword: "admin123", lastUpdated: null } };
    }
}

// Helper function to write to database
function writeDatabase(data) {
    data.settings.lastUpdated = new Date().toISOString();
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// API Routes

// Get all participants (admin only)
app.get('/api/participants', (req, res) => {
    const db = readDatabase();
    res.json(db.participants);
});

// Add new participant
app.post('/api/participants', (req, res) => {
    const db = readDatabase();
    const newParticipant = {
        id: Date.now(),
        ...req.body,
        registrationDate: new Date().toLocaleDateString('ar-SA'),
        year: '2026',
        createdAt: new Date().toISOString()
    };
    
    db.participants.push(newParticipant);
    writeDatabase(db);
    
    res.json({ success: true, message: 'Participant added successfully' });
});

// Get statistics
app.get('/api/stats', (req, res) => {
    const db = readDatabase();
    const participants = db.participants;
    const today = new Date().toLocaleDateString('ar-SA');
    
    const stats = {
        total: participants.length,
        scouts: participants.filter(p => p.scout === 'yes').length,
        nonScouts: participants.filter(p => p.scout === 'no').length,
        today: participants.filter(p => p.registrationDate === today).length
    };
    
    res.json(stats);
});

// Clear all participants (admin only)
app.delete('/api/participants', (req, res) => {
    const db = readDatabase();
    db.participants = [];
    writeDatabase(db);
    res.json({ success: true, message: 'All participants cleared' });
});

// Serve the main pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// Start server
app.listen(PORT, HOST, () => {
    console.log(`🚀 Server running on http://${HOST}:${PORT}`);
    console.log(`📊 Admin Panel: http://${HOST}:${PORT}/admin`);
    console.log(`🌐 Main Site: http://${HOST}:${PORT}`);
    console.log(`📱 Local Network: http://YOUR_IP:${PORT}`);
});
