import Board from "./views/BoardView";
import Point from "./models/util/point";
import Size from "./models/util/size";
import "../css/App.scss"
import TetrisGameController from "./controllers/TetrisGameController";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { }
  }

  render() {
    return (
      <div>
        <TetrisGameController windowPosition={new Point(500, 500)} blockSize={new Size(15, 15)} boardSize={new Size(10, 20)}/>
      </div>
    );
  }
}
