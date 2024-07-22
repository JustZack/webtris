import Block from "./block";

export default class BlockRow extends React.Component {
    constructor(props) {
        super(props);
        this.renderBlocks = this.renderBlocks.bind(this);
    }

    renderBlocks() {
        let blocks = this.props.blocks;
        let rendered = [];
        for (let i = 0;i < blocks.length;i++) {
            let block = blocks[i];
            rendered.push(<Block boardOrigin={this.props.boardOrigin} key={i}
                blockSize={this.props.blockSize} block={block}/>);
        }
        return rendered;
    }

    render() {
        return (<tr className="block-row">{this.renderBlocks()}</tr>)
    }
  }
  