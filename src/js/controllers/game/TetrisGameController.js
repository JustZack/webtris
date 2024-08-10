import Size from "../../util/Size";
import Point from "../../util/Point";
import PiecePicker from "../piece/PiecePicker";
import NextPieceView from "../../views/NextPieceView";
import BoardController from "../board/BoardController";
import TetrisGameModel from "../../models/game/TetrisGameModel";
import PiecesConfig from "../../configs/pieces/Pieces.Config";
import ScoreView from "../../views/ScoreView";
import StatisticsView from "../../views/StatisticsView";
import LineCountView from "../../views/LineCountView";
import TetrisGameConfig from "../../configs/Config";

export default class TetrisGameController extends React.Component {
    constructor(props) {
        super(props);
        let boSize = this.props.boardSize;
        let blSize = this.props.blockSize;
        this.state = {
            scoreWindowPosition: props.position.offset(new Point(blSize.width*boSize.width, blSize.height*(boSize.height)/15)),

            nextPieceWindowPosition: props.position.offset(new Point(blSize.width*boSize.width, blSize.height*(boSize.height)/5)),
            nextPieceSize: new Size(blSize.width*4.5, blSize.height*4),

            statsWindowPosition: props.position.offset(new Point(blSize.width*boSize.width, blSize.height*(boSize.height)/3)),
            statsWindowSize: new Size(blSize.width*6, blSize.height*16.5),

            LineCountWindowPosition: props.position.offset(new Point(0, blSize.height*-2)),
            LineCountWindowSize: new Size(blSize.width*boSize.width, blSize.height*2),

            gameModel: new TetrisGameModel(new Point(4, 0), PiecesConfig.standard),
        }

        this.doGameModelUpdate = this.doGameModelUpdate.bind(this);
        this.getNextPiece = this.getNextPiece.bind(this);
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
        this.doGameModelUpdate((gm) => {
            gm.advanceLevel();
            //TODO: This is a god awful solution th
            TetrisGameConfig.advanceLevel();
            console.log(TetrisGameConfig.currentLevel());
        })
    }

    getCurrentLevel() {
        return TetrisGameConfig.currentLevel();
    }

    getCurrentLevelNumber() {
        return TetrisGameConfig.currentLevelNum;
    }

    togglePaused() { 
        this.doGameModelUpdate((gameModel) => { gameModel.togglePaused() } );
    }

    isPaused() { return this.state.gameModel.isPaused(); }

    render() {
        return (
            <div>
                <button onClick={this.nextLevel}>Next</button>
                <BoardController 
                    position={this.props.position} boardSize={this.props.boardSize} blockSize={this.props.blockSize} 
                    getNextPiece={this.getNextPiece} isPaused={this.isPaused} togglePaused={this.togglePaused}
                    doGameModelUpdate={this.doGameModelUpdate} getCurrentLevel={this.getCurrentLevel} level={this.getCurrentLevelNumber()}/>

                <ScoreView position={this.state.scoreWindowPosition} size={this.state.nextPieceSize}
                    score={this.state.gameModel.getPoints()}/>
                <NextPieceView position={this.state.nextPieceWindowPosition} size={this.state.nextPieceSize} 
                    piece={this.state.gameModel.getNextPiece()} blockSize={this.props.blockSize} level={this.getCurrentLevelNumber()}/>
                <StatisticsView position={this.state.statsWindowPosition} size={this.state.statsWindowSize}
                    statistics={this.state.gameModel.getPlacedPieceStatistics()} blockSize={this.props.blockSize} level={this.getCurrentLevelNumber()}/>
                <LineCountView position={this.state.LineCountWindowPosition} size={this.state.LineCountWindowSize}
                    lines={this.state.gameModel.getCompletedLines()}/>
            </div>
        )
    }
  }
  