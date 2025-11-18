// server.js - Backend for Gym Tracker
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Database setup
const db = new sqlite3.Database('./gym-tracker.db', (err) => {
    if (err) {
        console.error('Error opening database:', err);
    } else {
        console.log('Connected to SQLite database');
        initDatabase();
    }
});

// Initialize database tables
function initDatabase() {
    db.run(`
        CREATE TABLE IF NOT EXISTS workouts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT NOT NULL,
            exercise TEXT NOT NULL,
            sets TEXT NOT NULL,
            reps TEXT NOT NULL,
            weight TEXT NOT NULL,
            notes TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `, (err) => {
        if (err) {
            console.error('Error creating table:', err);
        } else {
            console.log('Database table ready');
        }
    });
}

// API Routes

// Get all workouts
app.get('/api/workouts', (req, res) => {
    db.all('SELECT * FROM workouts ORDER BY date DESC, created_at DESC', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Get single workout
app.get('/api/workouts/:id', (req, res) => {
    db.get('SELECT * FROM workouts WHERE id = ?', [req.params.id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (!row) {
            res.status(404).json({ error: 'Workout not found' });
            return;
        }
        res.json(row);
    });
});

// Create new workout
app.post('/api/workouts', (req, res) => {
    const { date, exercise, sets, reps, weight, notes } = req.body;
    
    if (!date || !exercise || !sets || !reps || !weight) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
    }

    const sql = 'INSERT INTO workouts (date, exercise, sets, reps, weight, notes) VALUES (?, ?, ?, ?, ?, ?)';
    const params = [date, exercise, sets, reps, weight, notes || ''];

    db.run(sql, params, function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            id: this.lastID,
            date,
            exercise,
            sets,
            reps,
            weight,
            notes
        });
    });
});

// Update workout
app.put('/api/workouts/:id', (req, res) => {
    const { date, exercise, sets, reps, weight, notes } = req.body;
    const sql = 'UPDATE workouts SET date = ?, exercise = ?, sets = ?, reps = ?, weight = ?, notes = ? WHERE id = ?';
    const params = [date, exercise, sets, reps, weight, notes || '', req.params.id];

    db.run(sql, params, function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ error: 'Workout not found' });
            return;
        }
        res.json({ id: req.params.id, date, exercise, sets, reps, weight, notes });
    });
});

// Delete workout
app.delete('/api/workouts/:id', (req, res) => {
    db.run('DELETE FROM workouts WHERE id = ?', [req.params.id], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ error: 'Workout not found' });
            return;
        }
        res.json({ message: 'Workout deleted successfully' });
    });
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error('Error closing database:', err);
        }
        console.log('Database connection closed');
        process.exit(0);
    });
});
