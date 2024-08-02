import PiecePicker from "./PiecePicker";
import Size from "../util/Size";
import Point from "../util/Point";
import BoardModel from "../models/board/BoardModel";
import FallingPieceController from "./FallingPieceController";
import NextPieceView from "../views/NextPieceView";
import BoardView from "../views/BoardView";

export default class BoardController extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            boardModel: new BoardModel(this.props.boardSize),
        }
        this.doBoardUpdate = this.doBoardUpdate.bind(this);
        this.clearBoard = this.clearBoard.bind(this);
        this.checkForFullRows = this.checkForFullRows.bind(this);
    }

    doBoardUpdate(callback) {
        let b = this.state.boardModel;
        let result = callback(b);
        this.setState({boardModel: b});
        return result;
    }

    checkForFullRows() {
        let b = this.state.boardModel;
        if (b.hasFullRows()) {
            console.log("I see full rows!");
            b.shiftFullRows();
            this.setState({boardModel: b});
        }
        else console.log("no full rows");
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