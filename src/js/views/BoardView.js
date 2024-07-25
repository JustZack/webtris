import BoardModel from "../models/game/board";
import Size from "../models/util/size";
import BlockRowView from "./BlockRowView";


export default class BoardView extends React.Component {
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

        this.renderBlocks = this.renderBlocks.bind(this);
    }

    renderBlocks() {
        let rendered = [];
        let blocks = this.state.board.blocks;
        for (let i = 0;i < blocks.length;i++) {
                rendered.push(<BlockRowView boardOrigin={this.state.windowPosition} key={i}
                                    blockSize={this.state.blockSize} blocks={blocks[i]}/>);
        }
        return rendered;
    }

    render() {
        let pos = this.state.position;
        let size = this.state.size;
        let style = {top: pos.x, left: pos.y, width: size.width, height: size.height};
        return (
            <table className="tetris-board" style={style}>
                <tbody>
                    {this.renderBlocks()}
                </tbody>
            </table>
        );
    }
  }
  