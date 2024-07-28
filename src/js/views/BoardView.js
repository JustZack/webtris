import Size from "../models/util/Size";
import BlockRenderer from "./BlockRenderer";
import BlockRowView from "./BlockRowView";


export default class BoardView extends BlockRenderer {
    constructor(props) {
        super(props);

        let windowPosition = props.windowPosition;
        let blockSize = props.blockSize;
        let board = props.board;
        let boardSize = board.size;

        this.state = {
            position: windowPosition,
            size: new Size(
                boardSize.width * blockSize.width,
                boardSize.height * blockSize.height,
            ),
            board: board,
            blockSize: blockSize,
        }
    }

    renderBlocks() {
        let rendered = [];
        let blocks = this.state.board.getBlocks();
        for (let i = 0;i < blocks.length;i++) {
                rendered.push(<BlockRowView boardOrigin={this.state.windowPosition} key={i}
                                    blockSize={this.state.blockSize} blocks={blocks[i]}/>);
        }
        return rendered;
    }

    render() {
        let pos = this.state.position;
        let size = this.state.size;
        let style = {top: pos.y, left: pos.x, width: size.width, height: size.height};
        return (
            <table className="tetris-board" style={style}>
                <tbody>
                    {this.renderBlocks()}
                </tbody>
            </table>
        );
    }
  }
  