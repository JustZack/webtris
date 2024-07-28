import InputController from "./InputController";
import KeyboardMapping from "../models/input/KeyboardMapping";
import GameAction from "../models/input/GameAction";
import Direction from "../util/Direction";
import PiecePicker from "../models/pieces/PiecePicker";
import BoardModel from "../models/game/BoardModel";

export default class FallingPieceController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fallingPiece: null,
        }
        this.spawnRandomPiece = this.spawnRandomPiece.bind(this);
        this.handleGameAction = this.handleGameAction.bind(this);
        this.updateFallingPiece = this.updateFallingPiece.bind(this);
        this.commitSetPiece = this.commitSetPiece.bind(this);
    }

    spawnRandomPiece() {
        let start = this.props.spawnPoint.copy();
        let pieceClass = PiecePicker.getRandomStandardPiece();
        return new pieceClass(start);
    }

    updateFallingPiece(piece) {
        this.props.doBoardUpdate((b) => {
            b.clearDynamicBoard();
            b.commitDynamicPiece(piece);
        });
    }

    commitSetPiece(piece) {
        this.props.doBoardUpdate((b) => {
            b.clearDynamicBoard();
            b.commitStaticPiece(piece);
        });
    }

    handleGameAction(event, gameAction) {
        if (gameAction != false) {
            let piece = this.state.fallingPiece;
            if (piece != null) {
                switch (gameAction) {
                    case GameAction.PLACE_PIECE:    this.commitSetPiece(piece); piece = this.spawnRandomPiece(); break;
                    case GameAction.MOVE_LEFT:      piece.move(Direction.LEFT); break;
                    case GameAction.MOVE_UP:        piece.move(Direction.UP); break;
                    case GameAction.MOVE_RIGHT:     piece.move(Direction.RIGHT); break;
                    case GameAction.MOVE_DOWN:      piece.move(Direction.DOWN); break;
                    case GameAction.ROTATE_LEFT:    piece.rotate(Direction.LEFT); break;
                    case GameAction.ROTATE_RIGHT:   piece.rotate(Direction.RIGHT); break;
                }
            } else if (gameAction == GameAction.MAKE_PIECE) {
                piece = this.spawnRandomPiece(); 
            }
            if (piece != null) this.updateFallingPiece(piece);
            this.setState({fallingPiece: piece});
        }
    }

    render() {
        return (<InputController mapping={KeyboardMapping} callback={this.handleGameAction}/>)
    }
  }
  