import Board from "./views/BoardView";
import Point from "./util/Point";
import Size from "./util/Size";
import "../css/App.scss"
import TetrisGameController from "./controllers/game/TetrisGameController";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    let blockSideLength = 40;
    this.state = { 
      blockSideLength: blockSideLength,
      position: new Point((window.innerWidth/3)-(blockSideLength*5), (window.innerHeight/2)-(blockSideLength*14))
    }
  }

  render() {
    return (
      <div>
        <TetrisGameController position={this.state.position} blockSize={new Size(this.state.blockSideLength, this.state.blockSideLength)} boardSize={new Size(10, 30)}/>
      </div>
    );
  }
}
