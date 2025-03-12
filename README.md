
Jogo da Teia (Web Game)
Jogo da Teia is a two-player strategy board game implemented as a full-stack web application. It features a 3x3 grid where players move their pieces strategically to form a winning pattern, similar to Tic-Tac-Toe but with unique movement mechanics. The game is built with real-time multiplayer functionality using WebSockets, allowing two players to compete over a network.
This project showcases a client-server architecture with a React frontend for an interactive UI and a Node.js backend for game logic and synchronization. Whether you're a developer looking to explore real-time applications or a player eager for a strategic challenge, Jogo da Teia offers both a fun experience and a learning opportunity.
Table of Contents
Technologies (#technologies)
Game Rules (#game-rules)
Setup and Installation (#setup-and-installation)
Running the Game (#running-the-game)
Project Structure (#project-structure)
Contributing (#contributing)
License (#license)
Technologies
Frontend:
React: A JavaScript library for building the interactive 3x3 game board UI.
Socket.IO-Client: Enables real-time communication between the client and server for live game updates.
Tailwind CSS: A utility-first CSS framework for styling the game board with a clean, minimal design.
Backend:
Node.js: A JavaScript runtime for running the game server.
Express: A minimal web framework for setting up the server.
Socket.IO: Provides WebSocket support for real-time, bidirectional communication between players and the server.
Development Tools:
Git: Version control for managing the project’s codebase.
npm: Package manager for installing dependencies.
Serve: A static file server for hosting the production build of the frontend.
Game Rules
Jogo da Teia is a strategic game played on a 3x3 grid between two players: Player X (black pieces) and Player O (white pieces). The objective is to move your pieces to form one of the predefined winning patterns while blocking your opponent.
Initial Setup
The game starts with a 3x3 grid in this configuration:
```
X | X | X
  |   |  
O | O | O
Player X has three black pieces (⚫) in the top row.
Player O has three white pieces (⚪) in the bottom row.
The middle row is empty.
How to Play
Turns:
Players take turns, starting with Player X.
The current player’s turn is indicated at the top of the screen (e.g., "Player X’s Turn").
Moving Pieces:
Click one of your pieces to select it (it turns yellow).
Valid moves (adjacent empty cells) are highlighted in light green (bg-green-200).
Click a highlighted cell to move your piece there. The original cell becomes empty.
Valid moves are based on adjacency (horizontal, vertical, or diagonal). For example:
From cell 0 (top-left), you can move to 1, 3, or 4.
From cell 4 (center), you can move to any surrounding cell (0, 1, 2, 3, 5, 6, 7, 8).
Winning the Game:
The first player to align three of their pieces in one of these patterns wins:
Diagonal: [0, 4, 8] (top-left to bottom-right) or [2, 4, 6] (top-right to bottom-left).
Middle Row: [3, 4, 5] (horizontal).
Middle Column: [1, 4, 7] (vertical).
Winning cells are highlighted in green (bg-green-300) with a strikethrough on the pieces, like Tic-Tac-Toe.
Restarting:
After a win, a "Restart Game" button appears.
Clicking it resets the board to the initial state, keeping the same players, and starts a new game with Player X’s turn.
Objective
Move your pieces strategically to form a winning pattern while preventing your opponent from doing the same.
Setup and Installation
Prerequisites
Node.js: Version 14.x or higher (includes npm).
Git: For cloning the repository.
Steps
Clone the Repository:
bash
git clone https://github.com/yourusername/your-repo.git
cd your-repo
Install Backend Dependencies:
bash
cd server
npm install
Install Frontend Dependencies:
bash
cd ../client
npm install
Running the Game
Development Mode
Start the Backend:
In the server/ directory:
bash
node server.js
Runs on http://localhost:3000.
Start the Frontend:
In the client/ directory:
bash
npm start
Runs on http://localhost:3001 (edit package.json to use PORT=3001 react-scripts start if needed).
Open http://localhost:3001 in two browser tabs to play as both players.
Production Mode
Build the Frontend:
In client/:
bash
npm run build
Serve the Build:
Install serve globally (if not already installed):
bash
npm install -g serve
Serve the build:
bash
serve -s build -l 3001
Access http://your-local-ip:3001 (e.g., http://172.20.12.219:3001) from multiple devices on the same network.
Run the Backend: Same as in development mode (node server.js in server/).
Project Structure
your-repo/
├── client/              # Frontend (React)
│   ├── src/
│   │   ├── GameBoard.jsx  # Main game component
│   │   ├── index.js       # Entry point
│   │   └── index.css      # Tailwind CSS setup
│   └── package.json
├── server/              # Backend (Node.js)
│   ├── server.js        # Server setup and Socket.IO logic
│   ├── gameState.js     # Game logic and state management
│   └── package.json
├── README.md            # Project documentation
└── .gitignore           # Git ignore file (e.g., node_modules/)
Contributing
Contributions are welcome! To contribute:
Fork the repository.
Create a feature branch (git checkout -b feature/your-feature).
Commit your changes (git commit -m "Add your feature").
Push to the branch (git push origin feature/your-feature).
Open a Pull Request on GitHub.
Please ensure your code follows the existing style and includes appropriate comments.

Notes
Repository Name: Replace yourusername/your-repo with your actual GitHub username and repository name (e.g., vanes/jogo-da-teia).
IP Address: Update http://172.20.12.219:3001 in the "Running the Game" section if your server’s local IP differs (check with ipconfig or ifconfig).
