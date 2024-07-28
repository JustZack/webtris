import Board from "./views/BoardView";
import Point from "./models/util/Point";
import Size from "./models/util/Size";
import "../css/App.scss"
import TetrisGameController from "./controllers/TetrisGameController";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      position: new Point((window.innerWidth/2)-(15*5), (window.innerHeight/2)-(15*15))
    }
  }

  render() {
    return (
      <div>
        <TetrisGameController windowPosition={this.state.position} blockSize={new Size(15, 15)} boardSize={new Size(10, 30)}/>
      </div>
    );
  }
}
