import BlockModel from "../blocks/BlockModel" ;
import BlockState from "../blocks/BlockState";
import Point from "../../util/Point";
import Direction from "../../util/Direction";
import _ from "lodash";

export default class BoardModel {
    constructor(size) {
      this.size = size;
      //Keep an empty board around to easily clear the main or step boards as needed.
      this.emptyBoard = BoardModel.buildBoard(this.size);
      this.staticBoard = _.cloneDeep(this.emptyBoard);
      this.dynamicBoard = _.cloneDeep(this.emptyBoard);
      this.stepPieces = [];
    }

    static buildBoard(size) {
        let blocks = [];
        for (var i = 0;i < size.height;i++) {
            blocks.push([]);  
            for (var j = 0;j < size.width;j++) {
                blocks[i][j] = new BlockModel(new Point(j, i), BlockState.EMPTY);
            }
        }
        return blocks;
    }

    getBlocks() { 
        return BoardModel.combineBoards(this.staticBoard, this.dynamicBoard); 
    }

    clearStaticBoard() {
        this.staticBoard = _.cloneDeep(this.emptyBoard);
    }

    clearDynamicBoard() {
        this.dynamicBoard = _.cloneDeep(this.emptyBoard);
    }

    commitStaticPiece(piece) {
        for (var b in piece.blocks) {
            let block = piece.blocks[b];
            this.commitStaticBlockState(block.position, block.state)
        }
    }

    commitStaticBlockState(position, state) {
        this.staticBoard = BoardModel.setBlockState(this.staticBoard, position, state)
    }

    pieceCanMove(piece, moveDir, rotateDir) {
        //Piece is not moving, so nothing to check.
        if (moveDir == null && rotateDir == null) return true;  
        else return this.pieceStaysOnBoard(piece, moveDir, rotateDir) && this.pieceHasRoom(piece, moveDir, rotateDir);
    }

    //Check if the piece has room to do the given move, based on the current board state
    pieceHasRoom(piece, moveDir, rotateDir) {
        let pieceCopy = _.cloneDeep(piece);
        
        if (moveDir != null) pieceCopy.move(moveDir);
        if (rotateDir != null) pieceCopy.rotate(rotateDir);

        for (var b in pieceCopy.blocks) {
            let p = pieceCopy.blocks[b].position;
            if (this.staticBoard[p.y][p.x].state != BlockState.EMPTY) 
                return false;
        }

        return true;
    }

    //Check if the piece would remain in the board boundry
    pieceStaysOnBoard(piece, moveDir, rotateDir) {
        //Keep from the left wall
        if (moveDir == Direction.LEFT) 
            return piece.position.x > 0;
        //Keep from right wall
        else if (moveDir == Direction.RIGHT) 
            return piece.position.x + piece.size.width < this.size.width;
        //Keep from ceiling
        else if (moveDir == Direction.UP) 
            return piece.position.y > 0;
        //Keep from floor
        else if (moveDir == Direction.DOWN) 
            return piece.position.y +  piece.size.height < this.size.height;
        //Keep rotations from spilling through walls
        else if (rotateDir != null) {
            //Rotations always end up swapping the width for height for peice sizes.
            //Only treating pieces as their full matrix sizes to keep on the board.
            let overflowRight = piece.position.x + piece.size.height > this.size.width;
            let overflowBottom = piece.position.y + piece.size.width > this.size.height;
            return !overflowRight && !overflowBottom;
        }

        return true;
    }

    commitDynamicPiece(piece) {
        for (var b in piece.blocks) {
            let block = piece.blocks[b];
            this.commitDynamicBlockState(block.position, block.state)
        }
    }

    commitDynamicBlockState(position, state) {
        this.dynamicBoard = BoardModel.setBlockState(this.dynamicBoard, position, state)
    }

    static setBlockState(board, position, state) {
        let w = board[0].length, h = board.length;
        if (position.x >= w || position.y >= h) {
            throw `Tried Setting a block outside the game board.\n` +
                    `\tBlock(x: ${position.x}, y: ${position.y})\n` +
                    `\tBoard Size(width: ${w}, height: ${h})`;
        } else if (state < BlockState.EMPTY || state > BlockState.LAST_STATE) {
            throw `Tried Setting an invalid block state: ${state}`;
        } else {
            board[position.y][position.x].state = state;
        }
        return board;
    }

    //Combine the two given boards, with boardA taking precidence over boardB.
    static combineBoards(boardA, boardB) {
        let wa = boardA[0].length, wb = boardB[0].length;
        let ha = boardA.length, hb = boardB.length;
        if (wa != wb || ha != hb) {
            throw `Tried combining boards of different sizes.\n` +
                    `\tboardA{width: ${wa}, height: ${ha}}\n` +
                    `\tboardB{width: ${wb}, height: ${hb}}`;
        } else {
            let result = [];
            for (let i = 0;i < boardA.length;i++) {
                result.push([]);
                for (let j = 0;j < boardA[i].length;j++) {
                    let bA = boardA[i][j], bB = boardB[i][j];
                    let bAEmpty = bA.state == BlockState.EMPTY, bBEmpty = bB.state == BlockState.EMPTY;
                    let pos = null, state = null;
                    //If A and B are NOT empty, or both are empty, or only B is empty, take boardA's block.
                    if (!bAEmpty && !bBEmpty || bAEmpty && bBEmpty || !bAEmpty && bBEmpty) {
                        pos = bA.position;
                        state = bA.state;
                    } 
                    //Only take boardB's block when A is empty and B is not.
                    else if (bAEmpty && !bBEmpty) {
                        pos = bB.position;
                        state = bB.state;
                    }
                    result[i][j] = new BlockModel(pos, state);
                }
            }
            return result;
        }
    }
  }
  