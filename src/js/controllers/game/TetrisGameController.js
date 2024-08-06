import Size from "../../util/Size";
import Point from "../../util/Point";
import PiecePicker from "../piece/PiecePicker";
import NextPieceView from "../../views/NextPieceView";
import BoardController from "../board/BoardController";
import GameConfig from "../../configs/Game.Config";
import TetrisGameModel from "../../models/game/TetrisGameModel";

export default class TetrisGameController extends React.Component {
    constructor(props) {
        super(props);
        let boSize = this.props.boardSize;
        let blSize = this.props.blockSize;
        this.state = {
            nextPieceWindowPosition: props.position.offset(new Point(blSize.width*boSize.width, blSize.height*(boSize.height)/3)),
            nextPieceSize: new Size(blSize.width*5, blSize.height*4),
            levelConfig: GameConfig.Levels[GameConfig.CurrentLevel],
            gameModel: new TetrisGameModel(new Point(4, 0))
        }

        this.doGameModelUpdate = this.doGameModelUpdate.bind(this);
        this.getNextPiece = this.getNextPiece.bind(this);
        this.getLevelConfig = this.getLevelConfig.bind(this);
        this.nextLevel = this.nextLevel.bind(this);
        this.togglePaused = this.togglePaused.bind(this);
        this.isPaused = this.isPaused.bind(this);
        
    }

    doGameModelUpdate(callback) {
        let gm = this.state.gameModel;
        let result = callback(gm);
        this.setState({gameModel: gm});
        return result;
    }

    spawnRandomPiece() {
        return PiecePicker.spawnRandomStandardPiece(new Point(1, 1));
    }

    getNextPiece() {
        let toReturn = null;
        this.doGameModelUpdate((gameModel) => {
            toReturn = gameModel.getNextPiece();
            if (toReturn == null) toReturn = this.spawnRandomPiece();
            toReturn.setPosition(gameModel.getSpawnPoint());
            gameModel.setNextPiece(this.spawnRandomPiece());
        });
        return toReturn;
    }

    nextLevel() {
        this.setState({levelConfig: GameConfig.Levels[GameConfig.CurrentLevel++]});
    }

    getLevelConfig() {
        return this.state.levelConfig;
    }

    togglePaused() { 
        this.doGameModelUpdate((gameModel) => { gameModel.togglePaused() } );
    }

    isPaused() { return this.state.gameModel.isPaused(); }

    render() {
        return (
            <div>
                <button onClick={this.nextLevel}>Next Level</button>
                <BoardController 
                    position={this.props.position} boardSize={this.props.boardSize} blockSize={this.props.blockSize} 
                    getNextPiece={this.getNextPiece} getLevelConfig={this.getLevelConfig} 
                    isPaused={this.isPaused} togglePaused={this.togglePaused}/>

                <NextPieceView position={this.state.nextPieceWindowPosition} size={this.state.nextPieceSize} 
                    piece={this.state.gameModel.getNextPiece()} blockSize={this.props.blockSize}/>
            </div>
        )
    }
  }
  