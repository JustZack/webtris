import GameAction from "../../configs/input/GameAction";
import InputAction from "../../configs/input/InputAction";


export default class InputController {
    
    static POLLING_RATE = 10
    
    constructor(inputMapping) {

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.listeners = {
            "keydown": this.handleKeyDown,
            "keyup": this.handleKeyUp,
            "gamepadconnected": (e) => this.onGamepadConnectionChanged(e, true),
            "gamepaddisconnected": (e) => this.onGamepadConnectionChanged(e, false)
        };
        this.mapping = inputMapping;
        this.gamepads = [];
        this.gamepadCheckInterval = null;
        this.callbacks = {};
        this.initCallbacks()
    }

    initCallbacks() {
        let actions = Object.keys(InputAction);
        for (let action in actions) 
            this.callbacks[actions[action]] = () => {};
        console.log(this.callbacks);
    }
    setCallback(inputAction, callback) {
        let actions = Object.keys(InputAction);
        if (actions.includes(inputAction)) {
            this.callbacks[inputAction] = callback;
        } else {
            throw `Tried setting InputController callback for unknown input action ${inputAction}`;
        }

    }

    startGamepadCheckLoop() {
        this.gamepadCheckInterval = setTimeout(this.checkForGamepadEvent, InputController.POLLING_RATE);
    }
    stopGamepadCheckLoop() {
        clearInterval(this.gamepadCheckInterval);
        this.gamepadCheckInterval = null;
    }

    addListeners() { this.manageListeners(true); }
    removeListeners() { this.manageListeners(false); }
    manageListeners(addListeners) {
        let listenerOp = window.removeEventListener;
        if (addListeners) listenerOp = window.addEventListener;
        
        let listMap = this.listeners;
        for (let listener in listMap) listenerOp(listener, listMap[listener]);
    }

    handleKeyDown(event) {
        console.log(this.callbacks);
        this.callbacks[InputAction.KEY_DOWN](event, this.getGameActionForButton(event));
    }
    handleKeyUp(event) {
        this.callbacks[InputAction.KEY_UP](event, this.getGameActionForButton(event));
    }

    onGamepadConnectionChanged(event, isConnected) {
        let gamepad = event.gamepad;
        if (isConnected) {
            //
            if (this.gamepadCheckInterval == null) this.startGamepadCheckLoop();
            this.gamepads[gamepad.index] = gamepad;
        } else {
            //Set this.gamepads[gamepad.index] to undefined
            delete this.gamepads[gamepad.index];
            //If we only have undefined gamepads, stop the gamepad check loop
            if (new Set(this.gamepads).size == 1) this.stopGamepadCheckLoop();
        }
        this.callbacks[InputAction.GAMEPAD_CONNECT_CHANGE](event, isConnected);
    }

    checkForGamepadEvent() {

    }

    handleGamepadDown(event, gamepadIndex) {
        this.callbacks[InputAction.GAMEPAD_DOWN](event, this.getGameActionForButton(event));
    }
    handleGamepadUp(event, gamepadIndex) {
        this.callbacks[InputAction.GAMEPAD_UP](event, this.getGameActionForButton(event));
    }

    getGameActionForButton(event) {
        //Allow ctrl+shift+r for development
        if ((event.ctrlKey || event.shiftKey) && event.keyCode == 82) return false;
        else {
            for (let actionIndex in GameAction) {
                let action = GameAction[actionIndex];
                if (this.mapping[action].includes(event.keyCode)) {
                    event.preventDefault();
                    return action;
                }
            }
        }
        return false;
    }

  }
  