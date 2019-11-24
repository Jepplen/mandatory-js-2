
// Declaring some global variables for easy access
let player = 1;
let gameMoves = [];
let body = document.querySelector("body");
let gameOver = false;
let turns = 0;
let gameBoardContainer = document.createElement("div");
let playAgain = false;
let santaBag = false;
let main = document.createElement("main");
gameBoardContainer.id = "gameBoardContainer";


// FUNCTION: renderBoard(), Renders the game board and its' animations
// This function also contain game logics for placing game pieces
function renderBoard() {
  gameBoardContainer.innerHTML = "";
  gameBoardContainer.style.marginTop = "80px";

  if (playAgain === true) {
    gameBoardContainer.style.animation = "none";
  };

  player = 1; // keeps track of which player's turn it is
  turns = 0; // Checks how many moves has been made,
  // if 9 and no one wins, the game is a draw.
  createBoxObjects();
  gameOver = false; // if true the you can't make any more moves


  // Creating elements, setting their attributes,
  // appending them to their parent and render them to the DOM
  let gameBoard = document.createElement("div");
  let santaBagDiv = document.createElement("div");
  let santaBagImg = document.createElement("img");
  let restartButtonDiv = document.createElement("div");
  let restartButton = document.createElement("a");

  gameBoard.id = "gameBoard";
  santaBagDiv.id = "santaBagDiv";
  santaBagImg.id = "santaBagImg";
  santaBagImg.className = "runAnimation";
  santaBagImg.src = "./resources/santabag-shadow.png";
  restartButtonDiv.id = "restartButtonDiv";
  restartButton.id = "restartButton";
  restartButton.textContent = "Play again!";

  body.appendChild(main);
  main.appendChild(gameBoardContainer);

  gameBoardContainer.appendChild(gameBoard);
  main.appendChild(santaBagDiv);
  santaBagDiv.appendChild(santaBagImg);
  main.appendChild(restartButtonDiv)
  restartButtonDiv.appendChild(restartButton);


 // Restarts the game without replaying the intro (only after the game has ended)
  restartButtonDiv.addEventListener("click", function(e) {
    playAgain = true;
    restartButtonDiv.style.animation = "restartButtonSlideOut 1s";
    winnerBoard.style.animation = "winnerBoardSlideOut 1s"
    santaBagDiv.removeChild(santaBagImg);

    setTimeout(function(){
      restartButtonDiv.style.display = "none";
      restartButtonDiv.style.left = "600px";
      main.removeChild(winnerBoard);
      renderBoard();
    }, 900);

  });

  let santaBagAnimationCount = 1;


  // loop to add all game squares to the game board
  // and eventlisteners to each game square
  for (let i = 1; i < 10; i++) {
    let box = document.createElement("div");
    let spanO = document.createElement("span");
    let spanX = document.createElement("span");

    box.className = "box";
    box.id = "box" + i;
    spanO.className = "spanO";
    spanX.className = "spanX";
    spanO.textContent = "◯";
    spanX.textContent = "✕";

    gameBoard.appendChild(box);
    box.appendChild(spanO);
    box.appendChild(spanX);
    spanO.style.display = "none";
    spanX.style.display = "none";

    box.addEventListener("click", function(e) {
      let santaPos = santaBagImg.getBoundingClientRect();
      let santaPosEditX = santaPos.x + 60;
      let santaPosEditY = santaPos.y + 50;

      if (gameOver === false) {
          if (spanX.style.display === "none" && spanO.style.display === "none"){
              if (player % 2 === 1) {
                let points = 1;
                if (spanX.style.display === "none") {
                  spanX.style.display = "block";
                  let spanPos = spanX.getBoundingClientRect();
                  let originX = santaPosEditX - spanPos.x;
                  let originY = santaPosEditY - spanPos.y;
                  spanX.style.transform = "translate(" + originX + "px, " + originY + "px)";
                  santaBagImg.style.animation = "santaBagShake" + santaBagAnimationCount + " 1s";
                  santaBagAnimationCount++;



                  // === /swedish Funktion som ska resetta santaBag animation, men fungerar ej.
                  // === /swedish Endast sparad for vidare testning .
                  // setTimeout(function(){
                  // console.log(santaBagImg);
                  //   santaBagImg.className = none;
                  //   console.log(santaBagImg);
                  //
                  //
                  //   void santaBagImg.offsetWidth;
                  //   console.log(santaBagImg);
                  //
                  //
                  //   santaBagImg.classList.add("runAnimation");
                  //   console.log(santaBagImg);
                  // }, 1000);


                  let boxNumber = e.target.id;

                  for (let i = 0; i < gameMoves.length; i++) {
                    if (gameMoves[i].location === boxNumber) {
                      gameMoves[i].player = 1;
                      gameMoves[i].points = 1; // Player object X assigns 1 point in each played square

                    };
                  };

                  turns++;
                  player = 2;
                  checkMoves(restartButtonDiv);
                };
              } else if (player % 2 === 0) {
                let points = 10;
                if (spanO.style.display === "none") {
                  spanO.style.display = "block";

                  let spanPos = spanO.getBoundingClientRect();
                  let originX = santaPosEditX - spanPos.x;
                  let originY = santaPosEditY - spanPos.y;

                  spanO.style.transform = "translate(" + originX + "px, " + originY + "px)";
                  santaBagImg.style.animation = "santaBagShake" + santaBagAnimationCount + " 1s";
                  santaBagAnimationCount++;
                  let boxNumber = e.target.id;

                  for (let i = 0; i < gameMoves.length; i++) {
                    if (gameMoves[i].location === boxNumber) {
                      gameMoves[i].player = 2;
                      gameMoves[i].points = 10; // Player object O assigns 10 points in each played square
                    };
                  };
                  turns++;
                  player = 1;
                  checkMoves(restartButtonDiv); // Function to check if the latest move has ended the game
                };
            } else {
              console.log("variabeln player har gått utanför sitt tillåtna värde på 1 och 2");
            };
        } else {
          console.log("Det finns redan en symbol i den rutan");
        };
      };
    });
  };
};

// FUNCTION: renderGameIntro(), renders the animations for the game renderGameIntro
// and calls renderBoard() to start the game.
function renderGameIntro() {
  renderBoard();
  let gameBoxTopContainer = document.createElement("div");
  let gameBoxTopImage = document.createElement("img");
  let gameBoxTopImageGlow = document.createElement("div");
  let gameBoxTopImageGlow2 = document.createElement("div");
  let gameBoxTopImageGlow3 = document.createElement("div");
  let gameBoxTopImageGlow4 = document.createElement("div");
  let gameBoxTopImageBackground = document.createElement("img");

  gameBoxTopContainer.id = "gameBoxTopContainer";
  gameBoxTopImage.id = "gameBoxTopImage";
  gameBoxTopImage.src = "./resources/gameboxlid-transparent.png";
  gameBoxTopImageBackground.id = "gameBoxTopImageBackground";
  gameBoxTopImageBackground.src = "./resources/gameboxlid.jpg";
  gameBoxTopImageGlow.id = "gameBoxTopImageGlow";
  gameBoxTopImageGlow2.id = "gameBoxTopImageGlow2";
  gameBoxTopImageGlow3.id = "gameBoxTopImageGlow3";
  gameBoxTopImageGlow4.id = "gameBoxTopImageGlow4";

  gameBoardContainer.appendChild(gameBoxTopContainer);
  gameBoxTopContainer.appendChild(gameBoxTopImage);
  gameBoxTopContainer.appendChild(gameBoxTopImageGlow);
  gameBoxTopContainer.appendChild(gameBoxTopImageGlow2);
  gameBoxTopContainer.appendChild(gameBoxTopImageGlow3);
  gameBoxTopContainer.appendChild(gameBoxTopImageGlow4);
  gameBoxTopContainer.appendChild(gameBoxTopImageBackground);


  // A promise to play the intro animation chain
  let myPromise = new Promise(function(resolve, reject) {
    gameBoardContainer.style.display = "none";
    setTimeout(function(){
      gameBoardContainer.style.display = "flex";
      gameBoardContainer.style.animation = "gameboardContainerSlide 2s";
      santaBagImg.style.animation = "santaBagStart 1s";
      resolve();
   }, 0);
  })
  .then(function() {
    setTimeout(function(){
      gameBoxTopImageGlow2.style.animation = "glowLineSlide 4.5s";
      gameBoxTopImageGlow3.style.animation = "glowLineSlide2 3.5s";
      gameBoxTopImageGlow4.style.animation = "glowLineSlide3 5s";
    }, 1500);
  })
  .then(function() {
    setTimeout(function(){
      gameBoxTopImageGlow.style.animation = "glowTextSlide 4.5s";
    }, 5500);
  })
  .then(function() {
    setTimeout(function(){
      gameBoxTopContainer.style.animation = "slideBoxTop 5s forwards";
    }, 8500);
  })
  .then(function() {
    setTimeout(function(){
      gameBoxTopContainer.style.display = "none";
    }, 13500);
  })
  .catch(function() {
    console.log("myPromise caught an error");
  });
};


// FUNCTION: createBoxObject(), creates objects that are assigned with
// the game square locations and placeholders for player and points.
function createBoxObjects () {
  for (let i = 1; i < 10; i++) {
    let moveObject = {
      player: 99,
      location: "box" + i,
      points: 0
    };
    gameMoves.push(moveObject);
  };
};



// Funktionen checkMoves() testar om en spelet ska fortsätta
// eller om någon spelare har vunnit eller om det blivit oavgjort
function checkMoves(restartButtonDiv) {

  let boxes = [];

  for (let i = 0; i < gameMoves.length; i++) {
    boxes.push(gameMoves[i].points);
  };

    let winCases = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    let won;

      // Loops all winning combinations and sums them up in the variable "sum".
      for (let wins of winCases) {
       let wonX = false;
       let wonO = false;
       let sum = 0;
         for (let win of wins) {
           sum += boxes[win];
         };

        // Check if a player has won or if there's a draw
       if (sum === 3) {
         wonX = true;
       } else if (sum === 30) {
        wonO = true;
       } else if (sum !== 3 && sum !== 30) {
         wonO = false;
         wonX = false;
       };


       // If won set "won" to the winner
       if (wonX) {
         won = "X";
       } else if (wonO){
          won = "O";
       };
     };


    // If won is true (has a value), play win animation
     if (won) {
       setTimeout(function() {
         gameBoardContainer.style.marginTop = "-620px";
         let winnerBoard = document.createElement("div");
         let xmasWreathContainer = document.createElement("div");
         let winnerBoardInner = document.createElement("div");
         let xmasWreathImg = document.createElement("img");
         let winnerText = document.createElement("p");

         winnerBoard.id = "winnerBoard";
         xmasWreathContainer.id = "xmasWreathContainer";
         winnerBoardInner.id = "winnerBoardInner";
         xmasWreathImg.id = "xmasWreathImg";
         xmasWreathImg.src = "./resources/wreath.png";
         winnerText.id = "winnerText";
         winnerText.textContent = "The winner is " + won + "!";
         winnerText.style.paddingLeft = "175px";

         main.appendChild(winnerBoard);
         winnerBoard.appendChild(winnerBoardInner);
         winnerBoard.appendChild(xmasWreathContainer);
         xmasWreathContainer.appendChild(xmasWreathImg);
         winnerBoardInner.appendChild(winnerText);
         main.insertBefore(winnerBoard, gameBoardContainer);

         winnerBoard.style.animation = "winnerBoardSlideIn 1s";

         setTimeout(function() {
           restartButtonDiv.style.display = "block";
           restartButtonDiv.style.animation = "restartButtonSlide 2s";
           setTimeout(function(){
               restartButtonDiv.style.left = "1200px";
             }, 1999);
         }, 1000);
       }, 1700);

        gameMoves = []; // resets player object array
        gameOver = true; // resets
     } else if (!won && turns === 9) {
      setTimeout(function() {
        gameBoardContainer.style.marginTop = "-620px";
        let winnerBoard = document.createElement("div");
        let xmasWreathContainer = document.createElement("div");
        let winnerBoardInner = document.createElement("div");
        let xmasWreathImg = document.createElement("img");
        let winnerText = document.createElement("p");

        winnerBoard.id = "winnerBoard";
        xmasWreathContainer.id = "xmasWreathContainer";
        winnerBoardInner.id = "winnerBoardInner";
        xmasWreathImg.id = "xmasWreathImg";
        xmasWreathImg.src = "./resources/wreath.png";
        winnerText.id = "winnerText";
        winnerText.textContent = "It's a Draw!";
        winnerText.style.paddingLeft = "215px";

        main.appendChild(winnerBoard);
        winnerBoard.appendChild(winnerBoardInner);
        winnerBoard.appendChild(xmasWreathContainer);
        xmasWreathContainer.appendChild(xmasWreathImg);
        winnerBoardInner.appendChild(winnerText);
        main.insertBefore(winnerBoard, gameBoardContainer);

        winnerBoard.style.animation = "winnerBoardSlideIn 1s";

        setTimeout(function() {
          restartButtonDiv.style.display = "block";
          restartButtonDiv.style.animation = "restartButtonSlide 2s";
          setTimeout(function(){
              restartButtonDiv.style.left = "1200px";
            }, 1999);
        }, 1000);
      }, 1700);
       gameMoves = [];
       gameOver = true;
     };
   };


// FUNCTION: renderRoom(), renders the game room
function renderRoom() {
  let gameIsStarted = false; // if true the game find helper will not run

  let roomContainer = document.createElement("div");
  let gameMiniatureContainer = document.createElement("div");
  let fireplaceContainer = document.createElement("div");
  let textContainer = document.createElement("div");
  let background = document.createElement("div");
  let xmasTreeLightsContainer = document.createElement("div");
  let fireplaceLightsContainer = document.createElement("div");
  let gbTop = document.createElement("img");
  let gbCover = document.createElement("img");
  let gameMiniatureImage = document.createElement("img");
  let findGame = document.createElement("div");
  let findText = document.createElement("p");
  let mask = document.createElement("div");
  let gameStartButton = document.createElement("div");
  let gameStartButtonText = document.createElement("p");
  let gameStartText = document.createElement("p");
  let cottageContainer = document.createElement("div");
  let cottageImg = document.createElement("img");

  mask.id = "mask";
  gameStartButtonText.id = "gameStartButtonText";
  gameStartButton.id = "gameStartButton";
  gbTop.id = "gbTop";
  gbTop.src = "./resources/gameboxlid.jpg"
  gbCover.id = "gbCover";
  gbCover.src = "./resources/game-cover.png"
  roomContainer.id = "roomContainer";
  gameMiniatureContainer.id = "gameMiniatureContainer";
  fireplaceContainer.id = "fireplaceContainer";
  textContainer.id = "textContainer";
  background.id = "background";
  gameMiniatureImage.id = "gameMiniatureImage";
  xmasTreeLightsContainer.id = "xmasTreeLightsContainer";
  fireplaceLightsContainer.id = "fireplaceLightsContainer";
  findGame.id = "findGame";
  findText.id = "findText";
  findText.textContent = "🠄 Click here";
  gameStartButtonText.textContent = "Start";
  gameStartText.id = "gameStartText";
  cottageContainer.id = "cottageContainer";
  cottageImg.id = "cottageImg";
  cottageImg.src = "./resources/cottage.jpg";

  gameStartText.innerHTML = "Turn your sound ON and set the resolution to 1920x1080 <br> Please no console the first time ;)";

  gameMiniatureContainer.appendChild(gbTop);
  gameMiniatureContainer.appendChild(gbCover);
  body.appendChild(roomContainer);
  roomContainer.appendChild(gameMiniatureContainer);
  roomContainer.appendChild(fireplaceContainer);
  roomContainer.appendChild(textContainer);
  roomContainer.appendChild(background);
  roomContainer.appendChild(gameMiniatureImage);
  roomContainer.appendChild(xmasTreeLightsContainer);
  roomContainer.appendChild(fireplaceLightsContainer);
  roomContainer.appendChild(findGame);
  findGame.appendChild(findText);
  body.appendChild(mask);
  body.appendChild(cottageContainer);
  cottageContainer.appendChild(cottageImg);
  cottageContainer.appendChild(gameStartButton);
  cottageContainer.appendChild(gameStartText);
  gameStartButton.appendChild(gameStartButtonText)

  findGame.style.display = "none";
  gameStartButton.style.animation = "gameStartButtonSlideIn 6s";

// Starts and enters the game room
  gameStartButton.addEventListener("click", function() {
    setTimeout(function() {
      if (gameIsStarted === false) {
        findGame.style.display = "block";
        findGame.style.animation = "findGameSlideIn 2s";
      };
    }, 30000);
    gameStartButton.style.animation = "gameStartButtonFadeOut 2s"
    gameStartText.style.animation = "gameStarTextFadeOut 1s";
    setTimeout(function() {
      gameStartText.style.display = "none";
    }, 950);
    setTimeout(function(){
      gameStartButton.style.display = "none";
    }, 1950);
    setTimeout(function(){
        cottageContainer.style.animation = "cottageFadeOut 3s";
        setTimeout(function(){
          cottageContainer.style.display = "none"
          setTimeout(function(){
            let audio1 = new Audio('./resources/dooropen.mp3');
            audio1.play();
            setTimeout(function(){
              let audio2 = new Audio('./resources/doorclose.mp3');
              audio2.play();
              setTimeout(function() {
                mask.style.animation = "maskFadeOut 4s";
                let audio3 = new Audio('./resources/song.mp3');
                audio3.play();
                setTimeout(function(){
                  mask.style.display = "none"
                }, 3950);
              }, 2000);
            }, 3000);
          }, 0);
        }, 2950);
      }, 3000);
  });


  // creates an array of all christmas tree lights
  let arrayOfLights = [];

  for (let i = 0; i < 11; i++) {
    let light = document.createElement("div");
    light.id = "light" + i;
    light.className = "light";
    arrayOfLights.push(light);
    xmasTreeLightsContainer.appendChild(light);
  };


  // creates an array of all fireplace lights
  let arrayOfLightsMono = [];

  for (let i = 0; i < 11; i++) {
    let lightMono = document.createElement("div");
    lightMono.id = "lightMono" + i;
    lightMono.className = "lightMono";
    arrayOfLights.push(lightMono);
    fireplaceLightsContainer.appendChild(lightMono);
  };


  // To start the game and run the game intro animation
  gameMiniatureContainer.addEventListener("click", function(e){
    gameIsStarted = true; // game finder helper will not run

    let miniBoxAnimationPromise = new Promise(function(resolve, reject) {
      gbTop.style.animation = "gbMiniLift 2.8s";
      findGame.style.animation = "findGameFadeOut 1s";

      setTimeout(function() {
        findGame.style.display = "none";
      }, 960);
      setTimeout(function(){
        gbTop.style.display = "none";
        resolve();
      }, 2500);
    })
    .then(function() {
      gameMiniatureContainer.style.zIndex = "1";
      renderGameIntro();
      setTimeout(function(){
      }, 1200);
    })
    .catch(function() {
      console.log("gameMiniatureContainer error caught!");
    });
    gbTop.style.animation = "gbMiniLift 3s";
  });
};


renderRoom();  // runs renderRoom(), when page is loaded
