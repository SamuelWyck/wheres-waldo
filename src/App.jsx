import './App.css';
import Header from "./components/header.jsx";
import Footer from './components/footer.jsx';
import { Outlet } from 'react-router-dom';
import { useRef } from 'react';



function App() {
    const errorsRef = useRef(null);

    return (
        <>
        <Header />
        <Outlet context={errorsRef} />
        <Footer />
        </>
    );
};



export default App;
