
# CodeTech Chat Stream

CodeTech Chat Stream is a real-time web chat application built using **React.js**, **Node.js**, and **Socket.IO**. It features a professional dark UI inspired by YouTube, supports real-time communication via WebSockets, and persistently stores messages using a local JSON file.

---

## Features

- Real-time bi-directional messaging using WebSockets
- User-friendly name prompt before entering chat
- Sleek dark UI inspired by YouTube's design system
- Auto-scroll to latest message on new message arrival
- Fully responsive for mobile, tablet, and desktop
- Persistent message history using a local JSON file
- Built with clean, modular code for easy customization

---

## Live Demo

*Coming soon...*

---

## Tech Stack

### Frontend:
- React.js
- Socket.IO Client
- Custom CSS (dark YouTube-inspired theme)

### Backend:
- Node.js
- Express
- Socket.IO
- fs-extra (for JSON file handling)

---

## Project Structure

```

realtime-chat-app/
├── client/               # React frontend
│   ├── src/
│   │   ├── App.js        # Main chat logic
│   │   ├── App.css       # Styling and responsiveness
│   └── package.json
│
├── server/               # Node.js backend
│   ├── index.js          # Socket.IO server with persistence
│   ├── chat.json         # Local JSON file to store messages
│   └── package.json
│
└── README.md             # Project documentation

````

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/realtime-chat-app.git
cd realtime-chat-app
````

---

### 2. Run the Backend

```bash
cd server
npm install
node index.js
```

* Runs on: `http://localhost:3001`

---

### 3. Run the Frontend

```bash
cd client
npm install
npm start
```

* Opens at: `http://localhost:3000`

---

## How It Works

1. User visits the frontend and is prompted to enter a username.
2. Upon entering, the chat UI appears with past messages loaded.
3. The user can send messages which:

   * Appear instantly in all connected clients via Socket.IO
   * Are saved in a local JSON file (`chat.json`) for persistence
4. The message box auto-scrolls to always show the latest conversation.
5. If the server restarts, all past messages remain visible due to JSON persistence.

---

## Screenshots

> Add UI screenshots in a `/screenshots` folder and embed them here (optional).

---

## Deployment

The app can be deployed using:

* **Frontend:** Vercel, Netlify, or GitHub Pages
* **Backend:** Render, Railway, Fly.io, or any Node-friendly platform

> Ensure CORS and socket URL are correctly configured for production.

---

## Future Enhancements

* Add user authentication (optional)
* Add typing indicators
* Enable room-based chats or private messaging
* Migrate message storage to MongoDB or PostgreSQL for production
* Add admin/moderator privileges
* Setup CI/CD with GitHub Actions

---


