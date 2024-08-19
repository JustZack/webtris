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
import NTSCGameConfig from "../../configs/game/NTSCGameConfig";
import PALGameConfig from "../../configs/game/PALGameConfig";
import WebtrisGameConfig from "../../configs/game/WebtrisGameConfig";
import TetrisGameView from "../../views/TetrisGameView";

export default class TetrisGameController extends React.Component {
    constructor(props) {
        super(props);
        let boSize = this.props.boardSize;
        let boPos = this.props.position;
        let blSize = this.props.blockSize;
        let boardRight = boPos.offset(new Point(blSize.width*boSize.width, 0));
        let boardLeft = boPos;

        let boardHeight = blSize.height*(boSize.height);

        let gameModel = new TetrisGameModel(new Point(4, 0), new WebtrisGameConfig());
        gameModel.setStartLevel(0);
        this.state = {
            positions: {
                Board: boPos,
                Score: boardRight.offset(new Point(0, blSize.height*0)),
                NextPiece: boardRight.offset(new Point(0, blSize.height*6)),
                Level: boardRight.offset(new Point(0, blSize.height*12)),
                Stats: boardLeft.offset(new Point(-blSize.width*6, (boardHeight/2)-(blSize.height*8.25))),
                LineCount: boPos.offset(new Point(0, blSize.height*-2)),
            },
            sizes: {
                Board: boSize,
                Score: new Size(blSize.width*4.5, blSize.height*4),
                NextPiece: new Size(blSize.width*4.5, blSize.height*4),
                Level: new Size(blSize.width*4.5, blSize.height*3.25),
                Stats: new Size(blSize.width*6, blSize.height*17),
                LineCount: new Size(blSize.width*boSize.width, blSize.height*2),
                Block: blSize,
            },
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
        const {positions, sizes, gameModel} = this.state;
        const completedLines = gameModel.getCompletedLines();
        const totalPoints = gameModel.getPoints()
        const nextPiece = gameModel.getNextPiece();
        const currentLevelNumber = this.getCurrentLevel().getNumber();
        const statistics = gameModel.getPlacedPieceStatistics();
        return (
            <TetrisGameView
                nextLevel={this.nextLevel} 
                positions={positions} 
                sizes={sizes}
                completedLines={completedLines} 
                totalPoints={totalPoints}
                nextPiece={nextPiece}
                currentLevel={currentLevelNumber} 
                statistics={statistics}>
                <BoardController 
                    position={positions.Board} boardSize={sizes.Board} blockSize={sizes.Block} 
                    getNextPiece={this.getNextPiece} 
                    isPaused={this.isPaused} togglePaused={this.togglePaused}
                    doGameModelUpdate={this.doGameModelUpdate}
                    getCurrentLevel={this.getCurrentLevel}/>
            </TetrisGameView>
        );

    }
  }
  