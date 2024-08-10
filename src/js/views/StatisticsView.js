import PiecesConfig from "../configs/pieces/Pieces.Config";
import Point from "../util/Point";
import Text from "../util/Text";
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
            let stat = Text.padWithLeadingZeros(this.props.statistics[pieceName], 3);
            pieces.push(
            <tr key={pieceName}>
                <td className="piece">
                    <PieceView piece={new clss(new Point(1, 1))} blockSize={this.props.blockSize} level={this.props.level}/>
                </td>
                <td className="piece-statistic board-text">{stat}</td>
            </tr>);
        }
        return pieces;
    }

    render() {
        let style = {top: this.props.position.y, left: this.props.position.x, 
            width: this.props.size.width, height: this.props.size.height};
        return (
            <div className="statistics" style={style}>
                <div className="statistics-label board-text">Statistics</div>
                <table>
                    <tbody>
                        {this.renderPieces()}
                    </tbody>
                </table>
            </div>
        );
    }
  }
  