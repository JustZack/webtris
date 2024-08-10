import TetrisGameConfig from "../configs/Config";
import BlockState from "../models/blocks/BlockState";

export default class BlockView extends React.Component {
    constructor(props) {
        super(props);
    }

    static determineColorClass(state) {
        switch (state) {
            case BlockState.EMPTY: return "empty";
            case BlockState.COLOR_1: 
            case BlockState.COLOR_2: 
            case BlockState.COLOR_3: return `filled color-${state}-${TetrisGameConfig.currentLevelNum}`;
            case BlockState.COMPLETE_ROW_LIGHT: return `complete-row-block-light`;
            case BlockState.COMPLETE_ROW_DARK: return `complete-row-block-dark`;
            case BlockState.LAST_STATE: return "default-filled";
            default: return "empty";
        }
    }

    render() {
        let block = this.props.block;
        let size = this.props.blockSize;
        let w = size.width;
        let h = size.height;
        let style = {width: w, height: h};
        let cssClass = "block " + BlockView.determineColorClass(block.state)
        return (<td className={cssClass} style={style}></td>)
    }
  }
  