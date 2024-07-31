import BlockRenderer from "./BlockRenderer";
import BlockRowView from "./BlockRowView";

export default class PieceView extends BlockRenderer {
    constructor(props) {
        super(props);
        this.state = { };
    }

    renderBlocks() {
        let rendered = [];
        let blocks = this.props.piece.as2DArray();
        for (let i = 0;i < blocks.length;i++) {
                rendered.push(<BlockRowView key={i} blockSize={this.props.blockSize} blocks={blocks[i]}/>);
        }
        return rendered;
    }

    render() {
        if (this.props.piece != null) { 
            return (
                <table className="tetris-piece">
                    <tbody>
                        {this.renderBlocks()}
                    </tbody>
                </table>
            );
        }
    }
  }
  