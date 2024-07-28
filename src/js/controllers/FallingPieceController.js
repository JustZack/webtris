import IModel from "../models/pieces/IModel";
import JModel from "../models/pieces/JModel";
import LModel from "../models/pieces/lModel";
import SModel from "../models/pieces/SModel";
import ZModel from "../models/pieces/ZModel";
import CubeModel from "../models/pieces/CubeModel";
import Point from "../models/util/Point";
import InputController from "./InputController";
import KeyboardMapping from "../models/input/KeyboardMapping";
import GameAction from "../models/input/GameAction";
import TModel from "../models/pieces/TModel";
import Direction from "../models/util/Direction";

export default class FallingPieceController extends React.Component {
    constructor(props) {
        super(props);
        //addFalling clearFalling commitToBoard
        this.state = {
            fallingPiece: null,
        }
        this.spawnRandomPiece = this.spawnRandomPiece.bind(this);
        this.handleGameAction = this.handleGameAction.bind(this);
    }

    spawnRandomPiece() {
        let start = this.props.spawnPoint;
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

    handleGameAction(event, gameAction) {
        if (gameAction != false) {
            this.props.clearFalling();
            let piece = this.state.fallingPiece;

            if (piece != null) {
                switch (gameAction) {
                    case GameAction.PLACE_PIECE: this.props.commitToBoard(piece); piece = null; break;
                    case GameAction.MOVE_LEFT:   piece.move(Direction.LEFT); break;
                    case GameAction.MOVE_UP:     piece.move(Direction.UP); break;
                    case GameAction.MOVE_RIGHT:  piece.move(Direction.RIGHT); break;
                    case GameAction.MOVE_DOWN:   piece.move(Direction.DOWN); break;
                }
            } else if (gameAction == GameAction.MAKE_PIECE) {
                piece = this.spawnRandomPiece(); 
            }
            
            if (piece != null) this.props.addFalling(piece);
            this.setState({fallingPiece: piece});
        }
    }

    render() {
        return (<InputController mapping={KeyboardMapping} callback={this.handleGameAction}/>)
    }
  }
  