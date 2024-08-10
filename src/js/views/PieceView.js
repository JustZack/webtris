import BlockRenderer from "./BlockRenderer";
import BlockRowView from "./BlockRowView";

export default class PieceView extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render() {
        if (this.props.piece != null) { 
            let blocks = this.props.piece.asBoard;
            return BlockRenderer.renderMatrix(blocks, this.props.blockSize, this.props.level, "tetris-piece");
        }
    }
  }
  