import BoardModel from "../models/game/board";
import Size from "../models/util/size";
import Point from "../models/util/point";
import BoardView from "../views/BoardView";
import BlockState from "../models/pieces/blockState";

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
    }

    updateBoardState() {
        let p = this.state.lastUpdatePoint;
        let b = this.state.boardModel;

        if (p.x < b.size.width) p.x++;
        else {
            p.x = 0;
            if (p.y < b.size.height) p.y++;
        }
        

        b.setBlockState(p, BlockState.FILLED);
        this.setState({lastUpdatePoint: p, boardModel: b});
    }

    render() {
        return (
            <div>
                <button onClick={this.updateBoardState}>Update it</button>
                <BoardView windowPosition={this.state.windowPosition} board={this.state.boardModel} blockSize={this.state.boardBlockSize}/>
            </div>
        )
    }
  }
  