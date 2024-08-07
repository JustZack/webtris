import PiecesConfig from "../configs/pieces/Pieces.Config";
import Point from "../util/Point";
import PieceView from "./PieceView";

export default class StatisticsView extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
        this.renderPieces = this.renderPieces.bind(this);
    }

    renderPieces() {
        let pieces = [];
        for (let pieceName of Object.keys(this.props.statistics)) {
            let clss = PiecesConfig.getClass(pieceName);
            pieces.push(
            <tr key={pieceName}>
                <td>
                    <PieceView piece={new clss(new Point(1, 1))} blockSize={this.props.blockSize}/>
                </td>
                <td> {this.props.statistics[pieceName]} </td>
            </tr>);
        }
        return pieces;
    }

    render() {
        let style = {top: this.props.position.y, left: this.props.position.x, 
            width: this.props.size.width, height: this.props.size.height};
        return (
            <div className="statistics" style={style}>
                <table>
                    <tbody>
                        {this.renderPieces()}
                    </tbody>
                </table>
            </div>
        );
    }
  }
  