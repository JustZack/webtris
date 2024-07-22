import Board from "./views/board";
import Point from "./models/shared/point";
import Size from "./models/shared/size";
import "../css/App.scss"

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { }
  }

  render() {
    return (
      <div>
        It works!
        <Board windowPosition={new Point(500, 500)} boardSize={new Size(6, 18)} blockSize={new Size(32, 32)}/>
      </div>
    );
  }
}
