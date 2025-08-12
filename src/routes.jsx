import App from "./App.jsx";
import HomePage from "./components/homePage.jsx";



const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                index: true,
                element: <HomePage />
            }
        ]
    }
];



export default routes;