import "../styles/errorPage.css";
import { Navigate, useOutletContext, useRouteError } from "react-router-dom";
import Header from "./header.jsx";
import Footer from "./footer.jsx";



function ErrorPage({appError}) {
    const errorsRef = useOutletContext();
    const routeError = useRouteError();
    const errors = getErrorElements();

    
    function getErrorElements() {
        const errorElements = [];
        
        if (routeError) {
            errorElements.push(
                <li className="error-ele" key={0}>
                    {`${routeError.status} ${routeError.statusText}`}
                </li>
            );
        } else if (errorsRef.current) {
            for (let error of errorsRef.current) {
                errorElements.push(
                    <li className="error-ele" key={error.msg}>
                        {error.msg}
                    </li>
                );
            };
        }
        
        return errorElements;
    };


    if (errors.length === 0) {
        return <Navigate to={"/"} replace={true} />;
    }


    return (
    <>
    {!appError || <Header />}
    <main className="error-page">
        <p className="error-title">Something went wrong</p>
        <ul className="errors-list">
            {errors}
        </ul>
    </main>
    {!appError || <Footer />}
    </>
    );
};



export default ErrorPage;