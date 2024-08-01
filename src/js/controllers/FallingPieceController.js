import InputController from "./InputController";
import KeyboardMapping from "../models/input/KeyboardMapping";
import GameAction from "../models/input/GameAction";
import Direction from "../util/Direction";

export default class FallingPieceController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fallingPiece: null,
            shiftInterval: null
        }
        this.handleGameAction = this.handleGameAction.bind(this);
        this.commitToBoard = this.commitToBoard.bind(this);
        this.tryCommitFallingPiece = this.tryCommitFallingPiece.bind(this);
        this.shiftDown = this.shiftDown.bind(this);
        this.startShiftDownTimeout = this.startShiftDownTimeout.bind(this);
        this.resetShiftDownTimeout = this.resetShiftDownTimeout.bind(this);
    }

    commitToBoard(piece) {
        this.props.doBoardUpdate((b) => {
            b.clearDynamicBoard();
            b.commitStaticPiece(piece);
        });
    }

    tryCommitFallingPiece(piece, moveDirection, rotateDirection) {
        this.props.doBoardUpdate((b) => {
            if (b.pieceCanMove(piece, moveDirection, rotateDirection)) {
                if (moveDirection != null) piece.move(moveDirection);
                else if (rotateDirection != null) piece.rotate(rotateDirection);
                b.clearDynamicBoard();
                b.commitDynamicPiece(piece);
            }
        });
    }

    shiftDown() {
        this.props.doBoardUpdate((b) => {
            let piece = this.state.fallingPiece;
            if (b.pieceCanMove(piece, Direction.DOWN)) {
                piece.move(Direction.DOWN);
            } else {
                this.commitToBoard(piece); 
                this.resetShiftDownTimeout();
                piece = this.props.getNextPiece();
            }
            b.clearDynamicBoard();
            b.commitDynamicPiece(piece);
            this.setState({fallingPiece: piece});
        });
    }

    startShiftDownTimeout() {
        let fallTime = this.props.getLevelConfig().fallTime;
        let shiftInterval = setInterval(this.shiftDown, fallTime);
        this.setState({shiftInterval: shiftInterval});
    }

    resetShiftDownTimeout() {
        clearInterval(this.state.shiftInterval);
        this.startShiftDownTimeout();
    }

    handleGameAction(event, gameAction) {
        if (gameAction != false) {
            let piece = this.state.fallingPiece;
            let moveDirection = null;
            let rotateDirection = null;
            if (piece != null) {
                switch (gameAction) {
                    case GameAction.MOVE_LEFT:      moveDirection = Direction.LEFT; break;
                    case GameAction.MOVE_UP:        moveDirection = Direction.UP; break;
                    case GameAction.MOVE_RIGHT:     moveDirection = Direction.RIGHT; break;
                    case GameAction.MOVE_DOWN:      moveDirection = Direction.DOWN; break;
                    case GameAction.ROTATE_LEFT:    rotateDirection = Direction.LEFT; break;
                    case GameAction.ROTATE_RIGHT:   rotateDirection = Direction.RIGHT; break;
                }
            } else if (gameAction == GameAction.MAKE_PIECE) {
                piece = this.props.getNextPiece();
                this.startShiftDownTimeout();
            }
            if (piece != null) {
                this.tryCommitFallingPiece(piece, moveDirection, rotateDirection);
            }
            this.setState({fallingPiece: piece});
        }
    }

    render() {
        return (<InputController mapping={KeyboardMapping} callback={this.handleGameAction}/>)
    }
  }
  