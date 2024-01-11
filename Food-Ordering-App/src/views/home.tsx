
import Hero from "../layout/hero.tsx";
import HomeMenu from "./homeMenu.tsx";
import About from "./about.tsx";
import Contact from "./contact.tsx";

export default function Home(){
    return(
        <div>
            <Hero />
            <HomeMenu />
            <About />
            <Contact />
        </div>
    )
}
