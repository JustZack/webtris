import BoardModel from "../models/board/BoardModel";
import Size from "../util/Size";
import Point from "../util/Point";
import BoardView from "../views/BoardView";
import FallingPieceController from "./FallingPieceController";
import PiecePicker from "./PiecePicker";
import NextPieceView from "../views/NextPieceView";
import BoardController from "./BoardController";
import GameConfig from "../Game.Config";

export default class TetrisGameController extends React.Component {
    constructor(props) {
        super(props);
        let boSize = this.props.boardSize;
        let blSize = this.props.blockSize;
        this.state = {
            nextPieceWindowPosition: props.position.offset(new Point(blSize.width*boSize.width, blSize.height*(boSize.height)/3)),
            nextPieceSize: new Size(blSize.width*5, blSize.height*4),
            spawnPoint: new Point(4, 0),
            nextPiece: null,
            levelConfig: GameConfig.Levels[GameConfig.CurrentLevel],
            pauseGame: false
        }

        this.getNextPiece = this.getNextPiece.bind(this);
        this.getLevelConfig = this.getLevelConfig.bind(this);
        this.nextLevel = this.nextLevel.bind(this);
        this.togglePaused = this.togglePaused.bind(this);
        this.isPaused = this.isPaused.bind(this);
        
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

    nextLevel() {
        this.setState({levelConfig: GameConfig.Levels[GameConfig.CurrentLevel++]});
    }

    getLevelConfig() {
        return this.state.levelConfig;
    }

    togglePaused() { 
        this.setState({pauseGame: !this.state.pauseGame}); 
    }
    isPaused() { return this.state.pauseGame; }

    render() {
        return (
            <div>
                <button onClick={this.nextLevel}>Next Level</button>
                <BoardController position={this.props.position} boardSize={this.props.boardSize} blockSize={this.props.blockSize}
                                getNextPiece={this.getNextPiece} getLevelConfig={this.getLevelConfig} 
                                isPaused={this.isPaused} togglePaused={this.togglePaused}/>
                <NextPieceView position={this.state.nextPieceWindowPosition} size={this.state.nextPieceSize} 
                                piece={this.state.nextPiece} blockSize={this.props.blockSize}/>
            </div>
        )
    }
  }
  