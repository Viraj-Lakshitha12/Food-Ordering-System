import Header from "../layout/header.tsx";
import Hero from "../layout/hero.tsx";
import HomeMenu from "./homeMenu.tsx";
import About from "./about.tsx";
import Contact from "./contact.tsx";
import Footer from "../layout/footer.tsx";

export default function Home(){
    return(
        <div>
            <Header />
            <Hero />
            <HomeMenu />
            <About />
            <Contact />
            <Footer  />
        </div>
    )
}