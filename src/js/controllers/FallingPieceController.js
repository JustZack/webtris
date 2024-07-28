import IModel from "../models/pieces/IModel";
import JModel from "../models/pieces/JModel";
import LModel from "../models/pieces/lModel";
import SModel from "../models/pieces/SModel";
import ZModel from "../models/pieces/ZModel";
import CubeModel from "../models/pieces/CubeModel";
import Point from "../models/util/Point";
import InputController from "./InputController";
import KeyboardMapping from "../models/input/KeyboardMapping";

export default class FallingPieceController extends React.Component {
    constructor(props) {
        super(props);
        //commitPiece={this.appendPiece} clearFallingPieces={this.clearDynamics}
        this.state = {
        }
    }


    render() {
        return (<InputController mapping={KeyboardMapping}/>)
    }
  }
  