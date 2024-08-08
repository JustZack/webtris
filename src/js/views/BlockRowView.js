import BlockRenderer from "./BlockRenderer";
import BlockView from "./BlockView";

export default class BlockRowView extends React.Component {
    constructor(props) {
        super(props);
    }

    renderBlocks() {
        return BlockRenderer.renderRow(this.props.blocks, this.props.blockSize);
    }

    render() {
        return (<tr className="block-row">{this.renderBlocks()}</tr>)
    }
  }
  