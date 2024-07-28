import BoardModel from "../models/game/BoardModel";
import Size from "../util/Size";
import Point from "../util/Point";
import BoardView from "../views/BoardView";
import FallingPieceController from "./FallingPieceController";

export default class TetrisGameController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            windowPosition: props.windowPosition,
            boardBlockSize: props.blockSize,
            boardModel: new BoardModel(new Size(10, 30)),
            spawnPoint: new Point(4, 0)
        }
        this.doBoardUpdate = this.doBoardUpdate.bind(this);
    }

    doBoardUpdate(callback) {
        let b = this.state.boardModel;
        callback(b);
        this.setState({boardModel: b});
    }

    clearStatics() {
        this.doBoardUpdate((b) => { b.clearStaticBoard(); });
    }

    render() {
        return (
            <div>
                <button onClick={this.clearStatics}>Clear Board</button>
                <FallingPieceController doBoardUpdate={this.doBoardUpdate} spawnPoint={this.state.spawnPoint}/>
                <BoardView windowPosition={this.state.windowPosition} board={this.state.boardModel} blockSize={this.state.boardBlockSize}/>
            </div>
        )
    }
  }
  