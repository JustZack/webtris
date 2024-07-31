import BlockRenderer from "./BlockRenderer";
import BlockView from "./BlockView";

export default class BlockRowView extends BlockRenderer {
    constructor(props) {
        super(props);
    }

    renderBlocks() {
        let blocks = this.props.blocks;
        let rendered = [];
        for (let i = 0;i < blocks.length;i++) {
            let block = blocks[i];
            rendered.push(<BlockView key={i} blockSize={this.props.blockSize} block={block}/>);
        }
        return rendered;
    }

    render() {
        return (<tr className="block-row">{this.renderBlocks()}</tr>)
    }
  }
  