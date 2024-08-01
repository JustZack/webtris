import BlockRowView from "./BlockRowView";
import BlockView from "./BlockView";

export default class BlockRenderer {
    constructor(props) {

    }

    static renderBlocksGeneric(blockArray, blockSize, asRows = true) {
        let rendered = [];
        let blocks = blockArray;

        for (let i = 0;i < blocks.length;i++) {
            if (asRows) rendered.push(<BlockRowView key={i} blockSize={blockSize} blocks={blocks[i]}/>);
            else        rendered.push(<BlockView key={i} blockSize={blockSize} block={blocks[i]}/>);
        }
        return rendered;
    }

    static renderMatrix(block2DArray, blockSize, className, style) {
        return (
        <table className={className} style={style}>
            <tbody>
                {BlockRenderer.renderBlocksGeneric(block2DArray, blockSize, true)}
            </tbody>
        </table>
        )
    }

    static renderRow(blockArray, blockSize) {
        return BlockRenderer.renderBlocksGeneric(blockArray, blockSize, false);
    }
  }
  