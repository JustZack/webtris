import Size from "../../util/Size";
import Point from "../../util/Point";
import NextPieceView from "../../views/NextPieceView";
import BoardController from "../board/BoardController";
import TetrisGameModel from "../../models/game/TetrisGameModel";
import PiecesConfig from "../../configs/pieces/PiecesConfig";
import ScoreView from "../../views/ScoreView";
import StatisticsView from "../../views/StatisticsView";
import LineCountView from "../../views/LineCountView";
import LevelView from "../../views/LevelView";
import StandardGameConfigModel from "../../models/game/StandardGameConfigModel";

export default class TetrisGameController extends React.Component {
    constructor(props) {
        super(props);
        let boSize = this.props.boardSize;
        let blSize = this.props.blockSize;
        let boardRight = this.props.position.offset(new Point(blSize.width*boSize.width, 0));
        let boardHeight = blSize.height*(boSize.height);

        let gameModel = new TetrisGameModel(new Point(4, 0), new StandardGameConfigModel());
        gameModel.setStartLevel(5);
        this.state = {
            scoreWindowPosition: boardRight.offset(new Point(0, blSize.height*-2)),
            nextPieceWindowPosition: boardRight.offset(new Point(0, blSize.height*2)),
            nextPieceSize: new Size(blSize.width*4.5, blSize.height*4),

            levelWindowPosition: boardRight.offset(new Point(0, blSize.height*22.5)),
            levelWindowSize: new Size(blSize.width*4.5, blSize.height*3.25),

            statsWindowPosition: boardRight.offset(new Point(0, blSize.height*(6))),
            statsWindowSize: new Size(blSize.width*6, blSize.height*16.5),

            LineCountWindowPosition: props.position.offset(new Point(0, blSize.height*-2)),
            LineCountWindowSize: new Size(blSize.width*boSize.width, blSize.height*2),

            gameModel: gameModel,
        }

        this.doGameModelUpdate = this.doGameModelUpdate.bind(this);
        this.getNextPiece = this.getNextPiece.bind(this);
        this.nextLevel = this.nextLevel.bind(this);
        this.togglePaused = this.togglePaused.bind(this);
        this.isPaused = this.isPaused.bind(this);

        this.getCurrentLevel = this.getCurrentLevel.bind(this);
        this.getCurrentLevelNumber = this.getCurrentLevelNumber.bind(this);
        
    }

    doGameModelUpdate(callback) {
        let gm = this.state.gameModel;
        let result = callback(gm);
        this.setState({gameModel: gm});
        return result;
    }

    spawnRandomPiece() {
        return this.state.gameModel.spawnRandomPiece(new Point(1, 1));
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
        })
    }

    getCurrentLevel() {
        return this.state.gameModel.getCurrentLevel();
    }

    getCurrentLevelNumber() {
        return this.state.gameModel.getCurrentLevelNumber();
    }

    togglePaused() { 
        this.doGameModelUpdate((gameModel) => { gameModel.togglePaused() } );
    }

    isPaused() { return this.state.gameModel.isPaused(); }

    render() {
        return (
            <div>
                <button onClick={this.nextLevel}>Next</button>
                <LineCountView position={this.state.LineCountWindowPosition} size={this.state.LineCountWindowSize}
                    lines={this.state.gameModel.getCompletedLines()}/>
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
                <LevelView position={this.state.levelWindowPosition} size={this.state.levelWindowSize}
                    blockSize={this.props.blockSize} level={this.getCurrentLevelNumber()}/>
                
            </div>
        )
    }
  }
  