import Size from "../util/Size";
import BlockRenderer from "./BlockRenderer";
import BlockRowView from "./BlockRowView";


export default class BoardView extends BlockRenderer {
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

    renderBlocks() {
        let rendered = [];
        let blocks = this.props.board.getBlocks();
        for (let i = 0;i < blocks.length;i++) {
                rendered.push(<BlockRowView key={i} blockSize={this.props.blockSize} blocks={blocks[i]}/>);
        }
        return rendered;
    }

    render() {
        let pos = this.props.position;
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
  