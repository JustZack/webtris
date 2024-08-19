import LevelView from "./LevelView";
import LineCountView from "./LineCountView";
import NextPieceView from "./NextPieceView";
import ScoreView from "./ScoreView";
import StatisticsView from "./StatisticsView";

export default class TetrisGameView extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {children, nextLevel, positions, sizes, completedLines, totalPoints, nextPiece, currentLevel, statistics} = this.props;        
        return (
            <div>
                <button onClick={nextLevel}>Next</button>
                <LineCountView position={positions.LineCount} size={sizes.LineCount} lines={completedLines}/>
                {children}
                <ScoreView position={positions.Score} size={sizes.Score} score={totalPoints}/>
                <NextPieceView position={positions.NextPiece} size={sizes.NextPiece} piece={nextPiece} blockSize={sizes.Block} level={currentLevel}/>
                <StatisticsView position={positions.Stats} size={sizes.Stats} statistics={statistics} blockSize={sizes.Block} level={currentLevel}/>
                <LevelView position={positions.Level} size={sizes.Level} blockSize={sizes.Block} level={currentLevel}/>
            </div>
        );
    }
}