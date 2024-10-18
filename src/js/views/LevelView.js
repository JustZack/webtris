import Text from "../util/Text";

export default class LevelView extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render() {
        let style = {top: this.props.position.y, left: this.props.position.x, 
            width: this.props.size.width, height: this.props.size.height};
        let level = Text.padWithLeadingZeros(this.props.level, 3);
        return (
            <div className="level" style={style}>
                <div className="level-label board-text center-text">Level</div>
                <div className="level-value board-text center-text">{level}</div>
                
            </div>
        );
    }
  }
  