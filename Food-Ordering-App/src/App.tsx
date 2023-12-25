import './App.css'
import Home from "./views/home.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./layout/header.tsx";
import Footer from "./layout/footer.tsx";

function App() {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path={"/"} element={<Home/>}/>

            </Routes>
            <Footer/>
        </BrowserRouter>
    )
}

export default App
