const Board = (function createBoard() {
  const board =
    [" ", " ", " ",
      " ", " ", " ",
      " ", " ", " ",
    ]

  const winningBoards = [
    [0, 1, 2], // Top Row
    [3, 4, 5], // Middle Row
    [6, 7, 8], // Bottom Row
    [0, 3, 6], // Left Column
    [1, 4, 7], // Middle Column
    [2, 5, 8], // Right Column
    [0, 4, 8], // Diagonal
    [2, 4, 6]  // Diagonal

  ]

  function log(message) {
    console.log(`[ ${new Date().toLocaleString()} ] Action: ${message}`);
  }

  let user1 = createUser("player1", "X");
  let user2 = createUser("player2", "O");

  function setUser1(name, mark) {
    user1 = createUser(name, mark);
  }

  function setUser2(name, mark) {
    user2 = createUser(name, mark);
  }


  let currentUser = user1;

  function getCurrentUser() {
    return currentUser;
  }

  function switchCurrentUser() {
    (currentUser == user1) ? currentUser = user2 : currentUser = user1;
  }

  function placeMark(user, index) {
    if (board[index] == " ") {
      board[index] = user.getMark();
      return true;
    } else {
      console.log("This spot is already filled");
      console.log(index);
      return false;
    }
  }

  function checkWinner(user) {
    const userMark = user.getMark();
    return winningBoards.some(combo => {
      return combo.every(index => board[index] === userMark);
    })
  }

  function resetGame() {
    board.fill(" ");
    log("Reset Game");
  }

  function printBoard() {
    console.log(`
      ${board[0]} | ${board[1]} | ${board[2]}
      ---------
      ${board[3]} | ${board[4]} | ${board[5]}
      ---------
      ${board[6]} | ${board[7]} | ${board[8]}
      `);
  }


  return {
    placeMark,
    checkWinner,
    resetGame,
    printBoard,
    getCurrentUser,
    log,
    switchCurrentUser,
    setUser1,
    setUser2,
  }

})();

function createUser(name, mark) {
  const getName = () => name;
  const getMark = () => mark;
  return {
    getName,
    getMark,
  }
}



const DisplayController = (function Display() {


  function addClickEvents() {
    const squares = document.querySelectorAll(".square");

    squares.forEach((square, index) => {
      square.addEventListener("click", () => {
        let mark = Board.getCurrentUser().getMark();
        if (Board.placeMark(Board.getCurrentUser(), index)) {
          square.textContent = mark;
        }
        if (Board.checkWinner(Board.getCurrentUser())) {

        } else {
          Board.switchCurrentUser();
        }
      }
      )

    })
    Board.log("Added click events")
  }

  function hideUserCreation() {
    const formContainer = document.querySelector(".user-form-container");
    formContainer.style.display = "none";
  }

  function startGame() {
    const gameContainer = document.querySelector(".game-container");
    hideUserCreation();
    gameContainer.style.display = "grid";
  }

  const startGameBtn = document.querySelector(".start-game-btn");


  startGameBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const form = document.querySelector(".user-form"); // make sure your form has this ID
    if (!form.checkValidity()) {
      form.reportValidity(); // shows the built-in browser validation message
      return;
    }

    let user1Name = document.querySelector("input[id=user1]").value;
    let user2Name = document.querySelector("input[id=user2]").value;
    Board.setUser1(user1Name, "X");
    Board.setUser2(user2Name, "O");
    startGame();
  })

  addClickEvents();

})();


