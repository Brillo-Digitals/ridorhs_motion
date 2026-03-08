import Hero from '../components/sections/Hero';
import FeaturedWork from '../components/sections/FeaturedWork';
import PortfolioList from '../components/sections/PortfolioList';
import Services from '../components/sections/Services';
import About from '../components/sections/About';
import Contact from '../components/sections/Contact';

export default function Home() {
    return (
        <>
            <Hero />
            <FeaturedWork />
            <PortfolioList />
            <Services />
            <About />
            <Contact />
        </>
    );
}
