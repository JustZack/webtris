import GameAction from "../../configs/input/GameAction";

export default class InputControllerComp extends React.Component {
    
    
    constructor(props) {
        super(props);
        this.manageListeners = this.manageListeners.bind(this);
        
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);

        this.onGamepadConnectionChanged = this.onGamepadConnectionChanged.bind(this);
        
        this.getGameActionForButton = this.getGameActionForButton.bind(this);

        this.state = { 
            mapping: this.props.mapping,
            listeners: {
                "keydown": this.handleKeyDown,
                "keyup": this.handleKeyUp,
                "gamepadconnected": (e) => this.onGamepadConnectionChanged(e, true),
                "gamepaddisconnected": (e) => this.onGamepadConnectionChanged(e, false)
            },
            gamepads: []
        }
    }

    manageListeners(addListeners) {
        let listenerOp = window.removeEventListener;
        if (addListeners) listenerOp = window.addEventListener;
        
        let listMap = this.state.listeners;
        for (let listener in listMap) listenerOp(listener, listMap[listener]);
    }

    componentDidMount() {
        this.manageListeners(true);
    }
    
    componentWillUnmount() {
        this.manageListeners(false);
    }

    getGameActionForButton(event) {
        //Allow ctrl+shift+r for development
        if ((event.ctrlKey || event.shiftKey) && event.keyCode == 82) return false;
        else {
            for (let actionIndex in GameAction) {
                let action = GameAction[actionIndex];
                if (this.state.mapping[action].includes(event.keyCode)) {
                    event.preventDefault();
                    return action;
                }
            }
        }
        return false;
    }

    handleKeyDown(event) {
        this.props.onKeyDown(event, this.getGameActionForButton(event));
    }

    handleKeyUp(event) {
        this.props.onKeyUp(event, this.getGameActionForButton(event));
    }

    onGamepadConnectionChanged(event, isConnected) {
        let gamepads = this.state.gamepads;    
        let gamepad = event.gamepad;
        if (isConnected) {
            gamepads[gamepad.index] = gamepad;
        } else {
            delete gamepads[gamepad.index];
        }
        this.setState({gamepads: gamepads});
    }

    render() { }
  }
  