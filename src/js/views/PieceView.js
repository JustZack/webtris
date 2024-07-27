import BlockRenderer from "./BlockRenderer";

export default class PieceView extends BlockRenderer {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    renderBlocks() {
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
  