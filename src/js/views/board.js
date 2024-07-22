import BoardModel from "../models/game/board";
import Size from "../models/shared/size";
import BlockRow from "./blockrow";


export default class Board extends React.Component {
    constructor(props) {
        super(props);

        let windowPosition = props.windowPosition;
        let blockSize = props.blockSize;
        let boardSize = props.boardSize;

        this.state = {
            position: windowPosition,
            size: new Size(
                boardSize.width * blockSize.width,
                boardSize.height * blockSize.height,
            ),
            board: new BoardModel(boardSize),
            blockSize: blockSize,
        }

        this.renderBlocks = this.renderBlocks.bind(this);
    }

    renderBlocks() {
        let rendered = [];
        let blocks = this.state.board.blocks;
        for (let i = 0;i < blocks.length;i++) {
                rendered.push(<BlockRow boardOrigin={this.state.windowPosition} key={i}
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
  