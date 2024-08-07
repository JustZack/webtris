export default class LineCountView extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }
    render() {
        let style = {top: this.props.position.y, left: this.props.position.x, 
            width: this.props.size.width, height: this.props.size.height};
        return (
            <div className="line-count" style={style}>
                Lines: {this.props.lines}
            </div>
        );
    }
  }
  