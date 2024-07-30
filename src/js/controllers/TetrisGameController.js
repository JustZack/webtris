import BoardModel from "../models/board/BoardModel";
import Size from "../util/Size";
import Point from "../util/Point";
import BoardView from "../views/BoardView";
import FallingPieceController from "./FallingPieceController";
import PiecePicker from "./PiecePicker";

export default class TetrisGameController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            windowPosition: props.windowPosition,
            boardBlockSize: props.blockSize,
            boardModel: new BoardModel(new Size(10, 30)),
            spawnPoint: new Point(4, 0),
            nextPiece: null
        }
        this.doBoardUpdate = this.doBoardUpdate.bind(this);
        this.spawnRandomPiece = this.spawnRandomPiece.bind(this);
        this.getNextPiece = this.getNextPiece.bind(this);
        this.clearStatics = this.clearStatics.bind(this);
    }

    spawnRandomPiece() {
        let start = this.state.spawnPoint.copy();
        let pieceClass = PiecePicker.getRandomStandardPiece();
        return new pieceClass(start);
    }

    getNextPiece() {
        let toReturn = null;
        if (this.state.nextPiece == null)   toReturn = this.spawnRandomPiece();
        else                                toReturn = this.state.nextPiece;

        this.setState({nextPiece: this.spawnRandomPiece()});
        return toReturn;
    }

    doBoardUpdate(callback) {
        let b = this.state.boardModel;
        let result = callback(b);
        this.setState({boardModel: b});
        return result;
    }

    clearStatics() {
        this.doBoardUpdate((b) => { b.clearStaticBoard(); });
    }

    render() {
        return (
            <div>
                <button onClick={this.clearStatics}>Clear Board</button>
                <FallingPieceController doBoardUpdate={this.doBoardUpdate} getNextPiece={this.getNextPiece}/>
                <BoardView windowPosition={this.state.windowPosition} board={this.state.boardModel} blockSize={this.state.boardBlockSize}/>
            </div>
        )
    }
  }
  