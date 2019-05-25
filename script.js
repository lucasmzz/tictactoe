var p1 = 'X';
var p2 = 'O';

var scores = {
    'X': 0,
    'O': 0
}
var currentPlayer = p1;
var board = ['','','','','','','','',''];
var boardRef = document.querySelector('#board');
var btnNew = document.querySelector('#btn-new');
var resultPanel = document.getElementById('result');
btnNew.style.display = 'none';

displayResults();

boardRef.addEventListener('click',function(event){

    var position = event.srcElement.id;
    if (isPositionAvailable(position)){
        board[position] = currentPlayer;
        updateBoard(position,currentPlayer);
        var result = calculateResult();
        if (result === 0){
            var player; 
            (currentPlayer === p1) ? player = "X" : player = "O";
            resultPanel.textContent = player+" is the WINNER!";
            scores[currentPlayer] += 1;
            displayResults();
            boardRef.style.pointerEvents = 'none';
            btnNew.style.display = 'block';
        } else if (result === 1) {
            (currentPlayer === p1) ? currentPlayer = p2 : currentPlayer = p1;
        } else if (result === 2){
            resultPanel.textContent = "it´s a TIE";
            boardRef.style.pointerEvents = 'none';
            btnNew.style.display = 'block';
        }
    }
});

btnNew.addEventListener('click',function(){
    currentPlayer = p1;
    board = ['','','','','','','','',''];
    resetBoard();
    resultPanel.textContent = "";
    boardRef.style.pointerEvents = 'auto';
    btnNew.style.display = 'none';
});

function isPositionAvailable(position){
    return board[position] === '';
}

function updateBoard(position,currentPlayer){
    document.getElementById(position).textContent = currentPlayer;
}

function resetBoard(){
    for (var i = 0; i<9;i++){
        document.getElementById(i).textContent = board[i];
    }
}

function calculateResult(){
    if (isWinner()){
        return 0;
    }else{
        if (isTieGame()){
            return 2;
        }else{
            return 1;
        }
    }
}

function isTieGame(){
    return (board.filter((item) => item === '').length === 0) ? true : false
}

function isWinner(){
    return (
    (board[6] === currentPlayer && board[7] === currentPlayer && board[8] === currentPlayer) ||
    (board[3] === currentPlayer && board[4] === currentPlayer && board[5] === currentPlayer) || 
    (board[0] === currentPlayer && board[1] === currentPlayer && board[2] === currentPlayer) || 
    (board[6] === currentPlayer && board[3] === currentPlayer && board[0] === currentPlayer) || 
    (board[7] === currentPlayer && board[4] === currentPlayer && board[1] === currentPlayer) || 
    (board[8] === currentPlayer && board[5] === currentPlayer && board[2] === currentPlayer) || 
    (board[6] === currentPlayer && board[4] === currentPlayer && board[2] === currentPlayer) || 
    (board[8] === currentPlayer && board[4] === currentPlayer && board[0] === currentPlayer)
    )
}

function displayResults(){
    document.getElementById('current-score-X').textContent = scores.X;
    document.getElementById('current-score-O').textContent = scores.O;
}