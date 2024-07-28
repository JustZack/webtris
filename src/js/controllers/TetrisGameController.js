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

export default class TetrisGameController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            windowPosition: props.windowPosition,
            boardBlockSize: props.blockSize,
            boardModel: new BoardModel(new Size(10, 30)),
            lastUpdatePoint: new Point(-1,0)
        }
        this.updateBoardState = this.updateBoardState.bind(this);
        this.getRandomPiece = this.getRandomPiece.bind(this);
        this.appendPiece = this.appendPiece.bind(this);
        this.clearDynamics = this.clearDynamics.bind(this);
        this.clearStatics = this.clearStatics.bind(this);
        this.doBoardUpdate = this.doBoardUpdate.bind(this);
    }

    doBoardUpdate(callback) {
        let b = this.state.boardModel;
        callback(b);
        this.setState({boardModel: b});
    }

    updateBoardState() {
        this.doBoardUpdate((b) => {
            let p = this.state.lastUpdatePoint;
    
            if (p.x < b.size.width-1) p.x++;
            else {
                p.x = 0;
                if (p.y < b.size.height-1) p.y++;
                else p.y = 0;
            }
            b.commitStaticBlockState(p, BlockState.LAST_STATE);
            this.setState({lastUpdatePoint: p});
        });
    }

    getRandomPiece() {
        let start = this.state.lastUpdatePoint;
        let rand = Math.floor(Math.random()*7);
        switch (rand) {
            case 0: return new IModel(start);
            case 1: return new LModel(start);
            case 2: return new JModel(start);
            case 3: return new SModel(start);
            case 4: return new ZModel(start);
            case 5: return new TModel(start);
            case 6: return new CubeModel(start);
        }
    }


    appendPiece() {
        this.doBoardUpdate((b) => { b.commitDynamicPiece(this.getRandomPiece()); });
    }

    clearDynamics() {
        this.doBoardUpdate((b) => { b.clearDynamicBoard(); });
    }

    clearStatics() {
        this.doBoardUpdate((b) => { b.clearStaticBoard(); });
    }

    render() {
        console.log(this.state.boardModel);
        return (
            <div>
                <button onClick={this.updateBoardState}>Update it</button>
                <button onClick={this.appendPiece}>Add it</button>
                <button onClick={this.clearDynamics}>Clear Dynamics</button>
                <button onClick={this.clearStatics}>Clear Statics</button>
                <FallingPieceController />
                <BoardView windowPosition={this.state.windowPosition} board={this.state.boardModel} blockSize={this.state.boardBlockSize}/>
            </div>
        )
    }
  }
  