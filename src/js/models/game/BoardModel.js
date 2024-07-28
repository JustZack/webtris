import BlockModel from "../pieces/BlockModel" ;
import BlockState from "../pieces/BlockState";
import Point from "../../util/Point";

export default class BoardModel {
    constructor(size) {
      this.size = size;
      //Keep an empty board around to easily clear the main or step boards as needed.
      this.emptyBoard = BoardModel.buildBoard(this.size);
      this.staticBoard = BoardModel.copyBoard(this.emptyBoard, this.staticBoard);
      this.dynamicBoard = BoardModel.copyBoard(this.emptyBoard, this.dynamicBoard);
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
        this.staticBoard = BoardModel.copyBoard(this.emptyBoard, this.staticBoard);
    }

    clearDynamicBoard() {
        this.dynamicBoard = BoardModel.copyBoard(this.emptyBoard, this.dynamicBoard);
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

    static copyBoard(fromBoard, toBoard) { 
        toBoard = JSON.parse(JSON.stringify(fromBoard)); 
        return toBoard;
    }
  }
  