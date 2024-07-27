import IModel from "../models/pieces/IModel";
import JModel from "../models/pieces/JModel";
import LModel from "../models/pieces/lModel";
import SModel from "../models/pieces/SModel";
import ZModel from "../models/pieces/ZModel";
import CubeModel from "../models/pieces/CubeModel";
import Point from "../models/util/Point";

export default class FallingPieceController extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    getRandomePiece() {
        switch (Math.random()%6) {
            case 0: return new IModel();
            case 1: return new LModel();
            case 2: return new JModel();
            case 3: return new SModel();
            case 4: return new ZModel();
            case 5: return new CubeModel();
        }
    }

    render() {
        return (
            <div>
                
                
            </div>
        )
    }
  }
  