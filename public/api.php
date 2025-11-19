<?php
// api.php - Backend API for Gym Tracker (Hostinger)
// Place this file in the same directory as index.html

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Data file path
$dataFile = __DIR__ . '/data/workouts.json';
$dataDir = __DIR__ . '/data';

// Ensure data directory exists
if (!file_exists($dataDir)) {
    mkdir($dataDir, 0755, true);
}

// Initialize data file if it doesn't exist
if (!file_exists($dataFile)) {
    file_put_contents($dataFile, json_encode([], JSON_PRETTY_PRINT));
}

// Read workouts from file
function readWorkouts() {
    global $dataFile;
    $json = file_get_contents($dataFile);
    return json_decode($json, true) ?: [];
}

// Write workouts to file
function writeWorkouts($workouts) {
    global $dataFile;
    return file_put_contents($dataFile, json_encode($workouts, JSON_PRETTY_PRINT));
}

// Get request URI and method
$requestUri = $_SERVER['REQUEST_URI'];
$method = $_SERVER['REQUEST_METHOD'];

// Parse the request - looking for /api/workouts or /api/health
if (strpos($requestUri, '/api/workouts') !== false) {
    $action = 'workouts';
    // Extract ID if present
    preg_match('/\/api\/workouts\/(\d+)/', $requestUri, $matches);
    $id = isset($matches[1]) ? intval($matches[1]) : null;
} elseif (strpos($requestUri, '/api/health') !== false) {
    $action = 'health';
    $id = null;
} else {
    http_response_code(404);
    echo json_encode(['error' => 'Endpoint not found']);
    exit();
}

// Route handling
switch ($action) {
    case 'workouts':
        handleWorkouts($method, $id);
        break;
    
    case 'health':
        handleHealth();
        break;
}

// Handle workouts endpoint
function handleWorkouts($method, $id) {
    switch ($method) {
        case 'GET':
            if ($id) {
                getWorkout($id);
            } else {
                getAllWorkouts();
            }
            break;
        
        case 'POST':
            createWorkout();
            break;
        
        case 'PUT':
            if ($id) {
                updateWorkout($id);
            } else {
                http_response_code(400);
                echo json_encode(['error' => 'ID required for update']);
            }
            break;
        
        case 'DELETE':
            if ($id) {
                deleteWorkout($id);
            } else {
                http_response_code(400);
                echo json_encode(['error' => 'ID required for delete']);
            }
            break;
        
        default:
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
            break;
    }
}

// Get all workouts
function getAllWorkouts() {
    $workouts = readWorkouts();
    
    // Sort by date descending, then by created_at
    usort($workouts, function($a, $b) {
        if ($a['date'] !== $b['date']) {
            return strcmp($b['date'], $a['date']);
        }
        return strcmp($b['created_at'], $a['created_at']);
    });
    
    echo json_encode($workouts);
}

// Get single workout
function getWorkout($id) {
    $workouts = readWorkouts();
    
    foreach ($workouts as $workout) {
        if ($workout['id'] === $id) {
            echo json_encode($workout);
            return;
        }
    }
    
    http_response_code(404);
    echo json_encode(['error' => 'Workout not found']);
}

// Create new workout
function createWorkout() {
    $input = json_decode(file_get_contents('php://input'), true);
    
    // Validate required fields
    if (empty($input['date']) || empty($input['exercise']) || 
        empty($input['sets']) || empty($input['reps']) || 
        empty($input['weight'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing required fields']);
        return;
    }
    
    $workouts = readWorkouts();
    
    // Generate new ID
    $maxId = 0;
    foreach ($workouts as $workout) {
        if ($workout['id'] > $maxId) {
            $maxId = $workout['id'];
        }
    }
    
    $newWorkout = [
        'id' => $maxId + 1,
        'date' => $input['date'],
        'exercise' => $input['exercise'],
        'sets' => $input['sets'],
        'reps' => $input['reps'],
        'weight' => $input['weight'],
        'notes' => $input['notes'] ?? '',
        'created_at' => date('c')
    ];
    
    $workouts[] = $newWorkout;
    
    if (writeWorkouts($workouts)) {
        http_response_code(201);
        echo json_encode($newWorkout);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to save workout']);
    }
}

// Update workout
function updateWorkout($id) {
    $input = json_decode(file_get_contents('php://input'), true);
    $workouts = readWorkouts();
    $found = false;
    
    foreach ($workouts as $key => $workout) {
        if ($workout['id'] === $id) {
            $workouts[$key] = [
                'id' => $id,
                'date' => $input['date'] ?? $workout['date'],
                'exercise' => $input['exercise'] ?? $workout['exercise'],
                'sets' => $input['sets'] ?? $workout['sets'],
                'reps' => $input['reps'] ?? $workout['reps'],
                'weight' => $input['weight'] ?? $workout['weight'],
                'notes' => $input['notes'] ?? $workout['notes'],
                'created_at' => $workout['created_at']
            ];
            $found = true;
            break;
        }
    }
    
    if (!$found) {
        http_response_code(404);
        echo json_encode(['error' => 'Workout not found']);
        return;
    }
    
    if (writeWorkouts($workouts)) {
        echo json_encode($workouts[$key]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to update workout']);
    }
}

// Delete workout
function deleteWorkout($id) {
    $workouts = readWorkouts();
    $filteredWorkouts = array_filter($workouts, function($workout) use ($id) {
        return $workout['id'] !== $id;
    });
    
    // Re-index array
    $filteredWorkouts = array_values($filteredWorkouts);
    
    if (count($filteredWorkouts) === count($workouts)) {
        http_response_code(404);
        echo json_encode(['error' => 'Workout not found']);
        return;
    }
    
    if (writeWorkouts($filteredWorkouts)) {
        echo json_encode(['message' => 'Workout deleted successfully']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to delete workout']);
    }
}

// Health check
function handleHealth() {
    echo json_encode([
        'status' => 'ok',
        'timestamp' => date('c')
    ]);
}
?>
