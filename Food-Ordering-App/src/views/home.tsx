import Header from "../layout/header.tsx";
import Hero from "../layout/hero.tsx";
import HomeMenu from "./homeMenu.tsx";
import About from "./about.tsx";

export default function Home(){
    return(
        <div>
            <Header />
            <Hero />
            <HomeMenu />
            <About />
        </div>
    )
}