import Size from "../util/Size";
import BlockRenderer from "./BlockRenderer";
import BlockRowView from "./BlockRowView";


export default class BoardView extends React.Component {
    constructor(props) {
        super(props);

        let board = props.board;
        let blockSize = props.blockSize;
        let boardSize = board.size;

        this.state = {
            size: new Size(
                boardSize.width * blockSize.width,
                boardSize.height * blockSize.height,
            ),
        }
    }

    render() {
        let pos = this.props.position;
        let size = this.state.size;
        let style = {top: pos.y, left: pos.x, width: size.width, height: size.height};
        let blocks = this.props.board.getBlocks();
        return BlockRenderer.renderMatrix(blocks, this.props.blockSize, this.props.level, "tetris-board", style);
    }
  }
  