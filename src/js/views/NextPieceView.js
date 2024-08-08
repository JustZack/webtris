import Size from "../util/Size";
import BoardView from "./BoardView";
import PieceView from "./PieceView";

export default class NextPieceView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let style = {top: this.props.position.y, left: this.props.position.x, 
                     width: this.props.size.width, height: this.props.size.height};
        return (
            <div className="next-piece" style={style}>
                <div className="next-piece-label board-text">Next</div>
                <PieceView piece={this.props.piece} blockSize={this.props.blockSize}/>
            </div>
        );
    }
  }
  