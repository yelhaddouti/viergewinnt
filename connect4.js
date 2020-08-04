class Disc{
    constructor(_color){
        this.color = _color;
    }

    getColor(){
        return this.color;
    }

}

class Player{
    constructor(_name, _disc, _isFirstPlayer){
        this.name = _name;
        this.disc = _disc;
        this.isFirst = _isFirstPlayer;
    }

    getDisc(){
        return this.disc;
    }

    getName(){
        return this.name;
    }

    isFirstPlayer(){
        return this.isFirst;
    }
}

class Game{

    constructor(_player1, _player2){
        this.curentPlayer = null;
        this.player1 = _player1;
        this.player2 = _player2;
        this.changePlayer();
    }

    changePlayer(){
        if(this.curentPlayer == null){
            this.curentPlayer = this.player1.isFirstPlayer() ? this.player1 : this.player2;
        }else {
            this.curentPlayer = this.curentPlayer == this.player1 ? this.player2 : this.player1;
        }
    }

    getCurrentPlayer(){
        return this.curentPlayer;
    }

    getPlayer1(){
        return this.player1;
    }

    getPlayer2(){
        return this.player2;
    }
}

class Board {

    constructor() {
        this.board = [];
        this.ROWS = 6;
        this.COLUMNS = 7;
        this.GAMELIMIT = 4;
        this.COUNTER = 0;

        this.positionsConnect = [];
        this.isGameover = false;
        this.initBoard();
    }

    getRowSize(){
        return this.ROWS;
    }

    getColumnSize(){
        return this.COLUMNS;
    }

    getGameLimit(){
        return this.GAMELIMIT;
    }

    getCounter(){
        return this.COUNTER;
    }

    getBoardCell(i, j){
        return this.board[i][j];
    }

    getPositionsConnectCell(i, j){
        return this.positionsConnect[i][j];
    }

    getPositionsConnectSize(){
        return this.positionsConnect.length;
    }

    isGameOver(){
        return this.isGameover;
    }

    initBoard() {
        this.COUNTER = 0;

        for (let i = 0; i < this.ROWS; i++){
            this.board[i] = [];
            for (let j = 0; j < this.COLUMNS; j++){
                this.board[i][j] = null;
            }
        }
    }

    insertDisc(_disc, _column) {

        let LastEmptyRowIndex = -1;

        for (let i = this.ROWS - 1; i >= 0; i--) {
            if (this.board[i][_column] == null) {
                this.board[i][_column] = _disc;
                LastEmptyRowIndex = i;
                break;
            }
        }

        if (LastEmptyRowIndex != -1) {
            this.COUNTER++;
            let isConnected = this.checkConnection(LastEmptyRowIndex, _column, _disc);

            if(isConnected) {
                this.isGameover = true;//isGameOver
            }

            return true;//isInserted
        }
        return false;
    }

    checkConnection(_row, _col, _disc) {
        if (this.COUNTER <= ((this.GAMELIMIT - 1) * 2)) return false;

        if (this.checkVerticalConnect(_row, _col, _disc) ||
            this.checkHorizontalConnect(_row, _col, _disc) ||
            this.checkDiagonalTopToRightConnect(_row, _col, _disc) ||
            this.checkDiagonalTopToLeftConnect(_row, _col, _disc)) {
            return true;
        }

        return false;
    }

    checkVerticalConnect( _row,_col, _disc) {
        if(_row > (this.ROWS - this.GAMELIMIT)) return false;

        this.positionsConnect = [];
        this.positionsConnect.push([_row, _col]);

        for(let i = 1 ; i < this.GAMELIMIT; i++){
            if(_row + i < this.ROWS ) {
                if(this.board[_row + i][_col] == _disc){
                    this.positionsConnect.push([_row+i, _col]);
                }else {
                    break;
                }
            }else {
                break;
            }
        }

        if(this.positionsConnect.length >= this.GAMELIMIT) {
            return true;
        }

        return false;
    }

    checkHorizontalConnect( _row,  _col, _disc) {
        let checkDirRight = true;
        let checkDirLeft = true;

        this.positionsConnect = []; this.positionsConnect.push([_row, _col]);

        for(let i = 1 ; i < this.GAMELIMIT; i++) {
            if(_col - i >= 0 && checkDirLeft) {
                if(this.board[_row][_col - i] == _disc) {
                    this.positionsConnect.push([_row, _col-i]);
                }else {
                    checkDirLeft = false;
                }
            }else {
                checkDirLeft = false;
            }

            if(this.positionsConnect.length >= this.GAMELIMIT) {
                return true;
            }

            if(_col + i < this.COLUMNS && checkDirRight){

                if(this.board[_row][_col + i] == _disc){
                    this.positionsConnect.push([_row, _col+i]);

                }else {
                    checkDirRight = false;
                }
            }else {
                checkDirRight = false;
            }

            if(this.positionsConnect.length >= this.GAMELIMIT) {
                return true;
            }

            if(!checkDirRight && !checkDirLeft) {
                break;
            }
        }//for



        return false;

    }

    checkDiagonalTopToRightConnect(_row, _col, _disc) {
        let checkDirRightBottom = true;
        let cehckDirleftTop = true;

        this.positionsConnect = [];
        this.positionsConnect.push([_row, _col]);

        for(let i = 1 ; i < this.GAMELIMIT; i++) {
            if(_row + i < this.ROWS && _col - i >= 0 && checkDirRightBottom){
                if(this.board[_row + i][_col - i] == _disc) {
                    this.positionsConnect.push([_row+i, _col-i]);
                }else {
                    checkDirRightBottom = false;
                }
            }else {
                checkDirRightBottom = false;
            }

            if(this.positionsConnect.length >= this.GAMELIMIT) {
                return true;
            }

            if( _row - i >= 0  && _col + i < this.COLUMNS && cehckDirleftTop) {
                if(this.board[_row - i][_col + i] == _disc) {
                    this.positionsConnect.push([_row-i, _col+i]);
                    //total++;
                }else {
                    cehckDirleftTop = false;
                }
            }else {
                cehckDirleftTop = false;
            }

            if(this.positionsConnect.length >= this.GAMELIMIT) {
                return true;
            }

            if(!checkDirRightBottom && !cehckDirleftTop) {
                break;
            }
        }
        return false;
    }

    checkDiagonalTopToLeftConnect(_row, _col, _disc) {

        let checkDirLeftBottom = true;
        let checkDirRightTop = true;

        this.positionsConnect = []; this.positionsConnect.push([_row, _col]);

        for(let i = 1 ; i < this.GAMELIMIT; i++) {
            if( _row - i >= 0  && _col - i >= 0 && checkDirLeftBottom) {
                if(this.board[_row - i][_col - i] == _disc) {
                    this.positionsConnect.push([_row-i,_col-i]);
                }else {
                    checkDirLeftBottom = false;
                }
            }else {
                checkDirLeftBottom = false;
            }

            if(this.positionsConnect.length >= this.GAMELIMIT){
                return true;
            }

            if( _row + i < this.ROWS  && _col + i < this.COLUMNS && checkDirRightTop) {
                if(this.board[_row + i][_col + i] == _disc) {
                    //total++;
                    this.positionsConnect.push([_row+i,_col+i]);
                }else {
                    checkDirRightTop = false;
                }
            }else {
                checkDirRightTop = false;
            }

            if(this.positionsConnect.length >= this.GAMELIMIT){
                return true;
            }

            if(!checkDirLeftBottom && !checkDirRightTop) {
                break;
            }
        }
        return false;
    }

}