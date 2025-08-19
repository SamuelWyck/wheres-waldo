import "../styles/leaderboardEntry.css";
import {formatDate, formatTime} from "../utils/formatNumber.js";



function LeaderboardEntry({entry}) {
    return (
        <div className="leaderboard-entry">
            <p className="entry-name">{entry.username}</p>
            <p className="entry-time">
                {formatTime(entry.time)}
            </p>
            <p className="entry-date">
                {formatDate(entry.timestamp)}
            </p>
        </div>
    );
};



export default LeaderboardEntry;