import BoardModel from "../models/game/BoardModel";
import Size from "../models/util/Size";
import Point from "../models/util/Point";
import BoardView from "../views/BoardView";
import BlockState from "../models/pieces/BlockState";
import FallingPieceController from "./FallingPieceController";
import IModel from "../models/pieces/IModel";
import LModel from "../models/pieces/lModel";
import JModel from "../models/pieces/JModel";
import SModel from "../models/pieces/SModel";
import ZModel from "../models/pieces/ZModel";
import CubeModel from "../models/pieces/CubeModel";
import TModel from "../models/pieces/TModel";
import KeyboardMapping from "../models/input/KeyboardMapping";

export default class TetrisGameController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            windowPosition: props.windowPosition,
            boardBlockSize: props.blockSize,
            boardModel: new BoardModel(new Size(10, 30)),
            spawnPoint: new Point(4, 0)
        }
        this.addFalling = this.addFalling.bind(this);
        this.commitToBoard = this.commitToBoard.bind(this);
        this.clearDynamics = this.clearDynamics.bind(this);
        this.clearStatics = this.clearStatics.bind(this);
        this.doBoardUpdate = this.doBoardUpdate.bind(this);
    }

    doBoardUpdate(callback) {
        let b = this.state.boardModel;
        callback(b);
        this.setState({boardModel: b});
    }

    addFalling(piece) {
        this.doBoardUpdate((b) => { b.commitDynamicPiece(piece); });
    }

    commitToBoard(piece) {
        this.doBoardUpdate((b) => { b.commitStaticPiece(piece); });
    }

    clearDynamics() {
        this.doBoardUpdate((b) => { b.clearDynamicBoard(); });
    }

    clearStatics() {
        this.doBoardUpdate((b) => { b.clearStaticBoard(); });
    }

    render() {
        return (
            <div>
                <button onClick={this.clearStatics}>Clear Board</button>
                <FallingPieceController addFalling={this.addFalling} clearFalling={this.clearDynamics} commitToBoard={this.commitToBoard} spawnPoint={this.state.spawnPoint}/>
                <BoardView windowPosition={this.state.windowPosition} board={this.state.boardModel} blockSize={this.state.boardBlockSize}/>
            </div>
        )
    }
  }
  