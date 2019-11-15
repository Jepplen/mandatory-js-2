let player = 1;
let gameMoves = [];

function render() {
  let body = document.querySelector('body');
  let header = document.createElement('header');
  let main = document.createElement('main');
  let gameBoard = document.createElement('div');
  let gameBoardMask = document.createElement('div');
  let santaBagDiv = document.createElement('div');
  let santaBagImg = document.createElement('img');
  let restartButtonDiv = document.createElement('div');
  let restartButton = document.createElement('a');

  gameBoard.id = 'gameBoard';
  gameBoardMask.id = 'gameBoardMask';
  gameBoardMask.style.display = 'none';
  santaBagDiv.id = 'santaBagDiv';
  santaBagImg.id = 'santaBagImg';
  santaBagImg.src = "./images/santabag2.png";
  restartButtonDiv.id = "restartButtonDiv";
  restartButton.id = "restartButton";
  restartButton.textContent = "Spela igen";

  body.appendChild(header);
  body.appendChild(main);
  main.appendChild(gameBoard);
  main.appendChild(santaBagDiv);
  santaBagDiv.appendChild(santaBagImg);
  main.appendChild(restartButtonDiv)
  restartButtonDiv.appendChild(restartButton);
  gameBoard.appendChild(gameBoardMask);

  restartButtonDiv.addEventListener('click', function(e) {
    body.innerHTML = "";
    render();
  });

  for (let i = 1; i < 10; i++) {
    let box = document.createElement('div');
    let spanO = document.createElement('span');
    let spanX = document.createElement('span');

    box.className = 'box';
    box.id = 'box' + i;
    spanO.className = "spanO";
    spanX.className = "spanX";

    spanO.textContent = "◯";
    spanX.textContent = "✕";

    gameBoard.appendChild(box);
    box.appendChild(spanO);
    box.appendChild(spanX);
    spanO.style.display = "none";
    spanX.style.display = "none";



    box.addEventListener('click', function(e) {
      let santaPos = santaBagImg.getBoundingClientRect();

        if (spanX.style.display === "none" && spanO.style.display === "none"){
            if (player % 2 === 1) {
              let points = 1;
              if (spanX.style.display === "none") {
                spanX.style.display = "block";
                let spanPos = spanX.getBoundingClientRect();
                // console.log(santaPos, spanPos);
                let originX = santaPos.x - spanPos.x;
                let originY = santaPos.y - spanPos.y;

                spanX.style.transform = "translate(" + originX + "px, " + originY + "px)";
                // spanX.style.transformOrigin = "200px 200px";

                //spanX.style.animationName = "slide";
                //spanX.style.animationDuration = "1s";
                // setTimeout(() => {
                //   spanX.style.transform = "translateX(300px)";
                // }, 900);


                let move = new Move(player, box.id, points);
                gameMoves.push(move);
                player = 2;
                console.log(gameMoves);
                checkMoves();
              };
            } else if (player % 2 === 0) {
              let points = 10;
              if (spanO.style.display === "none") {
                spanO.style.display = "block";


                let spanPos = spanO.getBoundingClientRect();
                // console.log(santaPos, spanPos);
                let originX = santaPos.x - spanPos.x;
                let originY = santaPos.y - spanPos.y;

                spanO.style.transform = "translate(" + originX + "px, " + originY + "px)";

                let move = new Move(player, box.id, points);
                gameMoves.push(move);
                player = 1;
                console.log(gameMoves);
                checkMoves();
              };
          } else {
            console.log("variabeln player har gått utanför sitt tillåtna värde på 1 och 2");
          };
      } else {
        console.log("Det finns redan en symbol i den rutan");
      };
    });
  };
};

// konstruktorn Move() skapar ett object av det genomförda draget
function Move(player, location, points) {
  this.player = player;
  this.location = location;
  this.points = points;
};


// Funktionen checkMoves() testar om en spelet ska fortsätta
// eller om någon spelare har vunnit eller om det blivit oavgjort
function checkMoves() {

  let box1;
  let box2;
  let box3;
  let box4;
  let box5;
  let box6;
  let box7;
  let box8;
  let box9;

  for (let i = 0; i < gameMoves.length; i++) {

    if (gameMoves[i].location === "box1") {
    box1 = gameMoves[i].points;
    };
    if (gameMoves[i].location === "box2") {
    box2 = gameMoves[i].points;
    };
    if (gameMoves[i].location === "box3") {
    box3 = gameMoves[i].points;
    };
    if (gameMoves[i].location === "box4") {
    box4 = gameMoves[i].points;
    };
    if (gameMoves[i].location === "box5") {
    box5 = gameMoves[i].points;
    };
    if (gameMoves[i].location === "box6") {
    box6 = gameMoves[i].points;
    };
    if (gameMoves[i].location === "box7") {
    box7 = gameMoves[i].points;
    };
    if (gameMoves[i].location === "box8") {
    box8 = gameMoves[i].points;
    };
    if (gameMoves[i].location === "box9") {
    box9 = gameMoves[i].points;
    };

    if (box1 + box2 + box3 === 3 ||
        box4 + box5 + box6 === 3 ||
        box4 + box5 + box6 === 3 ||
        box7 + box8 + box9 === 3 ||
        box1 + box4 + box7 === 3 ||
        box1 + box4 + box7 === 3 ||
        box2 + box5 + box8 === 3 ||
        box2 + box5 + box8 === 3 ||
        box3 + box6 + box9 === 3 ||
        box1 + box5 + box9 === 3 ||
        box3 + box5 + box7 === 3) {
      console.log('Spelare 1 vann! (X)');
      gameBoardMask.style.display = 'block';
      restartButtonDiv.style.transform = "translateX(500px)"
      gameMoves = [];
      break;

    } else if (box1 + box2 + box3 === 30 ||
                box4 + box5 + box6 === 30 ||
                box7 + box8 + box9 === 30 ||
                box1 + box4 + box7 === 30 ||
                box2 + box5 + box8 === 30 ||
                box3 + box6 + box9 === 30 ||
                box1 + box5 + box9 === 30 ||
                box3 + box5 + box7 === 30) {
      console.log('Spelare 2 vann! (O)');
      gameBoardMask.style.display = 'block';
      restartButtonDiv.style.transform = "translateX(500px)"
      gameMoves = [];
      break;
    } else if (gameMoves.length === 9){
      console.log('Resultatet är oavgjort!!');
      gameBoardMask.style.display = 'block';
      restartButtonDiv.style.transform = "translateX(500px)"
      gameMoves = [];
      break;
    };
  };
};


// Funktionen render() renderar spelplanen med eventuellt genomförda drag
render();
