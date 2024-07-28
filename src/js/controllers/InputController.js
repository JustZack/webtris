import GameAction from "../models/input/GameAction";

export default class InputController extends React.Component {
    
    
    constructor(props) {
        super(props);
        //commitPiece={this.appendPiece} clearFallingPieces={this.clearDynamics}
        this.state = {
            mapping: this.props.mapping
        }
        this.handleKeyDown = this.handleKeyDown.bind(this);

        this.getGameActionForButton = this.getGameActionForButton.bind(this);
    }

    componentDidMount() {
        window.addEventListener("keydown", this.handleKeyDown);
    }
    
    componentWillUnmount() {
        window.removeEventListener("keydown", this.handleKeyDown);
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
        console.log(this.getGameActionForButton(event));
    }

    render() { }
  }
  