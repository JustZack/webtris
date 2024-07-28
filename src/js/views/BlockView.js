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
            block: block,
        }
        console.log(this.state.cssClass);
    }

    static determineColorClass(state) {
        switch (state) {
            case BlockState.EMPTY: return "empty";
            case BlockState.COLOR_1: 
            case BlockState.COLOR_2: 
            case BlockState.COLOR_3: 
            case BlockState.COLOR_4: 
            case BlockState.COLOR_5: 
            case BlockState.COLOR_6: 
            case BlockState.COLOR_7: return `color-${state}`;
            case BlockState.LAST_STATE: return "filled";
            default: return "empty";
        }
    }

    render() {
        let block = this.props.block;
        let position = block.position;
        let size = this.props.blockSize;
        let w = size.width;
        let h = size.height;
        let style = {width: w, height: h};
        let cssClass = "block " + BlockView.determineColorClass(block.state)
        return (<td className={cssClass} style={style}></td>)
    }
  }
  