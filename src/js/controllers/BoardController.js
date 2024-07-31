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
            nextPieceWindowPosition: props.position.offset(new Point(this.props.blockSize.width*10, 350)),
            nextPieceSize: new Size(this.props.blockSize.width*5, this.props.blockSize.height*3),
            boardModel: new BoardModel(new Size(10, 30)),
            spawnPoint: new Point(4, 0),
        }
        this.doBoardUpdate = this.doBoardUpdate.bind(this);
        this.clearBoard = this.clearBoard.bind(this);
    }

    doBoardUpdate(callback) {
        let b = this.state.boardModel;
        let result = callback(b);
        this.setState({boardModel: b});
        return result;
    }

    clearBoard() {
        this.doBoardUpdate((b) => { b.clearStaticBoard(); });
    }

    render() {
        return (
            <div>
                <button onClick={this.clearBoard}>Clear Board</button>
                <FallingPieceController doBoardUpdate={this.doBoardUpdate} getNextPiece={this.props.getNextPiece}/>
                <BoardView position={this.props.position} board={this.state.boardModel} blockSize={this.props.blockSize}/>
                <NextPieceView position={this.state.nextPieceWindowPosition} size={this.state.nextPieceSize} piece={this.props.nextPiece} blockSize={this.props.blockSize}/>
            </div>
        )
    }
}  