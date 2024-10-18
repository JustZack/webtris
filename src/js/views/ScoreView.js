import Text from "../util/Text";

export default class ScoreView extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render() {
        let style = {top: this.props.position.y, left: this.props.position.x, 
            width: this.props.size.width, height: this.props.size.height};
        let score = Text.padWithLeadingZeros(this.props.score, 6);
        return (
            <div className="score" style={style}>
                <div className="score-label board-text center-text">Score</div>
                <div className="score-value board-text center-text">{score}</div>
                
            </div>
        );
    }
  }
  