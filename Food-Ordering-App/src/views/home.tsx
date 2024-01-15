import Hero from "../layout/hero.tsx";
import HomeMenu from "./homeMenu.tsx";
import About from "./about.tsx";
import Contact from "./contact.tsx";
import Cookies from "js-cookie";
import axios from "axios";
import { useEffect } from "react";

const Home = () => {
    // window.location
    useEffect(() => {
            fetchData();

    }, []);
    const fetchData = async () => {
        const user = Cookies.get('user');
        if (user) {
            try {
                const email = user;
                const response = await axios.get(`http://localhost:8080/api/user/getUserDetailsByEmail/${email}`);
                const userDetailData = response.data.data;

                console.log('admin', userDetailData.admin);
                Cookies.set('admin', userDetailData.admin);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        }
    };

    return (
        <div>
            <Hero />
            <HomeMenu />
            <About />
            <Contact />
        </div>
    );
};

export default Home;
