const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const gameState = require("./gameState");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Adjust this for production security (e.g., specific origins)
    methods: ["GET", "POST"],
  },
});

// Constants for event names to avoid magic strings
const EVENTS = {
  JOIN_GAME: "joinGame",
  MAKE_MOVE: "makeMove",
  RESTART_GAME: "restartGame",
  PLAYER_ASSIGNED: "playerAssigned",
  GAME_STATE_UPDATE: "gameStateUpdate",
  GAME_OVER: "gameOver",
  ERROR_MESSAGE: "errorMessage",
  DISCONNECT: "disconnect",
};

io.on("connection", (socket) => {
  console.log(`A user connected: ${socket.id}`);

  // Handle joining a game
  socket.on(EVENTS.JOIN_GAME, (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room: ${roomId}`);

    if (!gameState.getGameState(roomId)) {
      gameState.initializeGame(roomId);
      console.log(`Initialized new game for room: ${roomId}`);
    }

    const assignedSymbol = gameState.assignPlayer(roomId, socket.id);

    if (!assignedSymbol) {
      socket.emit(EVENTS.ERROR_MESSAGE, "Game is full");
      console.log(`Room ${roomId} is full for user ${socket.id}`);
      return;
    }

    socket.emit(EVENTS.PLAYER_ASSIGNED, assignedSymbol);
    io.to(roomId).emit(EVENTS.GAME_STATE_UPDATE, gameState.getGameState(roomId));
    console.log(`Assigned ${assignedSymbol} to ${socket.id} in room ${roomId}`);
  });

  // Handle player moves
  socket.on(EVENTS.MAKE_MOVE, ({ roomId, from, to }) => {
    const moveResult = gameState.makeMove(roomId, from, to);

    if (moveResult === false) {
      socket.emit(EVENTS.ERROR_MESSAGE, "Invalid move");
      console.log(`Invalid move attempted by ${socket.id} in room ${roomId}`);
      return;
    }

    io.to(roomId).emit(EVENTS.GAME_STATE_UPDATE, gameState.getGameState(roomId));

    if (moveResult === "X" || moveResult === "O") {
      io.to(roomId).emit(EVENTS.GAME_OVER, { winner: moveResult });
      console.log(`Game over in room ${roomId}: ${moveResult} wins`);
    }
  });

  // Handle game restart
  socket.on(EVENTS.RESTART_GAME, (roomId) => {
    const success = gameState.restartGame(roomId);
    if (!success) {
      socket.emit(EVENTS.ERROR_MESSAGE, "Failed to restart game: Room not found");
      console.log(`Failed to restart game in room ${roomId} for ${socket.id}`);
      return;
    }

    io.to(roomId).emit(EVENTS.GAME_STATE_UPDATE, gameState.getGameState(roomId));
    console.log(`Game restarted in room ${roomId} by ${socket.id}`);
  });

  // Handle disconnection
  socket.on(EVENTS.DISCONNECT, () => {
    console.log(`User disconnected: ${socket.id}`);
    // TODO: Optionally handle cleanup if players leave mid-game
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});