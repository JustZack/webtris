import Text from "../util/Text";

export default class LineCountView extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }
    render() {
        let style = {top: this.props.position.y, left: this.props.position.x, 
            width: this.props.size.width, height: this.props.size.height};
        return (
            <div className="line-count board-text center-text" style={style}>
                Lines - {Text.padWithLeadingZeros(this.props.lines, 3)}
            </div>
        );
    }
  }
  