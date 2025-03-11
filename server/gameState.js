// Store all games by room ID
const games = {};

// Initial board configuration as a constant for reusability
const INITIAL_BOARD = ["X", "X", "X", "", "", "", "O", "O", "O"];

// Function to initialize a new game
const initializeGame = (roomId) => {
  games[roomId] = {
    board: [...INITIAL_BOARD], // Use spread to create a new array
    currentPlayer: "X",
    players: {}, // Track player socket IDs
    gameActive: false,
    winner: null,
  };
};

// Function to get the current game state
const getGameState = (roomId) => games[roomId] || null;

// Function to assign a player to the game
const assignPlayer = (roomId, socketId) => {
  const game = games[roomId];
  if (!game) return null;

  if (!game.players.X) {
    game.players.X = socketId;
    return "X";
  } else if (!game.players.O) {
    game.players.O = socketId;
    game.gameActive = true; // Start the game when both players join
    return "O";
  }
  return null; // Game is full
};

// Valid moves mapping for each cell
const validMoves = {
  0: [1, 3, 4],
  1: [0, 2, 4],
  2: [1, 4, 5],
  3: [0, 4, 6],
  4: [0, 1, 2, 3, 5, 6, 7, 8],
  5: [2, 4, 8],
  6: [3, 4, 7],
  7: [6, 4, 8],
  8: [5, 4, 7],
};

// Function to validate a move
const isValidMove = (roomId, from, to) => {
  const game = games[roomId];
  if (!game) return false;

  const { board, currentPlayer } = game;

  // Check if 'from' has the current player's piece and 'to' is empty
  if (board[from] !== currentPlayer || board[to] !== "") return false;

  // Check if the move is within the allowed moves for the cell
  if (!validMoves[from].includes(to)) return false;

  return true;
};

// Winning patterns for the game
const winningPatterns = [
  [0, 4, 8], // Diagonal ↘
  [2, 4, 6], // Diagonal ↙
  [3, 4, 5], // Horizontal middle row
  [1, 4, 7], // Vertical middle column
];

// Function to check for a win
const checkWin = (roomId) => {
  const game = games[roomId];
  if (!game) return null;

  const { board } = game;

  for (const pattern of winningPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      game.winner = board[a];
      game.gameActive = false; // End the game
      return game.winner;
    }
  }
  return null; // No winner yet
};

// Function to make a move
const makeMove = (roomId, from, to) => {
  const game = games[roomId];
  if (!game || !game.gameActive) return false; // Ensure the game exists and is active

  if (!isValidMove(roomId, from, to)) return false; // Invalid move

  // Perform the move
  game.board[to] = game.currentPlayer;
  game.board[from] = "";

  // Check for a winner
  const winner = checkWin(roomId);
  if (winner) return winner; // Return the winner if found

  // Switch to the other player
  game.currentPlayer = game.currentPlayer === "X" ? "O" : "X";
  return true; // Move successful
};

// Function to restart the game
const restartGame = (roomId) => {
  const game = games[roomId];
  if (!game) return false; // No game to restart

  // Reset game state while preserving players
  game.board = [...INITIAL_BOARD];
  game.currentPlayer = "X";
  game.gameActive = Object.keys(game.players).length === 2; // Active only if both players are present
  game.winner = null;

  return true; // Restart successful
};

module.exports = {
  initializeGame,
  getGameState,
  assignPlayer,
  isValidMove,
  makeMove,
  checkWin,
  restartGame, // Export the new function
};