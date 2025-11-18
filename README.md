# 💪 Gym Tracker

A modern, mobile-first workout tracking application with cloud synchronization across all your devices. Built with vanilla JavaScript and Node.js.

<div align="center">

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![Platform](https://img.shields.io/badge/platform-web%20%7C%20mobile-lightgrey.svg)

[Live Demo](#) | [Documentation](#installation) | [Report Bug](#) | [Request Feature](#)

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

### 🔄 Cross-Device Synchronization
- **Cloud Storage** - All data saved to remote server
- **Multi-Device Access** - Desktop, laptop, tablet, and mobile
- **Real-time Status** - Visual indicator shows connection state
- **Simple Sync** - Just refresh to see updates from other devices

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

- Node.js 18.0.0 or higher
- npm or yarn package manager

### Local Development

```bash
# Clone the repository
git clone https://github.com/yourusername/gym-tracker.git
cd gym-tracker

# Install dependencies
npm install

# Start the development server
npm start

# Open your browser
http://localhost:3000
```

### Deploy to Production

#### Option 1: Render.com (Recommended - FREE)

1. Fork this repository to your GitHub account
2. Sign up at [Render.com](https://render.com)
3. Create a new **Web Service**
4. Connect your GitHub repository
5. Use these settings:
   ```
   Build Command: npm install
   Start Command: npm start
   ```
6. Click **Deploy**
7. Your app will be live at `https://your-app.onrender.com`

#### Option 2: Custom Server

```bash
# Install production dependencies
npm install --production

# Start the server
NODE_ENV=production npm start
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

---

## 🗂 Project Structure

```
gym-tracker/
│
├── public/
│   └── index.html          # Frontend (HTML/CSS/JavaScript)
│
├── server.js               # Backend API (Express + SQLite)
├── package.json            # Dependencies and scripts
├── .gitignore             # Git ignore rules
├── DEPLOYMENT.md          # Detailed deployment guide
└── README.md              # This file
```

---

## 💻 Technology Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Flexbox/Grid
- **Vanilla JavaScript** - No frameworks, just pure JS
- **Responsive Design** - Mobile-first approach

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **SQLite3** - Lightweight database
- **CORS** - Cross-origin resource sharing

### Deployment
- **Render.com** - Backend hosting (free tier available)
- **Hostinger** - Optional custom domain hosting

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

## 🎨 Screenshots

### Mobile View
*Clean, modern interface optimized for mobile devices*

### Desktop View
*Spacious layout for larger screens*

### Exercise History
*Filter and review your workout history*

### Statistics Dashboard
*Track your progress with visual stats*

---

## 🔌 API Documentation

### Endpoints

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
const response = await fetch('/api/workouts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    date: '2024-11-17',
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
  "date": "2024-11-17",
  "exercise": "Bench Press",
  "sets": "3",
  "reps": "10",
  "weight": "60kg",
  "notes": "Felt strong today!",
  "created_at": "2024-11-17T10:30:00.000Z"
}
```

---

## 🛠 Configuration

### Environment Variables

```bash
PORT=3000              # Server port (default: 3000)
NODE_ENV=production    # Environment mode
```

### Frontend Configuration

Edit `public/index.html` to set your backend API URL:

```javascript
const API_URL = 'https://your-backend-url.com/api';
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

## 🔒 Security & Privacy

### Current Implementation
- ✅ HTTPS encryption in transit
- ✅ Data stored securely on server
- ✅ SQL injection protection (parameterized queries)
- ⚠️ No user authentication (single-user app)

### Future Enhancements
Want to add user accounts? The app can be extended with:
- User registration and login
- JWT token authentication
- Password hashing (bcrypt)
- Role-based access control

---

## 🚧 Roadmap

### Planned Features
- [ ] User authentication & multi-user support
- [ ] Workout programs & templates
- [ ] Progress charts & graphs
- [ ] Rest timer between sets
- [ ] Exercise library with instructions
- [ ] Photo progress tracking
- [ ] Goals & achievement system
- [ ] Export data (CSV/PDF)
- [ ] Workout reminders
- [ ] Progressive Web App (PWA) with offline support

### Ideas & Suggestions
Have a feature request? [Open an issue](#) or submit a pull request!

---

## 🐛 Troubleshooting

### First load is slow (~30 seconds)
**Cause:** Render.com free tier spins down after 15 minutes of inactivity  
**Solution:** This is normal! Subsequent loads will be instant. Upgrade to paid plan ($7/mo) for always-on service.

### Data not syncing across devices
**Cause:** Browser cache or incorrect API URL  
**Solution:** 
- Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
- Verify API_URL in `index.html` points to your backend
- Check browser console (F12) for errors

### Can't save workouts
**Cause:** Backend server not running or CORS issue  
**Solution:**
- Check if backend is deployed and running
- Verify server logs on Render.com
- Ensure CORS is enabled in `server.js`

### More Help
See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed troubleshooting.

---

## 💰 Cost Breakdown

Running this app is **completely FREE** for personal use:

| Service | Plan | Monthly Cost |
|---------|------|--------------|
| Render.com | Free Tier | $0 |
| Database | SQLite (included) | $0 |
| **Total** | | **$0/month** |

**Optional Upgrades:**
- Render.com Paid Plan: $7/month (always-on, no spin-down)
- Custom domain: ~$10-15/year

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

Created with 💪 by [Your Name]

### Connect
- GitHub: [@yourusername](https://github.com/yourusername)
- Website: [yourwebsite.com](https://yourwebsite.com)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- Inspired by the need for a simple, effective workout tracker
- Built with love for the fitness community
- Thanks to all contributors and users!

---

## 📞 Support

Need help? Have questions?

- 📖 [Read the Docs](./DEPLOYMENT.md)
- 🐛 [Report a Bug](#)
- 💡 [Request a Feature](#)
- 💬 [Join Discussions](#)

---

<div align="center">

**[⬆ back to top](#-gym-tracker)**

Made with ❤️ and 💪

</div>
