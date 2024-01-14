import Hero from "../layout/hero.tsx";
import HomeMenu from "./homeMenu.tsx";
import About from "./about.tsx";
import Contact from "./contact.tsx";
import {useEffect} from "react";
import Cookies from "js-cookie";
import axios from "axios";

const fetchData = async () => {
    const user = Cookies.get('user');
    if (user) {
        try {
            const email = user;
            const response = await axios.get(`http://localhost:8080/api/user/getUserDetailsByEmail/${email}`);
            const userDetailData = response.data.data;

            console.log('admin', userDetailData.admin);
            Cookies.set('admin', userDetailData.admin);
            // window.location.reload();
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    }
};

const Home = () => {
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <Hero/>
            <HomeMenu/>
            <About/>
            <Contact/>
        </div>
    );
};

export default Home;
