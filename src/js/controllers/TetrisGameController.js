import BoardModel from "../models/board/BoardModel";
import Size from "../util/Size";
import Point from "../util/Point";
import BoardView from "../views/BoardView";
import FallingPieceController from "./FallingPieceController";
import PiecePicker from "./PiecePicker";
import NextPieceView from "../views/NextPieceView";
import BoardController from "./BoardController";

export default class TetrisGameController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nextPieceWindowPosition: props.position.offset(new Point(10*this.props.blockSize.width, 150)),
            boardModel: new BoardModel(new Size(10, 30)),
            spawnPoint: new Point(4, 0),
            nextPiece: null
        }

        this.getNextPiece = this.getNextPiece.bind(this);
    }

    spawnRandomPiece() {
        return PiecePicker.spawnRandomStandardPiece(new Point(1, 1));
    }

    getNextPiece() {
        let toReturn = null;
        if (this.state.nextPiece == null)   toReturn = this.spawnRandomPiece();
        else                                toReturn = this.state.nextPiece;
        
        toReturn.setPosition(this.state.spawnPoint);
        this.setState({nextPiece: this.spawnRandomPiece()});
        return toReturn;
    }

    render() {
        return (
            <div>
                <BoardController position={this.props.position} blockSize={this.props.blockSize} 
                                nextPiece={this.state.nextPiece} getNextPiece={this.getNextPiece}/>
            </div>
        )
    }
  }
  