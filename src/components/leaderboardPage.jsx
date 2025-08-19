import "../styles/leaderboardPage.css";
import apiManager from "../utils/apiManager.js";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import LeaderboardEntry from "./leaderboardEntry.jsx";



function LeaderBoardPage() {
    const errorsRef = useOutletContext();
    const navigate = useNavigate();
    const [leaderboard, setLeaderboard] = useState(null);

    useEffect(function() {
        apiManager.getLeaderboard().then(function(res) {
            if (res.errors) {
                errorsRef.current = res.errors;
                navigate("/error");
            }

            setLeaderboard(getEntries(res.leaderboard));
        });
    }, [navigate, errorsRef]);


    function getEntries(leaderboard) {
        const entries = [];
        for (let entry of leaderboard) {
            entries.push(
                <LeaderboardEntry entry={entry} key={entry.id} />
            );
        }
        return entries;
    };



    if (!leaderboard) {
        return <p className="loading">Loading...</p>;
    }

    return (
        <main className="leaderboard-page">
            <p className="leaderboard-title">Leaderboard</p>
            <div className="leaderboard">
                {leaderboard}
            </div>
        </main>
    );
};



export default LeaderBoardPage;