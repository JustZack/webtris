import Board from "./views/BoardView";
import Point from "./util/Point";
import Size from "./util/Size";
import "../css/App.scss"
import TetrisGameController from "./controllers/game/TetrisGameController";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    let ww = window.innerWidth, wh = window.innerHeight;
    let boardSize = new Size(10, 30);
    let blockSize = new Size(40, 40);
    let boardPos = new Point((ww/3)-(blockSize.width*5), (wh/2)-(blockSize.height* (boardSize.height-2)/2));

    this.state = { 
      position: boardPos,
      boardSize: boardSize,
      blockSize: blockSize
    }
  }

  render() {
    return (
      <div>
        <TetrisGameController position={this.state.position} boardSize={this.state.boardSize} blockSize={this.state.blockSize}/>
      </div>
    );
  }
}
