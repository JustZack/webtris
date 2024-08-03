import PiecePicker from "./PiecePicker";
import Size from "../util/Size";
import Point from "../util/Point";
import BoardModel from "../models/board/BoardModel";
import FallingPieceController from "./FallingPieceController";
import NextPieceView from "../views/NextPieceView";
import BoardView from "../views/BoardView";
import BlockState from "../models/blocks/BlockState";
import { sleep } from "../util/Sleep";

export default class BoardController extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            boardModel: new BoardModel(this.props.boardSize),
        }
        this.doBoardUpdate = this.doBoardUpdate.bind(this);
        this.clearBoard = this.clearBoard.bind(this);
        this.checkForFullRows = this.checkForFullRows.bind(this);
        this.flashFullRows = this.flashFullRows.bind(this);
        this.flashRows = this.flashRows.bind(this);
        this.setRowsState = this.setRowsState.bind(this);
        
    }

    doBoardUpdate(callback) {
        let b = this.state.boardModel;
        let result = callback(b);
        this.setState({boardModel: b});
        return result;
    }

    checkForFullRows() {
        let b = this.state.boardModel;
        let fullRows = b.getFullRows();
        if (fullRows.length > 0) this.flashFullRows(fullRows, b);
    }

    async flashFullRows(fullRows, b) {
        this.props.togglePaused();
        await this.flashRows(5, fullRows, b, 100, () => {
            b.shiftDownRows(fullRows);
            this.setState({boardModel: b});
            this.props.togglePaused();
        });
    }

    async flashRows(numTimes, rows, b, delay, completeCallback) {
        if (numTimes <= 0) completeCallback();
        else {
            let stateToSet = numTimes % 2 == 0 ? BlockState.COMPLETE_ROW_LIGHT : BlockState.COMPLETE_ROW_DARK;
            this.setRowsState(rows, b, stateToSet, async () => {
                await sleep(delay);
                this.flashRows(numTimes-1, rows, b, delay, completeCallback); 
            });
        }

    }

    setRowsState(rows, b, state, callback) {
        b.setManyRowsState(rows, state);
        this.setState({boardModel: b}, callback);
    }

    clearBoard() {
        this.doBoardUpdate((b) => { b.clearStaticBoard(); });
    }

    render() {
        return (
            <div>
                <button onClick={this.clearBoard}>Clear Board</button>
                <button onClick={this.clearBoard}>Clear Board</button>
                <FallingPieceController doBoardUpdate={this.doBoardUpdate} getNextPiece={this.props.getNextPiece} 
                                        getLevelConfig={this.props.getLevelConfig} isPaused={this.props.isPaused}
                                        checkForFullRows={this.checkForFullRows}/>
                <BoardView position={this.props.position} board={this.state.boardModel} blockSize={this.props.blockSize}/>
            </div>
        )
    }
}  