(function(){
    'use strict'
    console.log('reading JS');

    const quote = document.querySelector('h2');
    const startGame = document.querySelector('#startgame');
    const gameControl = document.querySelector('#gamecontrol');
    const game = document.querySelector('#game');
    const score = document.querySelector('#score');
    const actionArea = document.querySelector('#actions');
    const dice = document.querySelector('#dice');
    const meow = document.querySelector('#meow');
    const diceSound = new Audio('audios/dice.mp3');
    const meowSound = new Audio('audios/meow.mp3');
    const winnerSound = new Audio('audios/winner.mp3');

    const gameData = {
        dice: ['1die.png', '2die.png', '3die.png', 
            '4die.png', '5die.png', '6die.png'],
        players: ['Orange Kitten', 'Tuxedo Kitten'],
        score: [0, 0],
        roll1: 0,
        roll2: 0,
        rollSum: 0,
        index: 0,
        gameEnd: 29
    };

    startGame.addEventListener('click', function(){
        quote.innerHTML = 'The Game Has Started!';
        document.querySelector('#startgame-button').innerHTML = '<button id="quit">Wanna Quit?</button>';
        document.querySelector('#quit').className = 'quit';

        document.querySelector('#quit').addEventListener('click', function(){
            location.reload();
        });
        gameData.index = Math.round(Math.random());
        console.log(gameData.index);

        // console.log('set up the turn');

        setUpTurn();
    });

    function setUpTurn(){
        game.innerHTML = `<p>Roll the dice for the <em>${gameData.players[gameData.index]}</em></p>`;
        actionArea.innerHTML ='<button id="roll"><img src="images/cat-mark.png" alt="cat foot mark" width="30">ROLL</button>';
        document.querySelector('#roll').addEventListener('click', function(){
            // console.log('Roll the Dice');
            diceSound.play();
            throwDice();
        });
    }

    function throwDice(){
        actionArea.innerHTML = '';
        gameData.roll1 = Math.floor(Math.random()*6) + 1;
        gameData.roll2 = Math.floor(Math.random()*6) + 1;
        game.innerHTML = `<p>Roll the dice for the <em>${gameData.players[gameData.index]}</em></p>`;
        game.innerHTML += `<div><img src="images/${gameData.dice[gameData.roll1-1]}" width="60px"> <img src="images/${gameData.dice[gameData.roll2-1]}" width="60px"></div>`;
        gameData.rollSum = gameData.roll1 + gameData.roll2;

        //handle if statements
        //when the player rolled snake eyes
        if(gameData.rollSum === 2){
            // console.log('snake eyes');
            game.innerHTML += '<p style="color: #D91317; background-color: white; border: 3px solid #D91317; border-radius: 6px; padding: 5px 25px;">Oh snap! Snake eyes! Switch turn!</p>';
            meowSound.play();
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            setTimeout(setUpTurn, 2500);
            showCurrentScore();
        } 
        //when the player one 'one' dice
        else if(gameData.roll1 === 1 || gameData.roll2 === 1){
            // console.log('one of the two dice rolled a 1');
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            game.innerHTML += `<p style="color: #D91317; background-color: white; border: 3px solid #D91317; border-radius: 6px; padding: 5px 25px;">One of your rolls was one.<br>Switching to player ${gameData.players[gameData.index]}</p>`;
            meowSound.play();
            setTimeout(setUpTurn, 2500);
        }
        //when the player rolled neither 'one' dice
        else {
            // console.log('neither die was a 1, game continues...');
            gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.rollSum;
            actionArea.innerHTML = '<button id="roll"><img src="images/cat-mark.png" alt="cat foot mark" width="30">ROLL</button> <button id="pass"><img src="images/cat-mark.png" alt="cat foot mark" width="30">PASS</button>';

            document.querySelector('#roll').addEventListener('click', function(){
                diceSound.play();
                throwDice();
            });

            document.querySelector('#pass').addEventListener('click', function(){
                gameData.index ? (gameData.index = 0) : (gameData.index = 1);
                setUpTurn();
            });

            checkWinningCondition();
        }
    }

    //check the score
    function checkWinningCondition(){
        //check if one of the players' score is greater than 29
        if(gameData.score[gameData.index] > gameData.gameEnd){
            score.innerHTML = '';
            game.innerHTML = '';
            quote.className = 'congrats';
            quote.innerHTML = `${gameData.players[gameData.index]} wins with ${gameData.score[gameData.index]} points!. Welcome to<br>our family!`;
            actionArea.innerHTML ='';
            winnerSound.play();
            document.querySelector('#quit').innerHTML = 'Start a New Game?';
            if (gameData.index === 0) {
                document.querySelector('#orange').classList.add('winner');
            } else {
                document.querySelector('#tuxedo').classList.add('winner');
            }
        } else {
            showCurrentScore();
        }
    }

    //show the current score
    function showCurrentScore(){
        score.innerHTML = `<p id="orange-score">${gameData.players[0]}<br>${gameData.score[0]}</p>`;
        score.innerHTML += `<p id="tuxedo-score">${gameData.players[1]}<br>${gameData.score[1]}</p>`;
    }

})();