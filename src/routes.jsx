import App from "./App.jsx";
import HomePage from "./components/homePage.jsx";
import GamePage from "./components/gamePage.jsx";
import LeaderBoardPage from "./components/leaderboardPage.jsx";
import ErrorPage from "./components/errorPage.jsx";



const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                index: true,
                element: <HomePage />
            },
            {
                path: "/play/:imageId",
                element: <GamePage />
            },
            {
                path: "/leaderboard",
                element: <LeaderBoardPage />
            },
            {
                path: "/error",
                element: <ErrorPage appError={false} />
            }
        ],
        errorElement: <ErrorPage appError={true} />
    }
];



export default routes;