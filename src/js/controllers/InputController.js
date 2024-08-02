import GameAction from "../models/input/GameAction";

export default class InputController extends React.Component {
    
    
    constructor(props) {
        super(props);
        this.state = { mapping: this.props.mapping }
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.getGameActionForButton = this.getGameActionForButton.bind(this);
    }

    componentDidMount() {
        window.addEventListener("keydown", this.handleKeyDown);
        window.addEventListener("keyup", this.handleKeyUp);
    }
    
    componentWillUnmount() {
        window.removeEventListener("keydown", this.handleKeyDown);
        window.removeEventListener("keyup", this.handleKeyUp);
    }

    getGameActionForButton(event) {
        for (let actionIndex in GameAction) {
            let action = GameAction[actionIndex];
            if (this.state.mapping[action].includes(event.keyCode))
                return action;
        }
        return false;
    }

    handleKeyDown(event) {
        this.props.onKeyDown(event, this.getGameActionForButton(event));
    }

    handleKeyUp(event) {
        this.props.onKeyUp(event, this.getGameActionForButton(event));
    }

    render() { }
  }
  