export default class ScoreView extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render() {
        let style = {top: this.props.position.y, left: this.props.position.x, 
            width: this.props.size.width, height: this.props.size.height};
        return (
            <div className="score" style={style}>
                {this.props.score}
            </div>
        );
    }
  }
  