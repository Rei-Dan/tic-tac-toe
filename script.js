const playerFactory = function (player, playericon) {
  return { player, playericon };
};

const player1 = playerFactory("Player 1", "X");
const player2 = playerFactory("Player 2", "O");

const gameBoardModule = (function () {
  const gameboard = { board: ["", "", "", "", "", "", "", "", ""] };
  const divs = document.querySelectorAll(".square");
  const gamecontainer = document.querySelector(".gameboard-container");

  function setContent() {
    divs.forEach((div) => {
      div.addEventListener("click", () => {
        if (div.textContent === "") {
          gameboard.board[div.dataset.square - 1] =
            playerModule.getCurrentplayer().playericon;
          div.textContent = gameboard.board[div.dataset.square - 1];
          gameModule.checkforWin();
          playerModule.changePlayer();
        }
      });
    });
  }
  function setBtns() {
    const resetButton = document.querySelector(".reset-button");
    resetButton.addEventListener("click", gameBoardModule.resetGame);
    const startButton = document.querySelector(".enter-names");
    startButton.addEventListener("click", playerModule.setName);
  }

  function resetGame() {
    divs.forEach((div) => {
      div.textContent = "";
      gameboard.board[div.dataset.square - 1] = "";
    });
    gamecontainer.classList.remove("no-pointer");
    playerModule.resetPlayer();
  }

  function blockGameBoard() {
    gamecontainer.classList.add("no-pointer");
  }

  function checkGameBoard() {
    return gameboard.board;
  }
  return { setContent, resetGame, checkGameBoard, blockGameBoard, setBtns };
})();

const playerModule = (function () {
  let currentController = player1;

  const setName = function () {
    const inputP1Name = document.querySelector(".p1-name-input");
    const inputP2Name = document.querySelector(".p2-name-input");
    const nameP1 = document.querySelector(".p1-name");
    const nameP2 = document.querySelector(".p2-name");
    if (inputP1Name.value === "" || inputP2Name.value === "") {
      alert("Please enter both player names to start");
    } else {
      player1.player = inputP1Name.value;
      player2.player = inputP2Name.value;
      inputP1Name.value = "";
      inputP2Name.value = "";
      nameP1.textContent = player1.player;
      nameP2.textContent = player2.player;
      gameBoardModule.resetGame();
    }
  };

  const resetPlayer = function () {
    currentController = player1;
  };

  const changePlayer = function () {
    if (currentController === player1) {
      currentController = player2;
    } else currentController = player1;
  };

  const getCurrentplayer = function () {
    return currentController;
  };

  return { changePlayer, getCurrentplayer, resetPlayer, setName };
})();

const gameModule = (function () {
  let boardState = "";
  const resultDisplay = document.querySelector(".results-display");

  function importBoardState() {
    boardState = gameBoardModule.checkGameBoard();
  }

  function checkForTie() {
    let turnCount = 0;
    for (let i = 0; i < boardState.length; i++) {
      if (boardState[i] !== "") {
        turnCount += 1;
      }
    }
    if (turnCount === 9) {
      resultDisplay.textContent = "Its a Tie";
    }
    return turnCount;
  }
  const checkforWin = function () {
    importBoardState();
    if (
      (boardState[0] === playerModule.getCurrentplayer().playericon &&
        boardState[1] === playerModule.getCurrentplayer().playericon &&
        boardState[2] === playerModule.getCurrentplayer().playericon) ||
      (boardState[3] === playerModule.getCurrentplayer().playericon &&
        boardState[4] === playerModule.getCurrentplayer().playericon &&
        boardState[5] === playerModule.getCurrentplayer().playericon) ||
      (boardState[6] === playerModule.getCurrentplayer().playericon &&
        boardState[7] === playerModule.getCurrentplayer().playericon &&
        boardState[8] === playerModule.getCurrentplayer().playericon) ||
      (boardState[0] === playerModule.getCurrentplayer().playericon &&
        boardState[3] === playerModule.getCurrentplayer().playericon &&
        boardState[6] === playerModule.getCurrentplayer().playericon) ||
      (boardState[1] === playerModule.getCurrentplayer().playericon &&
        boardState[4] === playerModule.getCurrentplayer().playericon &&
        boardState[7] === playerModule.getCurrentplayer().playericon) ||
      (boardState[2] === playerModule.getCurrentplayer().playericon &&
        boardState[5] === playerModule.getCurrentplayer().playericon &&
        boardState[8] === playerModule.getCurrentplayer().playericon) ||
      (boardState[0] === playerModule.getCurrentplayer().playericon &&
        boardState[4] === playerModule.getCurrentplayer().playericon &&
        boardState[8] === playerModule.getCurrentplayer().playericon) ||
      (boardState[2] === playerModule.getCurrentplayer().playericon &&
        boardState[4] === playerModule.getCurrentplayer().playericon &&
        boardState[6] === playerModule.getCurrentplayer().playericon)
    ) {
      gameBoardModule.blockGameBoard();
      resultDisplay.textContent = `${
        playerModule.getCurrentplayer().player
      } Wins`;
    } else checkForTie();
  };
  return { checkforWin };
})();

gameBoardModule.setContent();
gameBoardModule.setBtns();
