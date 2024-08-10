import BoardModel from "../../models/board/BoardModel";
import FallingPieceController from "../piece/FallingPieceController";
import BoardView from "../../views/BoardView";
import BlockState from "../../models/blocks/BlockState";
import { sleep } from "../../util/Sleep";
import TypeOf from "../../util/TypeOf";

export default class BoardController extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            boardModel: new BoardModel(this.props.boardSize),
        }
        this.doBoardUpdate = this.doBoardUpdate.bind(this);
        this.clearBoard = this.clearBoard.bind(this);
        this.doCheckForFullRows = this.doCheckForFullRows.bind(this);
        this.flashFullRows = this.flashFullRows.bind(this);
        this.clearFullRows = this.clearFullRows.bind(this);
        this.flashRows = this.flashRows.bind(this);
        this.setRowsState = this.setRowsState.bind(this);
        
    }

    doBoardUpdate(callback) {
        let b = this.state.boardModel;
        let result = callback(b);
        this.setState({boardModel: b});
        return result;
    }

    doCheckForFullRows(callback) {
        let b = this.state.boardModel;
        let fullRows = b.getFullRows();
        if (fullRows.length > 0) this.clearFullRows(fullRows, b);
        callback(fullRows.length > 0);
    }

    async clearFullRows(fullRows, b) {
        this.props.togglePaused();
        await this.clearRowsMiddleOut(0, fullRows, b, 50, () => {
            b.shiftDownRows(fullRows);
            this.setState({boardModel: b});
            this.props.togglePaused();
            this.props.doGameModelUpdate((gm) => {
                gm.addPoints(Math.pow(11, fullRows.length));
                gm.addCompletedLines(fullRows.length);
            });
        });
    }


    async clearRowsMiddleOut(distanceFromMiddle, rows, b, delay, completeCallback) {
        let halfWidth = Math.floor(b.size.width/2);
        if (distanceFromMiddle >= halfWidth) completeCallback();
        else {
            let rowStates = [];
            let isEven = b.size.width%2 == 0;
            for (let r in rows) {
                let rowState = b.getRowState(rows[r]);
                if (isEven) rowState[halfWidth-(distanceFromMiddle+1)] = BlockState.EMPTY;
                else        rowState[halfWidth-distanceFromMiddle] = BlockState.EMPTY;
                rowState[halfWidth+distanceFromMiddle] = BlockState.EMPTY;
                rowStates.push(rowState);
            }

            this.setRowsState(rows, b, rowStates, async () => {
                await sleep(delay);
                this.clearRowsMiddleOut(distanceFromMiddle+1, rows, b, delay, completeCallback); 
            });
        }

    }

    async flashFullRows(fullRows, b) {
        this.props.togglePaused();
        await this.flashRows(10, fullRows, b, 50, () => {
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
        let isSingleState = typeof(state) == TypeOf.NUMBER;
        let isStateList = !isSingleState && typeof(state) == TypeOf.OBJECT;
        let isListOfStateLists = isStateList && typeof(state[0]) == TypeOf.OBJECT;
        
        if (isListOfStateLists) {
            for (let r in rows) b.setRowState(rows[r], state[r])
        } else if (isSingleState || isStateList) {
            b.setManyRowsState(rows, state);
        }

        this.setState({boardModel: b}, callback);
    }

    clearBoard() {
        this.doBoardUpdate((b) => { b.clearStaticBoard(); });
    }

    render() {
        return (
            <div>
                <button onClick={this.clearBoard}>Clear Board</button>
                <FallingPieceController doBoardUpdate={this.doBoardUpdate} getNextPiece={this.props.getNextPiece} 
                                        isPaused={this.props.isPaused} getCurrentLevel={this.props.getCurrentLevel} level={this.props.level}
                                        doCheckForFullRows={this.doCheckForFullRows} doGameModelUpdate={this.props.doGameModelUpdate}/>
                <BoardView position={this.props.position} board={this.state.boardModel} blockSize={this.props.blockSize} level={this.props.level}/>
            </div>
        )
    }
}  