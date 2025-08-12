import App from "./App.jsx";
import HomePage from "./components/homePage.jsx";
import GamePage from "./components/gamePage.jsx";



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
                path: "/play/:imageName",
                element: <GamePage />
            }
        ]
    }
];



export default routes;