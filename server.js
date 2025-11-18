// server.js - Backend for Gym Tracker (JSON File Storage)
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const PORT = process.env.PORT || 3000;

// Data file path
const DATA_FILE = path.join(__dirname, 'data', 'workouts.json');

// Middleware
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));
app.use(express.json());
app.use(express.static('public'));

// Logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Initialize data file
async function initDataFile() {
    try {
        await fs.mkdir(path.join(__dirname, 'data'), { recursive: true });
        
        try {
            await fs.access(DATA_FILE);
            console.log('Data file exists');
        } catch {
            await fs.writeFile(DATA_FILE, JSON.stringify([], null, 2));
            console.log('Created new data file');
        }
    } catch (err) {
        console.error('Error initializing data file:', err);
    }
}

// Read workouts
async function readWorkouts() {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading workouts:', err);
        return [];
    }
}

// Write workouts
async function writeWorkouts(workouts) {
    try {
        await fs.writeFile(DATA_FILE, JSON.stringify(workouts, null, 2));
        return true;
    } catch (err) {
        console.error('Error writing workouts:', err);
        return false;
    }
}

// API Routes

// Get all workouts
app.get('/api/workouts', async (req, res) => {
    try {
        const workouts = await readWorkouts();
        // Sort by date descending, then by created_at
        workouts.sort((a, b) => {
            if (b.date !== a.date) {
                return b.date.localeCompare(a.date);
            }
            return new Date(b.created_at) - new Date(a.created_at);
        });
        res.json(workouts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get single workout
app.get('/api/workouts/:id', async (req, res) => {
    try {
        const workouts = await readWorkouts();
        const workout = workouts.find(w => w.id === parseInt(req.params.id));
        
        if (!workout) {
            res.status(404).json({ error: 'Workout not found' });
            return;
        }
        
        res.json(workout);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create new workout
app.post('/api/workouts', async (req, res) => {
    try {
        const { date, exercise, sets, reps, weight, notes } = req.body;
        
        if (!date || !exercise || !sets || !reps || !weight) {
            res.status(400).json({ error: 'Missing required fields' });
            return;
        }

        const workouts = await readWorkouts();
        
        // Generate new ID (max ID + 1)
        const maxId = workouts.length > 0 
            ? Math.max(...workouts.map(w => w.id)) 
            : 0;
        
        const newWorkout = {
            id: maxId + 1,
            date,
            exercise,
            sets,
            reps,
            weight,
            notes: notes || '',
            created_at: new Date().toISOString()
        };
        
        workouts.push(newWorkout);
        
        const success = await writeWorkouts(workouts);
        if (!success) {
            res.status(500).json({ error: 'Failed to save workout' });
            return;
        }
        
        res.json(newWorkout);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update workout
app.put('/api/workouts/:id', async (req, res) => {
    try {
        const { date, exercise, sets, reps, weight, notes } = req.body;
        const id = parseInt(req.params.id);
        
        const workouts = await readWorkouts();
        const index = workouts.findIndex(w => w.id === id);
        
        if (index === -1) {
            res.status(404).json({ error: 'Workout not found' });
            return;
        }
        
        workouts[index] = {
            ...workouts[index],
            date,
            exercise,
            sets,
            reps,
            weight,
            notes: notes || ''
        };
        
        const success = await writeWorkouts(workouts);
        if (!success) {
            res.status(500).json({ error: 'Failed to update workout' });
            return;
        }
        
        res.json(workouts[index]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete workout
app.delete('/api/workouts/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const workouts = await readWorkouts();
        const filteredWorkouts = workouts.filter(w => w.id !== id);
        
        if (filteredWorkouts.length === workouts.length) {
            res.status(404).json({ error: 'Workout not found' });
            return;
        }
        
        const success = await writeWorkouts(filteredWorkouts);
        if (!success) {
            res.status(500).json({ error: 'Failed to delete workout' });
            return;
        }
        
        res.json({ message: 'Workout deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Initialize and start server
initDataFile().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`Data file: ${DATA_FILE}`);
    });
});
