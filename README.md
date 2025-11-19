# 💪 Gym Tracker

A modern, mobile-first workout tracking application with persistent data storage. Built with vanilla JavaScript and PHP backend - perfect for single-user deployment on shared hosting.

<div align="center">

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Platform](https://img.shields.io/badge/platform-web%20%7C%20mobile-lightgrey.svg)
![PHP](https://img.shields.io/badge/PHP-%3E%3D7.0-blue.svg)

</div>

---

## ✨ Features

### 🏋️ Smart Workout Logging
- **Flexible Input Fields** - Accept text for reps and weight (e.g., "8-12", "60kg", "bodyweight")
- **Exercise Autocomplete** - Suggests previously entered exercises as you type
- **Quick Date Entry** - Defaults to today with easy backdating
- **Optional Notes** - Track how each workout felt

### 📊 Analytics & History
- **Complete Workout History** - Beautiful card-based timeline view
- **Exercise Filtering** - Filter by specific exercises to track progress
- **Statistics Dashboard** - Total workouts, recent activity, exercise variety
- **Exercise Summary** - See your most frequently performed exercises

### 💾 Data Persistence
- **JSON File Storage** - Simple, persistent data storage on your web host
- **No Database Required** - Just PHP and a writable folder
- **Easy Backup** - Download your workout data as JSON anytime
- **Portable** - Copy your data file anywhere

### 📱 Mobile-Optimized
- **Responsive Design** - Looks great on any screen size
- **Touch-Friendly Interface** - Large buttons and tap targets
- **Add to Home Screen** - Works like a native mobile app
- **Fast & Lightweight** - Optimized for mobile networks

---

## 🎯 Use Cases

Perfect for:
- 💪 Personal fitness tracking
- 🏃 Gym progress monitoring
- 📈 Strength training progression
- 🎓 Physical therapy exercises
- 🏠 Home workout logging

---

## 🚀 Quick Start

### Prerequisites

- Web hosting with PHP support (PHP 7.0 or higher)
- Writable directory for data storage
- Modern web browser

### Installation on Shared Hosting (Hostinger, cPanel, etc.)

1. **Upload Files:**
   ```
   public_html/
   └── gym/  (or any folder name)
       ├── index.html
       ├── api.php
       └── data/  (create this folder)
   ```

2. **Set Permissions:**
   - `data/` folder: 755 (read/write/execute for owner)
   - `api.php`: 644 (readable)

3. **Access Your App:**
   - Visit: `https://yourdomain.com/gym/`
   - The app will auto-create `workouts.json` on first save

4. **Test Backend:**
   - Visit: `https://yourdomain.com/gym/api.php?path=/api/health`
   - Should see: `{"status":"ok","timestamp":"..."}`

That's it! No database setup required.

---

## 🗂 Project Structure

```
gym-tracker/
│
├── index.html             # Frontend application
├── api.php               # PHP backend API
│
├── data/                 # Data storage (auto-created)
│   └── workouts.json    # Your workout data
│
└── README.md                     # This file
```

---

## 💻 Technology Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Flexbox/Grid
- **Vanilla JavaScript** - No frameworks, just pure JS
- **Responsive Design** - Mobile-first approach

### Backend
- **PHP** - Simple file-based API (no database!)
- **JSON** - Lightweight data storage
- **CORS Enabled** - Works from any domain

### Deployment
- **Hostinger** - Shared hosting (or any PHP host)
- **cPanel** - Also compatible
- **No database required** - Just file storage

---

## 📊 Example Data Formats

The app accepts flexible text input for real-world tracking:

### Sets
```
3                    # Simple number
3 warmup + 4 working # Detailed description
5 ascending          # Pyramid sets
```

### Reps
```
10                   # Fixed reps
8-12                 # Rep range
AMRAP                # As many reps as possible
12,10,8,6           # Descending reps
```

### Weight
```
60kg                 # Metric with unit
135lbs               # Imperial with unit
bodyweight           # No external weight
50kg + bands         # Complex setup
```

---

## 🔌 API Documentation

### Endpoints

All endpoints use the format: `/api.php?path=/api/{endpoint}`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/workouts` | Get all workouts |
| `GET` | `/api/workouts/:id` | Get single workout |
| `POST` | `/api/workouts` | Create new workout |
| `PUT` | `/api/workouts/:id` | Update workout |
| `DELETE` | `/api/workouts/:id` | Delete workout |
| `GET` | `/api/health` | Health check |

### Example Request

```javascript
// Create a new workout
const response = await fetch('./api.php?path=/api/workouts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    date: '2024-11-18',
    exercise: 'Bench Press',
    sets: '3',
    reps: '10',
    weight: '60kg',
    notes: 'Felt strong today!'
  })
});
```

### Example Response

```json
{
  "id": 1,
  "date": "2024-11-18",
  "exercise": "Bench Press",
  "sets": "3",
  "reps": "10",
  "weight": "60kg",
  "notes": "Felt strong today!",
  "created_at": "2024-11-18T10:30:00+00:00"
}
```

---

## 📱 Mobile Installation

### Add to Home Screen

#### iOS (iPhone/iPad)
1. Open the app in Safari
2. Tap the **Share** button
3. Scroll down and tap **"Add to Home Screen"**
4. Name it "Gym Tracker" and tap **Add**

#### Android
1. Open the app in Chrome
2. Tap the **three dots** menu
3. Tap **"Add to Home screen"**
4. Name it and confirm

The app will now open like a native mobile application!

---

## 💾 Backup & Restore

### Backup Your Data

**Method 1: Download via Browser**
Visit: `https://yourdomain.com/gym/api.php?path=/api/workouts`
- Copy the JSON output
- Save to a text file

**Method 2: Download via File Manager**
- Access your hosting file manager
- Navigate to `gym/data/`
- Download `workouts.json`

**Recommendation:** Backup monthly!

### Restore Data

1. Access file manager
2. Navigate to `gym/data/`
3. Edit or replace `workouts.json`
4. Ensure valid JSON format

---

## 🔒 Security & Privacy

### Current Implementation
- ✅ PHP input validation
- ✅ JSON encoding prevents injection
- ✅ Data stored server-side
- ⚠️ No user authentication (single-user app)

### Optional: Protect Data Folder

Create `.htaccess` in `data/` folder:
```apache
Order Deny,Allow
Deny from all
```

This prevents direct access to `workouts.json`.

### Adding Password Protection (Optional)

If you want to add authentication:
1. Use PHP sessions
2. Add login form
3. Verify credentials before API access

Let me know if you want this feature!

---

## 🐛 Troubleshooting

### "Connection failed" error

**Check these in order:**

1. **Backend accessible?**
   - Visit: `yourdomain.com/gym/api.php?path=/api/health`
   - Should show: `{"status":"ok",...}`

2. **Files in correct location?**
   ```
   gym/
   ├── index.html  ✓
   ├── api.php     ✓
   └── data/       ✓ (must exist)
   ```

3. **Permissions correct?**
   - `data/` folder: 755
   - `api.php`: 644

4. **PHP enabled?**
   - Contact hosting support if backend shows PHP code instead of JSON

5. **Browser cache?**
   - Hard refresh: Ctrl+Shift+R (or Cmd+Shift+R)

See [CONNECTION-FAILED-FIX.md](./CONNECTION-FAILED-FIX.md) for detailed troubleshooting.

---

## 💰 Cost Breakdown

Running this app is **completely FREE** if you already have web hosting:

| Service | Plan | Monthly Cost |
|---------|------|--------------|
| Web Hosting | Shared (Hostinger, etc.) | Already paid |
| Database | None needed! | $0 |
| **Total** | | **$0/month** |

**No database fees, no external services, no hidden costs!**

---

## 🚧 Roadmap

### Planned Features
- [ ] Workout programs & templates  
- [ ] Progress charts & graphs
- [ ] Rest timer between sets
- [ ] Exercise library with instructions
- [ ] Photo progress tracking
- [ ] Goals & achievement system
- [ ] Export data (CSV/PDF)
- [ ] Workout reminders
- [ ] Multi-user support with authentication

### Ideas & Suggestions
Have a feature request? Open an issue or submit a pull request!

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Development Guidelines
- Keep code simple and readable
- Comment complex logic
- Test on mobile devices
- Follow existing code style

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**TL;DR:** Free to use, modify, and distribute. No warranty provided.

---

## 👨‍💻 Author

Created by me with 💪 for fitness enthusiasts

---

## 🙏 Acknowledgments

- Built for simplicity and practicality
- No frameworks, no database, no complexity
- Perfect for personal use
- Thanks to all users and contributors!

---

## 🎯 Why This App?

**Simple:**
- No database setup
- No complex configuration
- Upload 2 files and you're done

**Practical:**
- Works on any PHP hosting
- Data persists forever
- Easy to backup

**Flexible:**
- Text input for real-world scenarios
- Mobile-friendly
- Works offline after initial load

**Free:**
- No ongoing costs
- No third-party services
- Own your data

---

<div align="center">

**[⬆ back to top](#-gym-tracker)**

Made with ❤️ and 💪

</div>
