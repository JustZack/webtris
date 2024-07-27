import BlockState from "../models/pieces/BlockState";

export default class BlockView extends React.Component {
    constructor(props) {
        super(props);
        let boardOrigin = props.boardOrigin;
        let blockSize = props.blockSize;
        let block = props.block;
        this.state = {
            offset: boardOrigin,
            size: blockSize,
            block: block
        }
    }

    render() {
        let block = this.props.block;
        let position = block.position;
        let size = this.props.blockSize;
        let w = size.width;
        let h = size.height;
        let style = {width: w, height: h};
        let clss = "block " + (block.state == BlockState.EMPTY ? "empty" : "filled");
        return (<td className={clss} style={style}></td>)
    }
  }
  