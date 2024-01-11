import './App.css'
import Home from "./views/home.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./layout/header.tsx";
import Footer from "./layout/footer.tsx";
import HomeMenu from "./views/homeMenu.tsx";
import About from "./views/about.tsx";
import Contact from "./views/contact.tsx";
import Register from "./views/register.tsx";
import Login from "./views/login.tsx";
import Profile from "./views/profile/profile.tsx";

function App() {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path={"/"} element={<Home/>}/>
                <Route path={"/menu"} element={<HomeMenu/>}/>
                <Route path={"/about"} element={<About/>}/>
                <Route path={"/contact"} element={<Contact/>}/>
                <Route path={"/login"} element={<Login/>}/>
                <Route path={"/register"} element={<Register/>}/>
                <Route path={"/profile"} element={<Profile />}/>

            </Routes>
            <Footer/>
        </BrowserRouter>
    )
}

export default App
